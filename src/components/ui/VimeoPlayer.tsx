'use client';

import Player from '@vimeo/player';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

export default function VimeoPlayer({ id, autoplay }: Readonly<{ id: number; autoplay: boolean }>) {
  const playerRef = useRef<HTMLDivElement>(null);
  const fallbackImage = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const options = {
      id: id,
      loop: autoplay,
      autoplay: autoplay,
      muted: autoplay,
      autopause: false,
      portrait: false,
      byline: false,
      title: false,
      speed: false,
      color: 'FFFFFF',
      dnt: true,
      responsive: true,
      controls: !autoplay,
    };

    if (playerRef.current !== null) {
      const player = new Player(playerRef.current, options);

      player.on('play', () => {
        if (fallbackImage.current !== null) {
          fallbackImage.current.style.opacity = '0';
        }
      });
    }
  }, [autoplay, id]);

  return (
    <>
      <Image
        className={`
          relative z-10 transition-opacity duration-1000

          ${autoplay ? '' : 'hidden'}
        `}
        src='/images/hero-bg-fallback.jpg'
        ref={fallbackImage}
        fill={true}
        alt='Background fallback image'
        style={{ objectFit: 'cover' }}
      />
      <div ref={playerRef}></div>
    </>
  );
}
