// export const projectData = [
//   {
//     name: "SmartLab System",
//     link: "https://github.com/EricDanielsH/mc-eric-texture-pack",
//     description:
//       "System build for measuring and monitoring temperature, light sound and other environmental factors in a lab, using Raspberry Pi Pico Ws. Can detect the location of any person of the lab based on the intensity of the network signal.",
//     techStack: [
//       "C",
//       "C++",
//       "Kotlin",
//       "React",
//       "Typescript",
//       "PlatfromIO",
//       "Raspberry Pi",
//       "PostgreSQL",
//     ],
//   },
//   {
//     name: "Minecraft Texture Pack",
//     link: "https://github.com/EricDanielsH/mc-eric-texture-pack",
//     description:
//       "A Minecraft texture pack that adds a personal touch to the game, with custom textures and sounds. Works in every version of Minecraft.",
//     techStack: ["Java", "Minecraft", "Photoshop", "Paint.NET"],
//   },
//   {
//     name: "HybridCoach AI",
//     link: "https://hybridcoach-ai.vercel.app",
//     description:
//       "AI-powered fitness app that generates personalized workout plans based on user's goals, preferences, and fitness level. Follows a hybrid training approach.",
//     techStack: [
//       "Next.js",
//       "Typescript",
//       "OpenAI",
//       "Stripe",
//       "NextAuth",
//       "MongoDB",
//       "TailwindCss",
//     ],
//   },
//
//   {
//     name: "HealthBuddy",
//     link: "https://drive.google.com/file/d/1UC5hHXO_k3-I8PoQ3owwLltYfy8i2MuS/view?usp=share_link",
//     description:
//       "Keep you and your Buddy healthy. Calorie tracking app that helps users maintain a healthy lifestyle.",
//     techStack: ["React Native", "Firebase", "Node.js", "TypeScript", "Expo"],
//   },
//   {
//     title: "Blockchain",
//     link: "https://github.com/EricDanielsH/go-blockchain",
//     description:
//       "A simple blockchain implementation in Go, developed using insights and techniques shared on my blog.",
//     techStack: ["Go", "BoltDB"],
//   },
//
//   {
//     title: "LUCribCheck",
//     link: "https://lucribcheck.com/",
//     description:
//       "Share and discover reviews on homes in Lancaster, UK, helping others make informed decisions about properties and neighborhoods. Built to combat the lack of transparency in the real estate market.",
//     techStack: [
//       "Next.js",
//       "AWS S3",
//       "NextAuth",
//       "MongoDB",
//       "TailwindCss",
//       "Typescript",
//     ],
//   },
// ];

export const experience = [
  {
    name: "Lancaster University CS Department",
    href: "https://www.lancs.ac.uk/scc",
    title: "Internet Applications Teaching Assistant",
    logo: "/lancs.png",
    start: "Jan 2025",
    description: [
      "Provided one-on-one support to students, clarifying complex topics and helping troubleshoot coding issues",
      "Maintained classroom control and engagement for groups of 200+ students per week",
      "Taught JavaScript for both interactivity and server-side development",
      "Guided students through building RESTful APIs using Axios and Express",
      "Explained and demonstrated how to create and implement WebSockets for real-time communication",
    ],
  },
  {
    name: "Lancaster University CS Department",
    href: "https://www.lancs.ac.uk/scc",
    title: "Data Engineering Teaching Assistant",
    logo: "/lancs.png",
    start: "Oct 2024",
    end: "Jan 2025",
    description: [
      "Facilitated group discussions and review sessions, fostering collaboration and peer-to-peer learning",
      "Provided one-on-one support to students, clarifying complex topics and helping troubleshoot coding issues",
      "Taught relational data models, functional dependencies, and normalization (1NF–3NF)",
      "Delivered sessions covering both SQL (MySQL) and NoSQL (MongoDB) database systems",
    ],
  },
];

import type { IconLink } from "@/lib/schemas"; // ✅ import correct type

