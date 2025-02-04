'use server';

import { z } from 'zod';
import { formSchema } from '@/lib/formValidation';
import { Diet, Prisma, University } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { writeToSpreadsheet } from '@/actions/spreadsheetSync';
import { sendEmail } from '@/actions/mail';

type State =
  | {
      status: 'success' | 'error';
      error?: number;
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
    const completeApplication = await prisma.application.findFirst({
      where: { id: application.id },
      include: { internationalTraining: { include: { certificates: true } } },
    });
    await writeToSpreadsheet(completeApplication!);
    await sendEmail({
      to: application.email,
      subject: 'Jelentkezésed sikeresen rögzítettük!',
      html: `
        <p>Kedves ${application.firstName}!</p>
        <p>Köszönjük, hogy jelentkeztél a 2021-es Országos Mentőszolgálati Gépjárművezető Versenyre!</p>
        <p>A jelentkezésed sikeresen rögzítettük az adatbázisunkban, adataidat az alábbiakban láthatod:</p>`,
    });

    return {
      status: 'success',
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          status: 'error',
          error: 1,
          message: error.message,
        };
      }
      return {
        status: 'error',
        error: 0,
        message: error.message,
      };
    }

    prisma.application.deleteMany({
      where: { email: formData.email },
    });
    console.error('Unknown error creating application');
    return {
      status: 'error',
      error: 0,
      message: 'Unknown error creating application',
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
