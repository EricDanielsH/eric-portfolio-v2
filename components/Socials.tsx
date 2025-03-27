import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaBluesky, FaXTwitter } from "react-icons/fa6";
import { GrDocumentPdf } from "react-icons/gr";
import Link from "next/link";

export default function Socials() {
  return (
    <div className="flex  gap-8 z-10">
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
        className="text-xl md:text-2xl hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="mailto:eric@ericdaniels.dev"
        target="_blank"
        title="Email"
      >
        <IoIosMail />
      </Link>
    </div>
  );
}
