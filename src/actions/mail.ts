'use server';

import axios from 'axios';
import { SendMailOptions } from 'nodemailer';

const mailingAxios = axios.create({
  baseURL: process.env.EMAIL_HOST,
  headers: {
    Authorization: `Api-Key ${process.env.EMAIL_API_KEY}`,
  },
});

export async function sendEmail(options: SendMailOptions) {
  try {
    await mailingAxios.post('/api/send', {
      from: {
        name: process.env.EMAIL_FROM_NAME,
        email: '',
      },
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: process.env.EMAIL_FROM_ADDRESS,
      queue: 'send',
    });
  } catch (error) {
    console.error(`Failed to send email to ${options.to}`, error);
  }
}
