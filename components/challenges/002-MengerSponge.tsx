'use client';

import { useEffect, useRef, useState } from 'react';

type Point3D = {
  x: number;
  y: number;
  z: number;
};

type Cube = {
  center: Point3D;
  size: number;
};

const FACE_INDICES = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [0, 4, 7, 3],
  [1, 5, 6, 2],
  [3, 2, 6, 7],
  [0, 1, 5, 4],
] as const;

const BASE_SIZE = 180;

function createMenger(level: number, size: number) {
  const cubes: Cube[] = [];

  function subdivide(center: Point3D, currentSize: number, depth: number) {
    if (depth === 0) {
      cubes.push({ center, size: currentSize });
      return;
    }

    const childSize = currentSize / 3;

    for (const x of [-1, 0, 1]) {
      for (const y of [-1, 0, 1]) {
        for (const z of [-1, 0, 1]) {
          const zeroCount = [x, y, z].filter((value) => value === 0).length;

          if (zeroCount >= 2) {
            continue;
          }

          subdivide(
            {
              x: center.x + x * childSize,
              y: center.y + y * childSize,
              z: center.z + z * childSize,
            },
            childSize,
            depth - 1
          );
        }
      }
    }
  }

  subdivide({ x: 0, y: 0, z: 0 }, size, level);

  return cubes;
}

function rotatePoint(point: Point3D, angleX: number, angleY: number): Point3D {
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const xzX = point.x * cosY - point.z * sinY;
  const xzZ = point.x * sinY + point.z * cosY;

  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);

  return {
    x: xzX,
    y: point.y * cosX - xzZ * sinX,
    z: point.y * sinX + xzZ * cosX,
  };
}

function projectPoint(point: Point3D, width: number, height: number) {
  const cameraDistance = 540;
  const perspective = cameraDistance / (cameraDistance - point.z);
  const scale = Math.min(width, height) * 0.34;

  return {
    x: width / 2 + point.x * perspective * (scale / BASE_SIZE),
    y: height / 2 + point.y * perspective * (scale / BASE_SIZE),
  };
}

function getCubeVertices(center: Point3D, size: number) {
  const half = size / 2;

  return [
    { x: center.x - half, y: center.y - half, z: center.z - half },
    { x: center.x + half, y: center.y - half, z: center.z - half },
    { x: center.x + half, y: center.y + half, z: center.z - half },
    { x: center.x - half, y: center.y + half, z: center.z - half },
    { x: center.x - half, y: center.y - half, z: center.z + half },
    { x: center.x + half, y: center.y - half, z: center.z + half },
    { x: center.x + half, y: center.y + half, z: center.z + half },
    { x: center.x - half, y: center.y + half, z: center.z + half },
  ];
}

function getFaceNormal(
  a: Point3D,
  b: Point3D,
  c: Point3D
): Point3D {
  const ab = {
    x: b.x - a.x,
    y: b.y - a.y,
    z: b.z - a.z,
  };
  const ac = {
    x: c.x - a.x,
    y: c.y - a.y,
    z: c.z - a.z,
  };

  return {
    x: ab.y * ac.z - ab.z * ac.y,
    y: ab.z * ac.x - ab.x * ac.z,
    z: ab.x * ac.y - ab.y * ac.x,
  };
}

function fillFace(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  color: string
) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let index = 1; index < points.length; index += 1) {
    ctx.lineTo(points[index].x, points[index].y);
  }

  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.65)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

