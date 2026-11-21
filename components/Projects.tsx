"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { ProjectT } from "@/lib/data";

export default function Projects({ projects }: { projects: ProjectT[] }) {
  const [active, setActive] = useState<number | null>(null);
  const float = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = float.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const rTo = gsap.quickTo(el, "rotation", { duration: 0.6, ease: "power3" });
    let lastX = 0;
    const move = (e: MouseEvent) => {
      xTo(e.clientX); yTo(e.clientY);
      rTo(Math.max(-12, Math.min(12, (e.clientX - lastX) * 0.4))); lastX = e.clientX;
    };
    addEventListener("mousemove", move);
    return () => removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    gsap.to(float.current, { opacity: active === null ? 0 : 1, scale: active === null ? 0.8 : 1, duration: 0.25 });
  }, [active]);

  return (
    <section id="projects" className="px-[6vw] py-[14vh]">
      <h2 className="h2 mb-12">Projects</h2>
      <div onMouseLeave={() => setActive(null)}>
        {projects.map((p, i) => {
          const href = p.links.demo ?? p.links.github;
          const Row = (
            <div onMouseEnter={() => setActive(i)}
              className="group flex items-baseline justify-between gap-6 border-t border-bg2 py-6 text-[clamp(1.6rem,5vw,4rem)] font-bold uppercase tracking-tight transition-all duration-300 hover:pl-6 hover:text-ac">
              <span className="glitch" data-t={p.title}>{p.title}</span>
              <span className="hidden font-mono text-sm font-normal normal-case text-mut md:block">
                {p.stack.slice(0, 3).join(" · ")} — {p.year}
              </span>
              <span className="font-mono text-sm text-ac">0{i + 1}</span>
            </div>
          );
          return href
            ? <a key={p.slug} href={href} target="_blank" rel="noreferrer" className="block">{Row}</a>
            : <div key={p.slug}>{Row}</div>;
        })}
        <div className="border-t border-bg2" />
      </div>

      {/* cursor-following preview; all covers are mounted so they're preloaded */}
      <div ref={float} aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 h-[190px] w-[290px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border-2 border-ac opacity-0 shadow-[0_0_60px_rgba(139,92,246,.45)]">
        {projects.map((p, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.slug} src={p.cover} alt="" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200"
            style={{ opacity: active === i ? 1 : 0 }} />
        ))}
      </div>
    </section>
  );
}
