"use client";
import { useEffect, useRef } from "react";

/** Purple particle network that reacts to the cursor (hero background). */
export default function ParticleNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, mx = -9999, my = -9999, raf = 0;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];

    const resize = () => {
      W = c.clientWidth; H = c.clientHeight;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(110, Math.floor((W * H) / 14000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      }));
    };
    const move = (e: MouseEvent) => {
      const r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top;
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        // gentle repel from cursor
        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
        if (d < 120 && d > 0) { p.x += (dx / d) * 1.2; p.y += (dy / d) * 1.2; }
        if (!reduce) { p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H; }
        ctx.fillStyle = "#8b5cf6"; ctx.fillRect(p.x, p.y, 2, 2);
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 130) * 0.35})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const p = pts[i], d = Math.hypot(p.x - mx, p.y - my);
        if (d < 200) {
          ctx.strokeStyle = `rgba(167,139,250,${(1 - d / 200) * 0.6})`;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    addEventListener("resize", resize); addEventListener("mousemove", move);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("mousemove", move); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
