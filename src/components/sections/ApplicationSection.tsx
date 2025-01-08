'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

const ApplicationSection = () => {
  const text = useTranslations('ApplicationSection');

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-bold'>{text('heading')}</h2>
      <h4 className='text-lg font-semibold'>{text('subheading')}</h4>
      <Link href='/apply'>
        <Button>{text('cta')}</Button>
      </Link>
    </div>
  );
};

export default ApplicationSection;
