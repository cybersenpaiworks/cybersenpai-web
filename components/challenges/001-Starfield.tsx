'use client';

import { useEffect, useRef, useState } from 'react';

class Star {
  x: number;
  y: number;
  z: number;
  pz: number;

  constructor(initialWidth: number, initialHeight: number) {
    this.x = (Math.random() - 0.5) * initialWidth * 2;
    this.y = (Math.random() - 0.5) * initialHeight * 2;
    this.z = Math.random() * initialWidth;
    this.pz = this.z;
  }

  update(speed: number, currentWidth: number, currentHeight: number) {
    this.z -= speed;
    if (this.z < 1) {
      this.z = currentWidth;
      this.x = (Math.random() - 0.5) * currentWidth * 2;
      this.y = (Math.random() - 0.5) * currentHeight * 2;
      this.pz = this.z;
    }
  }

  draw(ctx: CanvasRenderingContext2D, currentWidth: number, currentHeight: number) {
    const cx = currentWidth / 2;
    const cy = currentHeight / 2;

    const sx = (this.x / this.z) * currentWidth + cx;
    const sy = (this.y / this.z) * currentHeight + cy;

    const r = Math.max(0, (1 - this.z / currentWidth) * 3);

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();

    const px = (this.x / this.pz) * currentWidth + cx;
    const py = (this.y / this.pz) * currentHeight + cy;

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

  const [speed, setSpeed] = useState(15);
  const [particleCount, setParticleCount] = useState(800);
  const [showSpeedSlider, setShowSpeedSlider] = useState(false);
  const [showParticleSlider, setShowParticleSlider] = useState(false);

  const speedControlRef = useRef<HTMLDivElement>(null);
  const particleControlRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (speedControlRef.current && !speedControlRef.current.contains(event.target as Node)) {
        setShowSpeedSlider(false);
      }
      if (particleControlRef.current && !particleControlRef.current.contains(event.target as Node)) {
        setShowParticleSlider(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const speedRef = useRef(speed);
  const particleCountRef = useRef(particleCount);

  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { particleCountRef.current = particleCount; }, [particleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let isInitialized = false;

    let logicalWidth = 0;
    let logicalHeight = 0;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;

      logicalWidth = canvas.parentElement.clientWidth;
      logicalHeight = canvas.parentElement.clientHeight;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = logicalWidth * dpr;
      canvas.height = logicalHeight * dpr;

      ctx.scale(dpr, dpr);

      if (!isInitialized) {
        stars = Array.from({ length: particleCountRef.current }, () => new Star(logicalWidth, logicalHeight));
        isInitialized = true;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);

      const currentSpeed = speedRef.current;
      const targetCount = particleCountRef.current;

      if (stars.length < targetCount) {
        const toAdd = targetCount - stars.length;
        for (let i = 0; i < toAdd; i++) {
          const newStar = new Star(logicalWidth, logicalHeight);
          // Randomize z to avoid "wall" effect when adding particles
          newStar.z = Math.random() * logicalWidth;
          newStar.pz = newStar.z;
          stars.push(newStar);
        }
      } else if (stars.length > targetCount) {
        stars.splice(targetCount);
      }

      stars.forEach(star => {
        star.update(currentSpeed, logicalWidth, logicalHeight);
        star.draw(ctx, logicalWidth, logicalHeight);
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
    <div className="w-full h-150 md:h-175 bg-black rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)] relative border border-slate-800">
      <canvas ref={canvasRef} className="block w-full h-full" />

      <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
        <div className="bg-slate-900/80 backdrop-blur text-xs font-mono px-3 py-1.5 rounded-full border border-slate-700 text-slate-400 select-none">
          Vanilla HTML5 Canvas
        </div>

        {/* Speed Control */}
        <div
          ref={speedControlRef}
          onClick={() => {
            setShowSpeedSlider(!showSpeedSlider);
            setShowParticleSlider(false); // Close other slider
          }}
          className={`bg-slate-900/80 backdrop-blur text-xs font-mono px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-2 select-none ${showSpeedSlider ? 'border-cyan-500 text-cyan-400' : 'border-slate-700 text-slate-300 hover:border-slate-500'}`}
        >
          {showSpeedSlider ? (
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <span>Speed</span>
              <input
                type="range" min="1" max="50" value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-20 h-1 bg-slate-700 rounded-lg appearance-none accent-cyan-400 cursor-ew-resize"
              />
              <span className="min-w-[2ch]">{speed}</span>
            </div>
          ) : (
            <>Speed: {speed}</>
          )}
        </div>

        {/* Particle Control */}
        <div
          ref={particleControlRef}
          onClick={() => {
            setShowParticleSlider(!showParticleSlider);
            setShowSpeedSlider(false); // Close other slider
          }}
          className={`bg-slate-900/80 backdrop-blur text-xs font-mono px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-2 select-none ${showParticleSlider ? 'border-cyan-500 text-cyan-400' : 'border-slate-700 text-cyan-400 hover:border-cyan-500/50'}`}
        >
          {showParticleSlider ? (
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <span>Particles</span>
              <input
                type="range" min="50" max="2000" step="50" value={particleCount}
                onChange={(e) => setParticleCount(Number(e.target.value))}
                className="w-24 h-1 bg-slate-700 rounded-lg appearance-none accent-cyan-400 cursor-ew-resize"
              />
              <span className="min-w-[4ch]">{particleCount}</span>
            </div>
          ) : (
            <>
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
              {particleCount} Particles
            </>
          )}
        </div>
      </div>
    </div>
  );
}