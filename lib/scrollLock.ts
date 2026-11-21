import type Lenis from "lenis";

// Shared lock so the boot screen can freeze scrolling (Lenis ignores `overflow: hidden`).
let lenis: Lenis | null = null;
let locked = false;

export function registerLenis(l: Lenis | null) {
  lenis = l;
  if (l && locked) l.stop();
}

export function setScrollLocked(value: boolean) {
  locked = value;
  document.body.style.overflow = value ? "hidden" : "";
  if (value) scrollTo(0, 0);
  if (lenis) { if (value) lenis.stop(); else lenis.start(); }
}

/** Smooth-scroll to a section (e.g. "#projects"). Falls back to the native jump if Lenis isn't running. */
export function scrollToHash(hash: string) {
  const el = hash === "#top" ? null : document.querySelector(hash);
  if (lenis) {
    lenis.scrollTo(el ?? 0, { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    scrollTo({ top: 0, behavior: "smooth" });
  }
}
