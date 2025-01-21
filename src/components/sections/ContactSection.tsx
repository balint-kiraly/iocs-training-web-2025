import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import ContactCard from '@/components/ui/ContactCard';
import { Reveal } from '@/components/ui/Reveal';

export const ContactSection = () => {
  const text = useTranslations('ContactSection');
  const contacts = [
    {
      title: '',
      firstName: 'Zsófia',
      lastName: 'Sebeszta',
      role: text('title-training-organizer'),
      email: 'sebeszta.zsofia@iocs.hu',
      phone: '+36301112222',
      image: '/Sebicontact.jpeg',
    },
    {
      title: '',
      firstName: 'Gergő',
      lastName: 'Holló',
      role: text('title-training-organizer'),
      email: 'hollo.gergo@iocs.hu',
      phone: '+36302221111',
      image: '/Gericontact.jpeg',
    },
    {
      title: '',
      firstName: 'Orsolya',
      lastName: 'Sisa',
      role: text('title-IOCS'),
      email: 'sisa.orsolya@iocs.hu',
      phone: '+36303334444',
      image: '/Sisacontact.jpeg',
    },
    {
      title: 'Dr.',
      firstName: 'Nóra Virág',
      lastName: 'Viola',
      role: text('title-FEB'),
      email: 'viola.nora@iocs.hu',
      phone: '+36304443333',
      image: '/logo.png',
    },
  ];

  return (
    <section id='contacts' className={`mx-auto max-w-screen-2xl items-center px-4 py-10`}>
      <h1 className='mb-10 text-center text-3xl font-bold'>{text('heading')}</h1>
      <div
        className={`
          mx-auto grid w-fit grid-cols-1 gap-4

          sm:grid-cols-2

          xl:grid-cols-4
        `}
      >
        {contacts.map((contact, index) => (
          <Reveal key={index} delay={index * 0.2}>
            <ContactCard
              title={contact.title}
              firstName={contact.firstName}
              lastName={contact.lastName}
              role={contact.role}
              email={contact.email}
              phone={contact.phone}
              image={contact.image}
            />
          </Reveal>
        ))}
      </div>
      <div className='mt-20 flex items-center justify-center gap-6 text-3xl font-bold'>
        {text('mailto')}
        <a
          href='mailto:kepzes@iocs.hu'
          target='_blank'
          rel='noopener noreferrer'
          className={`
            text-white

            hover:text-yellow-500
          `}
          aria-label='Mail'
        >
          <Mail className='h-8 w-8' />
        </a>
      </div>
    </section>
  );
};
