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

export const formSchema = z.object({
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