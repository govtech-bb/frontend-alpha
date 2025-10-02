import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export async function getMarkdownContent(slug: string[]) {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "content",
      `${slug.join("/")}.md`
    );
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      frontmatter: data,
      content,
    };
  } catch (_error) {
    return null;
  }
}

export async function getFeaturedServices() {
  try {
    const contentDir = path.join(process.cwd(), "src", "content");
    const files = await fs.readdir(contentDir);

    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    const services: Array<{ title: string; slug: string; featured?: boolean }> =
      [];

    for (const file of markdownFiles) {
      const filePath = path.join(contentDir, file);
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data } = matter(fileContents);

      // Check if the file has featured: true in frontmatter
      if (data.featured === true) {
        const slug = file.replace(".md", "");
        services.push({
          title: data.title || slug,
          slug,
          featured: data.featured,
        });
      }
    }

    return services;
  } catch (_error) {
    return [];
  }
}
