import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

type ContentBody = {
  frontmatter: Record<string, unknown>;
  content: string;
};

export async function getContentBody(
  subdir: string,
  slug: string
): Promise<ContentBody | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "content",
      subdir,
      `${slug}.md`
    );
    const file = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(file);
    return { frontmatter: data, content };
  } catch {
    return null;
  }
}
