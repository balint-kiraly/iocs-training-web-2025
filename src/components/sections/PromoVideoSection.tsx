import React from 'react';

import VimeoPlayer from '@/components/ui/VimeoPlayer';

const PromoVideoSection = () => {
  return (
    <section id='promo-video' className='sticky top-[30vh]'>
      <div className={`relative mx-auto overflow-hidden rounded-2xl`}>
        <VimeoPlayer id={Number(process.env.PROMO_VIDEO_VIMEO_ID)} autoplay={false} />
      </div>
    </section>
  );
};

export default PromoVideoSection;
