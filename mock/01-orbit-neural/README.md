# Mock 01 — Orbit / Neural

**Concept:** the site is a living neural network. Ties to the AI Developer work (document intelligence, HDBSCAN clustering, LLM tracing, RL).

## Layout map
```
[ Hero: particle network + giant "BOGDAN GOSA" ]
[ Manifesto: words light up one by one       ]
[ Experience: pinned, vertical network, each job = node ]
[ Projects: pinned horizontal rail of cards   ]
[ Awards: counter + constellation             ]
[ Stack: orbiting tech chips                  ]
[ Contact: network collapses to one node      ]
```

## Scroll animations
| Trigger | Effect | Lib |
|---|---|---|
| Load | purple nodes drift, connect to cursor | canvas / OGL |
| Hero scroll | nodes converge into the letters of the name | GSAP scrub |
| Manifesto | text opacity scrubs word by word | ScrollTrigger |
| Experience (pinned) | each job lights a node and draws the edge to it; Planet Group node "clusters" like HDBSCAN | GSAP + SVG |
| Projects | pinned horizontal rail, cards parallax | ScrollTrigger |
| Stack | chips orbit, speed ties to scroll velocity | Lenis velocity |

## Tie-ins
Document clustering (bank PoC), LLM traceability (Arize Phoenix), RL agent trail following the cursor.

## Pros / cons
+ Strong identity for AI roles, visually distinctive. − Canvas perf on mobile; less playful.
**Effort:** medium-high (custom canvas).
