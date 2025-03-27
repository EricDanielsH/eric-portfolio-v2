"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { projectData } from "@/lib/data";

export default function Projects() {
  const gridConfig = [
    { colStart: 1, colEnd: 7, rowStart: 1, rowEnd: 5 },
    { colStart: 7, colEnd: 11, rowStart: 1, rowEnd: 5 },
    { colStart: 1, colEnd: 6, rowStart: 5, rowEnd: 9 },
    { colStart: 6, colEnd: 11, rowStart: 5, rowEnd: 8 },
    { colStart: 1, colEnd: 6, rowStart: 9, rowEnd: 12 },
    { colStart: 6, colEnd: 11, rowStart: 8, rowEnd: 12 },
  ];

  return (
    <motion.section
      id="projects"
      className="container md:px-0 px-8 max-w-xl pt-[10vh]" // Increased padding for navbar
      initial={{ opacity: 0, y: 30 }} // Adjusted y offset
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2
        className="mb-8 tracking-tight font-bold"
        initial={{ opacity: 0, y: -10 }} // Smaller y offset
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Projects
      </motion.h2>
      <div className="flex flex-col h-full gap-4 md:grid md:grid-cols-10 md:auto-rows-[5rem]">
        {projectData.map((project, index) => {
          const config = gridConfig[index] || {
            colStart: 1,
            colEnd: 2,
            rowStart: 1,
            rowEnd: 2,
          };

          return (
            <motion.div
              key={index}
              style={{
                gridColumn: `${config.colStart} / ${config.colEnd}`,
                gridRow: `${config.rowStart} / ${config.rowEnd}`,
              }}
              className="rounded-2xl bg-gray-500 shadow-md flex items-center justify-center h-full"
              initial={{ opacity: 0, y: 10 }} // Smaller downward animation
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <ProjectCard
                title={project.title}
                link={project.link}
                description={project.description}
                techStack={project.techStack}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
