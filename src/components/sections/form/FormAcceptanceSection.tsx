import { useTranslations } from 'next-intl';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Link } from '@/i18n/routing';
import { formSchema } from '@/lib/formValidation';

interface FormAcceptanceSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const FormAcceptanceSection: React.FC<FormAcceptanceSectionProps> = ({ form }) => {
  const text = useTranslations('ApplicationForm');

  return (
    <>
      <div
        className={`
          mt-8 grid grid-cols-1 gap-x-10 gap-y-5

          sm:grid-cols-2
        `}
      >
        <FormField
          control={form.control}
          name='acceptRules'
          render={({ field }) => {
            return (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md p-4'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>{text('labels.acceptRules')}</FormLabel>
                  <FormDescription>
                    {text.rich('descriptions.acceptRules', {
                      link: (chunks) => (
                        <Link href='/rules' className='text-blue-500 underline'>
                          {chunks}
                        </Link>
                      ),
                    })}
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name='acceptPrivacyPolicy'
          render={({ field }) => {
            return (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 p-4'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>{text('labels.acceptPrivacyPolicy')}</FormLabel>
                  <FormDescription>
                    {text.rich('descriptions.acceptPrivacyPolicy', {
                      link: (chunks) => (
                        <Link href='/privacy-policy' className='text-blue-500 underline'>
                          {chunks}
                        </Link>
                      ),
                    })}
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            );
          }}
        />
      </div>
    </>
  );
};
