import '../globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
// eslint-disable-next-line camelcase
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const text = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: text('title'),
    description: text('description'),
    keywords: text('keywords'),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all translations to the client
  // side is the easiest way to get started
  const translations = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}

          antialiased
        `}
      >
        <NextIntlClientProvider messages={translations}>
          <SpeedInsights />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
