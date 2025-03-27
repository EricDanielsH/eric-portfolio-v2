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

const experienceData = [
  {
    jobTitle: "Software Engineer",
    company: "TechCorp",
    dates: "Jan 2022 – Present",
    points: [
      "Developed and maintained scalable web applications using React and Node.js",
      "Improved performance of internal APIs by 35%",
      "Led a team of 3 engineers in Agile sprints",
    ],
  },
  {
    jobTitle: "Frontend Developer",
    company: "Designify",
    dates: "May 2020 – Dec 2021",
    points: [
      "Redesigned core product UI, increasing user engagement by 50%",
      "Collaborated with UX team to implement A/B tests",
    ],
  },
];

export default function Experience() {
  return (
    <motion.section
      className="container md:px-0 flex flex-col justify-center items-start px-8 max-w-xl w-full pt-[10vh]" // Increased padding for navbar
      initial={{ opacity: 0, y: 30 }} // Adjusted y offset
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2
        className="mb-4 tracking-tight font-bold text-2xl"
        initial={{ opacity: 0, y: -10 }} // Smaller y offset
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        experience
      </motion.h2>

      <div>
        <Timeline experience={experience} />
      </div>
    </motion.section>
  );
}
