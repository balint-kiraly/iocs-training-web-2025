'use client';

import Player from '@vimeo/player';
import React, { useEffect, useRef } from 'react';

export default function VimeoPlayer({ id, autoplay }: Readonly<{ id: number; autoplay: boolean }>) {
  const playerRef = useRef<HTMLDivElement>(null);

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
      width: 640,
      speed: false,
      color: 'FFFFFF',
      dnt: true,
      responsive: true,
      controls: !autoplay,
    };

    if (playerRef.current !== null) {
      new Player(playerRef.current, options);
    }
  }, [autoplay, id]);

  return <div ref={playerRef}></div>;
}
