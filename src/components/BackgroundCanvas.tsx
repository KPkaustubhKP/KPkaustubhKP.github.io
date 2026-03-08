import React, { useEffect, useRef } from 'react';

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SPACING = 64;
    const MOUSE_RADIUS = 110;
    const SPRING = 0.08;
    const FRICTION = 0.75;

    let W = 0, H = 0;
    let dots: { ox: number; oy: number; x: number; y: number; vx: number; vy: number }[] = [];
    let mouse = { x: -9999, y: -9999 };
    let raf = 0;

    const isDark = () => document.documentElement.classList.contains('dark');

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      dots = [];
      for (let x = SPACING / 2; x < W; x += SPACING) {
        for (let y = SPACING / 2; y < H; y += SPACING) {
          dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
        }
      }
    };

    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const dark = isDark();
      const primary = [201, 27, 104]; // #c91b68

      for (const d of dots) {
        const dx = mouse.x - d.ox;
        const dy = mouse.y - d.oy;
        const dist = Math.hypot(dx, dy);
        const inRange = dist < MOUSE_RADIUS;

        // Repulsion
        if (inRange) {
          const force = (1 - dist / MOUSE_RADIUS) * 1.2;
          d.vx -= (dx / dist) * force * 8;
          d.vy -= (dy / dist) * force * 8;
        }

        // Spring back
        d.vx += (d.ox - d.x) * SPRING;
        d.vy += (d.oy - d.y) * SPRING;
        d.vx *= FRICTION;
        d.vy *= FRICTION;
        d.x += d.vx;
        d.y += d.vy;

        const proximity = inRange ? 1 - dist / MOUSE_RADIUS : 0;
        const baseAlpha = dark ? 0.09 : 0.07;
        const alpha = baseAlpha + proximity * 0.55;
        const radius = 1 + proximity * 1.8;

        if (proximity > 0.05) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${primary[0]},${primary[1]},${primary[2]},${alpha.toFixed(3)})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
          ctx.fillStyle = dark ? `rgba(80,80,80,${baseAlpha})` : `rgba(180,170,165,${baseAlpha})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    />
  );
};

export default BackgroundCanvas;
