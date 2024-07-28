"use client";
import { motion } from "framer-motion";
import { HeroHighlight } from "./ui/hero-highlight";

// Animation variant for fading in and moving up
const fadeInUp = {
  initial: { opacity: 0, y: 30 }, // Start 30px above
  animate: { opacity: 1, y: 0 }, // Move to original position
};

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  techStack,
}) => {
  return (
    <HeroHighlight>
      <article className="p-6 md:p-8 flex flex-col justify-start">
        <motion.h3
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-lg md:text-xl font-bold text-base-200 leading-relaxed text-left w-full mb-4 tracking-tight"
        >
          {title}
        </motion.h3>
        <motion.p
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.9, delay: 0.7, ease: [0.6, 0.0, 0.2, 1] }}
          className="text-neutral-500 text-sm md:text-md text-left w-full mb-4 leading-[140%] flex-grow"
        >
          {description}
        </motion.p>
        <motion.ul
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 1, delay: 0.8, ease: [0.6, 0.0, 0.2, 1] }}
          className="flex flex-wrap gap-2 max-w-full"
        >
          {techStack.map((t, index) => (
            <li
              key={index}
              className="text-xs md:text-sm text-red-500 border rounded-full px-2 border-red-800"
            >
              {t}
            </li>
          ))}
        </motion.ul>
      </article>
    </HeroHighlight>
  );
};
