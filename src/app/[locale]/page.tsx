import { setRequestLocale } from 'next-intl/server';

import ApplicationSection from '@/components/sections/ApplicationSection';
import GallerySection from '@/components/sections/GallerySection';
import IntroductionSection from '@/components/sections/IntroductionSection';
import LandingSection from '@/components/sections/LandingSection';
import PromoVideoSection from '@/components/sections/PromoVideoSection';

export default async function Home({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  // Enable static rendering
  setRequestLocale((await params).locale);

  return (
    <main>
      <LandingSection />
      <GallerySection />
      <ApplicationSection />
      <PromoVideoSection />
      <IntroductionSection />
    </main>
  );
}
