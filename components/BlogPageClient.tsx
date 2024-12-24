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
      className="container min-h-[60vh] px-8 max-w-2xl mt-20 mb-40"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h1
        className="mt-10 tracking-tight animate-fade-in-slide-up delay-long mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Blog
      </motion.h1>
      <motion.p
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Explore a collection of articles, insights, and stories where I share my
        journey, knowledge, and experiences in software engineering.
      </motion.p>
      <motion.a
        href="/"
        className="hover:text-[#ff1717] mb-8 font-mono ease-in duration-150"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-serif mr-1 font-extrabold">{">"}</span>
        {`cd ..`}
      </motion.a>

      <Pagination items={posts} itemsPerPage={maxPosts} />
    </motion.section>
  );
}
