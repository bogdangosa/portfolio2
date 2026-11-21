"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const VERT = `
attribute vec2 aPos; varying vec2 vUv;
void main(){ vUv = aPos*.5+.5; gl_Position = vec4(aPos,0.,1.); }`;

// Bubbly metaball field + domain warp. The title is a texture that gets refracted
// through the bubbles, rippled by the cursor, and colour-inverted inside bubbles.
const FRAG = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes, uMouse, uVel;
uniform float uTime, uIntro, uScroll;
uniform sampler2D uText;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.02; a*=.5; } return v; }

vec3 pal(float t){
  vec3 c1 = vec3(.357,.129,.714);  // deep purple
  vec3 c2 = vec3(.545,.361,.965);  // accent
  vec3 c3 = vec3(.655,.545,.980);  // glow
  vec3 c4 = vec3(.93,.45,.92);     // magenta-pink
  float k = fract(t) * 4.;
  if(k < 1.) return mix(c1, c2, smoothstep(0.,1.,k));
  if(k < 2.) return mix(c2, c3, smoothstep(0.,1.,k-1.));
  if(k < 3.) return mix(c3, c4, smoothstep(0.,1.,k-2.));
  return mix(c4, c1, smoothstep(0.,1.,k-3.));
}

float field(vec2 p, float t, vec2 m, float vel){
  float f = 0.;
  for(int i=0;i<7;i++){
    float fi = float(i);
    vec2 c = vec2(sin(t*(.21+.06*fi)+fi*2.1)*.62, cos(t*(.17+.05*fi)+fi*1.3)*.38);
    float r = .11 + .045*sin(fi*3.+t*.4) + uScroll*.05;
    vec2 d = p - c;
    f += r*r / (dot(d,d) + 1e-4);
  }
  vec2 dm = p - m;
  float rm = .085 + vel*.25;
  f += rm*rm / (dot(dm,dm) + 1e-4);
  return f;
}

void main(){
  float asp = uRes.x/uRes.y;
  vec2 uv = vUv;
  vec2 p = (uv-.5)*vec2(asp,1.);
  vec2 m = (uMouse-.5)*vec2(asp,1.);
  float vel = length(uVel);
  float t = uTime;

  // domain warp makes bubbles wobble organically
  vec2 w = vec2(fbm(p*2.2+t*.12), fbm(p*2.2+7.-t*.1)) - .5;
  float f = min(field(p + w*.22, t, m, vel), 2.2);

  float body = smoothstep(.8, 1.35, f);
  float rim  = exp(-abs(f-1.)*5.);
  float hue  = t*.035 + w.x*.6 + min(f,1.2)*.08;
  vec3 bubble = pal(hue);

  vec3 bg = vec3(.07,.07,.08);
  bg += pal(hue+.3)*.03*smoothstep(0.,1.2,f);
  vec3 col = mix(bg, bubble*.3, body);
  col += pal(hue+.5)*rim*.12;

  // ---- title: refraction through bubbles + cursor ripple ----
  vec2 dm2 = p - m;
  float dist = length(dm2);
  vec2 dir = dm2/(dist+1e-4);
  float ripple = exp(-dist*4.)*sin(dist*26. - t*4.)*(.006 + vel*.05);
  float push = exp(-dist*5.5)*(.02 + vel*.35);
  vec2 off = w*.012 + dir*(ripple+push)*.6;
  float intro = uIntro;
  off += (vec2(noise(uv*9.+t), noise(uv*9.-t))-.5) * intro*.5;
  vec2 tuv = uv + off/vec2(asp,1.)*vec2(1.,1.);

  float ca = (.0008 + abs(ripple)*.25) * (1.+intro*3.);
  vec4 tc = texture2D(uText, tuv);
  float aR = texture2D(uText, tuv + vec2(ca,0.)).a;
  float aG = tc.a;
  float aB = texture2D(uText, tuv - vec2(ca,0.)).a;
  vec3 a3 = vec3(aR,aG,aB) * (1.-intro);

  // text stays on top of the bubbles, unaffected by them
  vec3 tcol = tc.rgb;
  col = vec3(mix(col.r,tcol.r,a3.r), mix(col.g,tcol.g,a3.g), mix(col.b,tcol.b,a3.b));

  // soft vignette
  col *= 1. - .35*dot(uv-.5,uv-.5)*2.;
  gl_FragColor = vec4(col,1.);
}`;

