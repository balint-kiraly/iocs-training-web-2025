'use client';

import React from 'react';

import { ApplicationForm } from '@/components/ApplicationForm';

const ApplicationPage = () => {
  return (
    <div className='min-h-screen pt-20'>
      <h1 className='text-center text-3xl font-semibold'>Application</h1>
      <ApplicationForm />
    </div>
  );
};

export default ApplicationPage;
