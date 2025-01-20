'use client';

import { motion, useMotionValue } from 'framer-motion';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

const imgs = [
  { src: '/gallery-placeholder1.jpg' },
  { src: '/gallery-placeholder2.jpg' },
  { src: '/gallery-placeholder3.jpg' },
  { src: '/gallery-placeholder4.jpg' },
  { src: '/gallery-placeholder5.jpg' },
  { src: '/gallery-placeholder6.jpg' },
  { src: '/gallery-placeholder7.jpg' },
];

const ONE_SECOND = 500;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const SwipeCarousel = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((prev) => {
          return prev === imgs.length - 1 ? 0 : prev + 1;
        });
      }
    }, AUTO_DELAY);
  }, [dragX]);

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetAutoPlay = () => {
    stopAutoPlay();
    startAutoPlay();
  };

  useEffect(() => {
    startAutoPlay();

    return () => stopAutoPlay();
  }, [startAutoPlay]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((prev) => {
        return (prev + 1) % imgs.length;
      });
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prev) => {
        return (prev - 1 + imgs.length) % imgs.length;
      });
    }

    resetAutoPlay();
  };

  const handlePrev = () => {
    setImgIndex((prev) => {
      return (prev - 1 + imgs.length) % imgs.length;
    });
    resetAutoPlay();
  };

  const handleNext = () => {
    setImgIndex((prev) => {
      return (prev + 1) % imgs.length;
    });
    resetAutoPlay();
  };

  return (
    <div className='relative overflow-hidden py-8'>
      <motion.div
        drag='x'
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `${-1 * (imgIndex * 70 - 15)}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className={`
          flex cursor-grab items-center

          active:cursor-grabbing
        `}
      >
        <Images imgIndex={imgIndex} />
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} resetAutoPlay={resetAutoPlay} />
      <GradientEdges />
      <ArrowButtons onPrev={handlePrev} onNext={handleNext} />
    </div>
  );
};

const Images = ({ imgIndex }: { imgIndex: number }) => {
  return (
    <>
      {imgs.map(({ src }, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '70%',
              height: '70%',
            }}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className='aspect-video shrink-0 rounded-xl bg-neutral-800'
          />
        );
      })}
    </>
  );
};

const Dots = ({
  imgIndex,
  setImgIndex,
  resetAutoPlay,
}: {
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
  resetAutoPlay: () => void;
}) => {
  return (
    <div className='mt-4 flex w-full justify-center gap-2'>
      {imgs.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => {
              setImgIndex(idx);
              resetAutoPlay();
            }}
            className={`
              h-3 w-3 rounded-full transition-colors

              ${idx === imgIndex ? 'bg-neutral-50' : 'bg-neutral-500'}
            `}
          />
        );
      })}
    </div>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div
        className={`
          pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50
          to-neutral-950/0
        `}
      />
      <div
        className={`
          pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l
          from-neutral-950/50 to-neutral-950/0
        `}
      />
    </>
  );
};

const ArrowButtons = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
  return (
    <>
      <button
        onClick={onPrev}
        className={`
          absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-neutral-800 p-3 text-white

          hover:bg-neutral-700
        `}
      >
        ◀
      </button>
      <button
        onClick={onNext}
        className={`
          absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-neutral-800 p-3 text-white

          hover:bg-neutral-700
        `}
      >
        ▶
      </button>
    </>
  );
};

export default SwipeCarousel;
