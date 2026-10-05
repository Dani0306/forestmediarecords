"use client";

import { useEffect, useImperativeHandle, useRef } from "react";

export type ForgeBarHandle = { strike: (clientX?: number) => void };

export type StrikeInfo = { blows: number; drawn: number; reset: boolean };

type Props = {
  ref?: React.Ref<ForgeBarHandle>;
  /** Called on frames where the heat changes: normalized heat (0–1) and °C. Write to the DOM, not state. */
  onHeat?: (heat: number, celsius: number) => void;
  onStrike?: (info: StrikeInfo) => void;
  autoStrikeMs?: number;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  rot: number;
  vr: number;
  spark: boolean;
  shade: number;
};

const MAX_BLOWS = 9;
const HEAT_FLOOR = 0.32;

// heat ramp stops: black → cherry → orange → glow → white heat
const RAMP: [number, [number, number, number]][] = [
  [0, [22, 20, 20]],
  [0.3, [92, 18, 8]],
  [0.5, [194, 30, 14]],
  [0.7, [255, 90, 17]],
  [0.86, [255, 166, 43]],
  [1, [255, 243, 196]],
];

function ramp(t: number) {
  const x = Math.min(1, Math.max(0, t));
  for (let i = 1; i < RAMP.length; i++) {
    const [p1, c1] = RAMP[i];
    const [p0, c0] = RAMP[i - 1];
    if (x <= p1) {
      const k = (x - p0) / (p1 - p0);
      return `rgb(${Math.round(c0[0] + (c1[0] - c0[0]) * k)},${Math.round(c0[1] + (c1[1] - c0[1]) * k)},${Math.round(
        c0[2] + (c1[2] - c0[2]) * k,
      )})`;
    }
  }
  return "rgb(255,243,196)";
}

