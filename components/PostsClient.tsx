"use client";

import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { motion } from "framer-motion";
import { RxOpenInNewWindow } from "react-icons/rx";
import { FaLongArrowAltRight } from "react-icons/fa";

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
      className="pt-[10vh] container px-8 md:px-0 max-w-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center mb-4">
        <Link
          href="/blog"
          className="w-fit hover:text-[#ff1717] transition duration-300 flex justify-center items-center"
        >
          <motion.h2
            className="tracking-tight text-2xl animate-fade-in-slide-up delay-long font-semibold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            blog 🧑🏻‍💻
          </motion.h2>
          <RxOpenInNewWindow className="mb-4" />
        </Link>
        <Link
          href="/blog"
          className="flex gap-1 items-center text-gray-500 dark:text-gray-400 underline hover:text-[#ff1717] dark:hover:text-[#ff1717] cursor-pointer transition duration-300 text-sm"
        >
          See more!
          <FaLongArrowAltRight />
        </Link>
      </div>

      <motion.p
        className="tracking-tight mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        Explore a collection of articles, insights, and stories where I share my
        journey, knowledge, and experiences in software engineering.
        <br />
        <br /> Some of my latest posts:
      </motion.p>
      <div className="flex flex-col gap-4">
        {posts.map((post, index) => (
          <motion.article
            key={index}
            className=" flex flex-col items-start group"
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
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-base tracking-tight cursor-pointer group-hover:text-[#ff1717] transition duration-200">
                  {post.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 tracking-tight leading-[130%]">
                  {post.summary}
                </p>
              </motion.div>
            </Link>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
