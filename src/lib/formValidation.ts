import {z} from 'zod';

export const universities = ['SE', 'BME', 'ELTE', 'Pázmány', 'Corvinus', 'else'] as const;
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
  'J/EKK', // should be converted to EKK
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
  'Don\'t have one', // should be converted to null
] as const;
export const diets = ['Normal', 'Vegetarian', 'Lactose-Free', 'Gluten-Free', 'Vegan', 'Other'] as const;
export const languageCertificateLevels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

const LanguageCertificateSchema = z.object({
  language: z.string().nonempty(),
  level: z.enum(languageCertificateLevels),
});

const InternationalTrainingSchema = z.object({
  certificates: z.array(LanguageCertificateSchema).optional(),
  motivation: z.string().nonempty(),
});

export const formSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  nickname: z.string().optional(),
  email: z.string().email(),
  phone: z.string().regex(/^[+]36-[0-9]{2}-[0-9]{3}-[0-9]{4}$/),
  zipCode: z.number().int().min(1000).max(9999),
  city: z.string().nonempty(),
  address: z.string().nonempty(),
  idNumber: z.string().regex(/^[0-9]{6}[A-Z]{2}$/),
  studentId: z.string().regex(/^1[0-9]{9}$/),
  birthDate: z.date().max(new Date()),
  birthPlace: z.string().nonempty(),
  mothersName: z.string().nonempty(), // different from schema
  university: z.string().nonempty(),
  faculty: z.enum(faculties).optional(),
  startYear: z.number().int().min(2000).max(new Date().getFullYear()),
  academicYear: z.number().int().min(1).max(6),
  letter: z.enum(letters),
  drivingLicense: z.boolean(),
  likesDriving: z.boolean().optional(),
  availableAtWeekend1: z.boolean(),
  availableAtWeekend2: z.boolean(),
  diet: z.enum(diets),
  customDiet: z.string().optional(),
  internationalTraining: InternationalTrainingSchema.optional(),
}).refine(
  (data) => data.university !== "SE" || (data.university === "SE" && data.faculty !== null),
  {
    message: "Faculty must be provided for the university of SE.",
    path: ["faculty"],
  }
).refine(
  (data) => !data.drivingLicense || data.likesDriving !== null,
  {
    message: "Please provide your opinion about driving.",
    path: ["likesDriving"],
  }
).refine(
  (data) => data.diet !== "Other" || data.customDiet !== null,
  {
    message: "Please provide your custom diet.",
    path: ["customDiet"],
  }
);
