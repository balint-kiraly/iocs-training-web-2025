import { setRequestLocale } from 'next-intl/server';

import ApplicationSection from '@/components/sections/ApplicationSection';
import { ContactsSection } from '@/components/sections/ContactsSection';
import DetailsSection from '@/components/sections/DetailsSection';
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
      <PromoVideoSection />
      <DetailsSection />
      <GallerySection />
      <ApplicationSection />
      <IntroductionSection />
      <ContactsSection />
    </main>
  );
}
