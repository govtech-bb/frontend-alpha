#!/usr/bin/env node

/**
 * Content Migration Script
 * Migrates meaningful government content from scraped gov.bb site to frontend-alpha
 */

const fs = require("node:fs");
const path = require("node:path");

// Configuration
const SOURCE_DIR = path.join(
  __dirname,
  "../../govdotbb/scraped-content-gov-bb/content"
);
const DEST_DIR = path.join(__dirname, "../src/content");
const MIN_CONTENT_LENGTH = 150;

// Directories/patterns to exclude (not meaningful content)
const EXCLUDE_PATTERNS = [
  "news_article.php",
  "login.php",
  "cookie-policy",
  "contact",
  "Site-Info",
  "ezpay-terms",
  "sitemap",
  "terms-conditions",
  "announcements",
  "Media_tenders",
  "Media_jobs",
  "Government_tenders",
  "Government_jobs",
  "Government_forms",
  "Media_forms",
  "faq",
  "division_detail",
];

// Non-meaningful content patterns to detect
const MEANINGLESS_PATTERNS = [
  /^Email\s*$/m,
  /^CONTACT US\s*$/m,
  /^### Site Info/m,
  /^Listing of all/m,
];

const stats = {
  total: 0,
  processed: 0,
  excluded: 0,
  errors: 0,
  reasons: {},
};

/**
 * Check if a file path should be excluded
 */
function shouldExclude(filePath) {
  const relativePath = path.relative(SOURCE_DIR, filePath);

  for (const pattern of EXCLUDE_PATTERNS) {
    if (relativePath.includes(pattern)) {
      return `Excluded directory/pattern: ${pattern}`;
    }
  }

  return null;
}

/**
 * Extract title from markdown content
 */
function extractTitle(content, filePath) {
  // Try to get first heading
  const headingMatch = content.match(/^#+ (.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  // Fallback to directory name
  const dirName = path.basename(path.dirname(filePath));
  if (dirName && dirName !== "content") {
    // Convert "Citizens_register-birth" to "Register Birth"
    const cleaned = dirName
      .replace(
        /^(Citizens|Business|Departments|Ministries|State-Bodies|Visit-Barbados|Government|General)_/,
        ""
      )
      .replace(/-/g, " ")
      .replace(/_/g, " ");
    return cleaned
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return "Untitled";
}

/**
 * Clean markdown content
 */
function cleanContent(content) {
  let cleaned = content;

  // Remove broken image references
  cleaned = cleaned.replace(
    /!\[\]\(https?:\/\/www\.gov\.bb\/media_files\/[^)]+\)/g,
    ""
  );

  // Remove multiple blank lines
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

  // Trim
  cleaned = cleaned.trim();

  return cleaned;
}

/**
 * Check if content is meaningful
 */
function isMeaningful(content) {
  // Check length
  if (content.length < MIN_CONTENT_LENGTH) {
    return { meaningful: false, reason: "Too short" };
  }

  // Check for meaningless patterns
  for (const pattern of MEANINGLESS_PATTERNS) {
    if (pattern.test(content)) {
      return { meaningful: false, reason: "Meaningless pattern detected" };
    }
  }

  // Check if it's just navigation/links
  const lines = content.split("\n").filter((line) => line.trim());
  const linkLines = lines.filter(
    (line) => line.includes("[") && line.includes("]")
  );
  if (linkLines.length > lines.length * 0.8) {
    return { meaningful: false, reason: "Mostly navigation links" };
  }

  return { meaningful: true };
}

/**
 * Generate output filename from source path
 */
function generateFilename(sourcePath) {
  const dirName = path.basename(path.dirname(sourcePath));

  // Use directory name as base for filename
  let filename = dirName
    .replace(
      /^(Citizens|Business|Departments|Ministries|State-Bodies|Visit-Barbados|Government|General)_/,
      ""
    )
    .replace(/_/g, "-")
    .toLowerCase();

  // Handle special cases
  if (filename === "content" || !filename) {
    const hash = path.basename(sourcePath, ".md");
    filename = hash.substring(0, 8);
  }

  return `${filename}.md`;
}

/**
 * Process a single markdown file
 */
function processFile(filePath) {
  stats.total++;

  // Check if should be excluded
  const excludeReason = shouldExclude(filePath);
  if (excludeReason) {
    stats.excluded++;
    stats.reasons[excludeReason] = (stats.reasons[excludeReason] || 0) + 1;
    return;
  }

  try {
    // Read content
    const content = fs.readFileSync(filePath, "utf-8");

    // Check if meaningful
    const meaningfulCheck = isMeaningful(content);
    if (!meaningfulCheck.meaningful) {
      stats.excluded++;
      const reason = meaningfulCheck.reason;
      stats.reasons[reason] = (stats.reasons[reason] || 0) + 1;
      return;
    }

    // Extract title
    const title = extractTitle(content, filePath);

    // Clean content
    const cleaned = cleanContent(content);

    // Create front matter
    const frontMatter = `---
title: "${title}"
stage: "alpha"
featured: false
---

`;

    // Generate output filename
    const outputFilename = generateFilename(filePath);
    const outputPath = path.join(DEST_DIR, outputFilename);

    // Check if file already exists
    if (fs.existsSync(outputPath)) {
      stats.excluded++;
      stats.reasons["Already exists"] =
        (stats.reasons["Already exists"] || 0) + 1;
      return;
    }

    // Write file
    fs.writeFileSync(outputPath, frontMatter + cleaned);
    stats.processed++;

    console.log(`✓ ${outputFilename} - "${title}"`);
  } catch (error) {
    stats.errors++;
    console.error(`✗ Error processing ${filePath}: ${error.message}`);
  }
}

/**
 * Recursively find all markdown files
 */
function findMarkdownFiles(dir) {
  const files = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

/**
 * Main execution
 */
function main() {
  console.log("Content Migration Script");
  console.log("========================\n");
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Destination: ${DEST_DIR}\n`);

  // Ensure destination directory exists
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  // Find all markdown files
  console.log("Finding markdown files...");
  const files = findMarkdownFiles(SOURCE_DIR);
  console.log(`Found ${files.length} markdown files\n`);

  // Process each file
  console.log("Processing files...\n");
  for (const file of files) {
    processFile(file);
  }

  // Print summary
  console.log("\n\nMigration Summary");
  console.log("=================");
  console.log(`Total files found: ${stats.total}`);
  console.log(`Successfully migrated: ${stats.processed}`);
  console.log(`Excluded: ${stats.excluded}`);
  console.log(`Errors: ${stats.errors}`);

  console.log("\nExclusion Reasons:");
  for (const [reason, count] of Object.entries(stats.reasons)) {
    console.log(`  - ${reason}: ${count}`);
  }

  console.log("\n✓ Migration complete!");
}

// Run
main();
