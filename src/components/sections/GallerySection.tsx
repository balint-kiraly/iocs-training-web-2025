import React from 'react';

import SwipeCarousel from '@/components/ui/Gallery';

const GallerySection = () => {
  const images = Array.from({ length: 12 }, (_, index) => `/images/gallery/image-${index + 1}.jpg`);

  return (
    <section>
      <SwipeCarousel images={images} />
    </section>
  );
};

export default GallerySection;
