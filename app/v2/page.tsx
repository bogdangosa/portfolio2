import { experience, projects, site } from "@/lib/data";
import SmoothScroll from "@/components/SmoothScroll";
import Boot from "@/components/Boot";
import Nav from "@/components/Nav";
import LiquidHero from "@/components/v2/LiquidHero";
import Marquee from "@/components/Marquee";
import AboutDocs from "@/components/v2/AboutDocs";
import GitLog from "@/components/GitLog";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

// v2: same site, but with the liquid / bubbly WebGL hero.
export default function HomeV2() {
  return (
    <main>
      <div className="grain" />
      <SmoothScroll />
      <Boot lines={site.bootLines} />
      <Nav name={site.name} />
      <LiquidHero name={site.name} label={site.roles[0]} />
      <Marquee items={site.roles} />
      <AboutDocs statement={site.statement} />
      <GitLog entries={experience} />
      <Projects projects={projects} />
      <Contact email={site.email} socials={site.socials} />
    </main>
  );
}
