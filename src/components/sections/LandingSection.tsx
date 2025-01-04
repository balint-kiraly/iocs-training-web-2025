import Image from 'next/image';
import React from 'react';

import Countdown from '@/components/ui/Countdown';

const LandingSection = () => {
  return (
    <section className='flex h-screen flex-col items-center justify-center text-4xl text-white'>
      <div className='absolute -z-10 h-screen overflow-hidden'>
        <Image
          className='relative -top-20'
          src='/landing-bg-placeholder.jpg'
          width={5427}
          height={3618}
          alt='Background placeholder'
        />
      </div>
      <div className='absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-transparent' />
      <Countdown targetDate={process.env.COUNTDOWN_TARGET ?? new Date().toDateString()} />
      <button>Join Now</button>
    </section>
  );
};

export default LandingSection;
