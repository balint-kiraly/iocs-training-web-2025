'use client';

import React from 'react';

import { ApplicationForm } from '@/components/ApplicationForm';

const ApplicationPage = () => {
  return (
    <main className='min-h-screen py-20'>
      <h1 className='relative z-30 text-center text-3xl font-semibold'>Application</h1>
      <ApplicationForm />
    </main>
  );
};

export default ApplicationPage;
