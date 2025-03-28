import React from "react";
import { getAllSlugs, getPostBySlug, Post } from "@/lib/posts";
import PostsClient from "./PostsClient"; // Import the client component

const MAX_POSTS = 3;

export default function Posts() {
  // Fetch all slugs
  const slugs = getAllSlugs();

  // Fetch all posts
  const posts: (Post & { slug: string })[] = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      return post ? { ...post, slug } : null; // Include slug with post data
    })
    .filter((post): post is Post & { slug: string } => post !== null); // Type guard to filter out null values

  // Sort posts by date in descending order
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  // Get the latest posts
  const latestPosts = sortedPosts.slice(0, MAX_POSTS);

  return <PostsClient posts={latestPosts} />;
}
