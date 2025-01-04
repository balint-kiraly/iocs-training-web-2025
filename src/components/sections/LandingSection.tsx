import React from 'react';

import Countdown from '@/components/ui/Countdown';

const LandingSection = () => {
  return (
    <section className='h-screen'>
      <h1>Landing Section</h1>
      <Countdown />
      <button>Join Now</button>
    </section>
  );
};

export default LandingSection;
