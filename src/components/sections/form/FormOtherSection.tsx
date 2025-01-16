import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TagsInput } from 'react-tag-input-component';
import { z } from 'zod';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { diets, formSchema } from '@/lib/formValidation';

interface FormOtherSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const FormOtherSection: React.FC<FormOtherSectionProps> = ({ form }) => {
  const drivingLicense = form.watch('drivingLicense');

  return (
    <>
      <h2 className='text-xl font-semibold'>Other</h2>
      <div
        className={`
          mt-4 grid grid-cols-1 gap-x-10 gap-y-5

          sm:grid-cols-2
        `}
      >
        <FormField
          control={form.control}
          name='drivingLicense'
          render={({ field }) => {
            return (
              <FormItem className='flex flex-row items-center space-x-4 space-y-0'>
                <FormLabel>Do you have a driving licence?</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {drivingLicense ? (
          <FormField
            control={form.control}
            name='likesDriving'
            render={({ field }) => {
              return (
                <FormItem className='flex flex-row items-center space-x-4 space-y-0'>
                  <FormLabel>Do you like driving?</FormLabel>
                  <FormControl>
                    <Switch checked={drivingLicense && field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        ) : (
          <div></div>
        )}
        <FormField
          control={form.control}
          name='diet'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Diet</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger {...field}>
                      <SelectValue placeholder='Select your diet' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {diets.map((diet) => (
                      <SelectItem key={diet} value={diet}>
                        {diet}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {form.watch('diet') === 'Other' ? (
          <FormField
            control={form.control}
            name='customDiet'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Custom Diet</FormLabel>
                  <FormControl>
                    <Input {...field} type='text' placeholder='Please provide your custom diet' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        ) : (
          <div></div>
        )}
        <FormField
          control={form.control}
          name='languages'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Languages</FormLabel>
                <FormControl>
                  <TagsInput
                    {...field}
                    placeHolder='Enter languages'
                    separators={[',', 'Enter']}
                    classNames={{
                      input: 'text-sm border border-input',
                      tag: 'text-sm px-2',
                    }}
                  />
                </FormControl>
                <FormDescription>Enter the languages you speak, separated by commas.</FormDescription>
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
