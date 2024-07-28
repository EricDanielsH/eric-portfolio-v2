import {AuroraBackgroundDemo as Hero} from "@/components/Hero";
import Projects from "@/components/Projects";
import Posts from "@/components/Posts";


export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero/>
      <Projects/>
      <Posts/>
    </div>
  );
}
