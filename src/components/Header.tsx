import { Rocket } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Link } from '@/i18n/routing';

const Header = () => {
  const text = useTranslations('Header');

  return (
    <>
      <div className='absolute left-0 top-0 h-36 w-screen bg-gradient-to-b from-primary to-transparent' />
      <header className='absolute z-10 w-screen p-4 text-white'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Image src='/logo.png' alt='IÖCS logo' width={35} height={35} className='relative bottom-0.5' />
            <Link href='/' className='text-2xl font-bold'>
              {text('title')}
            </Link>
          </div>
          <nav>
            <ul className='flex space-x-8'>
              <li>
                <Link href='/'>{text('home')}</Link>
              </li>
              <li>
                <Link href='/rules'>{text('rules')}</Link>
              </li>
              <li>
                <Link href='/contact'>{text('contact')}</Link>
              </li>
            </ul>
          </nav>
          <div className='flex items-center gap-1'>
            <LanguageSwitcher />
            <Link href='/apply'>
              <Button className='bg-muted'>
                {text('apply')}
                <Rocket />
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
