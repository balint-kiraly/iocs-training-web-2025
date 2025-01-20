'use client';

import React from 'react';

import { scrollToAnchor } from '@/lib/utils';

const ScrollButton = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return <div onClick={() => scrollToAnchor(to)}>{children}</div>;
};

export default ScrollButton;
