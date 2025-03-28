"use client";
import Contact from "@/components/Contact";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-[80vh] container  max-w-xl flex flex-col items-center w-full ">
      <Contact />
      <div className="mb-8"></div>
      <motion.a
        initial={{ opacity: 0, y: -20 }} // Slight slide down and fade in
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        href="/"
        className="hover:text-[#ff1717] font-mono container md:px-0 px-8"
      >
        <span className="font-serif mr-1 font-extrabold">{">"}</span>
        {`cd ..`}
      </motion.a>
    </div>
  );
}
