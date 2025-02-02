'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ChevronDown, ChevronUp, Pause, Play } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

interface CarouselImage {
  src: string;
  width: number;
  height: number;
}

interface VerticalCarouselProps {
  images: CarouselImage[];
  autoplayInterval?: number;
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({ images, autoplayInterval = 4000 }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    loop: true,
    align: 'start',
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi && !isPaused) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, autoplayInterval);

      return () => clearInterval(autoplay);
    }
  }, [emblaApi, autoplayInterval, isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div
      className={`
        relative h-[calc(100vw/16*9)] max-h-[700px]

        xl:h-[calc(80vw/16*9)]
      `}
    >
      {/* Embla Carousel */}
      <div ref={emblaRef} className='absolute inset-0 overflow-hidden'>
        <div className='flex h-full flex-col items-center gap-4'>
          {images.map((image, index) => {
            const aspectRatio = image.width / image.height;
            return (
              <div
                key={index}
                className='relative flex w-fit flex-shrink-0 items-center overflow-hidden rounded-lg bg-white'
                style={{
                  height: '100%',
                  maxWidth: `calc(100vh * ${aspectRatio})`,
                }}
              >
                <Image
                  src={image.src}
                  alt={`Group ${index + 1}`}
                  width={image.width}
                  height={image.height}
                  className='object-contain'
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className={`absolute -bottom-14 left-0 right-0 z-10 flex items-center justify-center space-x-2`}>
        <button
          className={`
            rounded-full bg-accent/50 p-2 text-white transition-colors

            hover:bg-accent/75
          `}
          onClick={scrollPrev}
          aria-label='Previous image'
        >
          <ChevronUp className='h-6 w-6' />
        </button>
        <button
          className={`
            rounded-full bg-primary/50 p-2 text-white transition-colors

            hover:bg-primary/75
          `}
          onClick={togglePause}
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <Play className='h-6 w-6' /> : <Pause className='h-6 w-6' />}
        </button>
        <button
          className={`
            rounded-full bg-accent/50 p-2 text-white transition-colors

            hover:bg-accent/75
          `}
          onClick={scrollNext}
          aria-label='Next image'
        >
          <ChevronDown className='h-6 w-6' />
        </button>
      </div>

      {/* Dots outside on the right */}
      <div className='absolute -right-6 top-1/2 flex -translate-y-1/2 flex-col space-y-2'>
        {images.map((_, index) => (
          <button
            key={index}
            className={`
              h-3 w-3 rounded-full transition-colors

              ${index === selectedIndex ? 'bg-white' : 'bg-white/50'}
            `}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;
