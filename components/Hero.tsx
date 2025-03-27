"use client";

import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Image from "next/image";
import Socials from "@/components/Socials";
import { FaLocationDot } from "react-icons/fa6";
import { LuFileDown } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        className="max-w-xl mt-[15vh] relative flex flex-col items-start justify-center px-4"
      >
        <div className="flex items-center gap-4">
          <Image
            src="/eric.png"
            width={80}
            height={100}
            alt="eric daniels"
            className="rounded-full border-gray-300 dark:border-gray-700 border-2"
          />
          <div className="flex flex-col">
            <h1 className="z-10 font-semibold text-xl md:text-3xl">Hey, I&apos;m Eric 👋🏼</h1>
            <small className="flex items-center">
              <FaLocationDot className="inline-block mr-1" />
              Lancaster, UK
            </small>
          </div>
        </div>
        <p className="py-2 text-left mb-4 z-10 font-normal">
          Software Engineer dedicated to building practical, high-quality
          solutions and solving real-world problems with code
        </p>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Link
              href="https://drive.google.com/file/d/1aoLGwg-HDeoJy6aeYqvBeq8VaqOMQuIX/view?usp=sharing"
              target="_blank"
              title="Resume"
              className="flex gap-2 items-center"
            >
              Resume <LuFileDown size={50} />
            </Link>
          </Button>
          <Socials />
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
