import React from 'react';

import VimeoDefaultPlayer from '@/components/ui/VimeoPlayer';

const PromoVideoSection = () => {
  return (
    <section className='p-4'>
      <VimeoDefaultPlayer id={Number(process.env.PROMO_VIDEO_VIMEO_ID)} />
    </section>
  );
};

export default PromoVideoSection;
