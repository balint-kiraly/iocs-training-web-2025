import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { faculties, formSchema, universities } from '@/lib/formValidation';

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
      drivingLicense: undefined,
      likesDriving: undefined,
      availableAtWeekend1: undefined,
      availableAtWeekend2: undefined,
      diet: undefined,
      customDiet: undefined,
      internationalTraining: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO Do something with the form values.
    // ✅ This will be type-safe and validated.
    //eslint-disable-next-line no-console
    console.log(values);
  }

  const university = form.watch('university');

  return (
    <div className='mx-auto w-full min-w-60 max-w-4xl p-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className={`
              grid grid-cols-1 gap-x-10 gap-y-2

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
          <h2 className='text-xl font-semibold'>Contact Information</h2>
          <div
            className={`
              grid grid-cols-1 gap-x-10 gap-y-2

              sm:grid-cols-2
            `}
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} type='email' placeholder='Email' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} type='tel' placeholder='+36-xx-xxx-xxxx' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <hr className='my-6' />
          <h2 className='text-xl font-semibold'>Personal Details</h2>
          <div
            className={`
              grid grid-cols-1 gap-x-10 gap-y-2

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
          </div>

          <hr className='my-6' />
          <h2 className='text-xl font-semibold'>Studies</h2>
          <div
            className={`
              grid grid-cols-1 gap-x-10 gap-y-2

              sm:grid-cols-2
            `}
          >
            <FormField
              control={form.control}
              name='university'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>University</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger {...field}>
                          <SelectValue placeholder='Your University' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {universities.map((university) => (
                          <SelectItem key={university} value={university}>
                            {university}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {university === 'SE' && (
              <FormField
                control={form.control}
                name='faculty'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Faculty</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger {...field}>
                            <SelectValue placeholder='Your Faculty' />
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
            )}
            <FormField
              control={form.control}
              name='academicYear'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Academic Year</FormLabel>
                    <FormControl>
                      <div className='flex gap-4'>
                        <Slider min={1} max={6} step={1} onValueChange={(v) => field.onChange(v[0])} />
                        <span className='px-4'>{field.value}</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button type='submit' className='mt-5'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
