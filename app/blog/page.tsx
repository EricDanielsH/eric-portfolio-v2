import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format, parse } from "date-fns";
import React from "react";
import Link from "next/link";

export default function Projects() {
  const folder = "./posts/";
  const files = fs.readdirSync(folder);

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

  return (
    <section className="container min-h-[60vh] px-8 bg-neutral-950 text-white max-w-2xl">
      <h1 className="text-5xl font-semibold text-neutral-100 mt-10 tracking-tight animate-fade-in-slide-up delay-long mb-4">
        Posts
      </h1>
      <p className="text-neutral-400 tracking-tight mb-10">
        Explore a collection of articles, insights, and stories where I share my
        journey, knowledge, and experiences in software engineering.
      </p>
      <div className="flex flex-col gap-2">
        {sortedPosts.map(
          (post, index) =>
            !post.draft && (
              <article key={index} className=" mb-4 flex gap-8 items-start">
                <p className="text-neutral-600 text-sm flex-none">
                  {format(post.date, "dd MMMM yyyy")}
                </p>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-bold text-[#cc0000]">
                    {post.title}
                  </h2>
                  <p className="text-neutral-500 text-base">{post.summary}</p>
                </Link>
              </article>
            ),
        )}
      </div>
    </section>
  );
}