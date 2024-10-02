import { ProjectCard } from "@/components/ProjectCard";

export default function Projects() {
  const projectData = [
    {
      title: "Minecraft Texture Pack",
      link: "https://github.com/EricDanielsH/mc-eric-texture-pack",
      description:
        "A Minecraft texture pack that adds a personal touch to the game, with custom textures and sounds.",
      techStack: [
        "Java",
        "Minecraft",
        "Photoshop",
        "Paint.NET",
      ],
    },
    {
      title: "HybridCoach AI",
      link: "https://hybridcoach-ai.vercel.app",
      description:
        "AI-powered fitness app that generates personalized workout plans based on user's goals, preferences, and fitness level.",
      techStack: [
        "Next.js",
        "Typescript",
        "OpenAI",
        "Stripe",
        "NextAuth",
        "MongoDB",
        "TailwindCss",
      ],
    },
    {
      title: "LUCribCheck",
      link: "https://lucribcheck.com/",
      description:
        "Share and discover reviews on homes in Lancaster, UK, helping others make informed decisions about properties and neighborhoods.",
      techStack: [
        "Next.js",
        "AWS S3",
        "NextAuth",
        "MongoDB",
        "TailwindCss",
        "Typescript",
      ],
    },
    {
      title: "HealthBuddy",
      link: "https://drive.google.com/file/d/1UC5hHXO_k3-I8PoQ3owwLltYfy8i2MuS/view?usp=share_link",
      description:
        "Keep you and your Buddy healthy. Calorie tracking app that helps users maintain a healthy lifestyle.",
      techStack: ["React Native", "Firebase"],
    },
    {
      title: "Blockchain",
      link: "https://github.com/EricDanielsH/go-blockchain",
      description:
        "A simple blockchain implementation in Go, developed using insights and techniques shared on my blog.",
      techStack: ["Go", "BoltDB"],
    },
  ];

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
