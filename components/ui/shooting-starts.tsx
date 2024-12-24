"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const offsetX = Math.random() * window.innerWidth;
  const offsetY = Math.random() * window.innerHeight;

  switch (side) {
    case 0: // Top edge
      return { x: offsetX, y: 0, angle: 90 + Math.random() * 20 - 10 };
    case 1: // Right edge
      return {
        x: window.innerWidth,
        y: offsetY,
        angle: 180 + Math.random() * 20 - 10,
      };
    case 2: // Bottom edge
      return {
        x: offsetX,
        y: window.innerHeight,
        angle: 270 + Math.random() * 20 - 10,
      };
    case 3: // Left edge
      return { x: 0, y: offsetY, angle: Math.random() * 20 - 10 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};
export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 15,
  minDelay = 1200,
  maxDelay = 3200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 5,
  className,
}) => {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      const newStar: ShootingStar = {
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };
      setStar(newStar);

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(createStar, randomDelay);
    };

    createStar();

    return () => { };
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    const moveStar = () => {
      if (star) {
        setStar((prevStar) => {
          if (!prevStar) return null;

          const { x, y, angle, speed, distance } = prevStar;

          // Update position based on angle and speed
          const newX = x + speed * Math.cos((angle * Math.PI) / 180);
          const newY = y + speed * Math.sin((angle * Math.PI) / 180);

          // If the star moves out of bounds, reset it
          if (
            newX < -50 ||
            newX > window.innerWidth + 50 ||
            newY < -50 ||
            newY > window.innerHeight + 50
          ) {
            return null; // Reset the star when it goes out of bounds
          }

          return {
            ...prevStar,
            x: newX,
            y: newY,
            distance: distance + speed,
            scale: 1 + distance / 200, // Gradual scaling
          };
        });
      }
    };

    const animationFrame = requestAnimationFrame(moveStar);
    return () => cancelAnimationFrame(animationFrame);
  }, [star]);

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute inset-0", className)}
    >
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2
            }, ${star.y + starHeight / 2})`}
        />
      )}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
