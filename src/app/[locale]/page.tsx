import { setRequestLocale } from 'next-intl/server';

import ApplicationSection from '@/components/sections/ApplicationSection';
import { ContactSection } from '@/components/sections/ContactSection';
import DetailsSection from '@/components/sections/DetailsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import GallerySection from '@/components/sections/GallerySection';
import HeroSection from '@/components/sections/HeroSection';
import InfoSection from '@/components/sections/InfoSection';
import IntroductionSection from '@/components/sections/IntroductionSection';
import PromoVideoSection from '@/components/sections/PromoVideoSection';

export default async function Home({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  // Enable static rendering
  setRequestLocale((await params).locale);

  return (
    <main>
      <HeroSection />
      <InfoSection />
      <div className='container mx-auto mt-20 px-4'>
        <div
          className={`
            flex flex-col gap-10

            lg:flex-row
          `}
        >
          <div
            className={`
              w-full

              lg:w-3/5
            `}
          >
            <PromoVideoSection />
          </div>
          <div
            className={`
              w-full

              lg:w-2/5
            `}
          >
            <DetailsSection />
          </div>
        </div>
      </div>
      <ApplicationSection />
      <IntroductionSection />
      <ContactSection />
      <div className='h-32' />
      <GallerySection />
      <div className='h-32' />
      <FAQSection />
    </main>
  );
}
