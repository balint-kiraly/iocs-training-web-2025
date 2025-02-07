import { ChevronDown, Play, Rocket } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import Countdown from '@/components/ui/Countdown';
import { Reveal } from '@/components/ui/Reveal';
import ScrollButton from '@/components/ui/ScrollButton';
import VimeoPlayer from '@/components/ui/VimeoPlayer';
import { Link } from '@/i18n/routing';

const HeroSection = () => {
  const text = useTranslations('HeroSection');
  const locale = useLocale();

  return (
    <section
      className={`relative flex h-screen w-[100%] flex-col items-center justify-between gap-8 overflow-clip text-white`}
    >
      <div className='absolute -z-10 h-screen w-[100%] overflow-hidden'>
        <div
          className={`
            absolute left-1/2 top-1/2 h-[calc(100vw*9/16)] min-h-screen w-[100%] min-w-[calc(100vh*16/9)]
            -translate-x-1/2 -translate-y-1/2
          `}
        >
          <VimeoPlayer id={Number(process.env.PROMO_VIDEO_VIMEO_ID)} autoplay={true} />
        </div>

        <div className='absolute inset-0 bg-gradient-to-b from-primary/80 to-transparent to-30%' />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent' />
      </div>

      <Reveal>
        <h1
          className={`
            mt-[20vh] hidden w-screen text-center text-4xl font-bold

            md:text-[5rem]/[1]

            sm:block sm:text-5xl
          `}
        >
          {text('heading')}
        </h1>
        <h1
          className={`
            mt-[20vh] w-screen text-center text-4xl font-bold

            sm:hidden

            ${locale === 'hu' ? 'xs:text-5xl' : `xs:text-6xl`}
          `}
        >
          {text('heading-sm')}
        </h1>
      </Reveal>

      <div className='flex flex-col items-center'>
        <Reveal delay={0.2}>
          <Countdown targetDate={process.env.APPLICATION_DEADLINE ?? new Date().toDateString()} />
        </Reveal>

        <div className='mb-[5vh] mt-4 flex flex-wrap items-center justify-center gap-4'>
          <Reveal delay={0.4}>
            <Link href='/apply'>
              <Button variant='primary' size='lg'>
                {text('cta')}
                <Rocket />
              </Button>
            </Link>
          </Reveal>
          <Reveal delay={0.5}>
            <ScrollButton to='promo-video'>
              <Button variant='outline' size='lg' className='bg-accent'>
                <Play />
                {text('cta-video')}
              </Button>
            </ScrollButton>
          </Reveal>
        </div>

        <Reveal delay={3}>
          <ScrollButton to='info'>
            <Button variant='ghost' className='animation-bouncing-arrow mb-4'>
              <ChevronDown />
            </Button>
          </ScrollButton>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;
