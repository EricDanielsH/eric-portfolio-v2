import { AuroraBackgroundDemo as Hero } from "@/components/Hero";
import Projects from "@/components/Projects";
import Posts from "@/components/Posts";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Experience />
      <Projects limit={2} />
      <Posts />
      <Contact />
    </div>
  );
}
