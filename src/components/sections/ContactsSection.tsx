import { useTranslations } from 'next-intl';

import ContactCard from '@/components/ui/ContactCard';

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
    <div className={`flex select-none flex-col items-center py-10`}>
      <h1 className='mb-6 mt-20 pl-10 text-3xl font-bold'>{text('heading')}</h1>
      <div
        className={`
          grid grid-cols-1 gap-6 px-4

          lg:grid-cols-4 lg:px-25

          md:grid-cols-2

          sm:grid-cols-2
        `}
      >
        {contacts.map((contact, index) => (
          <ContactCard
            key={index}
            name={contact.name}
            role={contact.role}
            email={contact.email}
            phone={contact.phone}
            image={contact.image}
          />
        ))}
      </div>
    </div>
  );
};
