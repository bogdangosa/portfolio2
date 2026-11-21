import { experience, projects, site } from "@/lib/data";
import SmoothScroll from "@/components/SmoothScroll";
import Boot from "@/components/Boot";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import GitLog from "@/components/GitLog";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <div className="grain" />
      <SmoothScroll />
      <Boot lines={site.bootLines} />
      <Nav name={site.name} />
      <Hero name={site.name} roles={site.roles} />
      <Marquee items={site.roles} />
      <About statement={site.statement} />
      <GitLog entries={experience} />
      <Projects projects={projects} />
      <Contact email={site.email} socials={site.socials} />
    </main>
  );
}
