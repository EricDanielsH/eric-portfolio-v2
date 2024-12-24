import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  title: string;
  slug: string;
  link: string;
  techStack: string[];
  description: string;
  content: string;
}

export const getProjectBySlug = (slug: string): Post | null => {
  const folder = path.join(process.cwd(), "projects");
  const filePath = path.join(folder, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return null; // Return null if the file doesn't exist
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    slug: data.slug,
    link: data.link,
    techStack: data.techStack,
    description: data.description,
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
