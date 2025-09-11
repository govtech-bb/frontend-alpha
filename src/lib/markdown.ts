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
