import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, LoaderCircle, Send } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React, { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodIssueCode } from 'zod';

import submitApplication from '@/actions/submitApplication';
import { createSupportMailLink } from '@/actions/support';
import { FormAcceptanceSection } from '@/components/sections/form/FormAcceptanceSection';
import { FormAvailabilitySection } from '@/components/sections/form/FormAvailabilitySection';
import { FormContactSection } from '@/components/sections/form/FormContactSection';
import { FormDetailsSection } from '@/components/sections/form/FormDetailsSection';
import { FormEducationSection } from '@/components/sections/form/FormEducationSection';
import { FormInternationalSection } from '@/components/sections/form/FormInternationalSection';
import { FormLifestyleSkillsSection } from '@/components/sections/form/FormLifestyleSkillsSection';
import { FormNameSection } from '@/components/sections/form/FormNameSection';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';
import { useRouter } from '@/i18n/routing';
import { formSchema } from '@/lib/formValidation';

export const ApplicationForm = () => {
  const text = useTranslations('ApplicationForm');
  const locale = useLocale();

  const [state, action, isPending] = useActionState(submitApplication, null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      nickname: '',
      email: '',
      phone: '',
      zipCode: '',
      city: '',
      address: '',
      idNumber: '',
      studentId: '',
      birthDate: undefined,
      birthPlace: '',
      mothersName: '',
      university: undefined,
      otherUniversity: undefined,
      faculty: undefined,
      letter: undefined,
      startYear: undefined,
      academicYear: undefined,
      drivingLicense: false,
      likesDriving: undefined,
      diet: undefined,
      customDiet: undefined,
      languages: [],
      availableAtWeekend1: false,
      availableAtWeekend2: false,
      internationalTraining: undefined,
    },
  });

  useEffect(() => {
    const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
      switch (issue.code) {
        case ZodIssueCode.too_small:
          if (issue.type === 'string') {
            return { message: text('errors.required') };
          }
          break;
        case ZodIssueCode.invalid_type:
          if (issue.received === 'undefined' || issue.received === 'boolean') {
            return { message: text('errors.required') };
          }
          break;
        default:
          return { message: ctx.defaultError };
      }
      // Fallback to the default error message
      return { message: ctx.defaultError };
    };

    z.setErrorMap(customErrorMap);
  }, [text]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      action(values);
    });
  }

  useEffect(() => {
    if (state?.status === 'success') {
      router.push('/');
      setTimeout(() => {
        toast({
          title: 'Application Submitted Successfully!',
          description: 'Save the date: February 13th, 2025',
          action: (
            <ToastAction altText='Dismiss Notification' className='text-primary'>
              <Check />
            </ToastAction>
          ),
        });
      }, 1000);
    }
  }, [router, state]);

  const [supportMailLink, setSupportMailLink] = useState<string | null>(null);
  useEffect(() => {
    if (state?.status === 'error' && state.message) {
      createSupportMailLink(state.message, form.getValues(), locale).then(setSupportMailLink);
    }
  }, [state, locale, form]);

  return (
    <div className='mx-auto w-full min-w-60 max-w-4xl p-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormNameSection form={form} />
          <FormContactSection form={form} />
          <FormDetailsSection form={form} />
          <FormEducationSection form={form} />
          <FormLifestyleSkillsSection form={form} />
          <FormAvailabilitySection form={form} />
          <FormInternationalSection form={form} />
          <FormAcceptanceSection form={form} />
          {state?.status === 'error' && (
            <>
              <Alert variant='destructive' className='mt-10'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>{text('errors.title')}</AlertTitle>
                <AlertDescription>{text(`errors.${state.error}`)}</AlertDescription>
              </Alert>
              <p className='mt-2 text-sm text-muted-foreground'>
                {text.rich('errors.support', {
                  link: (chunks) =>
                    supportMailLink ? (
                      <a
                        href={supportMailLink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='font-medium text-primary underline'
                      >
                        {chunks}
                      </a>
                    ) : (
                      <span className='font-medium text-primary'>{chunks}</span>
                    ),
                })}
              </p>
            </>
          )}
          <div className='mt-10 flex justify-end'>
            <Button type='submit' variant='primary' disabled={isPending}>
              {text('labels.submit')}
              {!isPending && <Send />}
              {isPending && <LoaderCircle className='animate-spin' />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
