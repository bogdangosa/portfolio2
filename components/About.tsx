"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// Final resting pose of each sheet in the stack (back -> front).
const DOCS = [
  { rot: -9, x: -70, y: -30 },
  { rot: 6, x: 60, y: -10 },
  { rot: -3, x: -20, y: 20 },
  { rot: 0, x: 0, y: 0 }, // front sheet gets scanned
];

function Lines({ n, w = [100, 85, 92, 70] }: { n: number; w?: number[] }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <div key={i} className="mb-2 h-[6px] rounded bg-black/15" style={{ width: `${w[i % w.length]}%` }} />
      ))}
    </>
  );
}

export default function About({ statement }: { statement: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1) purple wipe
      gsap.to(ref.current, {
        clipPath: "inset(0 0 0% 0)", ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 95%", end: "top 25%", scrub: true },
      });

      // 2) documents fly in, then the front one is scanned + data extracted
      gsap.set(".doc", { xPercent: -50, yPercent: -50 });
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: ref.current, start: "top 55%", end: "bottom 75%", scrub: 0.6 },
      });
      DOCS.forEach((d, i) =>
        tl.fromTo(`.doc-${i}`,
          { x: 700, y: d.y + 120, rotation: d.rot + 40, opacity: 0 },
          { x: d.x, y: d.y, rotation: d.rot, opacity: 1, duration: 1 }, i * 0.35),
      );
      tl.fromTo(".scan", { top: "0%", opacity: 1 }, { top: "100%", duration: 1.4, ease: "none" }, ">0.1")
        .fromTo(".hl", { scaleX: 0 }, { scaleX: 1, duration: 0.3, stagger: 0.35 }, "<0.2")
        .fromTo(".stamp", { scale: 2.5, opacity: 0, rotation: -25 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.4, ease: "back.out(2)" }, ">")
        .to(".scan", { opacity: 0, duration: 0.1 }, "<")
        .to({}, { duration: 0.6 }); // hold the final frame
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about"
      className="grid min-h-screen items-center gap-10 overflow-hidden bg-ac px-[6vw] py-[12vh] text-black md:grid-cols-[1.25fr_1fr]"
      style={{ clipPath: "inset(0 0 100% 0)" }}>
      <h2 className="text-[clamp(2.2rem,6vw,6.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">{statement}</h2>

      <div aria-hidden className="relative mx-auto h-[420px] w-full max-w-[420px] md:h-[500px]">
        {DOCS.map((_, i) => {
          const front = i === DOCS.length - 1;
          return (
            <div key={i} className={`doc doc-${i} absolute left-1/2 top-1/2 h-[330px] w-[250px] overflow-hidden rounded-md bg-[#f5f3ff] p-5 shadow-[0_20px_50px_rgba(0,0,0,.35)]`}>
              <div className="mb-4 flex items-center justify-between">
                <div className="h-3 w-16 rounded bg-black/70" />
                <span className="font-mono text-[10px] text-black/50">{front ? "INV-2048" : `DOC-0${i + 1}`}</span>
              </div>
              {front ? (
                <>
                  <Lines n={2} />
                  <div className="my-4 space-y-3 font-mono text-[11px]">
                    {[["CLIENT", "ACME Bank"], ["TYPE", "Invoice"], ["TOTAL", "12,480 RON"]].map(([k, v]) => (
                      <div key={k} className="relative flex justify-between">
                        <div className="hl absolute -inset-x-1 inset-y-[-2px] origin-left bg-black" />
                        <span className="relative mix-blend-difference text-white">{k}</span>
                        <span className="relative mix-blend-difference text-white">{v}</span>
                      </div>
                    ))}
                  </div>
                  <Lines n={4} />
                  <div className="scan absolute inset-x-0 h-[3px] bg-ac opacity-0 shadow-[0_0_18px_6px_rgba(139,92,246,.8)]" />
                  <div className="stamp absolute bottom-5 right-4 rounded border-2 border-ac px-2 py-1 font-mono text-xs font-bold text-ac opacity-0">
                    ✓ EXTRACTED
                  </div>
                </>
              ) : (
                <Lines n={9} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
