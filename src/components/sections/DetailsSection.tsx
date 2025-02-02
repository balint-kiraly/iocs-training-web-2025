import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reveal } from '@/components/ui/Reveal';

const DetailsSection = () => {
  const text = useTranslations('Details');
  return (
    <section id='details' className='mx-auto flex w-fit flex-wrap justify-center gap-10'>
      <Reveal>
        <Card className='max-w-screen-sm'>
          <CardHeader>
            <CardTitle className='text-3xl font-black'>{text('f-box-header')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul
              className={`
                list-disc pl-6

                marker:text-2xl marker:text-secondary
              `}
            >
              <li className='mb-2'>{text('text.f-box-p1')}</li>
              <li className='mb-2'>{text('text.f-box-p2')}</li>
              <li className='mb-2'>{text('text.f-box-p3')}</li>
              <li className='mb-2'>{text('text.f-box-p4')}</li>
              <li className='mb-2'>{text('text.f-box-p5')}</li>
            </ul>

            <p className='mt-6'>{text('text.f-box-p6')}</p>
          </CardContent>
        </Card>
      </Reveal>
      <Reveal delay={0.3}>
        <Card className='max-w-screen-sm'>
          <CardHeader>
            <CardTitle className='text-3xl font-black'>{text('s-box-header')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-2'>
              {text.rich('text.s-box-p1', {
                em: (chunks) => <em className='bg-secondary px-2 py-1 rounded'>{chunks}</em>,
              })}
            </p>
            <p className='mb-2'>{text('text.s-box-p2')}</p>
            <p>{text('text.s-box-p3')}</p>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
};

export default DetailsSection;
