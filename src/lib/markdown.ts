/** biome-ignore-all lint/suspicious/noConsole: <explanation> */

import type { Dirent } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

// Fixed base directory - resolve to absolute path at module load
const CONTENT_DIR = path.resolve(process.cwd(), "src/content");

/**
 * Validates a single path segment against security rules
 * @throws Error if segment is invalid
 */
function validateSegment(segment: string): void {
  // Reject empty segments
  if (!segment || segment.trim() === "") {
    throw new Error("Empty path segment not allowed");
  }

  // Reject segments containing path separators (encoded or not)
  if (
    segment.includes("/") ||
    segment.includes("\\") ||
    segment.includes("%2f") ||
    segment.includes("%2F") ||
    segment.includes("%5c") ||
    segment.includes("%5C")
  ) {
    throw new Error("Path separators not allowed in segments");
  }

  // Reject relative path components
  if (segment === "." || segment === "..") {
    throw new Error("Relative path components not allowed");
  }

  // Allowlist: only alphanumeric, hyphens, and underscores
  // biome-ignore lint/performance/useTopLevelRegex: <explanation>
  const allowedPattern = /^[A-Za-z0-9_-]+$/;
  if (!allowedPattern.test(segment)) {
    throw new Error("Invalid characters in path segment");
  }
}

/**
 * Safely constructs and validates a filesystem path
 * @param slugSegments - Array of path segments from route params
 * @returns Validated absolute file path
 * @throws Error if path validation fails
 */
