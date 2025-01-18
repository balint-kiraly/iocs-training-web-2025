import React from 'react';

import VimeoDefaultPlayer from '@/components/ui/VimeoPlayer';

const PromoVideoSection = () => {
  return (
    <section id='promo-video' className='my-20 px-4'>
      <VimeoDefaultPlayer id={Number(process.env.PROMO_VIDEO_VIMEO_ID)} />
    </section>
  );
};

export default PromoVideoSection;
