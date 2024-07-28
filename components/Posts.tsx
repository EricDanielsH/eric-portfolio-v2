import fs from "fs";

export default function Projects() {
  return (
    <section className="container min-h-[60vh] px-8 bg-neutral-900 text-white max-w-2xl">
      <h2 className="text-2xl md:text-5xl font-semibold text-white mb-8 tracking-tight animate-fade-in-slide-up delay-long">
        Posts
      </h2>
      <p>
        Explore a collection of articles, insights, and stories where I share my
        journey, knowledge, and experiences in software engineering. From
        in-depth tutorials and tech trends to personal reflections and project
        highlights, this blog is designed to inspire and inform. Join me in
        discovering the fascinating world of coding, development, and beyond.
      </p>
      <div className="flex flex-col gap-8"></div>
    </section>
  );
}
