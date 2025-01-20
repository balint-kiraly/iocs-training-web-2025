import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { formSchema } from '@/lib/formValidation';

interface FormAvailabilitySectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const FormAvailabilitySection: React.FC<FormAvailabilitySectionProps> = ({ form }) => {
  return (
    <>
      <h2 className='text-xl font-semibold'>Your Availability</h2>
      <p>Please mark the weekends when you are available</p>
      <div
        className={`
          mt-8 grid grid-cols-1 gap-x-10 gap-y-5

          sm:grid-cols-2
        `}
      >
        <FormField
          control={form.control}
          name='availableAtWeekend1'
          render={({ field }) => {
            return (
              <FormItem className='flex flex-row items-center space-x-4 space-y-0'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>March 1-3</FormLabel>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name='availableAtWeekend2'
          render={({ field }) => {
            return (
              <FormItem className='flex flex-row items-center space-x-4 space-y-0'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>March 22-24</FormLabel>
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
