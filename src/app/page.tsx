'use client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ApplicationFormPage from '@/components/sections/ApplicationFormPage';
import ApplicationSection from '@/components/sections/ApplicationSection';
import GallerySection from '@/components/sections/GallerySection';
import IntroductionSection from '@/components/sections/IntroductionSection';
import LandingSection from '@/components/sections/LandingSection';
import PromoVideoSection from '@/components/sections/PromoVideoSection';

export default function Home() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          {/* Főoldal */}
          <Route
            path='/'
            element={
              <>
                <LandingSection />
                <GallerySection />
                <ApplicationSection />
                <PromoVideoSection />
                <IntroductionSection />
              </>
            }
          />
          {/* Jelentkezési oldal */}
          <Route path='/application-form' element={<ApplicationFormPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
