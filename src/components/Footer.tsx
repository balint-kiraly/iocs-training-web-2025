import { Facebook, Instagram, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Link } from '@/i18n/routing';

const Footer = () => {
  const text = useTranslations('Footer');

  return (
    <footer className='bg-primary/20 p-8'>
      <div className='container mx-auto flex flex-wrap justify-between'>
        <div
          className={`
            mb-6 w-full

            md:mb-0 md:w-1/3
          `}
        >
          <h3 className='mb-4 text-xl font-bold'>{text('iocs.label')}</h3>
          <ul>
            <li>
              <Link href='https://iocs.hu'>{text('iocs.name')}</Link>
            </li>
            <li>
              <a href='/privacy-policy.pdf' download>
                {text('iocs.privacy-policy')}
              </a>
            </li>
            <li>
              <a href='/house-rules.pdf' download>
                {text('iocs.house-rules')}
              </a>
            </li>
          </ul>
        </div>

        <div
          className={`
            mb-6 w-full

            md:mb-0 md:w-1/3
          `}
        >
          <h4 className='mb-4 text-xl font-bold'>{text('links.label')}</h4>
          <ul>
            <li>
              <Link href='/'>{text('links.home')}</Link>
            </li>
            <li>
              <Link href='/rules'>{text('links.rules')}</Link>
            </li>
            <li>
              <Link href='/contact'>{text('links.contact')}</Link>
            </li>
            <li>
              <Link href='/apply'>{text('links.apply')}</Link>
            </li>
          </ul>
        </div>

        <div
          className={`
            w-full

            md:w-1/3
          `}
        >
          <h4 className='mb-4 text-xl font-bold'>{text('social.label')}</h4>
          <div className='flex space-x-4'>
            <a
              href='https://www.facebook.com/@instruktorok'
              target='_blank'
              rel='noopener noreferrer'
              className={`
                text-white

                hover:text-blue-600
              `}
              aria-label='Facebook'
            >
              <Facebook className='h-6 w-6' />
            </a>
            <a
              href='https://www.instagram.com/iocs_official/'
              target='_blank'
              rel='noopener noreferrer'
              className={`
                text-white

                hover:text-orange-700
              `}
              aria-label='Instagram'
            >
              <Instagram className='h-6 w-6' />
            </a>
            <a
              href='mailto:info@iocs.hu'
              target='_blank'
              rel='noopener noreferrer'
              className={`
                text-white

                hover:text-yellow-500
              `}
              aria-label='Instagram'
            >
              <Mail className='h-6 w-6' />
            </a>
          </div>
        </div>
      </div>
      <div className='mt-20 text-center text-muted-foreground'>
        <p>Developed with ❤️ by Bálint Kiráy & Tamás Nagy</p>
      </div>
    </footer>
  );
};

export default Footer;
