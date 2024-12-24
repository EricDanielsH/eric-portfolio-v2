"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface PaginationProps {
  items: {
    slug: string;
    title: string;
    summary: string;
    date: Date;
  }[];
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginate = (array: any[], page_size: number, page_number: number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  const currentItems = paginate(items, itemsPerPage, currentPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div>
      <div className="flex flex-col gap-2 mt-10">
        <AnimatePresence mode="wait">
          {currentItems.map((post, index) => (
            <motion.article
              key={post.slug}
              className="mb-4 flex flex-col items-start group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} // Smooth exit animation
              transition={{
                delay: index * 0.1, // Add a slight stagger effect
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <p className="text-neutral-600 text-sm flex-none tracking-tighter">
                {format(post.date, "dd MMMM yyyy")}
              </p>
              <Link href={`/blog/${post.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-[1.602rem] tracking-tight group-hover:text-[#ff1717] transition duration-200">
                    {post.title}
                  </h2>
                  <p className="tracking-tight leading-[130%]">
                    {post.summary}
                  </p>
                </motion.div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="flex justify-between items-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }} // Scale only if clickable
          whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-neutral-800 text-white rounded disabled:opacity-50 tracking-tighter"
        >
          Previous
        </motion.button>
        <motion.span
          className="text-neutral-400 tracking-tighter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Page {currentPage} of {totalPages}
        </motion.span>
        <motion.button
          whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }} // Scale only if clickable
          whileTap={{ scale: currentPage !== totalPages ? 0.95 : 1 }}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-neutral-800 text-white rounded disabled:opacity-50 tracking-tighter"
        >
          Next
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Pagination;
