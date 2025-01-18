import { useTranslations } from 'next-intl';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const FAQSection = () => {
  const text = useTranslations('FAQSection');
  return (
    <section id='faq' className='mx-auto mb-6 max-w-screen-xl p-4'>
      <h1 className='mb-6 text-3xl font-bold'>{text('heading')}</h1>
      <Accordion type='single' collapsible>
        {Array.from({ length: 10 }).map((_, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{text(`questions.question${index + 1}`)}</AccordionTrigger>
            <AccordionContent>{text(`answers.answer${index + 1}`)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