export default function LiquidHero({ name, label }: { name: string; label: string }) {
  const wrap = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const fallback = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const cv = canvas.current!;
    const gl = cv.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) {
      cv.style.display = "none";
      fallback.current!.className = "display relative z-10 px-[6vw]";
      return;
    }
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U("uRes"), uMouse = U("uMouse"), uVel = U("uVel"), uTime = U("uTime"), uIntro = U("uIntro"), uScroll = U("uScroll");

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]] as const)
      gl.texParameteri(gl.TEXTURE_2D, k, v);
    gl.uniform1i(U("uText"), 0);

    const dpr = Math.min(devicePixelRatio || 1, 1.75);
    const words = name.toUpperCase().split(" ");
    const tcv = document.createElement("canvas");

    const buildText = (W: number, H: number) => {
      tcv.width = W; tcv.height = H;
      const c = tcv.getContext("2d")!;
      c.clearRect(0, 0, W, H);
      const fam = getComputedStyle(document.body).fontFamily;
      const longest = Math.max(...words.map((w) => w.length));
      const fs = Math.min(W * 0.9 / (longest * 0.66), H * 0.34) * 0.8;
      c.font = `700 ${fs}px ${fam}`; c.textBaseline = "alphabetic";
      if ("letterSpacing" in c) (c as unknown as { letterSpacing: string }).letterSpacing = `${-fs * 0.045}px`;
      const x = W * 0.06 / dpr * dpr;
      const base = H - H * 0.1;
      words.slice().reverse().forEach((w, i) => {
        c.fillStyle = i === 0 ? "#8b5cf6" : "#ededf2";
        c.fillText(w, x, base - i * fs * 0.88);
      });
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tcv);
      // place the DOM label just above the title block
      const top = (base - (words.length - 1) * fs * 0.88 - fs * 0.78) / dpr;
      if (labelRef.current) labelRef.current.style.top = `${Math.max(90, top - 34)}px`;
    };

    const resize = () => {
      const W = Math.floor(cv.clientWidth * dpr), H = Math.floor(cv.clientHeight * dpr);
      cv.width = W; cv.height = H; gl.viewport(0, 0, W, H);
      gl.uniform2f(uRes, W, H); buildText(W, H);
    };
    resize();
    document.fonts.ready.then(resize);
    const ro = new ResizeObserver(resize); ro.observe(cv);

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, vx: 0, vy: 0 };
    const move = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width; mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    addEventListener("pointermove", move);

    const state = { intro: 1 };
    const tween = gsap.to(state, { intro: 0, duration: 2.4, delay: 2.4, ease: "power3.out" });

    let visible = true, raf = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(cv);
    const t0 = performance.now();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const px = mouse.x, py = mouse.y;
      mouse.x += (mouse.tx - mouse.x) * 0.08; mouse.y += (mouse.ty - mouse.y) * 0.08;
      mouse.vx += ((mouse.x - px) * 8 - mouse.vx) * 0.15; mouse.vy += ((mouse.y - py) * 8 - mouse.vy) * 0.15;
      gl.uniform1f(uTime, reduce ? 4 : (performance.now() - t0) / 1000 * 0.6);
      gl.uniform1f(uIntro, reduce ? 0 : state.intro);
      gl.uniform1f(uScroll, Math.min(1, scrollY / innerHeight));
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform2f(uVel, Math.min(mouse.vx, 1), Math.min(mouse.vy, 1));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf); tween.kill(); io.disconnect(); ro.disconnect();
      removeEventListener("pointermove", move);
      gl.deleteTexture(tex); gl.deleteBuffer(buf); gl.deleteProgram(prog);
    };
  }, [name]);

  return (
    <section ref={wrap} id="top" className="relative h-screen min-h-[560px] overflow-hidden">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />
      <p ref={labelRef} className="absolute left-[6vw] z-10 font-mono text-sm text-glow">{label.toUpperCase()}</p>
      <h1 ref={fallback} className="sr-only">{name}</h1>
    </section>
  );
}
