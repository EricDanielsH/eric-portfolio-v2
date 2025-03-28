import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="container mb-20 md:px-0 px-8 max-w-xl w-full pt-[10vh]">
      <div className="flex flex-col mb-4">
        <h1 className="tracking-tight font-bold text-2xl mb-4"> projects</h1>
        <p className="mb-4">
          Dive into a curated collection of projects where I bring ideas to life
          through code. Here, I showcase the tools, technologies, and creative
          problem-solving that define my journey as a software engineer.
        </p>
        <a href="/" className="hover:text-[#ff1717] mb-4 font-mono">
          <span className="font-serif mr-1 font-extrabold">{">"}</span>
          {`cd ..`}
        </a>
      </div>

      <Projects />
    </div>
  );
}
