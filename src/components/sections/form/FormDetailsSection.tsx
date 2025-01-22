import { useTranslations } from 'next-intl';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { DatePicker } from '@/components/ui/date-picker';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from '@/lib/formValidation';
import { dateToString, stringToDate } from '@/lib/utils';

interface FormDetailsSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const FormDetailsSection: React.FC<FormDetailsSectionProps> = ({ form }) => {
  const text = useTranslations('ApplicationForm');

  return (
    <>
      <h2 className='mb-4 text-xl font-semibold'>{text('sections.details')}</h2>
      <div
        className={`
          grid grid-cols-1 gap-x-10 gap-y-5

          sm:grid-cols-2
        `}
      >
        <div className='flex justify-between gap-x-10'>
          <div className='grow'>
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{text('labels.city')}</FormLabel>
                    <FormControl>
                      <Input {...field} type='text' placeholder={text('placeholders.city')} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>{text('descriptions.address')}</FormDescription>
                  </FormItem>
                );
              }}
            />
          </div>
          <div className='w-28'>
            <FormField
              control={form.control}
              name='zipCode'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{text('labels.zipCode')}</FormLabel>
                    <FormControl>
                      <Input {...field} type='text' placeholder={text('placeholders.zipCode')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{text('labels.address')}</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder={text('placeholders.address')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name='idNumber'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{text('labels.idNumber')}</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder={text('placeholders.idNumber')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name='studentId'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{text('labels.studentId')}</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder={text('placeholders.studentId')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name='birthDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{text('labels.birthDate')}</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value ? stringToDate(field.value) : undefined}
                  onChange={(value) => value && field.onChange(dateToString(value))}
                  placeholder={text('placeholders.birthDate')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='birthPlace'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{text('labels.birthPlace')}</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder={text('placeholders.birthPlace')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name='mothersName'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{text('labels.mothersName')}</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder={text('placeholders.mothersName')} />
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
