import { Rocket } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

const ApplicationSection = () => {
  const text = useTranslations('ApplicationSection');

  return (
    <div className='px-10 py-20'>
      <Card
        className={`
          mx-auto flex w-fit flex-col items-start gap-8 p-8

          sm:flex-row sm:items-center
        `}
      >
        <CardHeader className='p-0'>
          <CardTitle className='text-2xl'>{text('heading')}</CardTitle>
          <CardDescription className='text-lg'>{text('subheading')}</CardDescription>
        </CardHeader>
        <CardContent className='w-fit p-0'>
          <Link href='/apply'>
            <Button variant='primary' size='lg' className='text-lg'>
              {text('cta')}
              <Rocket />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationSection;
