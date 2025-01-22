import { useTranslations } from 'next-intl';
import React from 'react';

import Gallery from '@/components/ui/Gallery';

const IntroductionSection = () => {
  const text = useTranslations('IntroductionSection');

  return (
    <section id='groups' className=''>
      <h1 className='pl-10 text-center text-3xl font-bold'>{text('heading')}</h1>
      <Gallery />
    </section>
  );
};

export default IntroductionSection;
