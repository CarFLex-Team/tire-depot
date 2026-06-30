"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  zoom?: number;
}

export default function ZoomImage({ src, alt, zoom = 2 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      className="relative aspect-square w-full rounded-2xl overflow-hidden bg-brand-charcoal border border-brand-mid/20 cursor-zoom-in"
    >
      <div
        className="relative w-full h-full transition-transform duration-150 ease-out"
        style={{
          transform: isHovering ? `scale(${zoom})` : "scale(1)",
          transformOrigin: `${origin.x}% ${origin.y}%`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain p-8 drop-shadow-xl pointer-events-none"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
