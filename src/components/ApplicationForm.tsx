import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormAcceptanceSection } from '@/components/sections/form/FormAcceptanceSection';
import { FormAvailabilitySection } from '@/components/sections/form/FormAvailabilitySection';
import { FormContactSection } from '@/components/sections/form/FormContactSection';
import { FormDetailsSection } from '@/components/sections/form/FormDetailsSection';
import { FormInternationalSection } from '@/components/sections/form/FormInternationalSection';
import { FormNameSection } from '@/components/sections/form/FormNameSection';
import { FormOtherSection } from '@/components/sections/form/FormOtherSection';
import { FormStudiesSection } from '@/components/sections/form/FormStudiesSection';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { formSchema } from '@/lib/formValidation';

export const ApplicationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      nickname: undefined,
      email: undefined,
      phone: undefined,
      zipCode: undefined,
      city: undefined,
      address: undefined,
      idNumber: undefined,
      studentId: undefined,
      birthDate: undefined,
      birthPlace: undefined,
      mothersName: undefined,
      university: undefined,
      faculty: undefined,
      startYear: undefined,
      academicYear: undefined,
      letter: undefined,
      drivingLicense: false,
      likesDriving: false,
      availableAtWeekend1: false,
      availableAtWeekend2: false,
      diet: undefined,
      customDiet: undefined,
      languages: [],
      internationalTraining: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO Do something with the form values.
    // ✅ This will be type-safe and validated.
    //eslint-disable-next-line no-console
    console.log(values);
  }

  return (
    <div className='mx-auto w-full min-w-60 max-w-4xl p-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormNameSection form={form} />
          <FormContactSection form={form} />
          <FormDetailsSection form={form} />
          <FormStudiesSection form={form} />
          <FormOtherSection form={form} />
          <FormAvailabilitySection form={form} />
          <FormInternationalSection form={form} />
          <FormAcceptanceSection form={form} />
          <div className='mt-10 flex justify-end'>
            <Button type='submit'>
              Submit
              <Send />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
