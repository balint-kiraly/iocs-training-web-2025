'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-95%']);

  return (
    <section ref={targetRef} className='relative h-[300vh] bg-neutral-900'>
      <div className='sticky top-0 flex h-screen items-center overflow-hidden'>
        <motion.div style={{ x }} className='flex gap-4'>
          {cards.map((card) => {
            return (
              <Image
                key={card.id}
                src='/landing-bg-placeholder.jpg'
                width={5427}
                height={3618}
                alt='Gallery Placeholder image'
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

type CardType = {
  url: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: '/imgs/abstract/1.jpg',
    title: 'Title 1',
    id: 1,
  },
  {
    url: '/imgs/abstract/2.jpg',
    title: 'Title 2',
    id: 2,
  },
  {
    url: '/imgs/abstract/3.jpg',
    title: 'Title 3',
    id: 3,
  },
  {
    url: '/imgs/abstract/4.jpg',
    title: 'Title 4',
    id: 4,
  },
  {
    url: '/imgs/abstract/5.jpg',
    title: 'Title 5',
    id: 5,
  },
  {
    url: '/imgs/abstract/6.jpg',
    title: 'Title 6',
    id: 6,
  },
  {
    url: '/imgs/abstract/7.jpg',
    title: 'Title 7',
    id: 7,
  },
];

export default HorizontalScrollCarousel;
