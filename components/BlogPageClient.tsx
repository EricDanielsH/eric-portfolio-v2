"use client";

import React from "react";
import { motion } from "framer-motion";
import Pagination from "@/components/Pagination";

interface Post {
  slug: string;
  title: string;
  summary: string;
  date: Date;
}

interface BlogPageClientProps {
  posts: Post[];
  maxPosts: number;
}

export default function BlogPageClient({
  posts,
  maxPosts,
}: BlogPageClientProps) {
  return (
    <motion.section
      className="container min-h-screen flex flex-col justify-center px-8 max-w-2xl pt-[15vh] mb-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h1
        className="tracking-tight mb-4 text-2xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        blog
      </motion.h1>
      <motion.p
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
      >
        Explore a collection of articles, insights, and stories where I share my
        journey, knowledge, and experiences in software engineering.
      </motion.p>
      <a href="/" className="hover:text-[#ff1717] mb-4 font-mono">
        <span className="font-serif mr-1 font-extrabold">{">"}</span>
        {`cd ..`}
      </a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
        className="flex-grow"
      >
        <Pagination items={posts} itemsPerPage={maxPosts} />
      </motion.div>
    </motion.section>
  );
}
