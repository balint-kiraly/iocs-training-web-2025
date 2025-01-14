'use client';

import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [isRightTime, setIsRightTime] = useState(false);

  const target = new Date(targetDate).getTime();

  const text = useTranslations('Countdown');
  const locale = useLocale();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);

      if (hours === 19 && minutes === 40 && seconds === 0) {
        setIsRightTime(true);
        setTimeout(() => {
          setIsRightTime(false);
        }, 1000);
      }

      if (difference < 0) {
        clearInterval(timer);
        setStarted(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className='flex flex-col items-center gap-4'>
      {started ? (
        <div className='col-span-4 row-span-2'>The Training has begun!</div>
      ) : (
        <>
          <h3 className='text-2xl'>{text('heading')}</h3>
          <div
            className={`
              grid w-fit min-w-96 max-w-xl grid-cols-4 grid-rows-2 justify-items-center font-[Arial]

              ${locale === 'hu' ? 'gap-x-2' : 'gap-x-7'}
            `}
          >
            {isRightTime ? (
              <>
                <div className='text-5xl font-bold'>🌱</div>
                <div className='text-7xl font-bold'>🌱</div>
                <div className='text-7xl font-bold'>🌱</div>
                <div className='text-7xl font-bold'>🌱</div>
              </>
            ) : (
              <>
                <div className='text-6xl font-bold'>{String(days).padStart(2, '0')}</div>
                <div className='text-6xl font-bold'>{String(hours).padStart(2, '0')}</div>
                <div className='text-6xl font-bold'>{String(minutes).padStart(2, '0')}</div>
                <div className='text-6xl font-bold'>{String(seconds).padStart(2, '0')}</div>
              </>
            )}

            <div className='uppercase'>{text('days')}</div>
            <div className='text-base uppercase'>{text('hours')}</div>
            <div className='text-base uppercase'>{text('minutes')}</div>
            <div className='text-base uppercase'>{text('seconds')}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Countdown;
