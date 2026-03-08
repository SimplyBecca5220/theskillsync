import { useEffect, useRef } from "react";

interface ConfettiPiece {
  x: number;
  y: number;
  r: number;
  color: string;
  vx: number;
  vy: number;
  rot: number;
  rotSpeed: number;
  w: number;
  h: number;
}

const COLORS = [
  "hsl(174, 72%, 50%)",
  "hsl(265, 60%, 60%)",
  "hsl(45, 90%, 55%)",
  "hsl(0, 72%, 55%)",
  "hsl(210, 80%, 60%)",
  "hsl(130, 60%, 50%)",
];

export function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: ConfettiPiece[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      r: 0,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 4 + 3,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 2,
    }));

    let frame: number;
    let elapsed = 0;

    const animate = () => {
      elapsed++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.rot += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - elapsed / 120);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (elapsed < 120) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none"
    />
  );
}
