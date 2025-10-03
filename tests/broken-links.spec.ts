import { expect, type Page, test } from "@playwright/test";

type LinkResult = {
  url: string;
  status: "valid" | "broken" | "invalid";
  statusCode?: number;
  error?: string;
  foundOnPage: string;
};

type PageToCheck = {
  url: string;
  visited: boolean;
};

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const visitedUrls = new Set<string>();
const brokenLinks: LinkResult[] = [];
const pagesToCheck: Map<string, PageToCheck> = new Map();

/**
 * Normalizes a URL to avoid checking duplicates
 */
function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Remove trailing slash and hash for consistency
    return urlObj.origin + urlObj.pathname.replace(/\/$/, "") + urlObj.search;
  } catch {
    return url;
  }
}

/**
 * Checks if a URL is internal to the site
 */
function isInternalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const baseObj = new URL(BASE_URL);

    // Check if hostnames match exactly
    const isSameHostname = urlObj.hostname === baseObj.hostname;

    // Also check for common variations (www vs non-www)
    const normalizedUrlHost = urlObj.hostname.replace(/^www\./, "");
    const normalizedBaseHost = baseObj.hostname.replace(/^www\./, "");

    // Only consider it internal if:
    // 1. Exact hostname match OR
    // 2. Same normalized hostname (www removed) AND same base domain
    return (
      isSameHostname ||
      (normalizedUrlHost === normalizedBaseHost &&
        urlObj.port === baseObj.port &&
        urlObj.protocol === baseObj.protocol)
    );
  } catch {
    return false;
  }
}

/**
 * Validates and checks if a link is broken
 */
async function checkLink(
  page: Page,
  href: string,
  currentPage: string
): Promise<LinkResult> {
  const result: LinkResult = {
    url: href,
    status: "valid",
    foundOnPage: currentPage,
  };

  // Check for empty href
  if (!href || href.trim() === "") {
    result.status = "invalid";
    result.error = "Empty href attribute";
    return result;
  }

  // Check for empty hash links
  if (href === "#" || href.endsWith("/#")) {
    result.status = "invalid";
    result.error = "Empty hash link (#)";
    return result;
  }

  // Check if it's a valid URL format
  try {
    new URL(href, BASE_URL);
  } catch {
    result.status = "invalid";
    result.error = "Invalid URL format";
    return result;
  }

  // Skip certain protocols
  if (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:")
  ) {
    return result;
  }

  // Handle hash/anchor links - check if target exists on the same page
  const urlObj = new URL(href, currentPage);
  if (urlObj.hash && urlObj.hash !== "#") {
    const isCurrentPage =
      normalizeUrl(urlObj.origin + urlObj.pathname) ===
      normalizeUrl(currentPage);

    if (isCurrentPage) {
      // Check if the anchor target exists on current page (already loaded)
      const anchorId = urlObj.hash.substring(1); // Remove the #
      const elementExists = await page.evaluate((id) => {
        // Check for id attribute
        const byId = document.getElementById(id);
        if (byId) return true;

        // Check for name attribute (older anchor style)
        const byName = document.querySelector(`[name="${id}"]`);
        if (byName) return true;

        return false;
      }, anchorId);

      if (!elementExists) {
        result.status = "broken";
        result.error = `Anchor target not found: ${urlObj.hash}`;
        return result;
      }

      // Valid anchor on current page
      return result;
    }
    // For anchors on different pages, we'll need to fetch and check
    // For now, we'll check the page exists first
    try {
      const response = await page.request.head(
        urlObj.origin + urlObj.pathname,
        {
          timeout: 10_000,
          maxRedirects: 5,
          ignoreHTTPSErrors: true,
        }
      );

      if (response.status() >= 400) {
        result.status = "broken";
        result.error = `HTTP ${response.status()} - Cannot verify anchor on unreachable page`;
        return result;
      }

      // Page exists, but we can't easily verify the anchor without loading it
      // Mark as potentially problematic
      result.error =
        "Warning: Anchor link to different page - target not verified";
    } catch (error: any) {
      result.status = "broken";
      result.error = `Failed to reach page for anchor verification: ${error.message}`;
      return result;
    }

    return result;
  }

  try {
    const response = await page.request.head(href, {
      timeout: 10_000,
      maxRedirects: 5,
      ignoreHTTPSErrors: true, // Ignore SSL certificate errors
    });

    result.statusCode = response.status();

    // Consider 4xx and 5xx as broken
    if (response.status() >= 400) {
      result.status = "broken";
      result.error = `HTTP ${response.status()}`;
    }
  } catch (_error: any) {
    // If HEAD request fails, try GET request as some servers don't support HEAD
    try {
      const getResponse = await page.request.get(href, {
        timeout: 10_000,
        maxRedirects: 5,
        ignoreHTTPSErrors: true,
      });

      result.statusCode = getResponse.status();

      if (getResponse.status() >= 400) {
        result.status = "broken";
        result.error = `HTTP ${getResponse.status()}`;
      }
    } catch (getError: any) {
      result.status = "broken";
      result.error = getError.message || "Failed to reach URL";
    }
  }

  return result;
}

/**
 * Extracts all links from a page
 */
async function extractLinks(page: Page): Promise<string[]> {
  return await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("a[href]"));
    return links
      .map((link) => (link as HTMLAnchorElement).href)
      .filter((href) => href);
  });
}

/**
 * Crawls a page and checks all its links
 */
