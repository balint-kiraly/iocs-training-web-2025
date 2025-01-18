import { z } from 'zod';

export const universities = ['SE', 'BME', 'ELTE', 'PPKE', 'BCE', 'Other'] as const;
export const faculties = ['ÁOK', 'FOK', 'GYTK', 'ETK', 'EKK', 'PAK'] as const;
export const letters = [
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
  "Don't have one",
] as const;
export const diets = ['Normal', 'Vegetarian', 'Vegan', 'LactoseFree', 'GlutenFree', 'Other'] as const;
export const languageCertificateLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

const LanguageCertificateSchema = z
  .object({
    language: z.string().nonempty(),
    level: z.enum(languageCertificateLevels).optional(),
  })
  .refine((data) => data.level !== undefined, {
    message: 'Provide the level.',
    path: ['level'],
  });

const InternationalTrainingSchema = z.object({
  motivation: z.string().nonempty(),
  certificates: z.array(LanguageCertificateSchema).optional(),
});

export const formSchema = z
  .object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    nickname: z.string().optional(),
    email: z.string().email(),
    phone: z.string().regex(/^[+]36 [0-9]{2} [0-9]{3} [0-9]{4}$/),
    city: z.string().nonempty(),
    zipCode: z.string().regex(/^[0-9]{4}$/),
    address: z.string().nonempty(),
    idNumber: z.string().regex(/^[0-9]{6}[A-Z]{2}$/),
    studentId: z.string().regex(/^1[0-9]{9}$/),
    birthDate: z.date().max(new Date()),
    birthPlace: z.string().nonempty(),
    mothersName: z.string().nonempty(),
    university: z.enum(universities),
    otherUniversity: z
      .string()
      .optional()
      .refine((value) => {
        return value === undefined || !universities.includes(value as (typeof universities)[number]);
      }),
    faculty: z.enum(faculties).optional(),
    letter: z.enum(letters),
    startYear: z
      .number()
      .int()
      .min(2000)
      .max(new Date().getFullYear() - 1),
    academicYear: z.number().int().min(1).max(6),
    drivingLicense: z.boolean(),
    likesDriving: z.boolean().optional(),
    diet: z.enum(diets),
    customDiet: z.string().optional(),
    languages: z.array(z.string().nonempty()),
    availableAtWeekend1: z.boolean(),
    availableAtWeekend2: z.boolean(),
    internationalTraining: InternationalTrainingSchema.optional(),
    acceptPrivacyPolicy: z.boolean().refine((data) => data, {
      message: 'Privacy policy must be accepted.',
    }),
    acceptRules: z.boolean().refine((data) => data, {
      message: 'Rules must be accepted.',
    }),
  })
  .refine((data) => data.university !== 'Other' || data.otherUniversity !== undefined, {
    message: 'Please provide your university.',
    path: ['otherUniversity'],
  })
  .refine((data) => data.university !== 'SE' || data.faculty !== undefined, {
    message: 'Faculty must be provided for the university of SE.',
    path: ['faculty'],
  })
  .refine((data) => data.drivingLicense || data.likesDriving === undefined, {
    message: "You shouldn't like driving without having a driving license.",
    path: ['likesDriving'],
  })
  .refine((data) => data.diet !== 'Other' || data.customDiet !== undefined, {
    message: 'Please provide your custom diet.',
    path: ['customDiet'],
  })
  .refine((data) => data.availableAtWeekend1 || data.availableAtWeekend2, {
    message: 'At least one weekend must be selected.',
    path: ['availableAtWeekend1'],
  });
