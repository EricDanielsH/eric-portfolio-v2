import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  title: string;
  summary: string;
  date: string;
  lastmod: string;
  tags: string[];
  content: string;
}

export const getPostBySlug = (slug: string): Post | null => {
  const folder = path.join(process.cwd(), "posts");
  const filePath = path.join(folder, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return null; // Return null if the file doesn't exist
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    summary: data.summary,
    date: data.date,
    lastmod: data.lastmod,
    tags: data.tags,
    content,
  };
};

export const getAllSlugs = (): string[] => {
  const folder = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(folder);

  return files
    .filter((fileName) => {
      const fullPath = path.join(folder, fileName);
      return fs.statSync(fullPath).isFile() && fileName.endsWith(".md");
    })
    .map((fileName) => fileName.replace(/\.md$/, ""));
};
