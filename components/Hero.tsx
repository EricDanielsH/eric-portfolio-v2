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
        <div className="font-extralight text-xs md:text-lg text-neutral-200">
          Hey! I&apos;m
        </div>

        <h1 className="text-4xl md:text-7xl font-black text-center text-white tracking-tighter z-10">
          Eric Daniels
        </h1>
        <div className="text-sm text-neutral-500 flex items-center">
          <FaLocationDot className="inline-block mr-1" />
          Lancaster, UK
        </div>
        <Image
          src="/geass.svg"
          width={300}
          height={200}
          alt="Eric Daniels"
          className="absolute opacity-15 z-0 w-full md:w-2/3"
        />
        <div className="font-extralight text-small md:text-1xl text-neutral-400 py-2 text-center leading-[140%] tracking-tight mb-4">
          Software Engineer dedicated to building practical, high-quality
          solutions and solving real-world problems with code
        </div>
        <Socials />
      </motion.div>
    </AuroraBackground>
  );
}
