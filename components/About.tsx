"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className="container px-8 md:px-0 max-w-2xl pt-[15vh]" // Add more padding to account for the navbar height
      initial={{ opacity: 0, y: 30 }} // Adjust y to a smaller offset
      animate={{ opacity: 1, y: 0 }} // Final position
      transition={{ duration: 0.5, ease: "easeOut" }} // Max duration of 0.5s
    >
      <motion.h2
        className="mb-4 tracking-tight"
        initial={{ opacity: 0, y: -10 }} // Smaller upward offset
        animate={{ opacity: 1, y: 0 }} // Final position
        transition={{ delay: 0.1, duration: 0.4 }} // Delay for stagger effect
      >
        About Me
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }} // Smaller downward offset
        animate={{ opacity: 1, y: 0 }} // Final position
        transition={{ delay: 0.2, duration: 0.4 }} // Delay for stagger effect
      >
        I’m a software developer with a focus on delivering practical software
        solutions. I enjoy tackling new challenges, especially in areas like
        fullstack developmnet, cybersecurity, and blockchain, and I’m always
        eager to share knowledge and collaborate with others in the tech
        community.
      </motion.p>
    </motion.section>
  );
}
