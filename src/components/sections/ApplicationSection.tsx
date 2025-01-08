'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';

const ApplicationSection = () => {
  const router = useRouter();
  const text = useTranslations('ApplicationSection');

  const handleButtonClick = (): void => {
    router.push('application-form');
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-bold'>{text('heading')}</h2>
      <h4 className='text-lg font-semibold'>{text('subheading')}</h4>
      <Button onClick={handleButtonClick}>{text('cta')}</Button>
    </div>
  );
};

export default ApplicationSection;
