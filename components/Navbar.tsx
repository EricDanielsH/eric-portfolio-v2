"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcherButton } from "./ThemeSwitcher";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const links = [
    { name: "projects", href: "/#projects" },
    { name: "blog", href: "/blog" },
    { name: "contact", href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Adjust the scroll threshold if needed
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed h-[8vh] flex items-center justify-center w-full z-30 transition-colors duration-100 bg-transparent`}
    >
      <div className="px-6 md:px-14 backdrop-blur w-full h-full flex items-center justify-center">
        <div className="px-6 md:px-14  w-full max-w-3xl h-full flex items-center justify-between">
          <Link href="/" className="flex items-end">
            <Image
              src="/meow.gif"
              alt="Cat gif"
              width={16}
              height={16}
              className="w-8 h-8"
            />
          </Link>

          <ul
            className={`flex items-center justify-center gap-4 transition-transform  duration-300 ease-in-out z-40`}
          >
            {links.map((link, index) => (
              <li
                key={index}
                className="my-2 md:my-0 cursor-pointer hover:text-[#ff1717] transition duration-300 font-normal text-gray-700 dark:text-gray-100"
              >
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
            {/* button for dark mode on medium and bigger devices */}
            <ThemeSwitcherButton />
          </ul>
        </div>
      </div>
    </nav>
  );
}
