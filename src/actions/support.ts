'use server';

import { z } from 'zod';
import { formSchema } from '@/lib/formValidation';

export async function createSupportMailLink(
  errorMessage: string,
  payload: z.infer<typeof formSchema>,
  locale: string
): Promise<string> {
  if (!process.env.DEVELOPER_EMAIL) {
    throw new Error('DEVELOPER_EMAIL is not set in the environment variables.');
  }

  const developerEmail = process.env.DEVELOPER_EMAIL;
  const subject = encodeURIComponent('IÖCS Training Web 2025 | Application Submission - Unexpected Error');
  const body = encodeURIComponent(
    `${locale === 'hu' ? 'Mi történt?' : 'What happened?'}\n\n\n\nError message:\n${errorMessage}\n\nSubmitted data:\n${JSON.stringify(payload, null, 2)}\n\n${locale === 'hu' ? 'Amúgy ennyire tetszik az oldal' : 'Btw I like the website this much'}: `
  );

  return `mailto:${developerEmail}?subject=${subject}&body=${body}`;
}
