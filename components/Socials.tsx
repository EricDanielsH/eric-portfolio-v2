import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Socials() {
  return (
    <div className="flex  gap-10 z-10">
      <Link
        className="text-lg md:text-2xl text-neutral-100 hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="https://www.linkedin.com/in/EricDanielsH/"
        target="_blank"
      >
        <FaLinkedin />
      </Link>
      <Link
        className="text-lg md:text-2xl text-neutral-100 hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="https://www.github.com/ericdanielsh"
        target="_blank"
      >
        <FaGithub />
      </Link>
      <Link
        className="text-lg md:text-2xl text-neutral-100 hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="https://www.twitter.com/ericdanielsh"
        target="_blank"
      >
        <FaXTwitter />
      </Link>
      <Link
        className="text-xl md:text-2xl text-neutral-100 hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="mailto:eric@ericdaniels.dev"
        target="_blank"
      >
        <IoIosMail />
      </Link>
    </div>
  );
}
