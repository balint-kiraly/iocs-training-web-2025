import { useTranslations } from 'next-intl';
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

export const FormPreferencesSection: React.FC<FormOtherSectionProps> = ({ form }) => {
  const text = useTranslations('ApplicationForm');

  const drivingLicense = form.watch('drivingLicense');
  const customDiet = form.watch('customDiet');

  return (
    <>
      <h2 className='text-xl font-semibold'>{text('sections.preferences')}</h2>
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
                <FormLabel>{text('labels.drivingLicense')}</FormLabel>
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
                  <FormLabel>{text('labels.likesDriving')}</FormLabel>
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
                <FormLabel>{text('labels.diet')}</FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (value !== 'Other' && customDiet !== undefined) {
                      form.setValue('customDiet', undefined);
                    }
                    field.onChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger {...field}>
                      <SelectValue placeholder={text('placeholders.diet')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {diets.map((diet) => (
                      <SelectItem key={diet} value={diet}>
                        {text(`options.diet.${diet}`)}
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
                  <FormLabel>{text('labels.customDiet')}</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      type='text'
                      placeholder={text('placeholders.customDiet')}
                    />
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
                <FormLabel>{text('labels.languages')}</FormLabel>
                <FormControl>
                  <TagsInput
                    {...field}
                    placeHolder={text('placeholders.languages')}
                    separators={[' ', 'Enter']}
                    classNames={{
                      input: 'text-sm border border-input placeholder:text-muted-foreground',
                      tag: 'text-sm px-2',
                    }}
                  />
                </FormControl>
                <FormDescription>{text('descriptions.languages')}</FormDescription>
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
