import { useTranslations } from 'next-intl';
import React from 'react';

import { ApplicationForm } from '@/components/ApplicationForm';

const ApplicationPage = () => {
  const text = useTranslations('ApplicationForm');

  return (
    <main className='min-h-screen py-20 pt-32'>
      <h1 className='relative z-30 text-center text-3xl font-semibold'>{text('heading')}</h1>
      <ApplicationForm
        deadline={process.env.APPLICATION_DEADLINE ? new Date(process.env.APPLICATION_DEADLINE) : null}
      />
    </main>
  );
};

export default ApplicationPage;
