import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format, parse } from "date-fns";
import React from "react";
import Link from "next/link";
import { RxOpenInNewWindow } from "react-icons/rx";

export default function Projects() {
  const MAX_POSTS = 5;
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

  const latestPosts = sortedPosts.slice(0, MAX_POSTS);

  return (
    <section className="pt-[10vh] container min-h-[60vh] px-8 bg-neutral-900 text-white max-w-2xl mb-10">
      <Link
        href="/blog"
        className="w-fit hover:text-[#ff1717] transition duration-300 flex justify-center items-center"
      >
        <h1 className="text-xl md:text-4xl font-semibold text-neutral-100 mt-10 tracking-tight animate-fade-in-slide-up delay-long mb-4">
          Posts
        </h1>
        <RxOpenInNewWindow />
      </Link>
      <p className="text-neutral-400 tracking-tight mb-10">
        Explore a collection of articles, insights, and stories where I share my
        journey, knowledge, and experiences in software engineering.
        <br />
        <br /> Some of my latest posts:
      </p>
      <div className="flex flex-col gap-2 mb-4">
        {latestPosts.map(
          (post, index) =>
            !post.draft && (
              <article
                key={index}
                className="mb-4 flex flex-col items-start group"
              >
                <p className="text-neutral-600 text-sm flex-none font-mono tracking-tighter">
                  {format(post.date, "dd MMMM yyyy")}
                </p>
                <Link href={`/blog/${post.slug}`}>
                  <div>
                    <h2 className="text-lg md:text-2xl font-bold text-neutral-200 tracking-tight group-hover:text-[#ff1717] transition duration-200">
                      {post.title}
                    </h2>
                    <p className="text-neutral-500 text-base tracking-tight leading-[130%]">
                      {post.summary}
                    </p>
                  </div>
                </Link>
              </article>
            ),
        )}
      </div>
      <Link href="/blog" className="w-fit">
        <div className="text-[#ff1717] cursor-pointer text-center underline font-bold font-mono tracking-tighter">
          View all posts
        </div>
      </Link>
    </section>
  );
}
