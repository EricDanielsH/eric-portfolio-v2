import { Experience } from "@/lib/schemas";
import TimelineItem from "./TimelineItem";
import { Card, CardContent } from "./ui/Card";

interface Props {
  experience: Experience[];
}

export default function Timeline({ experience }: Props) {
  return (
    <ul className="ml-0 border-l w-full max-w-xl flex flex-col gap-4">
      {experience.map((exp, id) => (
        <TimelineItem key={id} experience={exp} />
      ))}
    </ul>
  );
}
