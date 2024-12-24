"use client";

import React, { useCallback } from "react";
import { IoMoon as Moon, IoSunny as SunDim } from "react-icons/io5";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

function useTheme() {
  const [theme, setTheme] = React.useState<string | null>(null); // Start with null to avoid flickering

  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);

    // Apply the theme immediately
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(storedTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";

      // Update the theme
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);

      return newTheme;
    });
  }, []);

  return { theme, toggleTheme };
}

export function ThemeSwitcherButton() {
  const { theme, toggleTheme } = useTheme();

  // Prevent rendering until the theme is set
  if (!theme) {
    return null;
  }

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
