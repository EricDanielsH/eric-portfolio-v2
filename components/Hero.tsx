"use client";

import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Image from "next/image";
import Socials from "@/components/Socials";
import { FaLocationDot } from "react-icons/fa6";

export function AuroraBackgroundDemo() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1, // Reduced delay
        duration: 0.5, // Maximum 0.5s duration
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <AuroraBackground className="px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        className="mt-10 max-w-xl relative flex flex-col items-center justify-center px-4"
      >
        <p className="">Hey! I&apos;m</p>
        <h1 className="text-center tracking-tighter z-10">Eric Daniels</h1>
        <small className="flex items-center">
          <FaLocationDot className="inline-block mr-1" />
          Lancaster, UK
        </small>
        <p className="py-2 text-center mb-4 z-10 font-normal">
          Software Engineer dedicated to building practical, high-quality
          solutions and solving real-world problems with code
        </p>
        <Socials />
      </motion.div>
    </AuroraBackground>
  );
}
