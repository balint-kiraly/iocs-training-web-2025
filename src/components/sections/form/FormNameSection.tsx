import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from '@/lib/formValidation';

interface FormNameSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const FormNameSection: React.FC<FormNameSectionProps> = ({ form }) => {
  const text = useTranslations('ApplicationForm');
  const locale = useLocale();

  return (
    <>
      <div
        className={`
          grid grid-cols-1 gap-x-10 gap-y-5

          sm:grid-cols-2
        `}
      >
        {locale === 'hu' ? (
          <>
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{text('labels.lastName')}</FormLabel>
                    <FormControl>
                      <Input {...field} type='text' placeholder={text('placeholders.lastName')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{text('labels.firstName')}</FormLabel>
                    <FormControl>
                      <Input {...field} type='text' placeholder={text('placeholders.firstName')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{text('labels.firstName')}</FormLabel>
                    <FormControl>
                      <Input {...field} type='text' placeholder={text('placeholders.firstName')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{text('labels.lastName')}</FormLabel>
                    <FormControl>
                      <Input {...field} type='text' placeholder={text('placeholders.lastName')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </>
        )}

        <FormField
          control={form.control}
          name='nickname'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{text('labels.nickname')}</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder={text('placeholders.nickname')} />
                </FormControl>
                <FormDescription>{text('descriptions.optional')}</FormDescription>
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
