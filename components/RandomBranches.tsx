"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const r180 = Math.PI;
const r90 = Math.PI / 2;
const r15 = Math.PI / 12;
const color = "#ff1717";
const opacity = 0.08;

const MIN_BRANCH = 8;
const MAX_BRANCH_LENGTH = 250; // Maximum branch length in pixels

function initCanvas(canvas: HTMLCanvasElement, width = 400, height = 400) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Unable to get 2D context");
  }

  // Use device pixel ratio for high-DPI displays
  const dpi = window.devicePixelRatio || 1;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = Math.floor(width * dpi);
  canvas.height = Math.floor(height * dpi);
  ctx.scale(dpi, dpi);

  return { ctx, dpi };
}

function polarToCartesian(x = 0, y = 0, r = 0, theta = 0) {
  const dx = r * Math.cos(theta);
  const dy = r * Math.sin(theta);
  return [x + dx, y + dy];
}

const RandomBranches = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null
  );

  const random = Math.random;

  const resizeHandler = useCallback(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (!size || size.width === 0 || size.height === 0) return;

    const canvas = canvasRef.current!;
    const { ctx } = initCanvas(canvas, size.width, size.height);
    const { width, height } = canvas;

    let steps: (() => void)[] = [];
    let prevSteps: (() => void)[] = [];

    const step = (
      x: number,
      y: number,
      rad: number,
      counter = { value: 0, totalLength: 0 }
    ) => {
      const length = random() * 8;
      counter.value += 1;
      counter.totalLength += length;

      // Stop growth if the branch exceeds the maximum length
      if (counter.totalLength > MAX_BRANCH_LENGTH) return;

      const [nx, ny] = polarToCartesian(x, y, length, rad);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      const rad1 = rad + random() * r15;
      const rad2 = rad - random() * r15;

      // Out of bounds
      if (
        nx < -100 ||
        nx > size.width + 100 ||
        ny < -100 ||
        ny > size.height + 100
      )
        return;

      const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;

      if (random() < rate) steps.push(() => step(nx, ny, rad1, { ...counter }));
      if (random() < rate) steps.push(() => step(nx, ny, rad2, { ...counter }));
    };

    const randomMiddle = () => random() * 0.6 + 0.2;

    const start = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(255, 23, 23, ${opacity})`;
      prevSteps = [];
      steps = [
        () => step(randomMiddle() * size.width, -5, r90),
        () => step(randomMiddle() * size.width, size.height + 5, -r90),
        () => step(-5, randomMiddle() * size.height, 0),
        () => step(size.width + 5, randomMiddle() * size.height, r180),
      ];
      if (size.width < 500) steps = steps.slice(0, 2);
    };

    start();

    const frame = () => {
      prevSteps = steps;
      steps = [];

      if (!prevSteps.length) return;

      prevSteps.forEach((i) => {
        if (random() < 0.5) steps.push(i);
        else i();
      });

      requestAnimationFrame(frame);
    };

    frame();

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [size, random, resizeHandler]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: "none",
        zIndex: 0,
        maskImage: "radial-gradient(circle, transparent, black)",
        WebkitMaskImage: "radial-gradient(circle, transparent, black)",
      }}
    >
      {size && (
        <canvas
          ref={canvasRef}
          style={{ display: size.width > 0 && size.height > 0 ? "block" : "none" }}
        />
      )}
    </div>
  );
};

export default RandomBranches;
