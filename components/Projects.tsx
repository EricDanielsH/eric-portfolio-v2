import { ProjectCard } from "@/components/ProjectCard";

export default function Projects() {
  return (
    <section className="container min-h-[60vh] px-8 bg-neutral-900 text-white max-w-2xl mb-20">
      <h2 className="text-2xl md:text-5xl font-semibold text-white mb-8 tracking-tight animate-fade-in-slide-up delay-long">
        Projects
      </h2>
      <div className="flex flex-col gap-8">
        <ProjectCard
          title="LUCribCheck"
          description={
            "Share and discover reviews on homes in Lancaster, UK, helping others make informed decisions about properties and neighborhoods."
          }
          techStack={[
            "Next.js",
            "AWS S3",
            "NextAuth",
            "MongoDB",
            "TailwindCss",
            "Typescript",
          ]}
        />
        <ProjectCard
          title="HealthBuddy"
          description={
            "Keep you and your Buddy healthy. Calorie tracking app that helps users maintain a healthy lifestyle."
          }
          techStack={["React Native", "Firebase"]}
        />

        <ProjectCard
          title="Blockchain"
          description={"A simple blockchain implementation in Go."}
          techStack={["Go", "BoltDB"]}
        />
      </div>
    </section>
  );
}
