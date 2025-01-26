import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      phone: '+36 30 276 9770',
      image: '/Sebicontact.jpeg',
    },
    {
      title: '',
      firstName: 'Gergő',
      lastName: 'Holló',
      role: text('title-training-organizer'),
      email: 'hollo.gergo@iocs.hu',
      phone: '+36 70 305 6865',
      image: '/Gericontact.jpeg',
    },
    {
      title: '',
      firstName: 'Orsolya',
      lastName: 'Sisa',
      role: text('title-IOCS'),
      email: 'sisa.orsolya@iocs.hu',
      phone: '+36 30 285 8800',
      image: '/Sisacontact.jpeg',
    },
    {
      title: 'Dr.',
      firstName: 'Nóra Virág',
      lastName: 'Viola',
      role: text('title-FEB'),
      email: 'viola.nora@iocs.hu',
      phone: '+36 30 889 4641',
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
      <Reveal>
        <Card
          className={`
            mx-auto mt-10 flex w-fit flex-col items-center gap-8 p-6

            sm:flex-row
          `}
        >
          <CardHeader className='p-0'>
            <CardTitle className='text-2xl'>{text('send-message')}</CardTitle>
          </CardHeader>
          <CardContent className='w-fit p-0'>
            <a href='mailto:kepzes@iocs.hu' target='_blank' rel='noopener noreferrer' aria-label='Mail'>
              <Button variant='secondary' size='lg' className='text-lg'>
                <Mail />
                kepzes@iocs.hu
              </Button>
            </a>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
};
