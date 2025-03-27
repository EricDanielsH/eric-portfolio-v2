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
      className="container md:px-0 px-8 max-w-xl" // Increased padding for navbar
      initial={{ opacity: 0, y: 30 }} // Adjusted y offset
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, id) => (
          <ProjectCard key={id} project={project} />
        ))}
      </section>
    </motion.section>
  );
}
