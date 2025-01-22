import React from 'react';

import VimeoPlayer from '@/components/ui/VimeoPlayer';

const PromoVideoSection = () => {
  return (
    <section id='promo-video' className='my-20 px-4'>
      <div
        className={`
          relative mx-auto overflow-hidden rounded-2xl

          md:w-3/4
        `}
      >
        <VimeoPlayer id={Number(process.env.PROMO_VIDEO_VIMEO_ID)} autoplay={false} />
      </div>
    </section>
  );
};

export default PromoVideoSection;
