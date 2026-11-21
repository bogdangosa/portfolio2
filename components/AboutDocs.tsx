"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const N = 9; // number of small documents
const DOC_W = 84;
const DOC_H = 108;

// deterministic spread so SSR and client agree
const DOCS = Array.from({ length: N }, (_, i) => ({
  y: ((i * 53) % 7 - 3) * 62,          // start height offset (-186 .. +186)
  rot: ((i * 37) % 9) - 4,             // slight tilt
  end: ((i * 29) % 5 - 2) * 10,        // where it lands around the result card
  lines: 4 + (i % 3),
}));

function Lines({ n, w = [100, 85, 92, 70] }: { n: number; w?: number[] }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <div key={i} className="mb-2 h-[6px] rounded bg-black/15" style={{ width: `${w[i % w.length]}%` }} />
      ))}
    </>
  );
}

/**
 * v2 "documents" section (pinned, scroll-scrubbed):
 *  1. a small purple panel grows left/right/up until it fills the screen
 *  2. the statement slides in from the right
 *  3. small documents stream in from the left, travel right and merge into one
 *     result card, which then gets scanned and its fields extracted.
 */
export default function AboutDocs({ statement }: { statement: string }) {
  const root = useRef<HTMLElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rel = () => {
        const s = root.current!.getBoundingClientRect();
        const t = target.current!.getBoundingClientRect();
        return {
          x: t.left - s.left + t.width / 2 - DOC_W / 2,
          y: t.top - s.top + t.height / 2 - s.height / 2,
        };
      };

      gsap.set(".xcard", { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root.current, start: "top top", end: "+=4600",
          pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1,
        },
      });

      // 1) panel grows: inset on left/right/top, bottom stays put
      tl.fromTo(".pbg",
        { clipPath: "inset(52% 11% 0% 11% round 28px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.2, ease: "power3.inOut" }, 0);

      // 2) statement from the right
      tl.fromTo(".stmt", { x: () => innerWidth * 1.1 }, { x: 0, duration: 1.1, ease: "power3.out" }, 0.9);

      // 3) documents left -> right, merging into the result card
      // Docs enter from the left *below the text*, run along under it, then curve up into the card:
      // x eases gently while y stays low and then rises steeply (power3.in) = an upward hook.
      const belowText = (i: number) => {
        const s = root.current!.getBoundingClientRect();
        const t = text.current!.getBoundingClientRect();
        return t.bottom - s.top - s.height / 2 + 70 + (i % 3) * 34;
      };
      DOCS.forEach((d, i) => {
        const start = 1.7 + i * 0.16;
        tl.fromTo(`.sd-${i}`,
          { x: -DOC_W - 80, rotation: d.rot * 3, scale: 1, opacity: 1 },
          { x: () => rel().x + d.end, rotation: d.rot, duration: 1.6, ease: "power1.inOut" }, start);
        tl.fromTo(`.sd-${i}`,
          { y: () => belowText(i) },
          { y: () => rel().y + d.end, duration: 1.6, ease: "power3.in" }, start);
        tl.to(`.sd-${i}`, { scale: 0.55, opacity: 0, duration: 0.3, ease: "power1.in" }, start + 1.35);
      });
      const arrive = 1.7 + 1.35 + 0.3; // first doc starts merging
      tl.to(".xcard", { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.4)" }, arrive);

      const done = 1.7 + (N - 1) * 0.16 + 1.65; // last doc absorbed
      tl.fromTo(".scan", { top: "0%", opacity: 1 }, { top: "100%", duration: 1.3, ease: "none" }, done)
        .fromTo(".hl", { scaleX: 0 }, { scaleX: 1, duration: 0.3, stagger: 0.32 }, done + 0.15)
        .fromTo(".stamp", { scale: 2.5, opacity: 0, rotation: -25 },
          { scale: 1, opacity: 1, rotation: -8, duration: 0.4, ease: "back.out(2)" }, done + 1.35)
        .to(".scan", { opacity: 0, duration: 0.1 }, done + 1.3)
        .to({}, { duration: 0.6 }); // hold the final frame
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    // The pinned <section> is wrapped in a plain div: GSAP's pin-spacer is inserted *inside* this wrapper,
    // so React can always unmount/hot-reload it without "removeChild: not a child" errors.
    <div>
    <section ref={root} id="about" className="relative h-screen min-h-[620px] overflow-hidden text-black">
      <div className="pbg absolute inset-0 bg-ac" style={{ clipPath: "inset(52% 11% 0% 11% round 28px)" }} />

      <div className="relative grid h-full items-center gap-6 px-[6vw] pb-[26vh] pt-[8vh] md:grid-cols-[1.25fr_1fr]">
        <h2 ref={text} className="stmt text-[clamp(2rem,5.6vw,6.2rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] will-change-transform"
          style={{ transform: "translateX(110vw)" }}>
          {statement}
        </h2>

        {/* result card: where the small documents merge */}
        <div ref={target} aria-hidden className="relative mx-auto flex h-[300px] w-full max-w-[420px] items-center justify-center md:h-[480px]">
          <div className="xcard relative h-[300px] w-[230px] overflow-hidden rounded-md bg-[#f5f3ff] p-5 shadow-[0_20px_50px_rgba(0,0,0,.35)] md:h-[330px] md:w-[250px]" style={{ opacity: 0 }}>
            <div className="mb-4 flex items-center justify-between">
              <div className="h-3 w-16 rounded bg-black/70" />
              <span className="font-mono text-[10px] text-black/50">INV-2048</span>
            </div>
            <Lines n={2} />
            <div className="my-4 space-y-3 font-mono text-[11px]">
              {[["CLIENT", "ACME Bank"], ["TYPE", "Invoice"], ["TOTAL", "12,480 RON"]].map(([k, v]) => (
                <div key={k} className="relative flex justify-between">
                  <div className="hl absolute -inset-x-1 inset-y-[-2px] origin-left bg-black" style={{ transform: "scaleX(0)" }} />
                  <span className="relative text-white mix-blend-difference">{k}</span>
                  <span className="relative text-white mix-blend-difference">{v}</span>
                </div>
              ))}
            </div>
            <Lines n={4} />
            <div className="scan absolute inset-x-0 h-[3px] bg-ac opacity-0 shadow-[0_0_18px_6px_rgba(139,92,246,.8)]" />
            <div className="stamp absolute bottom-5 right-4 rounded border-2 border-ac px-2 py-1 font-mono text-xs font-bold text-ac opacity-0">
              ✓ EXTRACTED
            </div>
          </div>
        </div>
      </div>

      {/* small documents streaming in from the left */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {DOCS.map((d, i) => (
          <div key={i} className={`sd-${i} absolute left-0 top-1/2 overflow-hidden rounded-[4px] bg-[#f5f3ff] p-2 shadow-[0_10px_24px_rgba(0,0,0,.3)]`}
            style={{ width: DOC_W, height: DOC_H, marginTop: -DOC_H / 2, transform: "translateX(-200px)" }}>
            <div className="mb-2 h-2 w-8 rounded bg-black/60" />
            <Lines n={d.lines} />
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
