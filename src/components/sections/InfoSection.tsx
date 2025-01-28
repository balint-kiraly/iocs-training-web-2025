import { AudioWaveform, Brain, Calendar, HandCoins, Ruler, TicketCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Reveal } from '@/components/ui/Reveal';

export default function InfoSection() {
  const text = useTranslations('Info');

  const infoCards = [
    {
      id: 1,
      icon: () => <Calendar className='h-10 w-10' />,
      title: text('title-databox1'),
      description: text('desc-databox1'),
    },
    {
      id: 2,
      icon: () => <Ruler className='h-10 w-10' />,
      title: text('title-databox2'),
      description: text('desc-databox2'),
    },
    {
      id: 3,
      icon: () => <Brain className='h-10 w-10' />,
      title: text('title-databox3'),
      description: text('desc-databox3'),
    },
    {
      id: 4,
      icon: () => <TicketCheck className='h-10 w-10' />,
      title: text('title-databox4'),
      description: text('desc-databox4'),
    },
    {
      id: 5,
      icon: () => <HandCoins className='h-10 w-10' />,
      title: text('title-databox5'),
      description: text('desc-databox5'),
    },
    {
      id: 6,
      icon: () => <AudioWaveform className='h-10 w-10' />,
      title: text('title-databox6'),
      description: text('desc-databox6'),
    },
  ].map((card) => ({
    ...card,
    random: Math.random() * 10,
  }));

  return (
    <section id='info' className={`flex flex-col items-center bg-gradient-to-b from-black to-background py-32`}>
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
                group relative max-w-80 transform rounded-lg bg-gradient-to-tr from-secondary-dark to-fuchsia-500 p-6
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
                  {card.title}
                </h2>
                <p
                  className={`
                    mt-2 text-foreground

                    group-hover:text-white
                  `}
                >
                  {card.description}
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
