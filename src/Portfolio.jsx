import React, { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    name: "Yesod",
    description:
      "Experimental Ethereum library for writing hyper-efficient smart contracts. Minimal abstractions over raw EVM opcodes. Inspired by Solmate and Solady.",
    link: "https://github.com/0x11semprez/yesod",
  },
  {
    name: "Ein-Sof",
    description:
      "Pure C algorithmics laboratory. Sorting, searching, graph traversal, dynamic programming. No dependencies. No mercy.",
    link: "https://github.com/0x11semprez/ein-sof",
  },
  {
    name: "ASA",
    description:
      "B2B SaaS platform for agency teams. Centralized messaging, meeting scheduling, task planning, and collaborative notes. CTO & Solutions Architect.",
    link: "https://asacore.xyz",
  },
];

const CONTACTS = [
  {
    label: "email",
    value: "traoresemprez@icloud.com",
    href: "mailto:traoresemprez@icloud.com",
  },
  {
    label: "github",
    value: "github.com/0x11semprez",
    href: "https://github.com/0x11semprez",
  },
  { label: "discord", value: "0x11semprez", copy: true },
  {
    label: "telegram",
    value: "pupp3tm4st3r",
    href: "https://t.me/pupp3tm4st3r",
  },
];

const GLITCH_CHARS = "╔╗╚╝║═╠╣╦╩╬─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌐¬½¼¡«»⟁⟐⚙∷∴∵≈≠±×÷";
const GHOST_FRAGMENTS = [
  "0x11semprez::",
  "kassim@root ~",
  "ERR::0xDEAD",
  "// undefined",
  "seg fault",
  "SIGKILL",
  "node::corrupt",
  "mem::leak",
  "panic!()",
  "0xFFFFFF",
  "DROP TABLE",
  "::::::::",
  ">>>/dev/null",
  "chmod 000",
  "kill -9",
  "KERNEL PANIC",
  "⟁ BREACH ⟁",
  "unsafe { }",
  "core dumped",
  "ENOMEM",
  "stack overflow",
];

