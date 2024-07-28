import { AuroraBackgroundDemo as Hero } from "@/components/Hero";
import Projects from "@/components/Projects";
import Posts from "@/components/Posts";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Posts />
      <Contact />
    </div>
  );
}
