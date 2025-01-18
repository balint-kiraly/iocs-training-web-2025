import { ContactsSection } from '@/components/sections/ContactsSection';
import { FAQSection } from '@/components/sections/FAQSection';

export default function ContactPage() {
  return (
    <main className='min-h-screen'>
      <div className='h-20' />
      <ContactsSection />
      <div className='h-20' />
      <FAQSection />
    </main>
  );
}
