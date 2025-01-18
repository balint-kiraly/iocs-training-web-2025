import { useTranslations } from 'next-intl';

import ContactCard from '@/components/ui/ContactCard';
import { Reveal } from '@/components/ui/Reveal';

export const ContactsSection = () => {
  const text = useTranslations('ContactsSection');
  const contacts = [
    {
      name: 'Sebeszta Zsófia',
      role: text('title-training-organizer'),
      email: 'sebeszta.zsofia@iocs.hu',
      phone: '+36301112222',
      image: '/Sebicontact.jpeg',
    },
    {
      name: 'Holló Gergő',
      role: text('title-training-organizer'),
      email: 'hollo.gergo@iocs.hu',
      phone: '+36302221111',
      image: '/Gericontact.jpeg',
    },
    {
      name: 'Sisa Orsolya',
      role: text('title-IOCS'),
      email: 'sisa.orsolya@iocs.hu',
      phone: '+36303334444',
      image: '/Sisacontact.jpeg',
    },
    {
      name: 'dr. Viola Nóra Virág',
      role: text('title-FEB'),
      email: 'viola.nora@iocs.hu',
      phone: '+36304443333',
      image: '/logo.png',
    },
  ];

  return (
    <div className={`mx-auto w-fit max-w-screen-2xl select-none items-center px-4 py-10`}>
      <h1 className='mb-6 text-3xl font-bold'>{text('heading')}</h1>
      <div
        className={`
          grid grid-cols-1 gap-4

          lg:grid-cols-4

          sm:grid-cols-2
        `}
      >
        {contacts.map((contact, index) => (
          <Reveal key={index} delay={index * 0.2}>
            <ContactCard
              name={contact.name}
              role={contact.role}
              email={contact.email}
              phone={contact.phone}
              image={contact.image}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
};
