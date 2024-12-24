import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parse } from "date-fns";
import React from "react";
import BlogPageClient from "@/components/BlogPageClient"; // Import the client component

const MAX_POSTS = 50;

export default function BlogPage() {
  const folder = path.join(process.cwd(), "posts");
  const files = fs
    .readdirSync(folder)
    .filter((fileName) => fileName.endsWith(".md"));

  const posts = files
    .map((fileName) => {
      const filePath = path.join(folder, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      const slug = fileName.replace(/\.md$/, "");

      let date = new Date();
      try {
        date = parse(data.date, "dd MMMM yyyy", new Date());
      } catch (error) {
        console.error(`Error parsing date for file ${fileName}:`, error);
      }

      return {
        slug,
        title: data.title,
        summary: data.summary,
        date,
        draft: data.draft || false,
      };
    })
    .filter((post) => !post.draft) // Exclude drafts
    .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date

  return <BlogPageClient posts={posts} maxPosts={MAX_POSTS} />;
}
