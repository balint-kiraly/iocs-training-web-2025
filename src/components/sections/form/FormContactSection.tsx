import { useTranslations } from 'next-intl';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from '@/lib/formValidation';

interface FormContactSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const FormContactSection: React.FC<FormContactSectionProps> = ({ form }) => {
  const text = useTranslations('ApplicationForm');

  return (
    <>
      <h2 className='mb-4 text-xl font-semibold'>{text('sections.contact')}</h2>
      <div
        className={`
          grid grid-cols-1 gap-x-10 gap-y-5

          sm:grid-cols-2
        `}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{text('labels.email')}</FormLabel>
                <FormControl>
                  <Input {...field} type='email' placeholder={text('placeholders.email')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{text('labels.phone')}</FormLabel>
                <FormControl>
                  <Input {...field} type='tel' placeholder={text('placeholders.phone')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
      <hr className='my-6' />
    </>
  );
};
