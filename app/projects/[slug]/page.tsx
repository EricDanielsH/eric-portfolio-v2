import { NextPage } from "next";
import { getProjectBySlug } from "../../../lib/projects";
import { notFound } from "next/navigation";
import React from "react";
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

const PostPage: NextPage<PostPageProps> = ({ params }) => {
  const post = getProjectBySlug(params.slug);
  console.log("hello", params.slug);

  if (!post) {
    notFound(); // Redirect to a 404 page
  }

  return (
    <section className="container min-h-[60vh] px-8 md:px-0  max-w-2xl">
      <h1 className="mt-20  mb-4">{post.title}</h1>
      <p className="  mb-4">{post.description}</p>
      {post.techStack ? (
        <ul className="flex flex-wrap gap-2 mb-6 w-full items-start max-w-full">
          {post.techStack.map((tag, index) => (
            <li
              key={index}
              className="text-xs md:text-sm text-red-500 border rounded-full px-2 border-red-800  tracking-tighter"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <a
        href="/"
        className="hover:text-[#ff1717] font-mono ease-in duration-150"
      >
        <span className="font-serif mr-1 font-extrabold">{">"}</span>
        {`cd ..`}
      </a>

      <hr className="border-[#ff1717] my-8" />

      <article className="prose dark:prose-invert prose-a:text-[#ff1717]   dark:prose-code:bg-[#2F2F2F] prose-code:bg-gray-300 prose-code:px-1 prose-code:py-1 prose-code:rounded-md prose-p:tracking-tight prose-p:leading-[160%] mb-40">
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
