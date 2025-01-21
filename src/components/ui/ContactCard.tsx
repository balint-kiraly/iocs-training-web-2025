import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import { Card } from '@/components/ui/card';

export default function ContactCard({
  title,
  firstName,
  lastName,
  role,
  email,
  phone,
  image,
}: {
  title: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  image: string;
}) {
  const locale = useLocale();
  const name = `${title} ${locale === 'hu' ? `${lastName} ${firstName}` : `${firstName} ${lastName}`}`;
  return (
    <Card
      className={`
        relative mt-[20px] flex w-80 flex-col items-center rounded-lg bg-gradient-to-br from-primary to-secondary p-8
        pt-[180px] text-center shadow-md transition-transform duration-300

        hover:-translate-y-2 hover:shadow-lg
      `}
    >
      <Image
        src={image}
        alt={name}
        height={200}
        width={200}
        className='absolute -top-[20px] rounded-full object-cover shadow-lg'
      />
      <h2 className='mt-6 text-xl font-bold'>{name}</h2>
      <p className='h-12 text-accent-foreground/80'>{role}</p>
      <div className='mt-10 flex w-full flex-col items-center gap-4'>
        <a href={`mailto:${email}`} className='hover:'>
          <span className='flex gap-4'>
            <Mail />
            {email}
          </span>
        </a>
        <a href={`tel:${phone}`}>
          <span className='flex gap-4'>
            <Phone />
            {phone}
          </span>
        </a>
      </div>
    </Card>
  );
}
