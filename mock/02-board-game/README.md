# Mock 02 — Board Game

**Concept:** the page is a game board; scrolling moves your pawn along a path through the sections. Ties to passions: board games, Calico/Mills projects, reinforcement learning, hackathon wins.

## Layout map
```
[ Hero: title card + dice, "Press scroll to roll" ]
[ Path of tiles (SVG), pawn follows scroll         ]
[ Experience: 4 tiles = jobs, flip to reveal       ]
[ Projects: cards dealt onto the table, flip/hover ]
[ Interlude: Mills board draws itself (SVG stroke) ]
[ Awards: podium 1st/2nd/3rd, "100% podium" counter ]
[ Contact: "Game over — play again?" ]
```

## Scroll animations
| Trigger | Effect | Lib |
|---|---|---|
| Whole page | pawn moves along SVG path (motion-path) tied to scroll progress | GSAP MotionPath |
| Projects | cards deal in from deck with rotation + stagger | ScrollTrigger |
| Mills interlude | board lines draw, pieces drop, a mill triggers highlight | stroke-dashoffset |
| Headings | dice-roll scramble text | custom |
| Awards | podium bars rise, numbers count up | GSAP |

## Tie-ins
Calico RL env, Mills AI (Minimax), Godot, hackathon podium streak.

## Pros / cons
+ Most personal and fun; unique. − Less "corporate"; needs good illustration work.
**Effort:** medium.
