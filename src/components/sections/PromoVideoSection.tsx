import React from 'react';

import VimeoDefaultPlayer from '@/components/ui/VimeoPlayer';

const PromoVideoSection = () => {
  return (
    <section className='my-20'>
      <VimeoDefaultPlayer id={Number(process.env.PROMO_VIDEO_VIMEO_ID)} />
    </section>
  );
};

export default PromoVideoSection;
