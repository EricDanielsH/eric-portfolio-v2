import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  title: string;
  date: string;
  content: string;
}

export const getPostBySlug = (slug: string): Post => {
  const folder = path.join(process.cwd(), "posts");
  const filePath = path.join(folder, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    date: data.date,
    content,
  };
};

export const getAllSlugs = (): string[] => {
  const folder = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(folder);

  return files.map((fileName) => fileName.replace(/\.md$/, ""));
};
