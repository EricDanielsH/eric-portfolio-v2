"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const r180 = Math.PI;
const r90 = Math.PI / 2;
const r15 = Math.PI / 12;
const opacity = 0.1;
const MIN_BRANCH = 8;
const MAX_BRANCH_LENGTH = 250;

function initCanvas(canvas: HTMLCanvasElement, width = 400, height = 400) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to get 2D context");

  const dpi = window.devicePixelRatio || 1;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
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

function getViewportSize() {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0,
  );
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0,
  );
  return { width: vw, height: vh };
}

const RandomBranches = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const animationFrameRef = useRef<number>();
  const stepsRef = useRef<(() => void)[]>([]);
  const prevStepsRef = useRef<(() => void)[]>([]);

  const random = Math.random;

  const resizeHandler = useCallback(() => {
    const newSize = getViewportSize();
    setSize((prev) => {
      if (prev?.width === newSize.width && prev?.height === newSize.height)
        return prev;
      return newSize;
    });
  }, []);

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [resizeHandler]);

  useEffect(() => {
    if (!size || !containerRef.current) return;

    const canvas = canvasRef.current!;
    const { ctx } = initCanvas(canvas, size.width, size.height);

    const step = (
      x: number,
      y: number,
      rad: number,
      counter = { value: 0, totalLength: 0 },
    ) => {
      const length = random() * 8;
      counter.value += 1;
      counter.totalLength += length;

      if (counter.totalLength > MAX_BRANCH_LENGTH) return;

      const [nx, ny] = polarToCartesian(x, y, length, rad);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      const rad1 = rad + random() * r15;
      const rad2 = rad - random() * r15;

      if (
        nx < -100 ||
        nx > size.width + 100 ||
        ny < -100 ||
        ny > size.height + 100
      )
        return;

      const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;

      if (random() < rate)
        stepsRef.current.push(() => step(nx, ny, rad1, { ...counter }));
      if (random() < rate)
        stepsRef.current.push(() => step(nx, ny, rad2, { ...counter }));
    };

    const randomMiddle = () => random() * 0.6 + 0.2;

    const start = () => {
      ctx.clearRect(0, 0, size.width, size.height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(255, 23, 23, ${opacity})`;
      prevStepsRef.current = [];

      // Always include all four directions
      stepsRef.current = [
        () => step(randomMiddle() * size.width, 0, r90),
        () => step(randomMiddle() * size.width, size.height, -r90),
        () => step(0, randomMiddle() * size.height, 0),
        () => step(size.width, randomMiddle() * size.height, r180),
      ];
    };

    const frame = () => {
      prevStepsRef.current = stepsRef.current;
      stepsRef.current = [];

      if (!prevStepsRef.current.length) return;

      prevStepsRef.current.forEach((i) => {
        if (random() < 0.5) stepsRef.current.push(i);
        else i();
      });

      animationFrameRef.current = requestAnimationFrame(frame);
    };

    start();
    frame();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [size, random]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        maskImage: "radial-gradient(circle, transparent, black)",
        WebkitMaskImage: "radial-gradient(circle, transparent, black)",
      }}
    >
      {size && (
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </div>
  );
};

export default RandomBranches;
