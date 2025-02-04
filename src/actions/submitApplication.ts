'use server';

import { z } from 'zod';
import { formSchema } from '@/lib/formValidation';
import { Diet, Prisma, University } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { writeToSpreadsheet } from '@/actions/spreadsheetSync';
import { sendEmail } from '@/actions/mail';
import { render } from '@react-email/render';
import WelcomeEmail from '@/components/emails/welcome';

type State =
  | {
      status: 'success' | 'error' | 'initial';
      locale: string;
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
      subject:
        previousState?.locale === 'hu'
          ? 'Jelentkezésed sikeresen rögzítettük!'
          : 'Your application has been successfully submitted!',
      html: await render(
        WelcomeEmail({
          name: application.nickname
            ? application.nickname === ''
              ? application.firstName
              : application.nickname
            : application.firstName,
          locale: previousState?.locale || 'hu',
        })
      ),
    });

    return {
      status: 'success',
      locale: previousState?.locale || 'hu',
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          status: 'error',
          locale: previousState?.locale || 'hu',
          error: 1,
          message: error.message,
        };
      }
      return {
        status: 'error',
        locale: previousState?.locale || 'hu',
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
      locale: previousState?.locale || 'hu',
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
    nickname: formData.nickname ? (formData.nickname === '' ? null : formData.nickname) : null,
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
    faculty: formData.university === 'SE' ? formData.faculty : null,
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
