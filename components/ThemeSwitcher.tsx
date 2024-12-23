"use client";

import React, { useCallback } from "react";
import { IoMoon as Moon, IoSunny as SunDim } from "react-icons/io5";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

function useTheme() {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  React.useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

export function ThemeSwitcherButton() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    flushSync(() => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    });
  }, [setTheme]);

  return (
    <button
      className="p-2 rounded-md transition duration-300 relative cursor-pointer"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.1 }}
            className="hover:text-[#ff1717] transition-colors duration-200"
          >
            <Moon size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ scale: 0 }}
            animate={{ scale: 1.2 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.1 }}
            className="hover:text-[#ff1717] transition-colors duration-200"
          >
            <SunDim size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
