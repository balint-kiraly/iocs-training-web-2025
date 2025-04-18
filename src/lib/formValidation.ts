import { z } from 'zod';
import { stringToDate } from '@/lib/utils';

export const universities = ['SE', 'BME', 'ELTE', 'PPKE', 'BCE', 'Other'] as const;
const universitiesBlacklist = [...universities, 'Semmelweis', 'SOTE', 'Pázmány', 'Corvinus', 'Other'];
export const faculties = ['AOK', 'FOK', 'GYTK', 'ETK', 'EKK', 'PAK'] as const;
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
  'None',
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
    email: z.string().nonempty().email(),
    phone: z
      .string()
      .nonempty()
      .regex(/^\+[1-9]\d{1,14}$/, {
        message: 'Invalid. Use international phone number format, e.g., +1234567890',
      }),
    city: z.string().nonempty(),
    zipCode: z.string().nonempty(),
    address: z.string().nonempty(),
    idNumber: z.string().nonempty(),
    studentId: z
      .string()
      .nonempty()
      .regex(/^1[0-9]{9}$/, {
        message: 'Invalid format. Must be 10 digits long and start with 1.',
      }),
    birthDate: z
      .string()
      .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
      .refine((value) => {
        return value && stringToDate(value) < new Date();
      }),
    birthPlace: z.string().nonempty(),
    mothersName: z.string().nonempty(),
    university: z.enum(universities),
    otherUniversity: z
      .string()
      .optional()
      .refine(
        (value) => {
          return (
            value === undefined ||
            !universitiesBlacklist.some(
              (blacklistedUniversity) => blacklistedUniversity.toLowerCase() === value.toLowerCase()
            )
          );
        },
        {
          message: 'Select this university from the list.',
        }
      ),
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
  .refine(
    (data) => data.university !== 'Other' || (data.otherUniversity !== undefined && data.otherUniversity !== ''),
    {
      message: 'Please provide your university.',
      path: ['otherUniversity'],
    }
  )
  .refine((data) => data.university !== 'SE' || data.faculty !== undefined, {
    message: "Faculty must be provided for the university 'SE'.",
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
  .superRefine((data, ctx) => {
    if (!data.availableAtWeekend1 && !data.availableAtWeekend2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one weekend must be selected.',
        path: ['availableAtWeekend1'],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one weekend must be selected.',
        path: ['availableAtWeekend2'],
      });
    }
  });
