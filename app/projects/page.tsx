import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="container md:px-0 px-8 max-w-xl w-full pt-[10vh]">
      <h1 className="tracking-tight mb-4 font-bold text-3xl"> projects</h1>
      <Projects />
    </div>
  );
}
