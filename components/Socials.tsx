import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaBluesky, FaXTwitter } from "react-icons/fa6";
import { GrDocumentPdf } from "react-icons/gr";
import Link from "next/link";

export default function Socials() {
  return (
    <div className="flex  gap-10 z-10">
      <Link
        className="text-lg md:text-2xl hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="https://www.linkedin.com/in/EricDanielsH/"
        target="_blank"
        title="LinkedIn"
      >
        <FaLinkedin />
      </Link>
      <Link
        className="text-lg md:text-2xl hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="https://www.github.com/ericdanielsh"
        target="_blank"
        title="Github"
      >
        <FaGithub />
      </Link>

      <Link
        className="text-lg md:text-2xl hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="https://x.com/ericdanielsh"
        target="_blank"
        title="X/Twitter"
      >
        <FaXTwitter />
      </Link>

      <Link
        className="text-lg md:text-2xl hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="https://bsky.app/profile/ericdaniels.dev"
        target="_blank"
        title="Bluesky"
      >
        <FaBluesky />
      </Link>

      <Link
        className="text-xl md:text-2xl hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="mailto:eric@ericdaniels.dev"
        target="_blank"
        title="Email"
      >
        <IoIosMail />
      </Link>
      <Link
        className="text-xl md:text-2xl hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="https://drive.google.com/file/d/1aoLGwg-HDeoJy6aeYqvBeq8VaqOMQuIX/view?usp=sharing"
        target="_blank"
        title="Resume"
      >
        <GrDocumentPdf />
      </Link>
    </div>
  );
}
