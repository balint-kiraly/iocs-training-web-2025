'use client';

import { ChevronDown, Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React, { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { routing, usePathname, useRouter } from '@/i18n/routing';

export const LanguagePicker = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const locale = useLocale();
  const text = useTranslations('LanguageSwitcher');

  function onSelectChange(selection: string) {
    startTransition(() => {
      router.replace({ pathname }, { locale: selection });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <Languages />
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{text('label')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={locale} onValueChange={onSelectChange} className='flex flex-col gap-1'>
          {routing.locales.map((locale) => (
            <DropdownMenuRadioItem key={locale} value={locale} className='cursor-pointer'>
              {text('language', { locale })}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
