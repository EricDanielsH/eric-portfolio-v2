import { AuroraBackgroundDemo as Hero } from "@/components/Hero";
import Projects from "@/components/Projects";
import Posts from "@/components/Posts";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { RxOpenInNewWindow } from "react-icons/rx";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Experience />
      <div className="container md:px-0 flex justify-between items-center px-8 max-w-xl w-full pt-[10vh] mb-4">
        <Link
          href="/projects"
          className="w-fit hover:text-[#ff1717] transition duration-300 flex justify-center items-center"
        >
          <h2 className="tracking-tight font-bold text-2xl">projects</h2>
          <RxOpenInNewWindow className="mb-4" />
        </Link>

        <Link
          href="/projects"
          className="flex gap-1 items-center text-gray-500 dark:text-gray-400 underline hover:text-[#ff1717] dark:hover:text-[#ff1717] cursor-pointer transition duration-300 text-sm"
        >
          See more!
          <FaLongArrowAltRight />
        </Link>
      </div>

      <Projects limit={2} />
      <Posts />
      <Contact />
      <div className="mb-20"></div>
    </div>
  );
}
