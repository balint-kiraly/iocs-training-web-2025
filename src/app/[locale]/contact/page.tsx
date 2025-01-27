import { ContactSection } from '@/components/sections/ContactSection';
import { FAQSection } from '@/components/sections/FAQSection';

export default function ContactPage() {
  return (
    <main className='min-h-screen pt-32'>
      <ContactSection />
      <div className='h-20' />
      <FAQSection />
    </main>
  );
}
