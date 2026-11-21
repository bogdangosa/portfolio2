# Mock 03 — Terminal / Glitch

**Concept:** the most Lando-Norris-like: enormous type, hard section wipes, marquees, plus a dev/terminal vibe with purple RGB-split glitch.

## Layout map
```
[ Boot: terminal typing "> whoami" ]
[ Hero: full-bleed giant name, marquee of roles ]
[ About: clip-path reveal statement ]
[ Experience: git-log style timeline, pinned ]
[ Projects: huge list; hover shows image following cursor ]
[ Awards + Stack: marquee rows ]
[ Footer: giant email link ]
```

## Scroll animations
| Trigger | Effect | Lib |
|---|---|---|
| Load | typed terminal then wipe into hero | GSAP |
| Scroll | sections wipe via clip-path, previous section scales back | ScrollTrigger |
| Marquees | speed/direction follow scroll velocity | Lenis |
| Project hover | cursor-following image, glitch on title | JS |
| Experience | commits appear one by one with hashes | scrub |

## Tie-ins
Languages & stack as `git log` / shell commands; hackathons as "commits".

## Pros / cons
+ Easiest to build, performs well, very bold. − Less tied to passions than 01/02.
**Effort:** low-medium.
