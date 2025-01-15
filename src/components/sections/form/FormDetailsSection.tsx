import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from '@/lib/formValidation';

interface FormDetailsSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const FormDetailsSection: React.FC<FormDetailsSectionProps> = ({ form }) => {
  return (
    <>
      <h2 className='text-xl font-semibold'>Personal Details</h2>
      <div
        className={`
          grid grid-cols-1 gap-x-10 gap-y-2

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
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} type='text' placeholder='City' />
                    </FormControl>
                    <FormMessage />
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
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' placeholder='1234' />
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
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder='Street and house number' />
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
