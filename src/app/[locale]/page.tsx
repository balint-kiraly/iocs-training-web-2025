import { setRequestLocale } from 'next-intl/server';

import ApplicationSection from '@/components/sections/ApplicationSection';
import ContactCardSection from '@/components/sections/ContactCard';
import GallerySection from '@/components/sections/GallerySection';
import HeroSection from '@/components/sections/HeroSection';
import IntroductionSection from '@/components/sections/IntroductionSection';
import PromoVideoSection from '@/components/sections/PromoVideoSection';

export default async function Home({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  // Enable static rendering
  setRequestLocale((await params).locale);

  return (
    <main>
      <HeroSection />
      <GallerySection />
      <ApplicationSection />
      <PromoVideoSection />
      <IntroductionSection />
      <ContactCardSection name={''} role={''} email={''} phone={''} image={''} />
    </main>
  );
}
