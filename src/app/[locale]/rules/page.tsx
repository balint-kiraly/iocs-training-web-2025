import { useTranslations } from 'next-intl';
import React from 'react';

const RulesPage = () => {
  const text = useTranslations('Rules');

  return (
    <main className='min-h-screen px-6 pt-20'>
      <h1 className='mb-6 text-center text-3xl font-semibold'>{text('header')}</h1>

      <section className='mb-8'>
        <h2>
          <ol className='mb-4 list-inside list-decimal text-2xl font-semibold'>
            <li className={'ml-4 text-primary'}>{text('headings.goal')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.goal')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-1')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-1')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-2')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-2')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-3')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-3')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-4')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-4')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-5')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-5')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-6')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-6')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-7')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-7')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-8')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-8')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-9')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-9')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-10')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-10')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-11')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-11')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-12')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-12')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-13')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-13')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-14')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-14')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-15')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-15')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-16')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-16')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-17')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-17')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-18')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-18')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-19')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-19')}</p>
            <li className={'ml-4 text-primary'}>{text('headings.apply-20')}</li>
            <p className='text-w mb-10 ml-12 mr-12 mt-4 text-lg'>{text('text.apply-20')}</p>
          </ol>
        </h2>
      </section>

      <section className='mt-10 text-center'>
        <a
          href='/house-rules.pdf'
          download
          className={`
            cursor-pointer rounded-lg bg-primary from-secondary to-transparent px-6 py-3 font-bold text-white shadow-lg
            transition-all

            hover:bg-gradient-to-l
          `}
        >
          {text('text.button')}
        </a>
      </section>
      <section className='mb-10 ml-12 mr-12 mt-10'>
        <p className='text-lg font-semibold text-white'>{text('text.ending')}</p>
      </section>
    </main>
  );
};

export default RulesPage;
