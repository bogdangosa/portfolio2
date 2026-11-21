"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Marquee whose speed + direction follow scroll velocity. */
export default function Marquee({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let x = 0, dir = 1, last = scrollY, boost = 0;
    const tick = () => {
      const dy = scrollY - last; last = scrollY;
      if (dy !== 0) dir = dy > 0 ? 1 : -1;
      boost += (Math.min(Math.abs(dy), 60) - boost) * 0.1;
      x -= dir * (1.2 + boost * 0.6);
      const half = ref.current!.scrollWidth / 2;
      if (x < -half) x += half; if (x > 0) x -= half;
      ref.current!.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);
  const row = items.map((t) => `${t.toUpperCase()} ✦ `).join("");
  return (
    <div className="overflow-hidden border-y border-bg2 py-4 font-mono text-4xl md:text-6xl">
      <div ref={ref} className="inline-block whitespace-nowrap will-change-transform">
        <span>{row}</span><span>{row}</span><span>{row}</span><span>{row}</span>
      </div>
    </div>
  );
}
