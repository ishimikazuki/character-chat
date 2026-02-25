'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface CharacterAnimationProps {
  imageUrl: string;
  name: string;
  isTalking?: boolean;
}

export default function CharacterAnimation({ imageUrl, name, isTalking = false }: CharacterAnimationProps) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-teal-100 via-white to-pink-100 rounded-xl overflow-hidden">
      <div
        className={`
          relative w-full h-full
          ${isTalking ? 'character-talk' : ''}
          character-container
        `}
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          className={`
            object-contain transition-opacity duration-150
            ${isBlinking ? 'opacity-90' : 'opacity-100'}
          `}
          unoptimized
          priority
        />
      </div>

      {/* Subtle overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2">
        <p className="text-sm font-medium text-gray-700">{name}</p>
      </div>
    </div>
  );
}
