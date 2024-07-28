// components/Pagination.tsx
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

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
      <div className="flex flex-col gap-2">
        {currentItems.map((post, index) => (
          <article key={index} className="mb-4 flex flex-col items-start">
            <p className="text-neutral-600 text-sm flex-none">
              {format(post.date, "dd MMMM yyyy")}
            </p>
            <Link href={`/blog/${post.slug}`}>
              <div>
                <h2 className="text-xl font-bold text-[#ff1717] tracking-tight">{post.title}</h2>
                <p className="text-neutral-500 text-base tracking-tight leading-[140%]">{post.summary}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <div className="flex justify-between mt-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-neutral-800 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-neutral-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-neutral-800 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
