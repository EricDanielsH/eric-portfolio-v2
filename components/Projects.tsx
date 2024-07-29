import { ProjectCard } from "@/components/ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
      className="container min-h-[60vh] px-8 bg-neutral-900 text-white max-w-2xl pt-[10vh] mb-20"
    >
      <h2 className="text-xl md:text-4xl font-semibold text-white mb-8 tracking-tight animate-fade-in-slide-up delay-long">
        Projects
      </h2>
      <div className="flex flex-col gap-8">
        <ProjectCard
          title="LUCribCheck"
          link="https://lucribcheck.com/"
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
          link="https://drive.google.com/file/d/1UC5hHXO_k3-I8PoQ3owwLltYfy8i2MuS/view?usp=share_link"
          description={
            "Keep you and your Buddy healthy. Calorie tracking app that helps users maintain a healthy lifestyle."
          }
          techStack={["React Native", "Firebase"]}
        />

        <ProjectCard
          title="Blockchain"
          link="https://github.com/EricDanielsH/go-blockchain"
          description={
            "A simple blockchain implementation in Go, developed using insights and techniques shared on my blog."
          }
          techStack={["Go", "BoltDB"]}
        />
      </div>
    </section>
  );
}
