import { Metadata, NextPage } from "next";
import { getPostBySlug, getAllSlugs, Post } from "../../../lib/posts";
import { notFound } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.content.slice(0, 150),
  };
}

const PostPage: NextPage<PostPageProps> = ({ params }) => {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="container min-h-[60vh] px-8 bg-neutral-900 text-white max-w-2xl">
      <h1 className="text-5xl font-semibold text-neutral-100 mt-10 tracking-tight mb-4">
        {post.title}
      </h1>
      <p className="text-neutral-400 tracking-tight mb-4">{post.summary}</p>
      <div className="flex justify-between">
        <p className="text-neutral-500 tracking-tight">
          Created on {format(new Date(post.date), "dd MMMM yyyy")}
        </p>
        <p className="text-neutral-500 tracking-tight">
          Updated on {format(new Date(post.lastmod), "dd MMMM yyyy")}
        </p>
      </div>

      {post.tags ? (
        <div className="flex gap-2 my-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <hr className="border-[#ff1717] my-8" />

      <article className="prose xl:prose-lg prose-invert prose-neutral text-neutral-300 prose-a:text-[#ff1717]  prose-code:text-neutral-100">
        <Markdown>{post.content}</Markdown>
      </article>
      <div></div>
    </section>
  );
};

export default PostPage;
