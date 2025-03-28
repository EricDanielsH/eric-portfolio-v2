import { Experience } from "@/lib/schemas";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Badge } from "./ui/Badge";
import Icon from "./Icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  experience: Experience;
}

export default function TimelineItem({ experience }: Props) {
  const { name, href, title, logo, start, end, description, links } =
    experience;

  return (
    <li className="relative flex gap-4 pb-2 ml-10">
      {/* Avatar/Icon */}
      <Link
        href={href}
        target="_blank"
        className="absolute -left-16 top-1 z-10 flex items-center justify-center rounded-full bg-white"
      >
        <Avatar className="size-12 border">
          <AvatarImage
            src={logo}
            alt={name}
            className="bg-background object-contain"
          />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      </Link>

      {/* Timeline Content */}
      <div className="flex flex-col gap-1 w-full">
        {/* Accordion with bullet points */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-description">
            <AccordionTrigger className="text-sm">
              <div className="flex flex-col text-left">
                <span className="font-semibold text-base">{name}</span>
                <span className="text-sm font-normal hidden md:block">
                  <span className="text-gray-900 dark:text-gray-300">
                    {title}
                  </span>{" "}
                  •{" "}
                  <span className="text-gray-500 dark:text-gray-500">
                    {start} – {end ?? "Present"}
                  </span>
                </span>
                <span className="text-sm font-normal md:hidden">
                  <div className="text-gray-900 dark:text-gray-300">
                    {title}
                  </div>{" "}
                  <div className="text-gray-500 dark:text-gray-500">
                    {start} – {end ?? "Present"}
                  </div>
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="ml-4 list-disc text-sm space-y-2">
                {description.map((point, i) => (
                  <li key={i} className="dark:text-gray-300">
                    {point}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Optional external links (badges) */}
        {links?.length > 0 && (
          <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
            {links.map((link, idx) => (
              <Link href={link.href} key={idx}>
                <Badge className="flex gap-2">
                  <Icon name={link.icon} className="size-3" />
                  {link.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
