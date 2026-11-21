"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ParticleNetwork from "./ParticleNetwork";

export default function Hero({ name, roles }: { name: string; roles: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const [first, ...rest] = name.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", { yPercent: 110, duration: 1.2, ease: "power4.out", stagger: 0.12, delay: 2.6 });
      gsap.from(".hero-sub", { opacity: 0, y: 20, duration: 1, delay: 3.1 });
      // parallax-out on scroll
      gsap.to(".hero-inner", {
        yPercent: -25, opacity: 0.2, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen items-end overflow-hidden px-[6vw] pb-[10vh] pt-[20vh]">
      <ParticleNetwork />
      <div className="hero-inner relative z-10">
        <p className="hero-sub mb-6 font-mono text-sm text-glow">{roles[0].toUpperCase()}</p>
        <h1 className="display glitch" data-t={name}>
          <span className="block overflow-hidden"><span className="hero-word block">{first}</span></span>
          <span className="block overflow-hidden text-ac"><span className="hero-word block">{rest.join(" ")}</span></span>
        </h1>
      </div>
    </section>
  );
}
