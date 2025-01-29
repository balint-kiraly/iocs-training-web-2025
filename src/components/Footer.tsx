import { Facebook, Globe, Instagram } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import { Link } from '@/i18n/routing';

const Footer = () => {
  const text = useTranslations('Footer');
  const locale = useLocale();
  const rulesPath = `/documents/rules/house-rules-${locale}.pdf`;
  const privacyPath = `/documents/privacy/privacy-policy-${locale}.pdf`;
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
              <a href={privacyPath} download>
                {text('iocs.privacy-policy')}
              </a>
            </li>
            <li>
              <a href={rulesPath} download>
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
          <div className='flex space-x-4 text-white'>
            <a href='https://iocs.hu' target='_blank' rel='noopener noreferrer' aria-label='Instagram'>
              <Globe className='h-6 w-6' />
            </a>
            <a
              href='https://www.facebook.com/@instruktorok'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Facebook'
            >
              <Facebook className='h-6 w-6' />
            </a>
            <a
              href='https://www.instagram.com/iocs_official/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Instagram'
            >
              <Instagram className='h-6 w-6' />
            </a>
          </div>
        </div>
      </div>
      <div className='mt-20 text-center text-muted-foreground'>
        <p>
          Developed with ❤️ by{' '}
          <a className='hover:underline' href='https://github.com/balintking'>
            Bálint Király
          </a>{' '}
          &{' '}
          <a className='hover:underline' href='https://github.com/nagytamas8'>
            Tamás Nagy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
