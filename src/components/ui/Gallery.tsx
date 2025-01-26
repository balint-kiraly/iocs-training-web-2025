'use client';

import { motion, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

const ONE_SECOND = 500;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const SwipeCarousel = ({ images }: { images: string[] }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((prev) => {
          return prev === images.length - 1 ? 0 : prev + 1;
        });
      }
    }, AUTO_DELAY);
  }, [dragX, images.length]);

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

    if (x <= -DRAG_BUFFER && imgIndex < images.length - 1) {
      setImgIndex((prev) => {
        return (prev + 1) % images.length;
      });
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prev) => {
        return (prev - 1 + images.length) % images.length;
      });
    }

    resetAutoPlay();
  };

  const handlePrev = () => {
    setImgIndex((prev) => {
      return (prev - 1 + images.length) % images.length;
    });
    resetAutoPlay();
  };

  const handleNext = () => {
    setImgIndex((prev) => {
      return (prev + 1) % images.length;
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
        <Images images={images} imgIndex={imgIndex} />
      </motion.div>

      <Dots images={images} imgIndex={imgIndex} setImgIndex={setImgIndex} resetAutoPlay={resetAutoPlay} />
      <GradientEdges />
      <ArrowButtons onPrev={handlePrev} onNext={handleNext} />
    </div>
  );
};

const Images = ({ images, imgIndex }: { images: string[]; imgIndex: number }) => {
  return (
    <>
      {images.map((src, idx) => {
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
  images,
  imgIndex,
  setImgIndex,
  resetAutoPlay,
}: {
  images: string[];
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
  resetAutoPlay: () => void;
}) => {
  return (
    <div className='mt-4 flex w-full justify-center gap-2'>
      {images.map((_, idx) => {
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
          absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white transition-colors

          hover:bg-black/75
        `}
        aria-label='Scroll left'
      >
        <ChevronLeft className='h-6 w-6' />
      </button>
      <button
        onClick={onNext}
        className={`
          absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white transition-colors

          hover:bg-black/75
        `}
        aria-label='Scroll right'
      >
        <ChevronRight className='h-6 w-6' />
      </button>
    </>
  );
};

export default SwipeCarousel;