export const projectData: {
  name: string;
  description: string;
  tags: string[];
  image?: string;
  href?: string;
  links: IconLink[]; // ✅ this makes the icon field properly typed
}[] = [
    {
      name: "Smart Environment System",
      description:
        "Award-winning environment management platform—recognised as Best Project of the Year at the Lancaster University Project Showcase—designed to let users configure, visualize, and control zones, entities, and emergency alerts through a seamless web interface",
      image: "/airport-env.png",
      tags: [
        "React",
        "Next.js",
        "C++",
        "Supabase",
        "Prisma",
        "TailwindCSS",
        "Agile Methodology",
        "Raspberry Pi",
        "Edge Impulse",
      ],
      links: [
        {
          name: "Demo",
          href: "https://www.youtube.com/watch?si=ENdLPThsaKRQVi14&v=fzZrk8lb2D8&feature=youtu.be",
          icon: "youtube",
        },
        {
          name: "Source",
          href: "https://github.com/tedawf/tradingview-telegram-alerts",
          icon: "github",
        },
      ],
    },
    {
      name: "Remote Robotics Control for Nuclear Plants",
      description:
        "AI-driven fire detection system and implemented inverse kinematics for Spot’s movement using Python, designed for deployment in nuclear plant environments. Developed a React and Next.js app to display live sensor data and enable remote operation. Created as part of the Atkinsons Realis Hackathon",
      href: "",
      image: "/atkinsons.png",
      tags: ["Python", "Next.js", "React", "AWS"],
      links: [
        {
          name: "Article",
          href: "https://www.linkedin.com/posts/ericdanielsh_hackafuture2025-hackafuture2025-innovation-activity-7295492497944838145-3EUN?utm_source=share&utm_medium=member_desktop&rcm=ACoAAELlQhABVBSFnjLAqM-pHQsp-HlSzYAVmWU",
          icon: "linkedin",
        },
        {
          name: "Source",
          href: "https://github.com/miguelklemmsilva/hackathon-robots",
          icon: "github",
        },
      ],
    },

    {
      name: "Smart Lab System",
      description:
        "System build for measuring and monitoring temperature, light sound and other environmental factors in a lab, using Raspberry Pi Pico Ws. Can detect the location of any person of the lab based on the intensity of the network signal.",
      image: "/bubbles.jpg",
      tags: [
        "C",
        "C++",
        "Kotlin",
        "React",
        "Typescript",
        "PlatfromIO",
        "Raspberry Pi",
        "PostgreSQL",
      ],
      links: [
      ],
    },

    {
      name: "Minecraft Texture Pack",
      description:
        "A Minecraft texture pack that adds a personal touch to the game, with custom textures and sounds. Works in every version of Minecraft.",
      image: "/minecraft.png",
      tags: ["Java", "Minecraft", "Photoshop", "Paint.NET"],
      links: [
        {
          name: "Source",
          href: "https://github.com/EricDanielsH/mc-eric-texture-pack",
          icon: "github",
        },
      ],
    },
    {
      name: "HybridCoach AI",
      description:
        "AI-powered fitness app that generates personalized workout plans based on user's goals, preferences, and fitness level. Follows a hybrid training approach.",
      href: "https://hybridcoach-ai.vercel.app",
      image: "/coach.png",
      tags: [
        "Next.js",
        "Typescript",
        "OpenAI",
        "Stripe",
        "NextAuth",
        "MongoDB",
        "TailwindCss",
      ],
      links: [
        {
          name: "Website",
          href: "https://hybridcoach-ai.vercel.app",
          icon: "globe",
        },
      ],
    },

    {
      name: "HealthBuddy",
      description:
        "Keep you and your Buddy healthy. Calorie tracking app that helps users maintain a healthy lifestyle.",
      image: "/buddy.png",
      tags: ["TypeScript", "React Native", "Firebase", "Node.js", "Expo"],
      links: [
        {
          name: "Presentation",
          href: "https://drive.google.com/file/d/1UC5hHXO_k3-I8PoQ3owwLltYfy8i2MuS/view?usp=share_link",
          icon: "presentation",
        },
      ],
    },
    {
      name: "LUCribCheck",
      description:
        "Share and discover reviews on homes in Lancaster, UK, helping others make informed decisions about properties and neighborhoods. Built to combat the lack of transparency in the real estate market.",
      image: "/cribcheck.png",
      tags: [
        "TypeScript",
        "Next.js",
        "AWS S3",
        "NextAuth",
        "MongoDB",
        "TailwindCss",
      ],
      links: [
        {
          name: "Website",
          href: "https://lucribcheck.com/",
          icon: "globe",
        },
      ],
    },
  ];
