"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoMoon as Moon, IoSunny as SunDim } from "react-icons/io5";

function useTheme() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);

    // Apply the theme immediately
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(storedTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";

      // Update the DOM and localStorage
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

  if (!theme) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md transition duration-300 relative cursor-pointer"
    >
      {theme === "dark" ? <Moon size={20} /> : <SunDim size={20} />}
    </button>
  );
}
