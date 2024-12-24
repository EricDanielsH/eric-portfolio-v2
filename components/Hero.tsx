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
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <AuroraBackground className="px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        className="mt-10 relative flex flex-col items-center justify-center px-4"
      >
        <p className="">
          Hey! I&apos;m
        </p>
        <h1 className="text-center tracking-tighter z-10">
          Eric Daniels
        </h1>
        <small className="flex items-center">
          <FaLocationDot className="inline-block mr-1" />
          Lancaster, UK
        </small>
        <Image
          src="/geass.svg"
          width={300}
          height={200}
          alt="Eric Daniels"
          className="absolute opacity-15 z-0 w-full md:w-2/3"
        />
        <p className="py-2 text-center mb-4 z-10">
          Software Engineer dedicated to building practical, high-quality
          solutions and solving real-world problems with code
        </p>
        <Socials />
      </motion.div>
    </AuroraBackground>
  );
}
