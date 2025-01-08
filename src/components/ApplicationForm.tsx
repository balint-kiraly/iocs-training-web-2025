import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const universities = ['SE', 'BME', 'ELTE', 'Pázmány', 'Corvinus', 'else'] as const;
const faculties = ['ÁOK', 'FOK', 'GYTK', 'ETK', 'EKK', 'PAK'] as const;
const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'J/EKK',
  'K',
  'L',
  'M',
  'N',
  'R',
  'S',
  'T',
  'FOK1',
  'FOK2',
  'GYOK1',
  'GYOK2',
  'GYOK3',
  'PAK',
  'International',
] as const;

const formSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  nickname: z.string().optional(),
  email: z.string().email(),
  phone: z.string().regex(/^[+]36-[0-9]{2}-[0-9]{3}-[0-9]{4}$/),
  university: z.string().nonempty(),
  faculty: z.enum(faculties).optional(),
  academicYear: z.number().int().min(1).max(6),
  letterMember: z.boolean(),
  letter: z.enum(letters).optional(),
});

export const ApplicationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      nickname: '',
      email: '',
      phone: '+36-',
      university: '',
      faculty: 'ÁOK',
      academicYear: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
                        <SelectItem value='SE'>SE</SelectItem>
                        <SelectItem value='BME'>BME</SelectItem>
                        <SelectItem value='ELTE'>ELTE</SelectItem>
                        <SelectItem value='Pázmány'>Pázmány</SelectItem>
                        <SelectItem value='Corvinus'>Corvinus</SelectItem>
                        <SelectItem value='else'>Else...</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
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
