"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Timeline from "@/components/Timeline";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <motion.section
      className="container md:px-0 flex flex-col justify-center items-start px-8 max-w-xl w-full pt-[10vh]" // Increased padding for navbar
      initial={{ opacity: 0, y: 30 }} // Adjusted y offset
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2
        className="mb-4 tracking-tight font-semibold text-2xl"
        initial={{ opacity: 0, y: -10 }} // Smaller y offset
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        experience ✨
      </motion.h2>

      <div className="w-full max-w-xl">
        <Timeline experience={experience} />
      </div>
    </motion.section>
  );
}
