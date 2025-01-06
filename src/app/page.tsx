import ApplicationSection from '@/components/sections/ApplicationSection';
import GallerySection from '@/components/sections/GallerySection';
import IntroductionSection from '@/components/sections/IntroductionSection';
import LandingSection from '@/components/sections/LandingSection';
import PromoVideoSection from '@/components/sections/PromoVideoSection';

export default function Home() {
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
