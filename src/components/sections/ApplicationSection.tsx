'use client';

import React from 'react';
import { Link } from 'react-router-dom';

const ApplicationSection = () => {
  return (
    <div className='fixed right-4 top-4 z-1'>
      <Link
        to='/application-form'
        className={`
          rounded bg-blue-500 px-4 py-2 font-bold text-white

          focus:outline-none focus:shadow-outline

          hover:bg-blue-700
        `}
      >
        Apply Now
      </Link>
    </div>
  );
};

export default ApplicationSection;