// deterministic pseudo-random so every billet has the same scale pattern
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function ForgeBar({ ref, onHeat, onStrike, autoStrikeMs = 900, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const api = useRef<ForgeBarHandle>({ strike: () => {} });
  const onStrikeRef = useRef(onStrike);
  const onHeatRef = useRef(onHeat);

  useEffect(() => {
    onStrikeRef.current = onStrike;
    onHeatRef.current = onHeat;
  }, [onStrike, onHeat]);

  useImperativeHandle(ref, () => ({ strike: (x?: number) => api.current.strike(x) }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let dpr = 1;

    let heat = 1;
    let blows = 0;
    let len = 0; // current drawn length (px)
    let target = 0;
    let die = { t: 1, x: 0 }; // t in [0,1], 1 = idle up
    let flash = 0;
    let particles: Particle[] = [];
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let lastTempWrite = 0;
    let lastHeatWrite = -1;

    // brushed, pitted steel for the dies, rendered once
    const tex = document.createElement("canvas");
    tex.width = 160;
    tex.height = 160;
    const tctx = tex.getContext("2d")!;
    const tr = rng(7);
    for (let y = 0; y < 160; y++) {
      tctx.fillStyle = `rgba(255,255,255,${0.012 + tr() * 0.03})`;
      tctx.fillRect(0, y, 160, 1);
    }
    for (let i = 0; i < 900; i++) {
      const v = tr();
      tctx.fillStyle = v > 0.6 ? `rgba(255,255,255,${tr() * 0.07})` : `rgba(0,0,0,${0.2 + tr() * 0.45})`;
      tctx.fillRect(tr() * 160, tr() * 160, 0.6 + tr() * 2, 0.6 + tr() * 1.6);
    }
    const steel = ctx.createPattern(tex, "repeat");

    const r = rng(42);
    const flecks = Array.from({ length: 260 }, () => ({ u: r(), v: r(), s: 0.6 + r() * 2.2, a: 0.25 + r() * 0.65 }));
    const edge = Array.from({ length: 48 }, () => r() - 0.5);

    const geom = () => {
      const x0 = Math.max(16, W * 0.03);
      const bh = Math.max(30, Math.min(64, H * 0.3));
      const y = H * 0.56 - bh / 2;
      const minLen = W * 0.46;
      const maxLen = W - x0 - Math.max(24, W * 0.04);
      const step = (maxLen - minLen) / MAX_BLOWS;
      return { x0, bh, y, minLen, maxLen, step };
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      const g = geom();
      target = g.minLen + g.step * blows;
      if (!len) len = g.minLen;
      len = Math.min(len, g.maxLen);
      if (reduced) len = target;
      draw();
    };

    const spawn = (x: number, y: number) => {
      if (reduced) return;
      const n = W < 600 ? 140 : 260;
      for (let i = 0; i < n; i++) {
        const spark = i % 7 === 0;
        // scale bursts sideways off the die, sparks go up
        const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * (spark ? 0.9 : 1.6);
        const sp = spark ? 6 + Math.random() * 8 : 1.2 + Math.random() * 4.2;
        particles.push({
          x: x + (Math.random() - 0.5) * 50,
          y,
          vx: Math.cos(a) * sp * (Math.random() < 0.5 ? 1.25 : 0.8),
          vy: Math.sin(a) * sp,
          life: 0,
          max: spark ? 0.35 + Math.random() * 0.5 : 1.6 + Math.random() * 1.8,
          size: spark ? 1 + Math.random() * 1.4 : 1.6 + Math.random() * Math.random() * 6,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.4,
          spark,
          shade: Math.random(),
        });
      }
    };

    const impact = () => {
      const g = geom();
      heat = 1;
      flash = 1;
      blows += 1;
      let reset = false;
      if (blows > MAX_BLOWS) {
        // the bar is fully drawn: normalize and start a fresh billet
        blows = 1;
        reset = true;
        len = g.minLen;
      }
      target = g.minLen + g.step * blows;
      if (reduced) len = target;
      spawn(die.x, g.y);
      onStrikeRef.current?.({ blows, drawn: Math.round(blows * 25), reset });
    };

    api.current.strike = (clientX?: number) => {
      const g = geom();
      const rect = canvas.getBoundingClientRect();
      const local = clientX !== undefined ? clientX - rect.left : g.x0 + len * 0.66;
      die.x = Math.min(g.x0 + len - 30, Math.max(g.x0 + 40, local));
      if (reduced) {
        impact();
        draw();
        return;
      }
      if (die.t < 0.25) return; // hammer still on its way down
      die = { t: 0, x: die.x };
    };

    const drawBar = (g: ReturnType<typeof geom>) => {
      const { x0, bh, y } = g;
      const x1 = x0 + len;
      const h = heat;
      // body gradient: cold tongs end → hot drawn tip
      const grad = ctx.createLinearGradient(x0, 0, x1, 0);
      grad.addColorStop(0, ramp(0.02));
      grad.addColorStop(0.16, ramp(0.18 + h * 0.08));
      grad.addColorStop(0.42, ramp(0.42 + h * 0.18));
      grad.addColorStop(0.7, ramp(0.6 + h * 0.26));
      grad.addColorStop(1, ramp(0.72 + h * 0.28));

      ctx.save();
      ctx.shadowColor = `rgba(255,110,24,${0.25 + h * 0.5})`;
      ctx.shadowBlur = 18 + h * 46;
      ctx.beginPath();
      const seg = edge.length / 2;
      for (let i = 0; i <= seg; i++) {
        const px = x0 + (len * i) / seg;
        const py = y + edge[i % edge.length] * 2.2;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      // rounded hot tip
      ctx.quadraticCurveTo(x1 + bh * 0.22, y + bh / 2, x1, y + bh);
      for (let i = seg; i >= 0; i--) {
        const px = x0 + (len * i) / seg;
        const py = y + bh + edge[(i + seg) % edge.length] * 2.2;
        ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      // top highlight and underside shade give the bar volume
      ctx.save();
      ctx.clip();
      const vol = ctx.createLinearGradient(0, y, 0, y + bh);
      vol.addColorStop(0, `rgba(255,248,220,${0.12 + h * 0.18})`);
      vol.addColorStop(0.35, "rgba(255,255,255,0)");
      vol.addColorStop(1, "rgba(0,0,0,0.42)");
      ctx.fillStyle = vol;
      ctx.fillRect(x0, y - 4, len + bh, bh + 8);

      // black scale flecks, dense on the cooler end
      for (const f of flecks) {
        const fx = x0 + f.u * len;
        const fy = y + f.v * bh;
        const coolness = 1 - f.u;
        if (Math.random() > 0.995) continue;
        const a = f.a * (0.25 + coolness * 0.75) * (1.05 - h * 0.35);
        ctx.fillStyle = `rgba(10,8,8,${a})`;
        ctx.fillRect(fx, fy, f.s, f.s * 0.8);
      }
      ctx.restore();
    };

    const steelBlock = (x: number, y: number, w: number, h: number, light: "top" | "bottom") => {
      const gr = ctx.createLinearGradient(x, 0, x + w, 0);
      gr.addColorStop(0, "#1d1f23");
      gr.addColorStop(0.18, "#3b3f45");
      gr.addColorStop(0.5, "#4a4e55");
      gr.addColorStop(0.82, "#2e3136");
      gr.addColorStop(1, "#16171a");
      ctx.fillStyle = gr;
      ctx.fillRect(x, y, w, h);
      if (steel) {
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = steel;
        ctx.fillRect(x, y, w, h);
        ctx.restore();
      }
      // forge light catching the face nearest the bar
      const edgeY = light === "top" ? y : y + h;
      const lg = ctx.createLinearGradient(0, edgeY, 0, light === "top" ? edgeY + 26 : edgeY - 26);
      lg.addColorStop(0, `rgba(255,120,30,${0.22 + heat * 0.38})`);
      lg.addColorStop(1, "rgba(255,120,30,0)");
      ctx.fillStyle = lg;
      ctx.fillRect(x, light === "top" ? edgeY : edgeY - 26, w, 26);
      ctx.fillStyle = "rgba(255,240,210,0.22)";
      ctx.fillRect(x, light === "top" ? edgeY : edgeY - 1, w, 1);
      // chamfered vertical edges
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      ctx.fillRect(x + 2, y, 1, h);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(x + w - 2, y, 2, h);
    };

    const drawDies = (g: ReturnType<typeof geom>) => {
      const dw = Math.max(64, Math.min(124, W * 0.085));
      const x = die.x - dw / 2;
      // lower die sitting on the anvil
      steelBlock(x - 8, g.y + g.bh, dw + 16, H - g.y - g.bh, "top");

      // upper die: falls hard, lifts slow
      let p: number;
      const t = die.t;
      if (t < 0.22) p = Math.pow(t / 0.22, 2.4);
      else if (t < 0.32) p = 1;
      else p = 1 - Math.pow((t - 0.32) / 0.68, 0.7);
      const rest = -H * 0.18;
      const hit = g.y;
      const bottom = rest + (hit - rest) * Math.max(0, Math.min(1, p));
      if (bottom > 0) steelBlock(x, -2, dw, bottom + 2, "bottom");
    };

    const drawParticles = (dt: number) => {
      const next: Particle[] = [];
      for (const p of particles) {
        p.life += dt;
        if (p.life >= p.max) continue;
        p.vy += (p.spark ? 22 : 16) * dt;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        p.rot += p.vr;
        // flakes land and pile on the floor instead of leaving the frame
        const floor = H - 3 - p.shade * 10;
        if (!p.spark && p.y > floor) {
          p.y = floor;
          p.vy *= -0.18;
          p.vx *= 0.55;
          p.vr *= 0.5;
        }
        const k = 1 - p.life / p.max;
        if (p.spark) {
          ctx.strokeStyle = `rgba(255,${180 + Math.round(60 * k)},${90 + Math.round(100 * k)},${k})`;
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 1.6, p.y - p.vy * 1.6);
          ctx.stroke();
        } else {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          const c = 8 + Math.round(p.shade * 30);
          ctx.fillStyle = `rgba(${c},${c - 2},${c - 3},${Math.min(1, k * 1.6)})`;
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
          // the occasional fleck still glowing on its face
          if (p.shade > 0.86) {
            ctx.fillStyle = `rgba(255,110,30,${k * 0.8})`;
            ctx.fillRect(-p.size / 4, -p.size / 6, p.size / 2, p.size / 3);
          }
          ctx.restore();
        }
        if (p.y < H + 20 && p.x > -20 && p.x < W + 20) next.push(p);
      }
      particles = next;
    };

    function draw(dt = 0) {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);
      const g = geom();
      if (!die.x) die.x = g.x0 + len * 0.66;
      // forge light on the floor under the bar
      const fl = ctx!.createRadialGradient(g.x0 + len * 0.8, g.y + g.bh, 0, g.x0 + len * 0.8, g.y + g.bh, W * 0.5);
      fl.addColorStop(0, `rgba(255,90,17,${0.08 + heat * 0.14})`);
      fl.addColorStop(1, "rgba(255,90,17,0)");
      ctx!.fillStyle = fl;
      ctx!.fillRect(0, 0, W, H);

      drawBar(g);
      if (!reduced) drawDies(g);
      drawParticles(dt);
      if (flash > 0) {
        ctx!.fillStyle = `rgba(255,243,196,${flash * 0.16})`;
        ctx!.fillRect(0, 0, W, H);
      }
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (die.t < 1) {
        const before = die.t;
        die.t = Math.min(1, die.t + dt / 0.42);
        if (before < 0.22 && die.t >= 0.22) impact();
      }
      len += (target - len) * Math.min(1, dt * 9);
      heat = Math.max(HEAT_FLOOR, heat - dt * 0.07);
      flash = Math.max(0, flash - dt * 5);
      // ambient sparks while white-hot
      if (heat > 0.75 && Math.random() < heat * 0.08) {
        const g = geom();
        particles.push({
          x: g.x0 + len * (0.55 + Math.random() * 0.45),
          y: g.y + Math.random() * 6,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -1.5 - Math.random() * 3,
          life: 0,
          max: 0.3 + Math.random() * 0.4,
          size: 1,
          rot: 0,
          vr: 0,
          spark: true,
          shade: 0,
        });
      }
      draw(dt);

      const norm = (heat - HEAT_FLOOR) / (1 - HEAT_FLOOR);
      if (Math.abs(norm - lastHeatWrite) > 0.004 || now - lastTempWrite > 120) {
        onHeatRef.current?.(norm, Math.round((760 + heat * 520) / 5) * 5);
        lastHeatWrite = norm;
        lastTempWrite = now;
      }
      if (visible) raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && !document.hidden;
      cancelAnimationFrame(raf);
      if (visible && !reduced) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(wrap);

    let intro = 0;
    if (reduced) {
      heat = 0.8;
      onHeatRef.current?.(0.4, 1180);
      draw();
    } else {
      raf = requestAnimationFrame(tick);
      if (autoStrikeMs > 0) intro = window.setTimeout(() => api.current.strike(), autoStrikeMs);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(intro);
      ro.disconnect();
      io.disconnect();
    };
  }, [autoStrikeMs]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-full w-full cursor-pointer touch-manipulation"
        onPointerDown={(e) => api.current.strike(e.clientX)}
      />
    </div>
  );
}
