import { Plus, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { formSchema, languageCertificateLevels } from '@/lib/formValidation';

interface FormInternationalSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const FormInternationalSection: React.FC<FormInternationalSectionProps> = ({ form }) => {
  const text = useTranslations('ApplicationForm');

  return (
    <>
      <h2 className='text-xl font-semibold'>{text('sections.international')}</h2>
      <p>{text('descriptions.international')}</p>
      <div className={`mt-4`}>
        <FormField
          control={form.control}
          name='internationalTraining'
          render={({ field }) => {
            return (
              <div
                className={`
                  mt-4 grid h-min grid-cols-1 gap-x-10 gap-y-5

                  sm:grid-cols-2
                `}
              >
                <FormItem
                  className={`
                    flex flex-row items-center space-x-4 space-y-0

                    sm:col-span-2
                  `}
                >
                  <FormLabel>{text('labels.international')}</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value !== undefined}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? {} : undefined);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                {field.value !== undefined && (
                  <>
                    {/* Motivation Input */}
                    <FormField
                      control={form.control}
                      name='internationalTraining.motivation'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{text('labels.motivation')}</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder={text('placeholders.motivation')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Add Certificate Button */}
                    <div className='space-y-2'>
                      <FormLabel>{text('labels.certificates')}</FormLabel>
                      {/* Render Existing Certificates */}
                      {form.watch('internationalTraining.certificates')?.map((_, index) => (
                        <div key={index} className='flex items-start gap-x-4'>
                          <div className='flex grow gap-x-2'>
                            {/* Language Field */}
                            <FormField
                              control={form.control}
                              name={`internationalTraining.certificates.${index}.language`}
                              render={({ field }) => (
                                <FormItem className='grow'>
                                  <FormControl>
                                    <Input {...field} placeholder={text('placeholders.language')} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {/* Level Field */}
                            <FormField
                              control={form.control}
                              name={`internationalTraining.certificates.${index}.level`}
                              render={({ field }) => (
                                <FormItem>
                                  <Select onValueChange={field.onChange}>
                                    <FormControl>
                                      <SelectTrigger {...field}>
                                        <SelectValue placeholder={text('placeholders.level')} />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {languageCertificateLevels.map((level) => (
                                        <SelectItem key={level} value={level}>
                                          {level}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          {/* Remove Button */}
                          <Button
                            type='button'
                            variant='destructive'
                            onClick={() => {
                              const currentCertificates = form.getValues('internationalTraining.certificates') || [];
                              form.setValue(
                                'internationalTraining.certificates',
                                currentCertificates.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            <X />
                          </Button>
                        </div>
                      ))}
                      <FormItem className='flex items-start justify-between space-y-0'>
                        <Button
                          type='button'
                          variant='outline'
                          onClick={() => {
                            const currentCertificates = form.getValues('internationalTraining.certificates') || [];
                            form.setValue('internationalTraining.certificates', [
                              ...currentCertificates,
                              { language: '', level: undefined },
                            ]);
                          }}
                        >
                          {text('labels.add-certificate')}
                          <Plus />
                        </Button>
                      </FormItem>
                    </div>
                  </>
                )}
              </div>
            );
          }}
        />
      </div>
      <hr className='my-6' />
    </>
  );
};
