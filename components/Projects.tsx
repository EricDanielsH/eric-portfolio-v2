import { ProjectCard } from "@/components/ProjectCard";
import { projectData } from "@/lib/data";

export default function Projects() {
  const gridConfig = [
    { colStart: 1, colEnd: 4, rowStart: 1, rowEnd: 3 }, // First card spans 3 cols, 3 rows
    { colStart: 4, colEnd: 7, rowStart: 1, rowEnd: 3 }, // Second card spans 3 cols, 3 rows
    { colStart: 1, colEnd: 5, rowStart: 3, rowEnd: 5 }, // Third card spans 4 cols, 2 rows
    { colStart: 5, colEnd: 7, rowStart: 3, rowEnd: 5 }, // Fourth card spans 2 cols, 2 rows
    { colStart: 1, colEnd: 3, rowStart: 5, rowEnd: 7 }, // Fifth card spans 6 cols, 2 rows
    { colStart: 3, colEnd: 7, rowStart: 5, rowEnd: 7 }, // Sixth card spans 6 cols, 2 rows
  ];

  return (
    <section
      id="projects"
      className="container min-h-[60vh] md:px-0 px-8  max-w-2xl pt-[10vh]"
    >
      <h2 className="mb-8 tracking-tight  font-bold">Projects</h2>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-6 md:auto-rows-[10rem]">
        {projectData.map((project, index) => {
          const config = gridConfig[index] || {
            colStart: 1,
            colEnd: 2,
            rowStart: 1,
            rowEnd: 2,
          }; // Default config

          return (
            <div
              key={index}
              style={{
                gridColumn: `${config.colStart} / ${config.colEnd}`,
                gridRow: `${config.rowStart} / ${config.rowEnd}`,
              }}
              className="rounded-2xl bg-gray-500 shadow-md flex items-center justify-center"
            >
              <ProjectCard
                title={project.title}
                link={project.link}
                description={project.description}
                techStack={project.techStack}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
