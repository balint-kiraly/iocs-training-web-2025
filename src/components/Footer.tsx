import { Facebook, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-zinc-900 p-8 text-white'>
      <div className='container mx-auto flex flex-wrap justify-between'>
        <div
          className={`
            mb-6 w-full

            md:mb-0 md:w-1/3
          `}
        >
          <h3 className='mb-4 text-xl font-bold'>IÖCS</h3>
          <ul>
            <li>
              <Link href='https://iocs.hu'>Instruktor Öntevékeny Csoport</Link>
            </li>
            <li>
              <Link href='/'>Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div
          className={`
            mb-6 w-full

            md:mb-0 md:w-1/3
          `}
        >
          <h4 className='mb-4 text-xl font-bold'>Quick Links</h4>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/'>Rules</Link>
            </li>
            <li>
              <Link href='/'>Contact</Link>
            </li>
            <li>
              <Link href='/'>Apply</Link>
            </li>
          </ul>
        </div>

        <div
          className={`
            w-full

            md:w-1/3
          `}
        >
          <h4 className='mb-4 text-xl font-bold'>Follow Us</h4>
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
        <p>Made with ❤️ by Bálint Kiráy & Tamás Nagy</p>
      </div>
    </footer>
  );
};

export default Footer;
