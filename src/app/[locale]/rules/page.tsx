'use client';

import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';

const RulesPage = () => {
  const text = useTranslations('Rules');
  const locale = useLocale();
  const rulesPath = `/documents/rules/house-rules-${locale}.pdf`;

  return (
    <main className='mx-auto min-h-screen max-w-screen-xl px-6 pt-32'>
      <h1 className='relative z-30 mb-10 text-center text-3xl font-semibold'>{text('heading')}</h1>

      <h2 className='mb-4 text-xl font-semibold'>{text('greeting')}</h2>
      <p className='mb-2'>{text('generalInfo')}</p>
      <p className='mb-10'>{text('acceptance')}</p>

      <h2 className='mb-4 text-xl font-semibold'>{text('title')}</h2>

      <ol
        className={`
          list-inside list-decimal space-y-4

          marker:pr-4 marker:text-xl marker:font-bold marker:text-primary
        `}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <li key={index} className='break-words text-justify'>
            {text(`rules.rule-${index + 1}`)}
          </li>
        ))}
      </ol>

      <div className='my-20 flex justify-center'>
        <a href={rulesPath} download>
          <Button
            variant='secondary'
            size='lg'
            className={`
              bg-gradient-to-r from-primary to-secondary font-bold transition-transform

              hover:scale-105
            `}
          >
            {text('download')}
          </Button>
        </a>
      </div>
    </main>
  );
};

export default RulesPage;
