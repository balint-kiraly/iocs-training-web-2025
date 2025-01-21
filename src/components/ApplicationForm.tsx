import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, LoaderCircle, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import submitApplication from '@/actions/submitApplication';
import { FormAcceptanceSection } from '@/components/sections/form/FormAcceptanceSection';
import { FormAvailabilitySection } from '@/components/sections/form/FormAvailabilitySection';
import { FormContactSection } from '@/components/sections/form/FormContactSection';
import { FormDetailsSection } from '@/components/sections/form/FormDetailsSection';
import { FormEducationSection } from '@/components/sections/form/FormEducationSection';
import { FormInternationalSection } from '@/components/sections/form/FormInternationalSection';
import { FormNameSection } from '@/components/sections/form/FormNameSection';
import { FormPreferencesSection } from '@/components/sections/form/FormPreferencesSection';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from '@/i18n/routing';
import { formSchema } from '@/lib/formValidation';

export const ApplicationForm = () => {
  const text = useTranslations('ApplicationForm');

  const [state, action, isPending] = useActionState(submitApplication, null);
  const router = useRouter();
  const { toast } = useToast();

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
      likesDriving: false,
      diet: undefined,
      customDiet: undefined,
      languages: [],
      availableAtWeekend1: false,
      availableAtWeekend2: false,
      internationalTraining: undefined,
    },
  });

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
            <ToastAction altText='Dismiss toast'>
              <Check />
            </ToastAction>
          ),
        });
      }, 1000);
    }
  }, [router, state, toast]);

  return (
    <div className='mx-auto w-full min-w-60 max-w-4xl p-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormNameSection form={form} />
          <FormContactSection form={form} />
          <FormDetailsSection form={form} />
          <FormEducationSection form={form} />
          <FormPreferencesSection form={form} />
          <FormAvailabilitySection form={form} />
          <FormInternationalSection form={form} />
          <FormAcceptanceSection form={form} />
          {state?.status === 'error' && (
            <Alert variant='destructive' className='mt-10'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Error submitting your application</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <div className='mt-10 flex justify-end'>
            <Button type='submit' disabled={isPending}>
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
