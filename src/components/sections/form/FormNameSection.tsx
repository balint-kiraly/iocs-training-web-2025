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
  return (
    <>
      <div
        className={`
          grid grid-cols-1 gap-x-10 gap-y-5

          sm:grid-cols-2
        `}
      >
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder='First Name' />
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
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder='Last Name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name='nickname'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder='Nickname' />
                </FormControl>
                <FormDescription>Optional</FormDescription>
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
