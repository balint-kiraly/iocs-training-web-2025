'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { ApplicationForm } from '@/components/ApplicationForm';

const ApplicationPage = () => {
  const text = useTranslations('ApplicationForm');

  return (
    <main className='min-h-screen py-20'>
      <h1 className='relative z-30 text-center text-3xl font-semibold'>{text('heading')}</h1>
      <ApplicationForm />
    </main>
  );
};

export default ApplicationPage;
