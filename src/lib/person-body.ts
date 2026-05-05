import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const peopleContentDir = path.join(process.cwd(), "src", "content", "people");

export async function getPersonBody(
  slug: string
): Promise<{ frontmatter: Record<string, unknown>; content: string } | null> {
  try {
    const filePath = path.join(peopleContentDir, `${slug}.md`);
    const file = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(file);
    return { frontmatter: data, content };
  } catch {
    return null;
  }
}
