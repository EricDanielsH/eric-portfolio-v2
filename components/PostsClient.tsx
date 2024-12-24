"use client";

import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { motion } from "framer-motion";

interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string;
}

interface PostsClientProps {
  posts: Post[];
}

export default function PostsClient({ posts }: PostsClientProps) {
  return (
    <motion.section
      className="pt-[10vh] container min-h-[60vh] px-8 md:px-0 max-w-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link
        href="/blog"
        className="w-fit hover:text-[#ff1717] transition duration-300 flex justify-center items-center"
      >
        <motion.h2
          className="mt-10 tracking-tight animate-fade-in-slide-up delay-long mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Blog
        </motion.h2>
      </Link>
      <motion.p
        className="tracking-tight mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        Explore a collection of articles, insights, and stories where I share my
        journey, knowledge, and experiences in software engineering.
        <br />
        <br /> Some of my latest posts:
      </motion.p>
      <div className="flex flex-col gap-2 mb-4">
        {posts.map((post, index) => (
          <motion.article
            key={index}
            className="mb-4 flex flex-col items-start group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1, // Stagger effect
              duration: 0.5,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-400 dark:text-gray-500 flex-none tracking-tighter">
              {format(new Date(post.date), "dd MMMM yyyy")}
            </p>
            <Link href={`/blog/${post.slug}`}>
              <motion.div
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="tracking-tight cursor-pointer group-hover:text-[#ff1717] transition duration-200 mb-1">
                  {post.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 tracking-tight leading-[130%]">
                  {post.summary}
                </p>
              </motion.div>
            </Link>
          </motion.article>
        ))}
      </div>
      <Link href="/blog" className="w-fit">
        <motion.div
          className="text-[#ff1717] cursor-pointer text-center underline font-bold tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          View all posts
        </motion.div>
      </Link>
    </motion.section>
  );
}
