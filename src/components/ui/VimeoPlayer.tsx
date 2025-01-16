'use client';

import Player from '@vimeo/player';
import React, { useEffect, useRef } from 'react';

export default function VimeoDefaultPlayer({ id }: Readonly<{ id: number }>) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      id: id,
      loop: false,
      autoplay: false,
      autopause: false,
      portrait: false,
      byline: false,
      title: false,
      width: 640,
      speed: false,
      color: 'FFFFFF',
      dnt: true,
      responsive: true,
    };

    if (playerRef.current !== null) {
      new Player(playerRef.current, options);
    }
  }, [id]);

  return (
    <div className='relative mx-auto w-1/2 overflow-hidden rounded-2xl'>
      <div ref={playerRef} className=''></div>
    </div>
  );
}
