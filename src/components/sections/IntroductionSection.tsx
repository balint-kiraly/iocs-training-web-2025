import { useTranslations } from 'next-intl';
import React from 'react';

import VerticalCarousel from '@/components/ui/VerticalCarousel';

const IntroductionSection = () => {
  const text = useTranslations('IntroductionSection');
  const images = [
    { src: '/images/groups/Bausz.png', width: 4032, height: 3024 },
    { src: '/images/groups/Csengu.png', width: 940, height: 788 },
    { src: '/images/groups/Della.jpg', width: 2224, height: 1668 },
    { src: '/images/groups/Macsi.png', width: 4032, height: 3024 },
    { src: '/images/groups/Orban.png', width: 2000, height: 1414 },
    { src: '/images/groups/Orsi.png', width: 2000, height: 1545 },
    { src: '/images/groups/Podonyi.jpg', width: 4032, height: 3024 },
    { src: '/images/groups/Reka.jpg', width: 2048, height: 1448 },
    { src: '/images/groups/Sara.jpg', width: 1425, height: 1080 },
    { src: '/images/groups/Tami.jpg', width: 1642, height: 900 },
    { src: '/images/groups/Tege.jpg', width: 2048, height: 1536 },
    { src: '/images/groups/Vozi.png', width: 1640, height: 924 },
    { src: '/images/groups/Zsombor.jpg', width: 1242, height: 702 },
  ];

  return (
    <section id='groups' className='mx-auto mb-32 max-w-screen-lg px-10'>
      <h1 className='mb-10 text-center text-3xl font-bold'>{text('heading')}</h1>
      <VerticalCarousel images={images} />
    </section>
  );
};

export default IntroductionSection;
