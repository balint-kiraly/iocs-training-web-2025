'use client';

import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ApplicationForm } from '@/components/ApplicationForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ApplicationPage = () => {
  const text = useTranslations('ApplicationForm');

  return (
    <main className='min-h-screen py-20 pt-40'>
      <h1 className='relative z-30 text-center text-3xl font-semibold'>{text('heading')}</h1>
      <div className='mx-auto max-w-4xl px-10 pt-10'>
        <Alert className='bg-accent'>
          <Info className='h-4 w-4' />
          <AlertTitle>{text('alert.title')}</AlertTitle>
          <AlertDescription className='text-accent-foreground/80'>{text('alert.text')}</AlertDescription>
        </Alert>
      </div>
      <ApplicationForm />
    </main>
  );
};

export default ApplicationPage;
