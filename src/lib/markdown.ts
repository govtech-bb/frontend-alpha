import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { findCategoryByPageSlug } from "./utils";

const contentDirectory = path.join(process.cwd(), "src", "content");

export async function getMarkdownContent(slugPath: string[]) {
  try {
    let fileContent: string | undefined;

    if (slugPath.length === 1) {
      // Try multiple file patterns for single slug
      const possiblePaths = [
        path.join(contentDirectory, slugPath[0], "index.md"), // folder/index.md
        path.join(contentDirectory, `${slugPath[0]}.md`), // file.md
      ];

      // Try each path until one works
      for (const possiblePath of possiblePaths) {
        try {
          fileContent = await fs.readFile(possiblePath, "utf8");
          break;
          // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
        } catch (_error) {}
      }

      if (!fileContent) {
        return null;
      }
    } else {
      // Sub-page: content/register-a-birth/start.md
      const filePath = path.join(
        contentDirectory,
        slugPath[0],
        `${slugPath[1]}.md`
      );
      fileContent = await fs.readFile(filePath, "utf8");
    }

    const { data, content } = matter(fileContent);

    return {
      frontmatter: data,
      content,
    };
  } catch (_error) {
    return null;
  }
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
export async function getFeaturedServices() {
  try {
    const contentDir = path.join(process.cwd(), "src", "content");
    const entries = await fs.readdir(contentDir, { withFileTypes: true });

    const services: Array<{ title: string; slug: string; featured?: boolean }> =
      [];

    for (const entry of entries) {
      let filePath: string;
      let slug: string;

      if (entry.isFile() && entry.name.endsWith(".md")) {
        // Handle direct markdown files (e.g., loud-music-permit.md)
        filePath = path.join(contentDir, entry.name);
        slug = entry.name.replace(".md", "");
      } else if (entry.isDirectory()) {
        // Handle folders with index.md (e.g., register-a-birth/index.md)
        const indexPath = path.join(contentDir, entry.name, "index.md");
        try {
          await fs.access(indexPath); // Check if index.md exists
          filePath = indexPath;
          slug = entry.name;
        } catch {
          continue; // Skip directories without index.md
        }
      } else {
        continue; // Skip non-markdown files and other entries
      }

      try {
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContents);

        // Check if the file has featured: true in frontmatter
        if (data.featured === true) {
          const category = findCategoryByPageSlug(slug);
          if (category) {
            slug = `${category.slug}/${slug}`;
          }
          services.push({
            title: data.title || slug,
            slug,
            featured: data.featured,
          });
        }
        // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
      } catch (_error) {}
    }

    return services;
  } catch (_error) {
    // biome-ignore lint/suspicious/noConsole: This is for debugging malformed markdown frontmatter data
    console.log("error fetching markdown", _error);
    return [];
  }
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
export async function getAlphaServices() {
  try {
    const contentDir = path.join(process.cwd(), "src", "content");
    const entries = await fs.readdir(contentDir, { withFileTypes: true });

    const services: Array<{ title: string; slug: string; featured?: boolean }> =
      [];

    for (const entry of entries) {
      let filePath: string;
      let slug: string;

      if (entry.isFile() && entry.name.endsWith(".md")) {
        // Handle direct markdown files (e.g., loud-music-permit.md)
        filePath = path.join(contentDir, entry.name);
        slug = entry.name.replace(".md", "");
      } else if (entry.isDirectory()) {
        // Handle folders with index.md (e.g., register-a-birth/index.md)
        const indexPath = path.join(contentDir, entry.name, "index.md");
        try {
          await fs.access(indexPath); // Check if index.md exists
          filePath = indexPath;
          slug = entry.name;
        } catch {
          continue; // Skip directories without index.md
        }
      } else {
        continue; // Skip non-markdown files and other entries
      }

      try {
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContents);

        // Check if the file has featured: true in frontmatter
        if (data.stage === "alpha") {
          const category = findCategoryByPageSlug(slug);
          if (category) {
            slug = `${category.slug}/${slug}`;
          }
          services.push({
            title: data.title || slug,
            slug,
            featured: data.featured,
          });
        }
        // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
      } catch (_error) {}
    }

    return services;
  } catch (_error) {
    // biome-ignore lint/suspicious/noConsole: This is for debugging malformed markdown frontmatter data
    console.log("error fetching markdown", _error);
    return [];
  }
}
