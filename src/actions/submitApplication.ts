'use server';

import { z } from 'zod';
import { formSchema } from '@/lib/formValidation';
import { Diet, Prisma, University } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { writeToSpreadsheet } from '@/actions/spreadsheetSync';

type State =
  | {
      status: 'success' | 'error';
      message?: string;
    }
  | null
  | undefined;

export default async function submitApplication(
  previousState: State,
  formData: z.infer<typeof formSchema>
): Promise<State> {
  try {
    const parsedApplication = await parseApplicationData(formData);
    const application = await createApplication(parsedApplication);
    prisma.application
      .findFirst({
        where: { id: application.id },
        include: { internationalTraining: { include: { certificates: true } } },
      })
      .then((application) => {
        if (application) {
          writeToSpreadsheet(application);
        }
      });
    return {
      status: 'success',
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Error creating application:', error.message);
      return {
        status: 'error',
        message: error.message,
      };
    }
    console.error('Unknown error creating application');
    return {
      status: 'error',
      message: 'An unknown error occurred',
    };
  }
}

export async function parseApplicationData(
  formData: z.infer<typeof formSchema>
): Promise<Prisma.ApplicationCreateInput> {
  const certificates: Prisma.LanguageCertificateCreateWithoutInternationalTrainingInput[] =
    formData.internationalTraining
      ? formData.internationalTraining.certificates
        ? formData.internationalTraining.certificates.map((certificate) => ({
            language: certificate.language,
            level: certificate.level!,
          }))
        : []
      : [];

  const internationalTraining: Prisma.InternationalTrainingCreateWithoutApplicationInput | null =
    formData.internationalTraining
      ? {
          motivation: formData.internationalTraining?.motivation,
          certificates: {
            create: certificates,
          },
        }
      : null;

  return {
    firstName: formData.firstName,
    lastName: formData.lastName,
    nickname: formData.nickname ?? null,
    email: formData.email,
    phone: formData.phone,
    zipCode: parseInt(formData.zipCode, 10),
    city: formData.city,
    address: formData.address,
    idNumber: formData.idNumber,
    studentId: formData.studentId,
    birthDate: formData.birthDate,
    birthPlace: formData.birthPlace,
    mothersName: formData.mothersName,
    university: formData.university as University,
    otherUniversity: formData.university === 'Other' ? formData.otherUniversity : null,
    faculty: formData.university === 'SE' ? (formData.faculty === 'ÁOK' ? 'AOK' : formData.faculty) : null,
    letter: formData.letter === 'J/EKK' ? 'EKK' : formData.letter === 'None' ? null : formData.letter,
    startYear: formData.startYear,
    academicYear: formData.academicYear,
    drivingLicence: formData.drivingLicense,
    likesDriving: formData.drivingLicense ? formData.likesDriving : null,
    diet: formData.diet as Diet,
    customDiet: formData.diet === 'Other' ? formData.customDiet : null,
    languages: formData.languages,
    availableAtWeekend1: formData.availableAtWeekend1,
    availableAtWeekend2: formData.availableAtWeekend2,
    internationalTraining: internationalTraining
      ? {
          create: internationalTraining,
        }
      : undefined,
  };
}

export async function createApplication(application: Prisma.ApplicationCreateInput) {
  return prisma.application.create({
    data: application,
  });
}
