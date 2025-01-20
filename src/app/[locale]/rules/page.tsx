import { useTranslations } from 'next-intl';
import React from 'react';

const RulesPage = () => {
  const text = useTranslations('Rules');
  return (
    <main className='min-h-screen px-6 pt-20'>
      <h1 className='mb-6 text-center text-3xl font-semibold'>{text('header')}</h1>

      <section className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>{text('headings.goal')}</h2>
        <p className='text-lg'>{text('text.goal')}</p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>{text('headings.apply')}</h2>
        <ul className='list-inside list-disc text-lg'>
          <li>
            <strong>{text('subheadings.apply-1')}</strong> {text('text.apply-1')}
          </li>
          <li>
            <strong>{text('subheadings.apply-2')}</strong> {text('text.apply-2')}
          </li>
          <li>
            <strong>{text('subheadings.apply-3')}</strong> {text('text.apply-3')}
          </li>
        </ul>
      </section>

      <section className='mt-10 text-center'>
        <a
          href='/rules.pdf'
          download
          className={`
            cursor-pointer rounded-lg bg-primary from-secondary to-transparent px-6 py-3 font-semibold text-white
            shadow-lg transition-all

            hover:bg-gradient-to-l
          `}
        >
          {text('text.button')}
        </a>
      </section>

      <section className='mt-10'>
        <p className='text-center text-lg'>{text('text.ending')}</p>
      </section>
    </main>
  );
};

export default RulesPage;
