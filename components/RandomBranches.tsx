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
    null,
  );
  const animationFrameRef = useRef<number>();
  const stepsRef = useRef<(() => void)[]>([]);
  const prevStepsRef = useRef<(() => void)[]>([]);

  const random = Math.random;

  const resizeHandler = useCallback(() => {
    const newWidth = window.innerWidth;
    const newHeight = document.documentElement.clientHeight;
    setSize((prev) => {
      if (prev?.width === newWidth && prev?.height === newHeight) return prev;
      return { width: newWidth, height: newHeight };
    });
  }, []);

  useEffect(() => {
    resizeHandler();
    const debounceResize = setTimeout(resizeHandler, 100);
    return () => clearTimeout(debounceResize);
  }, [resizeHandler]);

  useEffect(() => {
    if (!size || size.width === 0 || size.height === 0) return;

    const canvas = canvasRef.current!;
    const { ctx } = initCanvas(canvas, size.width, size.height);
    const { width, height } = canvas;

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
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(255, 23, 23, ${opacity})`;
      prevStepsRef.current = [];
      stepsRef.current = [
        () => step(randomMiddle() * size.width, -5, r90),
        () => step(randomMiddle() * size.width, size.height + 5, -r90),
        () => step(-5, randomMiddle() * size.height, 0),
        () => step(size.width + 5, randomMiddle() * size.height, r180),
      ];
      if (size.width < 500) stepsRef.current = stepsRef.current.slice(0, 2);
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

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
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
          style={{
            display: size.width > 0 && size.height > 0 ? "block" : "none",
          }}
        />
      )}
    </div>
  );
};

export default RandomBranches;
