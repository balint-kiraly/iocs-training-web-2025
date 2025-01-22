'use client';

import { MenuIcon, Rocket } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Link } from '@/i18n/routing';

const Header = () => {
  const text = useTranslations('Header');

  const navItems = ['home', 'rules', 'contact'];

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className='absolute left-0 top-0 z-20 h-36 w-screen bg-gradient-to-b from-primary to-transparent' />
      <header
        className={`
          fixed z-30 w-screen min-w-[300px] p-4 text-white transition-all duration-1000

          ${scrolled ? 'bg-primary shadow-lg' : `bg-transparent`}
        `}
      >
        <div className='flex items-center justify-between'>
          <Link
            href='/'
            className={`
              flex items-center gap-4 text-lg font-bold

              sm:text-xl
            `}
          >
            <Image src='/logo.png' alt='IÖCS logo' width={40} height={40} />
            {text('title')}
          </Link>
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
                        <SheetClose asChild>
                          <Link href={item === 'home' ? '/' : `/${item}`}>{text(item)}</Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </nav>
                <SheetClose asChild>
                  <Link href='/apply'>
                    <Button variant='primary'>
                      {text('apply')}
                      <Rocket />
                    </Button>
                  </Link>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