function buildSecurePath(slugSegments: string | string[]): string {
  // Normalize input to array
  const segments = Array.isArray(slugSegments) ? slugSegments : [slugSegments];

  // Validate each segment
  segments.forEach((segment, index) => {
    try {
      validateSegment(segment);
    } catch (error) {
      throw new Error(
        `Invalid path segment at index ${index}: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  });

  // AWS Inspector Mitigation: Use path.basename() on each segment to strip any directory components

  // This ensures no path traversal sequences survive even if validation is bypassed

  const sanitizedSegments = segments.map((segment) => path.basename(segment));

  // Additional safety check: Verify basename didn't change the segment (would indicate path traversal attempt)

  segments.forEach((original, index) => {
    if (original !== sanitizedSegments[index]) {
      throw new Error(
        `Path traversal attempt detected in segment: ${original}`
      );
    }
  });

  // Build path from sanitized segments

  const relativePath = path.join(...sanitizedSegments);

  // Explicitly append .md extension (prevent extension smuggling)

  const filePathWithExtension = `${relativePath}.md`;

  // Resolve to absolute path under CONTENT_DIR

  const absolutePath = path.resolve(CONTENT_DIR, filePathWithExtension);

  // CRITICAL: Verify the resolved path is still within CONTENT_DIR
  const relative = path.relative(CONTENT_DIR, absolutePath);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("Path traversal attempt detected");
  }

  if (relative.includes("..")) {
    // Additional safeguard: Verify no '..' in the final relative path

    throw new Error("Path traversal attempt detected in resolved path");
  }

  return absolutePath;
}

/**
 * Safely reads and parses markdown content
 * @param slug - Single slug string or array of slug segments
 * @returns Parsed content with frontmatter and body
 */
export async function getMarkdownContent(slug: string | string[]) {
  try {
    // Build and validate secure path
    const filePath = buildSecurePath(slug);

    // Read file content
    const fileContent = await fs.readFile(filePath, "utf-8");

    // Parse markdown with frontmatter
    const { data, content } = matter(fileContent);

    return {
      frontmatter: data,
      content,
      slug: Array.isArray(slug) ? slug.join("/") : slug,
    };
  } catch (error) {
    // Check if this is a system/browser path (reduce log noise)
    const slugArray = Array.isArray(slug) ? slug : [slug];
    const isSystemPath = slugArray.some(
      (s) =>
        s.startsWith(".") ||
        s === "well-known" ||
        s === "favicon.ico" ||
        s === "robots.txt"
    );

    // Only log non-system path errors (avoid noise from browser requests)
    if (!isSystemPath) {
      console.error("[getMarkdownContent] Error:", {
        slug,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      });
    }

    // Return generic error to client
    throw new Error("Content not found");
  }
}

/**
 * Lists all available markdown files in a directory
 * @param subDir - Optional subdirectory within content (e.g., 'posts')
 * @returns Array of file slugs without .md extension
 */
export async function listMarkdownFiles(subDir?: string): Promise<string[]> {
  try {
    let targetDir = CONTENT_DIR;

    // If subdirectory provided, validate and append
    if (subDir) {
      validateSegment(subDir);
      targetDir = path.resolve(CONTENT_DIR, subDir);

      // Verify subdirectory is within CONTENT_DIR
      const relative = path.relative(CONTENT_DIR, targetDir);
      if (relative.startsWith("..") || path.isAbsolute(relative)) {
        throw new Error("Invalid subdirectory");
      }
    }

    const files = await fs.readdir(targetDir);

    // Filter and return only .md files without extension
    return (
      files
        .filter((file) => file.endsWith(".md"))
        // biome-ignore lint/performance/useTopLevelRegex: <explanation>
        .map((file) => file.replace(/\.md$/, ""))
    );
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("[listMarkdownFiles] Error:", {
      subDir,
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return [];
  }
}

/**
 * Recursively gets all markdown file paths from content directory
 * @param subDir - Optional subdirectory to start from
 * @returns Array of slug arrays representing file paths
 */
export async function getAllMarkdownSlugs(
  subDir?: string
): Promise<string[][]> {
  const slugs: string[][] = [];

  /**
   * Recursively scan directory for markdown files
   */
  async function scanDirectory(
    dir: string,
    basePath: string[] = []
  ): Promise<void> {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        if (shouldSkipEntry(entry)) continue;

        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          await processDirectory(entry, fullPath, basePath);
        } else if (isMarkdownFile(entry)) {
          processMarkdownFile(entry, basePath);
        }
      }
    } catch (error) {
      logScanError(dir, error);
    }
  }

  function shouldSkipEntry(entry: Dirent): boolean {
    return entry.name.startsWith(".");
  }

  function isMarkdownFile(entry: Dirent): boolean {
    return entry.isFile() && entry.name.endsWith(".md");
  }

  async function processDirectory(
    entry: Dirent,
    fullPath: string,
    basePath: string[]
  ): Promise<void> {
    try {
      validateSegment(entry.name);
      await scanDirectory(fullPath, [...basePath, entry.name]);
    } catch (_error) {
      console.warn(
        `[getAllMarkdownSlugs] Skipping invalid directory: ${entry.name}`
      );
    }
  }

  function processMarkdownFile(entry: Dirent, basePath: string[]): void {
    // biome-ignore lint/performance/useTopLevelRegex: <explanation>
    const slug = entry.name.replace(/\.md$/, "");

    try {
      validateSegment(slug);
      slugs.push(basePath.length > 0 ? [...basePath, slug] : [slug]);
    } catch (_error) {
      console.warn(
        `[getAllMarkdownSlugs] Skipping invalid file: ${entry.name}`
      );
    }
  }

  function logScanError(dir: string, error: unknown): void {
    console.error(`[getAllMarkdownSlugs] Error scanning ${dir}:`, {
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }

  // Determine starting directory
  let startDir = CONTENT_DIR;
  if (subDir) {
    try {
      validateSegment(subDir);
      startDir = path.resolve(CONTENT_DIR, subDir);

      // Verify subdirectory is within CONTENT_DIR
      const relative = path.relative(CONTENT_DIR, startDir);
      if (relative.startsWith("..") || path.isAbsolute(relative)) {
        throw new Error("Invalid subdirectory");
      }
    } catch (_error) {
      console.error("[getAllMarkdownSlugs] Invalid subdirectory:", subDir);
      return [];
    }
  }

  // Scan the directory
  await scanDirectory(startDir);

  return slugs;
}

/**
 * Checks if a markdown file exists for given slug
 * @param slug - Single slug string or array of slug segments
 * @returns Boolean indicating if file exists
 */
export async function markdownExists(
  slug: string | string[]
): Promise<boolean> {
  try {
    const filePath = buildSecurePath(slug);
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Export utility for use in other modules
export { CONTENT_DIR, validateSegment, buildSecurePath };
