'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const ApplicationSection = () => {
  const router = useRouter();

  const handleButtonClick = (): void => {
    router.push('application-form');
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='mb-4 text-lg font-semibold text-black'>
        Welcome to our application page. Please click the button below to proceed.
      </p>
      <button
        onClick={handleButtonClick}
        className={`
          rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300

          focus:outline-none focus:shadow-outline

          hover:bg-blue-700
        `}
      >
        Apply Now
      </button>
    </div>
  );
};

export default ApplicationSection;
