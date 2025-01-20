'use client';

import { ChevronDown } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

const ScrollButton = () => {
  const handleScroll = () => {
    document.getElementById('info')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Button variant='ghost' className='animation-bouncing-arrow mb-4' onClick={handleScroll}>
      <ChevronDown />
    </Button>
  );
};

export default ScrollButton;
