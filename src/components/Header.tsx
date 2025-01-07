import { Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className='absolute w-screen p-4 text-white'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Image src='/logo.png' alt='IÖCS logo' width={35} height={35} className='relative bottom-0.5' />
          <Link href='/' className='text-2xl font-bold'>
            IÖCS Training 2025
          </Link>
        </div>
        <nav>
          <ul className='flex space-x-8'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/'>Rules</Link>
            </li>
            <li>
              <Link href='/'>Contact</Link>
            </li>
          </ul>
        </nav>
        <Button>
          Apply Now
          <Rocket />
        </Button>
      </div>
    </header>
  );
};

export default Header;
