"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="mt-20 h-[20vh] w-full rounded-md bg-black relative flex flex-col items-center justify-center antialiased overflow-hidden">
      <div className="max-w-2xl mx-auto p-4 flex flex-col justify-center items-center relative">
        <h3 className="relative text-lg md:text-2xl font-black text-center text-neutral-200 tracking-tighter z-10">
          Eric Daniels
        </h3>
        <div className="absolute w-full inset-0 flex items-center justify-center z-0">
          <Image
            src="/geass.svg"
            width={400}
            height={400}
            alt="Eric Daniels"
            className="opacity-30 w-[60%] md:w-[90%]" 
            style={{ objectFit: "contain" }}
          />
        </div>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          &copy; {new Date().getFullYear()} Eric Daniels. All rights reserved.
        </p>
      </div>
      <BackgroundBeams />
    </div>
  );
}