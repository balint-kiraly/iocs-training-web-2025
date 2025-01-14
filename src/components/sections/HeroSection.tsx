import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import Countdown from '@/components/ui/Countdown';

const HeroSection = () => {
  const text = useTranslations('HeroSection');

  return (
    <section className='flex h-screen flex-col items-center justify-end gap-8 text-white'>
      <div className='absolute -z-10 h-screen w-screen'>
        <Image
          className='relative -top-20'
          src='/landing-bg-placeholder.jpg'
          fill={true}
          alt='Background placeholder'
          style={{ objectFit: 'cover' }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-primary/80 to-transparent to-30%' />
        <div className='absolute inset-0 bg-gradient-to-t from-background via-black/60 to-transparent' />
      </div>
      <h1 className='absolute left-5 top-28 max-w-3xl text-[5rem]/[1] font-bold'>{text('heading')}</h1>
      <Countdown targetDate={process.env.COUNTDOWN_TARGET ?? new Date().toDateString()} />
      <ChevronDown className='mb-4' />
    </section>
  );
};

export default HeroSection;
