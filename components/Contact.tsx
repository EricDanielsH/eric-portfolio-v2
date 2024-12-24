"use client";

import { Button } from "@/components/ui/moving-border";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="container max-h-[60vh] px-8 max-w-lg pt-[10vh] mb-20 flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }} // Fade in and slide up
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2
        className="text-center mb-4 tracking-tight"
        initial={{ opacity: 0, y: -20 }} // Slight slide down and fade in
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        Get in touch
      </motion.h2>
      <motion.p
        className="text-base md:text-lg text-center mb-14"
        initial={{ opacity: 0, y: 20 }} // Slide up and fade in
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      >
        I’m actively seeking new opportunities. My inbox is always open—whether
        you have a question or just want to say hi, I’ll try my best to get back
        to you!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} // Scale slightly smaller and fade in
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
      >
        <Button containerClassName="hover:text-[#ff1717] transition duration-200">
          <a
            href="mailto:portfolio@ericdaniels.dev"
            className="text-lg md:text-xl font-semibold text-neutral-100 tracking-tighter hover:text-[#ff1717] transition duration-200"
          >
            Say Hi
          </a>
        </Button>
      </motion.div>
    </motion.section>
  );
}
