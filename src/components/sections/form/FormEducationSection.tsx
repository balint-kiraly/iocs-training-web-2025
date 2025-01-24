import { useTranslations } from 'next-intl';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { faculties, formSchema, letters, universities } from '@/lib/formValidation';

interface FormStudiesSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const FormEducationSection: React.FC<FormStudiesSectionProps> = ({ form }) => {
  const text = useTranslations('ApplicationForm');

  const university = form.watch('university');
  const faculty = form.watch('faculty');
  const otherUniversity = form.watch('otherUniversity');

  let universitySecondaryInput;
  if (university === 'SE') {
    universitySecondaryInput = (
      <FormField
        control={form.control}
        name='faculty'
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>{text('labels.faculty')}</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger value={field.value ?? ''}>
                    <SelectValue placeholder={text('placeholders.faculty')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {faculties.map((faculty) => (
                    <SelectItem key={faculty} value={faculty}>
                      {faculty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  } else if (university === 'Other') {
    universitySecondaryInput = (
      <FormField
        control={form.control}
        name='otherUniversity'
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>{text('labels.otherUniversity')}</FormLabel>
              <FormControl>
                <Input
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  type='text'
                  placeholder={text('placeholders.otherUniversity')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  } else {
    universitySecondaryInput = <div></div>;
  }

  return (
    <>
      <h2 className='mb-4 text-xl font-semibold'>{text('sections.education')}</h2>
      <div
        className={`
          grid grid-cols-1 gap-x-10 gap-y-5

          sm:grid-cols-2
        `}
      >
        <FormField
          control={form.control}
          name='university'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{text('labels.university')}</FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (value !== 'Other' && otherUniversity !== undefined) {
                      form.setValue('otherUniversity', undefined);
                    }
                    if (value !== 'SE' && faculty !== undefined) {
                      form.setValue('faculty', undefined);
                    }
                    field.onChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger {...field}>
                      <SelectValue placeholder={text('placeholders.university')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {universities.map((university) => (
                      <SelectItem key={university} value={university}>
                        {university === 'Other' ? text('options.Other') : university}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {universitySecondaryInput}
        <div className='grid grid-cols-2 gap-x-10'>
          <FormField
            control={form.control}
            name='letter'
            render={({ field }) => {
              return (
                <FormItem className='grow'>
                  <FormLabel>{text('labels.letter')}</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger {...field}>
                        <SelectValue placeholder={text('placeholders.letter')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {letters.map((letter) => (
                        <SelectItem key={letter} value={letter}>
                          {letter === 'None' ? text('options.None') : letter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='startYear'
            render={({ field }) => {
              return (
                <FormItem className='grow'>
                  <FormLabel>{text('labels.startYear')}</FormLabel>
                  <Select onValueChange={(value) => field.onChange(Number(value))}>
                    <FormControl>
                      <SelectTrigger {...field}>
                        <SelectValue placeholder={text('placeholders.startYear')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from(
                        { length: new Date().getFullYear() - 2000 },
                        (_, i) => new Date().getFullYear() - 1 - i
                      ).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name='academicYear'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{text('labels.academicYear')}</FormLabel>
                <FormControl>
                  <div className='flex h-9 items-center gap-4'>
                    <Slider min={1} max={6} step={1} onValueChange={(v) => field.onChange(v[0])} />
                    <span className='px-4'>{field.value ?? ' '}</span>
                  </div>
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
