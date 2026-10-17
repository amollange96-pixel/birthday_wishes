import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  fadeSpeed: number;
  color: string;
  type: 'heart' | 'sparkle' | 'bokeh';
  rotation: number;
  rotationSpeed: number;
}

export const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(244, 185, 203, ', // soft rose
      'rgba(245, 194, 133, ', // champagne gold
      'rgba(255, 230, 240, ', // blush white
      'rgba(216, 120, 160, ', // warm berry
    ];

    const particleCount = Math.min(45, Math.floor(width / 35));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(width, height, colors, true));
    }

    function createParticle(w: number, h: number, colList: string[], randomY = false): Particle {
      const typeRand = Math.random();
      const type: 'heart' | 'sparkle' | 'bokeh' =
        typeRand < 0.25 ? 'heart' : typeRand < 0.65 ? 'sparkle' : 'bokeh';

      return {
        x: Math.random() * w,
        y: randomY ? Math.random() * h : h + 20,
        size: type === 'heart' ? Math.random() * 8 + 8 : Math.random() * 3 + 2,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: 0.1,
        maxOpacity: Math.random() * 0.45 + 0.2,
        fadeSpeed: Math.random() * 0.005 + 0.002,
        color: colList[Math.floor(Math.random() * colList.length)],
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
      };
    }

    function drawHeart(c: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number) {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.3, 0, size);
      c.bezierCurveTo(0, (size + topCurveHeight) / 1.3, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.opacity < p.maxOpacity) {
          p.opacity += p.fadeSpeed;
        }

        ctx.fillStyle = `${p.color}${p.opacity})`;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.rotation);
        } else if (p.type === 'sparkle') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          // soft cross shine
          ctx.fillRect(p.x - p.size * 2, p.y - 0.5, p.size * 4, 1);
          ctx.fillRect(p.x - 0.5, p.y - p.size * 2, 1, p.size * 4);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Reset if moved off screen
        if (p.y < -30 || p.x < -30 || p.x > width + 30) {
          particles[i] = createParticle(width, height, colors, false);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-75"
      aria-hidden="true"
    />
  );
};
