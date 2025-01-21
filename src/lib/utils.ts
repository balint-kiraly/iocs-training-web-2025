import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert a date to a string in the format 'YYYY-MM-DD'.
 * @param date
 */
export function dateToString(date: Date) {
  'use client';

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(date.getDate()).padStart(2, '0')}`;
}

/**
 * Convert a string in the format 'YYYY-MM-DD' to a Date object.
 * @param dateString
 */
export function stringToDate(dateString: string): Date {
  'use client';

  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Format a date string in the format 'YYYY-MM-DD' to 'YYYY. MM. DD.'.
 * @param dateString
 */
export function formatDateString(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  return `${year}. ${String(month).padStart(2, '0')}. ${String(day).padStart(2, '0')}.`;
}
