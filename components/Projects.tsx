import { ProjectCard } from "@/components/ProjectCard";
import { projectData } from "@/lib/projects";

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
        {projectData.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            link={project.link}
            description={project.description}
            techStack={project.techStack}
          />
        ))}
      </div>
    </section>
  );
}
