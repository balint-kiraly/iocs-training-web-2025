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
                  <FormLabel>I accept the Rules of the Training</FormLabel>
                  <FormDescription>
                    I declare that I have read and accepted the 2025 Instructor Training Rules and consider them binding
                    upon myself.{' '}
                    <Link href='/rules' className='text-blue-500 underline'>
                      Rules
                    </Link>
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
                  <FormLabel>I accept the Privacy Policy</FormLabel>
                  <FormDescription>
                    By submitting my application, I confirm that I have read and accepted the Data Protection Notice for
                    the 2025 Instructor Training, the Instructor Volunteer Group, and the IÖCS Association.{' '}
                    <Link href='/privacy-policy' className='text-blue-500 underline'>
                      Privacy Policy
                    </Link>
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
