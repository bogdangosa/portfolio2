"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { setScrollLocked } from "@/lib/scrollLock";

export default function Boot({ lines }: { lines: string[] }) {
  const [text, setText] = useState("");
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    setScrollLocked(true);
    let li = 0, ci = 0, timer: ReturnType<typeof setTimeout>, done = false;
    const finish = () => {
      if (done) return; done = true; clearTimeout(timer);
      gsap.to(ref.current, {
        clipPath: "inset(0 0 100% 0)", duration: 0.8, delay: 0.3,
        onComplete: () => { setScrollLocked(false); setGone(true); },
      });
    };
    const step = () => {
      if (li >= lines.length) return finish();
      const L = lines[li];
      setText(lines.slice(0, li).join("\n") + (li ? "\n" : "") + L.slice(0, ci));
      ci++;
      if (ci > L.length) { li++; ci = 0; timer = setTimeout(step, 220); }
      else timer = setTimeout(step, 26);
    };
    step();
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    return () => { clearTimeout(timer); window.removeEventListener("keydown", skip); setScrollLocked(false); };
  }, [lines]);

  if (gone) return null;
  return (
    <div ref={ref} onClick={() => { setScrollLocked(false); setGone(true); }}
      className="fixed inset-0 z-[70] cursor-pointer bg-black p-[6vw] font-mono text-xl text-glow"
      style={{ clipPath: "inset(0 0 0% 0)" }}>
      <pre className="cursor-blink whitespace-pre-wrap font-mono">{text}</pre>
      <p className="absolute bottom-6 right-[6vw] text-sm text-mut">click or press any key to skip</p>
    </div>
  );
}
