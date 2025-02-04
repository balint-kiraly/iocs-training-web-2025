import { format, getMonth, getYear, setMonth, setYear } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export const DatePicker = ({
  value,
  onChange,
  placeholder = 'Pick a date',
}: {
  value: Date | undefined;
  onChange: (newDate: Date | undefined) => void;
  placeholder?: string;
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
  const today = new Date();

  const handleYearChange = (year: string) => {
    if (value) {
      const nextDate = setYear(value, parseInt(year));
      if (nextDate > today) {
        onChange(today);
      } else {
        onChange(nextDate);
      }
    } else {
      onChange(setYear(today, parseInt(year)));
    }
  };

  const handleMonthChange = (month: Date) => {
    if (month > today) {
      return;
    }
    if (value) {
      const nextMonth = setMonth(value, getMonth(month));
      onChange(setYear(nextMonth, getYear(month)));
    } else {
      const nextMonth = setMonth(today, getMonth(month));
      onChange(setYear(nextMonth, getYear(month)));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-full pl-3 text-left font-normal', !value && 'text-muted-foreground')}
        >
          {value ? format(value, 'PPP') : <span>{placeholder}</span>}
          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Select onValueChange={handleYearChange} value={getYear(value || today).toString()}>
          <SelectTrigger className='m-auto mt-3 w-min'>
            <SelectValue placeholder='Year' />
          </SelectTrigger>
          <SelectContent align='center'>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()} className='w-full text-left'>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Calendar
          mode='single'
          selected={value}
          onSelect={onChange}
          month={value}
          onMonthChange={handleMonthChange}
          disabled={(date) => date > today || date < new Date('1900-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
