import { AuroraBackgroundDemo as Hero } from "@/components/Hero";
import Projects from "@/components/Projects";
import Posts from "@/components/Posts";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="min-h-screen w-full  max-w-xl flex flex-col  items-center">
        <Experience />
        <div className="px-8  md:px-0 flex w-full justify-between items-center max-w-xl pt-[10vh] mb-4">
          <h2 className="tracking-tight font-bold text-2xl">projects</h2>
          <Link
            href="/projects"
            className="flex gap-1 items-center text-gray-400 dark:text-gray-600 underline hover:text-[#ff1717] cursor-pointer transition duration-300 text-sm"
          >
            See more!
            <FaLongArrowAltRight />
          </Link>
        </div>

        <Projects limit={2} />
        <Posts />
        <Contact />
      </div>
    </div>
  );
}
