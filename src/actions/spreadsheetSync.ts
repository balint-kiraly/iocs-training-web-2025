'use server';

import { Application, InternationalTraining, LanguageCertificate } from '@prisma/client';
import { google, sheets_v4 } from 'googleapis';
import { format } from 'date-fns';
import { formatDateString } from '@/lib/utils';

type SheetApplication = {
  name: string;
  nickname?: string;
  email: string;
  phone: string;
  zipCode: string;
  city: string;
  address: string;
  idNumber: string;
  studentId: string;
  birthDate: string;
  birthPlace: string;
  mothersName: string;
  university: string;
  faculty?: string;
  letter?: string;
  startYear: number;
  academicYear: number;
  drivingLicence: boolean;
  likesDriving?: boolean;
  diet: string;
  languages: string;
  availableAtWeekend1: boolean;
  availableAtWeekend2: boolean;
  internationalTraining: boolean;
  internationalMotivation?: string;
  internationalCertificates?: string;
  submittedAt: string;
};

const columnNames = [
  'Név',
  'Becenév',
  'E-mail cím',
  'Telefonszám',
  'Irányítószám',
  'Város',
  'Lakcím',
  'Személyi igazolvány szám',
  'Diákigazolvány szám',
  'Születési dátum',
  'Születési hely',
  'Anyja neve',
  'Egyetem',
  'Kar',
  'Betű',
  'Kezdés éve',
  'Évfolyam',
  'Jogosítvány',
  'Szeret vezetni',
  'Étrend',
  'Beszélt nyelvek',
  'Hétvége 1',
  'Hétvége 2',
  'Külföldi képzés',
  'Külföldi motiváció',
  'Külföldi nyelvvizsgák',
  'Jelentkezés ideje',
];

export async function writeToSpreadsheet(
  application: Application & {
    internationalTraining: (InternationalTraining & { certificates: LanguageCertificate[] }) | null;
  }
) {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.error('Missing Google credentials');
    return;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  const service = google.sheets({ version: 'v4', auth });

  const parsedApplication = await parseApplication(application);

  if (await isSheetEmpty(service)) {
    await service.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: 'Jelentkezések',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [columnNames],
      },
    });
  }

  await service.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: 'Jelentkezések',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [Object.values(parsedApplication)],
    },
  });
}

async function isSheetEmpty(service: sheets_v4.Sheets) {
  const response = await service.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: 'Jelentkezések',
  });

  const rows = response.data.values;
  return !rows || rows.length === 0;
}

async function parseApplication(
  application: Application & {
    internationalTraining: (InternationalTraining & { certificates: LanguageCertificate[] }) | null;
  }
): Promise<SheetApplication> {
  return {
    name: application.lastName + ' ' + application.firstName,
    nickname: application.nickname ?? undefined,
    email: application.email,
    phone: "'" + application.phone,
    zipCode: application.zipCode.toString(),
    city: application.city,
    address: application.address,
    idNumber: application.idNumber,
    studentId: application.studentId,
    birthDate: formatDateString(application.birthDate),
    birthPlace: application.birthPlace,
    mothersName: application.mothersName,
    university: application.university,
    faculty: application.faculty ?? undefined,
    letter: application.letter ?? undefined,
    startYear: application.startYear,
    academicYear: application.academicYear,
    drivingLicence: application.drivingLicence,
    likesDriving: application.likesDriving ?? undefined,
    diet: application.diet,
    languages: application.languages.sort().join(', '),
    availableAtWeekend1: application.availableAtWeekend1,
    availableAtWeekend2: application.availableAtWeekend2,
    internationalTraining: !!application.internationalTraining,
    internationalMotivation: application.internationalTraining?.motivation ?? undefined,
    internationalCertificates: application.internationalTraining?.certificates
      .sort((a, b) => a.language.localeCompare(b.language))
      .map((certificate) => `${certificate.language} (${certificate.level})`)
      .join(', '),
    submittedAt: format(application.createdAt, 'yyyy. MM. dd. HH:mm:ss'),
  };
}
