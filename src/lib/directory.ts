import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type DirectoryEntry = {
  title: string;
  slug: string;
  section: string;
  description?: string;
};

export type GroupedDirectory = {
  ministries: DirectoryEntry[];
  departments: DirectoryEntry[];
  stateBodies: DirectoryEntry[];
};

export async function getDirectoryEntries(): Promise<GroupedDirectory> {
  const profileDir = path.join(
    process.cwd(),
    "src",
    "content",
    "directory",
    "profile"
  );

  const entries = await fs.readdir(profileDir);

  const result: GroupedDirectory = {
    ministries: [],
    departments: [],
    stateBodies: [],
  };

  for (const entry of entries) {
    if (!entry.endsWith(".md")) continue;

    const filePath = path.join(profileDir, entry);
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data } = matter(fileContent);

    const slug = entry.replace(".md", "");
    const directoryEntry: DirectoryEntry = {
      title: data.title || slug,
      slug,
      section: data.section || "",
      description: data.description,
    };

    if (data.section === "Government Ministries") {
      result.ministries.push(directoryEntry);
    } else if (data.section === "Government Departments") {
      result.departments.push(directoryEntry);
    } else if (data.section === "State Bodies") {
      result.stateBodies.push(directoryEntry);
    }
  }

  // Sort each group alphabetically
  result.ministries.sort((a, b) => a.title.localeCompare(b.title));
  result.departments.sort((a, b) => a.title.localeCompare(b.title));
  result.stateBodies.sort((a, b) => a.title.localeCompare(b.title));

  return result;
}
