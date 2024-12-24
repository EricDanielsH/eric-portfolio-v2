import { Metadata, NextPage } from "next";
import { getPostBySlug, getAllSlugs, Post } from "../../../lib/posts";
import { notFound } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface PostPageProps {
  params: {
    slug: string;
  };
}

interface CodeBlockProps {
  className?: string; // Optional className, since it might not always be present
  children: string; // The actual code content
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
  let lang = "text"; // Default monospaced text
  if (className && className.startsWith("lang-")) {
    lang = className.replace("lang-", "");
  }

  return (
    <SyntaxHighlighter language={lang} style={materialDark}>
      {children}
    </SyntaxHighlighter>
  );
};

// Props for PreBlock
interface PreBlockProps {
  children: React.ReactNode;
  [key: string]: any; // Allow any additional props
}

// markdown-to-jsx uses <pre><code/></pre> for code blocks
const PreBlock: React.FC<PreBlockProps> = ({ children, ...rest }) => {
  // Check if the children are a <code> element
  if (
    React.isValidElement(children) &&
    children.type === "code" &&
    children.props
  ) {
    return <CodeBlock {...children.props} />;
  }

  // Fallback to regular <pre> if not a <code> block
  return <pre {...rest}>{children}</pre>;
};

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
    notFound();
  }

  return {
    title: post.title,
    description: post.content.slice(0, 150),
  };
}

const PostPage: NextPage<PostPageProps> = ({ params }) => {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound(); // Redirect to a 404 page
  }

  return (
    <section className="container min-h-[60vh] px-8 md:px-0  max-w-2xl">
      <h1 className="mt-20  mb-4">
        {post.title}
      </h1>
      <p className="  mb-4">{post.summary}</p>
      <div className="flex justify-between  tracking-tighter">
        <p className=" tracking-tight">
          Created on <br />
          {format(new Date(post.date), "dd MMMM yyyy")}
        </p>
        <p className=" tracking-tight">
          Updated on <br /> {format(new Date(post.lastmod), "dd MMMM yyyy")}
        </p>
      </div>

      {post.tags ? (
        <div className="flex gap-2 my-4  tracking-tighter">
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

      <a
        href="/blog"
        className="hover:text-[#ff1717] underline ease-in duration-150"
      >
        Back to blog
      </a>

      <hr className="border-[#ff1717] my-8" />

      <article className="prose prose-neutral  prose-a:text-[#ff1717]   dark:prose-code:bg-[#2F2F2F] prose-code:bg-gray-300 prose-code:px-1 prose-code:py-1 prose-code:rounded-md prose-p:tracking-tight prose-p:leading-[160%] mb-40">
        <Markdown
          options={{
            overrides: {
              pre: PreBlock,
            },
          }}
        >
          {post.content}
        </Markdown>
      </article>
    </section>
  );
};

export default PostPage;
