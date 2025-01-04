import Image from 'next/image';
import React from 'react';

import Countdown from '@/components/ui/Countdown';

const LandingSection = () => {
  return (
    <section className='h-screen'>
      <div className='absolute -z-10 h-screen overflow-hidden'>
        <Image
          className='relative -top-20'
          src='/landing-bg-placeholder.jpg'
          width={5427}
          height={3618}
          alt='Background placeholder'
        />
      </div>
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent' />
      <h1>Landing Section</h1>
      <Countdown />
      <button>Join Now</button>
    </section>
  );
};

export default LandingSection;
