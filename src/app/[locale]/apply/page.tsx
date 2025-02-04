'use client';

import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ApplicationForm } from '@/components/ApplicationForm';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ApplicationPage = () => {
  const text = useTranslations('ApplicationForm');

  return (
    <main className='min-h-screen py-20 pt-32'>
      <h1 className='relative z-30 text-center text-3xl font-semibold'>{text('heading')}</h1>
      <div className='mx-auto max-w-4xl px-10 pt-10'>
        <Alert
          className={`
            flex items-center bg-accent p-6

            [&>svg]:static [&>svg]:text-accent-foreground/80

            [&>svg+div]:translate-y-0
          `}
        >
          <Info className='top-10 h-4 w-4 shrink-0' />
          <AlertDescription className='text-accent-foreground/80'>{text('alert.text')}</AlertDescription>
        </Alert>
      </div>
      <ApplicationForm />
    </main>
  );
};

export default ApplicationPage;