export default function MengerSponge() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cubeCounts = {
    0: 1,
    1: 20,
    2: 400,
  } as const;
  const cubeCacheRef = useRef<Record<number, Cube[]>>({
    0: createMenger(0, BASE_SIZE),
    1: createMenger(1, BASE_SIZE),
    2: createMenger(2, BASE_SIZE),
  });

  const [level, setLevel] = useState(2);
  const [rotationSpeed, setRotationSpeed] = useState(18);
  const [spacing, setSpacing] = useState(18);

  const levelRef = useRef(level);
  const rotationSpeedRef = useRef(rotationSpeed);
  const spacingRef = useRef(spacing);

  useEffect(() => {
    levelRef.current = level;
  }, [level]);

  useEffect(() => {
    rotationSpeedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    spacingRef.current = spacing;
  }, [spacing]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    let animationFrameId = 0;
    let logicalWidth = 0;
    let logicalHeight = 0;

    const resizeCanvas = () => {
      if (!canvas.parentElement) {
        return;
      }

      logicalWidth = canvas.parentElement.clientWidth;
      logicalHeight = canvas.parentElement.clientHeight;

      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = logicalWidth * devicePixelRatio;
      canvas.height = logicalHeight * devicePixelRatio;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, logicalWidth, logicalHeight);

      const gradient = context.createLinearGradient(0, 0, logicalWidth, logicalHeight);
      gradient.addColorStop(0, '#020617');
      gradient.addColorStop(1, '#0f172a');
      context.fillStyle = gradient;
      context.fillRect(0, 0, logicalWidth, logicalHeight);

      const cubes = cubeCacheRef.current[levelRef.current];
      const spread = 1 + spacingRef.current / 100;
      const cubeSizeFactor = 1 - spacingRef.current / 260;
      const angleY = time * (rotationSpeedRef.current / 5000);
      const angleX = 0.55 + Math.sin(time / 1800) * 0.12;

      const transformedCubes = cubes
        .map((cube) => {
          const expandedCenter = {
            x: cube.center.x * spread,
            y: cube.center.y * spread,
            z: cube.center.z * spread,
          };
          const rotatedCenter = rotatePoint(expandedCenter, angleX, angleY);
          const rotatedVertices = getCubeVertices(
            expandedCenter,
            cube.size * cubeSizeFactor
          ).map((vertex) => rotatePoint(vertex, angleX, angleY));

          return {
            avgDepth: rotatedCenter.z,
            vertices: rotatedVertices,
          };
        })
        .sort((left, right) => left.avgDepth - right.avgDepth);

      for (const cube of transformedCubes) {
        for (const [faceIndex, indices] of FACE_INDICES.entries()) {
          const faceVertices = indices.map((index) => cube.vertices[index]);
          const normal = getFaceNormal(faceVertices[0], faceVertices[1], faceVertices[2]);

          if (normal.z <= 0) {
            continue;
          }

          const projected = faceVertices.map((vertex) =>
            projectPoint(vertex, logicalWidth, logicalHeight)
          );

          const brightness = 48 + normal.z / 28;
          const hue = 192 + faceIndex * 4;
          fillFace(context, projected, `hsla(${hue}, 72%, ${brightness}%, 0.92)`);
        }
      }

      context.fillStyle = 'rgba(148, 163, 184, 0.8)';
      context.font = '12px monospace';
      context.fillText(
        `${cubeCacheRef.current[levelRef.current].length} cubes rendered`,
        24,
        logicalHeight - 24
      );

      animationFrameId = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw(0);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const cubeCount = cubeCounts[level as keyof typeof cubeCounts];

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-[0_0_40px_rgba(6,182,212,0.1)] md:h-[700px]">
      <canvas ref={canvasRef} className="block h-full w-full" />

      <div className="absolute left-4 top-4 z-10 flex max-w-[calc(100%-2rem)] flex-wrap gap-2">
        <div className="select-none rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 font-mono text-xs text-slate-300 backdrop-blur">
          Voxel Canvas
        </div>
        <div className="select-none rounded-full border border-cyan-500/40 bg-slate-900/80 px-3 py-1.5 font-mono text-xs text-cyan-300 backdrop-blur">
          {cubeCount} cubes
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-10 grid gap-3 rounded-2xl border border-slate-700/80 bg-slate-950/75 p-4 backdrop-blur md:max-w-xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="min-w-20 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            Depth
          </span>
          {[0, 1, 2].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setLevel(value)}
              className={`rounded-full px-3 py-1.5 font-mono text-xs transition-colors ${
                level === value
                  ? 'bg-cyan-500 text-slate-950'
                  : 'border border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-500/60 hover:text-cyan-300'
              }`}
            >
              L{value}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 font-mono text-xs text-slate-300">
          <span className="min-w-20 uppercase tracking-[0.2em] text-slate-500">
            Spin
          </span>
          <input
            type="range"
            min="4"
            max="36"
            value={rotationSpeed}
            onChange={(event) => setRotationSpeed(Number(event.target.value))}
            className="h-1 flex-1 cursor-ew-resize appearance-none rounded-lg bg-slate-700 accent-cyan-400"
          />
          <span className="min-w-[4ch] text-right text-cyan-300">{rotationSpeed}</span>
        </label>

        <label className="flex items-center gap-3 font-mono text-xs text-slate-300">
          <span className="min-w-20 uppercase tracking-[0.2em] text-slate-500">
            Gap
          </span>
          <input
            type="range"
            min="0"
            max="24"
            value={spacing}
            onChange={(event) => setSpacing(Number(event.target.value))}
            className="h-1 flex-1 cursor-ew-resize appearance-none rounded-lg bg-slate-700 accent-cyan-400"
          />
          <span className="min-w-[4ch] text-right text-cyan-300">{spacing}</span>
        </label>
      </div>
    </div>
  );
}
