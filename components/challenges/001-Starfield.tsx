'use client';

import { useEffect, useRef } from 'react';

class Star {
  x: number;
  y: number;
  z: number;
  pz: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.x = (Math.random() - 0.5) * width * 2;
    this.y = (Math.random() - 0.5) * height * 2;
    this.z = Math.random() * width;
    this.pz = this.z;
  }

  update(speed: number) {
    this.z -= speed;
    if (this.z < 1) {
      this.z = this.canvasWidth;
      this.x = (Math.random() - 0.5) * this.canvasWidth * 2;
      this.y = (Math.random() - 0.5) * this.canvasHeight * 2;
      this.pz = this.z;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const cx = this.canvasWidth / 2;
    const cy = this.canvasHeight / 2;

    const sx = (this.x / this.z) * this.canvasWidth + cx;
    const sy = (this.y / this.z) * this.canvasHeight + cy;

    const r = Math.max(0, (1 - this.z / this.canvasWidth) * 3);

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();

    const px = (this.x / this.pz) * this.canvasWidth + cx;
    const py = (this.y / this.pz) * this.canvasHeight + cy;

    this.pz = this.z;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = r;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(sx, sy);
    ctx.stroke();
  }
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        stars = Array.from({ length: 800 }, () => new Star(canvas.width, canvas.height));
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const speed = 10;

    const render = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.update(speed);
        star.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-[600px] md:h-[700px] bg-black rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)] relative border border-slate-800">
       <canvas ref={canvasRef} className="block w-full h-full" />
       <div className="absolute top-4 left-4 flex gap-2">
         <div className="bg-slate-900/80 backdrop-blur text-xs font-mono px-3 py-1.5 rounded-full border border-slate-700 text-slate-300">
           Vanilla HTML5 Canvas
         </div>
         <div className="bg-slate-900/80 backdrop-blur text-xs font-mono px-3 py-1.5 rounded-full border border-slate-700 text-cyan-400">
           800 Particles
         </div>
       </div>
    </div>
  );
}