async function crawlPage(page: Page, url: string) {
  const normalizedUrl = normalizeUrl(url);

  if (visitedUrls.has(normalizedUrl)) {
    return;
  }

  visitedUrls.add(normalizedUrl);
  console.log(`Crawling: ${url}`);

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });

    // Extract all links from the page
    const links = await extractLinks(page);
    console.log(`Found ${links.length} links on ${url}`);

    // Separate internal and external links
    const internalLinks: string[] = [];
    const externalLinks: string[] = [];

    for (const link of links) {
      const absoluteLink = new URL(link, url).href;

      if (isInternalUrl(absoluteLink)) {
        internalLinks.push(absoluteLink);
      } else {
        externalLinks.push(absoluteLink);
      }
    }

    console.log(
      `  → ${internalLinks.length} internal links, ${externalLinks.length} external links`
    );

    // Check all links (both internal and external)
    const allLinks = [...internalLinks, ...externalLinks];
    for (const link of allLinks) {
      const absoluteLink = new URL(link, url).href;
      const normalizedLink = normalizeUrl(absoluteLink);
      const isInternal = isInternalUrl(absoluteLink);

      // Check the link for valid HTTP response
      const result = await checkLink(page, absoluteLink, url);

      if (result.status !== "valid") {
        brokenLinks.push(result);
        console.log(
          `❌ Broken link found: ${absoluteLink} (${result.error}) [${isInternal ? "internal" : "external"}]`
        );
      } else if (result.statusCode === 200) {
        console.log(
          `✅ Valid link: ${absoluteLink} (HTTP ${result.statusCode}) [${isInternal ? "internal" : "external"}]`
        );
      } else if (result.statusCode) {
        console.log(
          `⚠️  Redirected: ${absoluteLink} (HTTP ${result.statusCode}) [${isInternal ? "internal" : "external"}]`
        );
      }

      // Only add internal links to pages to crawl
      if (isInternal && !visitedUrls.has(normalizedLink)) {
        pagesToCheck.set(normalizedLink, {
          url: absoluteLink,
          visited: false,
        });
      }
    }
  } catch (error: any) {
    console.error(`Failed to crawl ${url}:`, error.message);
  }
}

test.describe("Broken Link Checker", () => {
  test("should find all broken links across the site", async ({ page }) => {
    // Start with the home page
    pagesToCheck.set(normalizeUrl(BASE_URL), {
      url: BASE_URL,
      visited: false,
    });

    // Crawl all pages
    while (pagesToCheck.size > 0) {
      const uncheckedPages = Array.from(pagesToCheck.entries()).filter(
        ([_, pageInfo]) => !pageInfo.visited
      );

      if (uncheckedPages.length === 0) break;

      for (const [_normalizedUrl, pageInfo] of uncheckedPages) {
        await crawlPage(page, pageInfo.url);
        pageInfo.visited = true;
      }
    }

    // Generate report
    console.log("\n========================================");
    console.log("BROKEN LINK REPORT");
    console.log("========================================\n");
    console.log(`Total pages crawled: ${visitedUrls.size}`);
    console.log(`Total broken links found: ${brokenLinks.length}\n`);

    if (brokenLinks.length > 0) {
      // Group by internal/external
      const internalBroken = brokenLinks.filter((link) =>
        isInternalUrl(link.url)
      );
      const externalBroken = brokenLinks.filter(
        (link) => !isInternalUrl(link.url)
      );

      if (internalBroken.length > 0) {
        console.log(`Internal Broken Links (${internalBroken.length}):`);
        internalBroken.forEach((link, index) => {
          console.log(`\n${index + 1}. ${link.url}`);
          console.log(`   Status: ${link.status}`);
          console.log(`   Error: ${link.error}`);
          if (link.statusCode) {
            console.log(`   Status Code: ${link.statusCode}`);
          }
          console.log(`   Found on: ${link.foundOnPage}`);
        });
      }

      if (externalBroken.length > 0) {
        console.log(`\n\nExternal Broken Links (${externalBroken.length}):`);
        externalBroken.forEach((link, index) => {
          console.log(`\n${index + 1}. ${link.url}`);
          console.log(`   Status: ${link.status}`);
          console.log(`   Error: ${link.error}`);
          if (link.statusCode) {
            console.log(`   Status Code: ${link.statusCode}`);
          }
          console.log(`   Found on: ${link.foundOnPage}`);
        });
      }
    }

    console.log("\n========================================\n");

    // Fail the test if broken links are found
    expect(brokenLinks.length).toBe(0);
  });

  test("should check specific pages for broken links", async ({ page }) => {
    const pagesToTest = [
      `${BASE_URL}`,
      `${BASE_URL}/about`,
      `${BASE_URL}/contact`,
      // Add more specific pages here
    ];

    for (const pageUrl of pagesToTest) {
      console.log(`\nChecking page: ${pageUrl}`);

      try {
        await page.goto(pageUrl, { waitUntil: "networkidle" });
        const links = await extractLinks(page);

        for (const link of links) {
          const absoluteLink = new URL(link, pageUrl).href;
          const isInternal = isInternalUrl(absoluteLink);
          const result = await checkLink(page, absoluteLink, pageUrl);

          if (result.status !== "valid") {
            brokenLinks.push(result);
            console.log(
              `❌ ${absoluteLink} - ${result.error} [${isInternal ? "internal" : "external"}]`
            );
          }
        }
      } catch (error: any) {
        console.error(`Failed to check ${pageUrl}:`, error.message);
      }
    }

    console.log(`\nTotal broken links found: ${brokenLinks.length}`);
    expect(brokenLinks.length).toBe(0);
  });
});
