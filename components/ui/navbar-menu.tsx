"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const FloatingNavbar = ({
  navItems,
}: {
  navItems: { name: string; link: string; icon?: JSX.Element }[];
}) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4"
        >
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className="relative flex items-center space-x-1 text-neutral-600 dark:text-neutral-50 hover:text-neutral-500 dark:hover:text-neutral-300"
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          ))}
          <button className="border text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
            <span>Login</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
