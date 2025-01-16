import { MenuIcon, Rocket } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Link } from '@/i18n/routing';

const Header = () => {
  const text = useTranslations('Header');

  const navItems = ['home', 'rules', 'contact'];

  return (
    <>
      <div className='absolute left-0 top-0 h-36 w-screen bg-gradient-to-b from-primary to-transparent' />
      <header className='absolute z-10 w-screen min-w-[300px] p-4 text-white'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Image src='/logo.png' alt='IÖCS logo' width={35} height={35} className='relative bottom-0.5' />
            <Link
              href='/'
              className={`
                text-xl font-bold

                sm:text-2xl
              `}
            >
              {text('title')}
            </Link>
          </div>
          <nav
            className={`
              hidden

              md:block
            `}
          >
            <ul className='flex space-x-8'>
              {navItems.map((item) => (
                <li key={item}>
                  <Link href={item === 'home' ? '/' : `/${item}`}>{text(item)}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className='flex items-center gap-1'>
            <LanguageSwitcher />
            <Link
              href='/apply'
              className={`
                hidden

                md:block
              `}
            >
              <Button>
                {text('apply')}
                <Rocket />
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild className='md:hidden'>
                <Button>
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='flex flex-col'>
                <SheetTitle></SheetTitle>
                <nav className='my-8'>
                  <ul className='ml-2 flex flex-col justify-center gap-5'>
                    {navItems.map((item) => (
                      <li key={item}>
                        <Link href={`/{item}`}>{text(item)}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Button variant='primary'>
                  {text('apply')}
                  <Rocket />
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
