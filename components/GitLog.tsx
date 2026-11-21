"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ExperienceT } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);
const CMD = "$ git log --oneline --graph";

/** Pinned terminal: scrolling "types" the command and then each commit. Hover a commit to `git show` it. */
export default function GitLog({ entries }: { entries: ExperienceT[] }) {
  const ref = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  const [active, setActive] = useState<number | null>(null);

  const lines = useMemo(
    () => entries.map((e) => `* ${e.hash} (${e.date}) ${e.msg}`),
    [entries],
  );
  const total = CMD.length + lines.reduce((s, l) => s + l.length, 0);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { const id = requestAnimationFrame(() => setCount(total)); return () => cancelAnimationFrame(id); }
    const st = ScrollTrigger.create({
      trigger: ref.current, start: "top top", end: "+=2400", pin: true, scrub: true,
      onUpdate: (s) => setCount(Math.floor(Math.min(1, s.progress / 0.85) * total)),
    });
    return () => st.kill();
  }, [total]);

  // split revealed char count across command + lines
  const cmdShown = CMD.slice(0, count);
  const offsets = lines.map((_, i) => lines.slice(0, i).reduce((n, l) => n + l.length, 0));
  const shown = lines.map((l, i) => l.slice(0, Math.max(0, count - CMD.length - offsets[i])));
  const done = count >= total;
  const a = active !== null ? entries[active] : null;

  return (
    // wrapper div keeps GSAP's pin-spacer inside a React-owned parent (avoids removeChild errors on unmount / HMR)
    <div>
    <section ref={ref} id="log" className="min-h-screen px-[6vw] py-[14vh]">
      <h2 className="h2 mb-10">git log</h2>
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border border-bg2 bg-bg1 p-6 font-mono text-sm md:text-base">
          <p className="text-glow">{cmdShown}{count < CMD.length && <span className="cursor-blink" />}</p>
          <div className="mt-4 space-y-3">
            {shown.map((s, i) => s && (
              <p key={entries[i].hash}
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                tabIndex={0}
                className={`cursor-pointer transition-colors ${active === i ? "text-white" : "text-mut"} hover:text-white`}>
                <span className="text-ac">*</span>{" "}
                <span className="text-yellow-300">{s.slice(2, 2 + entries[i].hash.length)}</span>
                {s.slice(2 + entries[i].hash.length)}
                {s.length < lines[i].length && <span className="cursor-blink" />}
              </p>
            ))}
          </div>
          {done && <p className="mt-6 text-mut">$ <span className="cursor-blink" /></p>}
        </div>
        <div className="rounded-xl border border-ac/40 bg-bg0 p-6 font-mono text-sm md:text-base">
          {a ? (
            <>
              <p className="text-glow">$ git show {a.hash}</p>
              <h3 className="mt-4 font-sans text-3xl font-bold md:text-4xl">{a.title}</h3>
              <p className="mt-1 text-ac">@ {a.org}</p>
              <p className="mt-4 leading-relaxed text-mut">{a.detail}</p>
            </>
          ) : (
            <p className="text-mut">{count > CMD.length ? "# hover a commit to inspect it" : "# keep scrolling…"}</p>
          )}
        </div>
      </div>
    </section>
    </div>
  );
}
