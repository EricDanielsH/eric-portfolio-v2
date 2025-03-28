import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import Link from "next/link";

export default function Socials() {
  return (
    <div className="flex  gap-8 z-10">
      <Link
        className="text-xl hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="https://www.linkedin.com/in/EricDanielsH/"
        target="_blank"
        title="LinkedIn"
      >
        <FiLinkedin />
      </Link>
      <Link
        className="text-xl hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="https://www.github.com/ericdanielsh"
        target="_blank"
        title="Github"
      >
        <FiGithub />
      </Link>

      <Link
        className="text-xl hover:text-primary-500 hover:text-[#ff1717] transition duration-200"
        href="mailto:portfolio@ericdaniels.dev"
        target="_blank"
        title="Email"
      >
        <FiMail />
      </Link>
    </div>
  );
}
