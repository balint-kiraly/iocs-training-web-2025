import { AudioWaveform, Brain, Calendar, HandCoins, Ruler, TicketCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Reveal } from '@/components/ui/Reveal';

export default function InfoSection() {
  const text = useTranslations('Info');

  const infoCards = [
    {
      id: 1,
      icon: () => <Calendar className='h-10 w-10' />,
    },
    {
      id: 2,
      icon: () => <Ruler className='h-10 w-10' />,
    },
    {
      id: 3,
      icon: () => <Brain className='h-10 w-10' />,
    },
    {
      id: 4,
      icon: () => <TicketCheck className='h-10 w-10' />,
    },
    {
      id: 5,
      icon: () => <HandCoins className='h-10 w-10' />,
    },
    {
      id: 6,
      icon: () => <AudioWaveform className='h-10 w-10' />,
    },
  ].map((card) => ({
    ...card,
    random: Math.random() * 10,
  }));

  return (
    <section id='info' className={`flex flex-col items-center bg-gradient-to-b from-black to-background pb-36 pt-32`}>
      <div
        className={`
          relative grid grid-cols-1 gap-16 px-6

          md:grid-cols-3

          sm:grid-cols-2
        `}
      >
        {infoCards.map((card) => (
          <Reveal key={card.id} delay={card.id * 0.1}>
            <div
              className={`
                group relative max-w-80 transform rounded-lg bg-gradient-to-tr from-primary/50 to-primary p-6
                text-center shadow-md transition-transform
              `}
              style={{
                transform: `rotate(${getRandomRotation(card.id, card.random)}deg) translate(${getRandomOffset(card.id, card.random)}px, ${getRandomOffset(card.id, card.random, true)}px)`,
              }}
            >
              <div className='mx-auto mb-6 w-fit'>{card.icon()}</div>
              <div>
                <h2
                  className={`
                    text-lg font-semibold text-foreground

                    group-hover:text-white
                  `}
                >
                  {text(`card-${card.id}.title`)}
                </h2>
                <p
                  className={`
                    mt-2 text-foreground

                    group-hover:text-white
                  `}
                >
                  {text.rich(`card-${card.id}.description`, {
                    em: (chunks) => (
                      <em className='bg-secondary px-2 py-1 rounded text-nowrap font-semibold'>{chunks}</em>
                    ),
                  })}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function getRandomRotation(id: number, random: number) {
  return (((id + random) * 7) % 15) - 7;
}

function getRandomOffset(id: number, random: number, vertical = false) {
  const base = vertical ? 10 : 15;
  return (((id + random) * 3) % base) - base / 2;
}
