"use client";
import { useEffect, useState, type MouseEvent } from "react";
import { scrollToHash } from "@/lib/scrollLock";

// Eased ("scrim") gradient: many stops following an ease-out curve, so the fade has no visible steps.
const SCRIM = `linear-gradient(to bottom, ${[
  [0, 0.9], [0.1, 0.83], [0.2, 0.74], [0.3, 0.63], [0.4, 0.52], [0.5, 0.41],
  [0.6, 0.3], [0.7, 0.2], [0.8, 0.11], [0.9, 0.04], [1, 0],
].map(([p, a]) => `rgba(18,18,20,${a}) ${p * 100}%`).join(", ")})`;

const LINKS = [
  { href: "#about", label: "about" },
  { href: "#log", label: "log" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

function go(e: MouseEvent<HTMLAnchorElement>, hash: string, close?: () => void) {
  e.preventDefault();
  close?.();
  // let the mobile menu release its scroll lock before we start scrolling
  requestAnimationFrame(() => scrollToHash(hash));
}

export default function Nav({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => { removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[55] flex items-center justify-between px-[6vw] py-5 font-mono text-sm text-white">
        {/* faded dark backdrop so white text stays readable over any section (e.g. purple) */}
        <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[170%] transition-opacity duration-300 ${scrolled || open ? "opacity-100" : "opacity-0"}`}
          style={{ background: SCRIM }} />
        <a href="#top" className="font-bold" onClick={(e) => go(e, "#top", () => setOpen(false))}>{name}</a>

        {/* desktop links */}
        <span className="hidden gap-6 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="nav-link pb-1">
              {l.label}
            </a>
          ))}
        </span>

        {/* mobile hamburger */}
        <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
          aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}
          className="relative z-[60] flex h-10 w-10 flex-col items-end justify-center gap-[7px] md:hidden">
          <span className={`h-[2px] bg-white transition-all duration-300 ${open ? "w-7 translate-y-[9px] rotate-45" : "w-7"}`} />
          <span className={`h-[2px] bg-white transition-all duration-300 ${open ? "w-0 opacity-0" : "w-5"}`} />
          <span className={`h-[2px] bg-white transition-all duration-300 ${open ? "w-7 -translate-y-[9px] -rotate-45" : "w-3"}`} />
        </button>
      </nav>

      {/* mobile full-screen menu */}
      <div id="mobile-menu" aria-hidden={!open}
        className={`fixed inset-0 z-[54] flex flex-col justify-center gap-2 bg-bg0/95 px-[6vw] backdrop-blur-md transition-[clip-path] duration-500 ease-[cubic-bezier(.76,0,.24,1)] md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}>
        {LINKS.map((l, i) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href, () => setOpen(false))} tabIndex={open ? 0 : -1}
            className="flex items-baseline gap-4 border-b border-bg2 py-4 text-[clamp(2.5rem,13vw,5rem)] font-bold uppercase leading-none tracking-tight active:text-ac"
            style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}>
            <span className="font-mono text-sm font-normal text-ac">0{i + 1}</span>{l.label}
          </a>
        ))}
        <p className="mt-8 font-mono text-sm text-mut">$ cd ~/{name.split(" ")[0].toLowerCase()}</p>
      </div>
    </>
  );
}
