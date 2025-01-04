import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import Countdown from '@/components/ui/Countdown';

const LandingSection = () => {
  return (
    <section className='flex h-screen flex-col items-center justify-end text-4xl text-white'>
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
      <h1 className='absolute left-5 top-20 max-w-3xl text-[5rem]/[1] font-bold'>
        Welcome to the <br />
        instructor training!
      </h1>
      <Countdown targetDate={process.env.COUNTDOWN_TARGET ?? new Date().toDateString()} />
      <button>Apply Now</button>
      <ChevronDown />
    </section>
  );
};

export default LandingSection;
