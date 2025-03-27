"use client";
import { FaLongArrowAltRight } from "react-icons/fa";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { projectData } from "@/lib/data";
import Link from "next/link";

interface Props {
  limit?: number;
}

export default function Projects({ limit }: Props) {
  let projects = projectData
  if (limit) {
    projects = projectData.slice(0, limit);
  }
  return (
    <motion.section
      id="projects"
      className="container md:px-0 px-8 max-w-xl pt-[10vh]" // Increased padding for navbar
      initial={{ opacity: 0, y: 30 }} // Adjusted y offset
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }} // Smaller y offset
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex justify-between mb-4 items-center"
      >
        <h2 className="tracking-tight font-bold text-xl">Projects</h2>
        <Link
          href="/projects"
          className="flex gap-1 items-center text-gray-400 dark:text-gray-600 underline hover:text-[#ff1717] cursor-pointer transition duration-300 text-sm"
        >
          See more! <FaLongArrowAltRight />
        </Link>
      </motion.div>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, id) => (
          <ProjectCard key={id} project={project} />
        ))}
      </section>
    </motion.section>
  );
}
