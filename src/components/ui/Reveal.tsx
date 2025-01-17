'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  once?: boolean;
  delay?: number;
}

export const Reveal = ({ children, once = true, delay = 0 }: RevealProps) => {
  const ref = useRef(null);
  const isVisible = useInView(ref, { once });
  const animation = useAnimation();

  useEffect(() => {
    if (isVisible) {
      animation.start('visible').then(() => {});
    }
  }, [animation, isVisible]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial='hidden'
      animate={animation}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};
