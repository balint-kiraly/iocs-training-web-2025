import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { DatePicker } from '@/components/ui/date-picker';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from '@/lib/formValidation';

interface FormDetailsSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const FormDetailsSection: React.FC<FormDetailsSectionProps> = ({ form }) => {
  return (
    <>
      <h2 className='mb-4 text-xl font-semibold'>Personal Details</h2>
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
        <FormField
          control={form.control}
          name='idNumber'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>ID Number</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder='xxxxxxAB' />
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
                <FormLabel>Student ID Number</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder='1xxxxxxxxx' />
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
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='birthPlace'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Place of Birth</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder='Place of Birth' />
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
                <FormLabel>Mother&#39;s Name</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder="Mother's Name" />
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
