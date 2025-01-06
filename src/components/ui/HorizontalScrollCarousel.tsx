'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const HorizontalScrollCarousel = () => {
  const [offset, setOffset] = React.useState(0);

  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    if (targetRef.current) {
      setOffset(targetRef.current.offsetWidth - window.innerWidth);
    }
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], ['0px', `-${offset}px`]);

  return (
    <div className='overflow-hidden'>
      <motion.div ref={targetRef} style={{ x }} className='inline-flex items-center gap-10 px-10'>
        {cards.map((card) => {
          return (
            <div key={card.id} className={`w-[450px]`}>
              <Image
                src='/landing-bg-placeholder.jpg'
                width={5427}
                height={3618}
                className='rounded-md'
                alt='Gallery Placeholder image'
              />
            </div>
          );
        })}
      </motion.div>
    </div>
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
