'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const ApplicationSection = () => {
  const router = useRouter();

  const handleButtonClick = (): void => {
    router.push('application-form');
  };

  return (
    <div className='fixed right-4 top-4 z-50'>
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
