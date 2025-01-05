import React from 'react';

import HorizontalScrollCarousel from '@/components/ui/HorizontalScrollCarousel';

const GallerySection = () => {
  return (
    <section className='h-80'>
      <div className='bg-neutral-800'>
        <HorizontalScrollCarousel />
      </div>
    </section>
  );
};

export default GallerySection;
