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
        relative h-[30vh] overflow-hidden

        sm:h-[70vh]
      `}
    >
      <div className='absolute inset-0' ref={emblaRef}>
        <div className='flex h-full flex-col'>
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative mb-4 flex w-fit flex-shrink-0 justify-center rounded-lg`}
              style={{
                height: '100%',
              }}
            >
              <Image
                src={image.src}
                alt={`Group ${index + 1}`}
                width={image.width}
                height={image.height}
                priority={index === 0}
                className='rounded-lg'
              />
            </div>
          ))}
        </div>
        <div
          className={`
            absolute bottom-2 left-0 right-0 z-10 flex items-center justify-center space-x-2

            md:bottom-4
          `}
        >
          <button
            className={`
              rounded-full bg-black/50 p-2 text-white transition-colors

              hover:bg-black/75
            `}
            onClick={scrollPrev}
            aria-label='Previous image'
          >
            <ChevronUp className='h-6 w-6' />
          </button>
          <button
            className={`
              rounded-full bg-black/50 p-2 text-white transition-colors

              hover:bg-black/75
            `}
            onClick={togglePause}
            aria-label={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? <Play className='h-6 w-6' /> : <Pause className='h-6 w-6' />}
          </button>
          <button
            className={`
              rounded-full bg-black/50 p-2 text-white transition-colors

              hover:bg-black/75
            `}
            onClick={scrollNext}
            aria-label='Next image'
          >
            <ChevronDown className='h-6 w-6' />
          </button>
        </div>
        <div
          className={`
            absolute right-2 top-1/2 flex -translate-y-1/2 transform flex-col justify-center space-y-2

            md:right-4
          `}
        >
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
    </div>
  );
};

export default VerticalCarousel;
