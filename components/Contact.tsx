"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="container px-8 md:px-0 max-w-xl pt-[10vh] flex flex-col items-start"
      initial={{ opacity: 0, y: 50 }} // Fade in and slide up
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2
        className="text-left mb-4 tracking-tight text-2xl"
        initial={{ opacity: 0, y: -20 }} // Slight slide down and fade in
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        contact me
      </motion.h2>
      <motion.p
        className="text-base text-left mb-8"
        initial={{ opacity: 0, y: 20 }} // Slide up and fade in
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      >
        I’m actively seeking new opportunities.<br/> My inbox is always open—whether
        you have a question or just want to say hi, I’ll try my best to get back
        to you!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} // Scale slightly smaller and fade in
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
      >
        <Button
          variant="outline"
          className="hover:text-[#ff1717] transition duration-200 border-gray-400 dark:border-gray-700"
        >
          <a href="mailto:portfolio@ericdaniels.dev" className="">
            Send email
          </a>
        </Button>
      </motion.div>
    </motion.section>
  );
}
