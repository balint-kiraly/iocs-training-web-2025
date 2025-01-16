'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

const ApplicationSection = () => {
  const text = useTranslations('ApplicationSection');

  return (
    <div className='flex flex-col items-center justify-center py-16'>
      <h2 className='text-2xl font-bold'>{text('heading')}</h2>
      <h4 className='mt-3 font-semibold'>{text('subheading')}</h4>
      <Link href='/apply' className='mt-7'>
        <Button variant='primary' size='lg'>
          {text('cta')}
        </Button>
      </Link>
    </div>
  );
};

export default ApplicationSection;