function ScreenGlitch() {
  const canvasRef = useRef(null);
  const glitches = useRef([]);
  const frame = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame.current++;

      const w = canvas.width;
      const h = canvas.height;

      // --- AMBIENT NOISE PATCHES ---
      if (Math.random() < 0.18) {
        const nx = Math.random() * w;
        const ny = Math.random() * h;
        const nw = 25 + Math.random() * 80;
        const nh = 2 + Math.random() * 8;
        for (let i = 0; i < nw; i += 2) {
          if (Math.random() < 0.45) {
            ctx.fillStyle = `rgba(0,0,0,${0.025 + Math.random() * 0.07})`;
            ctx.fillRect(nx + i, ny + Math.random() * nh, 1, 1);
          }
        }
      }

      // --- HORIZONTAL TEAR LINES ---
      if (Math.random() < 0.09) {
        const tearY = Math.random() * h;
        const tearH = 1 + Math.random() * 2;
        const offset = (Math.random() - 0.5) * 8;
        ctx.fillStyle = `rgba(0,0,0,${0.015 + Math.random() * 0.04})`;
        ctx.fillRect(offset, tearY, w, tearH);
      }

      // --- GHOST TEXT ---
      if (Math.random() < 0.04) {
        const txt = GHOST_FRAGMENTS[Math.floor(Math.random() * GHOST_FRAGMENTS.length)];
        const gx = Math.random() * w * 0.85;
        const gy = Math.random() * h;
        const size = 8 + Math.random() * 5;

        ctx.save();
        ctx.font = `${size}px monospace`;
        ctx.globalAlpha = 0.05 + Math.random() * 0.1;

        if (Math.random() < 0.5) {
          ctx.fillStyle = "rgba(255,0,0,0.5)";
          ctx.fillText(txt, gx - 1, gy);
          ctx.fillStyle = "rgba(0,0,255,0.5)";
          ctx.fillText(txt, gx + 1, gy);
        }
        ctx.fillStyle = "#000";
        ctx.fillText(txt, gx, gy);
        ctx.restore();

        glitches.current.push({
          type: "text",
          txt, x: gx, y: gy, size, life: 4 + Math.floor(Math.random() * 10),
        });
      }

      // draw persistent glitch elements
      glitches.current.forEach((g) => {
        g.life--;
        if (g.life <= 0) return;
        if (g.type === "text") {
          ctx.save();
          ctx.font = `${g.size}px monospace`;
          ctx.globalAlpha = 0.035 + (g.life * 0.01);
          ctx.fillStyle = "#000";
          ctx.fillText(g.txt, g.x + (Math.random() - 0.5) * 3, g.y);
          ctx.restore();
        }
      });
      glitches.current = glitches.current.filter((g) => g.life > 0);

      // --- STATIC BURST ---
      if (Math.random() < 0.045) {
        const sx = Math.random() * w;
        const sy = Math.random() * h;
        const sw = 50 + Math.random() * 140;
        const sh = 12 + Math.random() * 40;
        for (let y = 0; y < sh; y += 2) {
          for (let x = 0; x < sw; x += 2) {
            if (Math.random() < 0.35) {
              ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.06})`;
              ctx.fillRect(sx + x, sy + y, 1, 1);
            }
          }
        }
      }

      // --- SCAN LINES ---
      if (frame.current % 2 === 0) {
        for (let y = 0; y < h; y += 3) {
          ctx.fillStyle = "rgba(0,0,0,0.008)";
          ctx.fillRect(0, y, w, 1);
        }
      }

      // --- FLICKER ---
      if (Math.random() < 0.012) {
        ctx.fillStyle = `rgba(0,0,0,${0.012 + Math.random() * 0.03})`;
        ctx.fillRect(0, 0, w, h);
      }

      // --- CORRUPTION BAND ---
      if (Math.random() < 0.022) {
        const bandY = Math.random() * h;
        const bandH = 4 + Math.random() * 18;
        ctx.fillStyle = `rgba(0,0,0,${0.012 + Math.random() * 0.04})`;
        ctx.fillRect(0, bandY, w, bandH);

        ctx.save();
        ctx.font = "8px monospace";
        ctx.globalAlpha = 0.07;
        ctx.fillStyle = "#000";
        for (let x = 0; x < w; x += 10) {
          if (Math.random() < 0.35) {
            const c = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            ctx.fillText(c, x, bandY + bandH / 2 + 3);
          }
        }
        ctx.restore();
      }

      // --- BLOCK DISPLACEMENT ---
      // rare rectangular block that shifts slightly
      if (Math.random() < 0.02) {
        const bx = Math.random() * w;
        const by = Math.random() * h;
        const bw = 30 + Math.random() * 100;
        const bh = 4 + Math.random() * 12;
        const shift = (Math.random() - 0.5) * 10;
        ctx.fillStyle = `rgba(255,255,255,0.9)`;
        ctx.fillRect(bx, by, bw, bh);
        ctx.fillStyle = `rgba(0,0,0,${0.01 + Math.random() * 0.03})`;
        ctx.fillRect(bx + shift, by, bw, bh);
      }

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9998,
      }}
    />
  );
}

function CursorEffect() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const trail = useRef([]);
  const glitchFrame = useRef(0);
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e) => {
      const speed = Math.sqrt(
        (e.clientX - lastMouse.current.x) ** 2 +
        (e.clientY - lastMouse.current.y) ** 2
      );
      lastMouse.current.x = e.clientX;
      lastMouse.current.y = e.clientY;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const count = Math.min(Math.floor(speed / 3) + 2, 8);
      for (let i = 0; i < count; i++) {
        trail.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          life: 1,
          glitchX: (Math.random() - 0.5) * 60,
          glitchY: (Math.random() - 0.5) * 20,
          char: GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
          size: 7 + Math.random() * 8,
          rgb: Math.random() < 0.3,
        });
      }
      if (trail.current.length > 120) trail.current.splice(0, trail.current.length - 120);
    };
    window.addEventListener("mousemove", handleMove);

    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      glitchFrame.current++;

      const isGlitch = Math.random() < 0.18;
      const isBigGlitch = Math.random() < 0.04;

      trail.current.forEach((p) => {
        p.life -= 0.015;
        if (p.life <= 0) return;

        const alpha = p.life * 0.7;
        const dx = isGlitch ? (Math.random() - 0.5) * 80 : p.glitchX * (1 - p.life);
        const dy = p.glitchY * (1 - p.life);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font = `${p.size}px monospace`;

        if (p.rgb || isBigGlitch) {
          ctx.fillStyle = "rgba(255,0,0,0.4)";
          ctx.fillText(p.char, p.x + dx - 2, p.y + dy - 1);
          ctx.fillStyle = "rgba(0,0,255,0.4)";
          ctx.fillText(p.char, p.x + dx + 2, p.y + dy + 1);
          ctx.fillStyle = "rgba(0,0,0,0.6)";
          ctx.fillText(p.char, p.x + dx, p.y + dy);
        } else {
          ctx.fillStyle = "#000";
          ctx.fillText(p.char, p.x + dx, p.y + dy);
        }
        ctx.restore();
      });
      trail.current = trail.current.filter((p) => p.life > 0);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const jx = isGlitch ? (Math.random() - 0.5) * 20 : 0;
      const jy = isGlitch ? (Math.random() - 0.5) * 20 : 0;

      ctx.save();

      if (isGlitch) {
        ctx.beginPath();
        ctx.arc(mx + jx - 3, my + jy, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,0,0,0.5)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mx + jx + 3, my + jy, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,255,0.5)";
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(mx + jx, my + jy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.9)";
      ctx.fill();

      if (isGlitch) {
        const barCount = isBigGlitch ? 8 : 4;
        for (let i = 0; i < barCount; i++) {
          const barY = my + (Math.random() - 0.5) * 120;
          const barW = 30 + Math.random() * 150;
          const barX = mx - barW / 2 + (Math.random() - 0.5) * 80;
          const barH = isBigGlitch ? 1 + Math.random() * 3 : 1;
          ctx.fillStyle = `rgba(0,0,0,${0.03 + Math.random() * 0.12})`;
          ctx.fillRect(barX, barY, barW, barH);
        }
      }

      if (isBigGlitch) {
        const bandY = my + (Math.random() - 0.5) * 200;
        const bandH = 2 + Math.random() * 8;
        ctx.fillStyle = `rgba(0,0,0,${0.02 + Math.random() * 0.06})`;
        ctx.fillRect(0, bandY, canvas.width, bandH);
        ctx.font = "10px monospace";
        ctx.fillStyle = `rgba(0,0,0,${0.1 + Math.random() * 0.2})`;
        ctx.fillText("0x11semprez::", Math.random() * canvas.width, bandY + bandH / 2 + 3);
      }

      ctx.restore();

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

export default function Portfolio() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (value, label) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { cursor: none !important; }
        ::selection { background: #000; color: #fff; }
        a:hover {
          text-decoration-style: wavy !important;
          text-decoration-color: #000 !important;
          transition: all 0.1s;
        }
      `}</style>

      <ScreenGlitch />
      <CursorEffect />

      <div
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        className="min-h-screen bg-white text-black"
      >
        {/* INTRO */}
        <section className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-24 max-w-3xl">
          <div className="text-sm leading-loose text-neutral-700 max-w-xl">
            <p>0x11semprez's real name is kassim</p>
            <p>kassim is disciplined.</p>
            <p>kassim likes beretta guns.</p>
            <p>kassim hates people with no critical thinking.</p>
            <p>kassim likes japan.</p>
            <p>kassim likes to suffer.</p>
            <p>
              kassim is the son of booba, ateyaba, pnl && clams casino &&
              partynextdoor.
            </p>
            <p>kassim hates the beach unless with his future lover.</p>
            <p>kassim likes glocks.</p>
            <p>kassim thinks a lot.</p>
            <p>kassim is kind.</p>
            <p>kassim likes ethereum.</p>
            <p>kassim hates to suffer.</p>
            <p>kassim likes basketball.</p>
            <p>kassim customizes weapons.</p>
            <p>kassim likes china.</p>
            <p>kassim is blunt.</p>
            <p>kassim hates liars.</p>
            <p>kassim likes building projects and starting from scratch.</p>
            <p>kassim is mean.</p>
            <p>kassim likes the usa.</p>
            <p>
              kassim has 5 women in his life they are the princesses of his
              heart.
            </p>
            <p>0x11semprez is called kassim.</p>
            <p>kassim knows and lives with it.</p>
            <p>kassim prays.</p>
          </div>
        </section>

        {/* HERO */}
        <section className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-24 max-w-3xl">
          <p className="text-2xl sm:text-3xl leading-relaxed tracking-tight">
            &gt; systems don't lie. i build the ones that prove it.
          </p>

          <p className="mt-12 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl">
            // cloud architect and systems engineer. rust, go, solidity, c. i
            design infrastructure that scales and contracts that execute. no
            abstractions without purpose.
          </p>
        </section>

        {/* PROJECTS */}
        <section className="px-6 sm:px-12 md:px-24 max-w-3xl pb-32">
          <p className="text-xs text-neutral-400 mb-16">// projects</p>

          <div className="space-y-20">
            {PROJECTS.map((project) => (
              <div key={project.name}>
                <p className="text-base font-medium">{project.name}</p>
                <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs text-neutral-400 underline underline-offset-4 decoration-neutral-300 block"
                >
                  {project.link.replace("https://", "")}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section className="px-6 sm:px-12 md:px-24 max-w-3xl pb-32">
          <p className="text-xs text-neutral-400 mb-8">// stack</p>
          <p className="text-sm">
            <span className="text-neutral-400">languages</span> — rust —
            solidity — noir — c
          </p>
          <p className="text-sm mt-3">
            <span className="text-neutral-400">tools</span> — aws — docker — k8s
            — git — ci/cd — finops
          </p>
        </section>

        {/* HACKATHONS */}
        <section className="px-6 sm:px-12 md:px-24 max-w-3xl pb-32">
          <p className="text-xs text-neutral-400 mb-6">// hackathons</p>
          <p className="text-sm">&gt; total_earnings:: 600€</p>
        </section>

        {/* CONTACT */}
        <section className="px-6 sm:px-12 md:px-24 max-w-3xl pb-24">
          <p className="text-xs text-neutral-400 mb-8">// contact</p>

          <div className="space-y-2">
            {CONTACTS.map((c) => (
              <p key={c.label} className="text-sm">
                <span className="text-neutral-400 inline-block w-24">
                  {c.label}
                </span>
                <span className="text-neutral-400 mr-2">—</span>
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-neutral-300"
                  >
                    {c.value}
                  </a>
                ) : (
                  <span
                    onClick={() => handleCopy(c.value, c.label)}
                    className="cursor-pointer underline underline-offset-4 decoration-neutral-300"
                  >
                    {copied === c.label ? "copied" : c.value}
                  </span>
                )}
              </p>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
