import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parse } from "date-fns";
import React from "react";
import Pagination from "@/components/Pagination";

export default function Projects() {
  const folder = "./posts/";
  const files = fs.readdirSync(folder);
  const MAX_POSTS = 5;

  const posts = files.map((fileName) => {
    const filePath = path.join(folder, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    const slug = fileName.replace(/\.md$/, "");

    // Parse the date from "05 June 2023" to a Date object
    let date;
    try {
      date = parse(data.date, "dd MMMM yyyy", new Date());
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
    } catch (error) {
      console.error(`Error parsing date for file ${fileName}:`, error);
      date = new Date(); // Fallback to current date or handle as needed
    }

    return {
      slug,
      title: data.title,
      summary: data.summary,
      date, // Store the Date object
      draft: data.draft,
    };
  });

  // Sort posts by date in descending order (most recent first)
  const sortedPosts = posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Filter out drafts
  const publishedPosts = sortedPosts.filter((post) => !post.draft);

  return (
    <section className="container min-h-[60vh] px-8 bg-neutral-900 text-white max-w-2xl">
      <h1 className="text-5xl font-semibold text-neutral-100 mt-10 tracking-tight animate-fade-in-slide-up delay-long mb-4">
        Posts
      </h1>
      <p className="text-neutral-400 tracking-tight mb-10">
        Explore a collection of articles, insights, and stories where I share my
        journey, knowledge, and experiences in software engineering.
      </p>
      <Pagination items={publishedPosts} itemsPerPage={MAX_POSTS} />
    </section>
  );
}
