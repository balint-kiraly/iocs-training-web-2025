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
            <CardTitle className='text-2xl font-bold'>{text('f-box-header')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-2'>{text('text.f-box-p1')}</p>
            <p className='mb-2'>{text('text.f-box-p2')}</p>
            <p className='mb-2'>{text('text.f-box-p3')}</p>
            <p className='mb-2'>{text('text.f-box-p4')}</p>
            <p className='mb-2'>{text('text.f-box-p5')}</p>
            <p>{text('text.f-box-p6')}</p>
          </CardContent>
        </Card>
      </Reveal>
      <Reveal delay={0.3}>
        <Card className='max-w-screen-sm'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>{text('s-box-header')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-2'>{text('text.s-box-p1')}</p>
            <p className='mb-2'>{text('text.s-box-p2')}</p>
            <p>{text('text.s-box-p3')}</p>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
};

export default DetailsSection;
