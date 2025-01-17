import { useTranslations } from 'next-intl';

import { Reveal } from '@/components/ui/Reveal';

export default function DetailsSection() {
  const text = useTranslations('Details');

  const infoCards = [
    { title: text('title-databox1'), description: text('desc-databox1') },
    { title: text('title-databox2'), description: text('desc-databox2') },
    { title: text('title-databox3'), description: text('desc-databox3') },
    {
      title: text('title-databox4'),
      description: text('desc-databox4'),
    },
    { title: text('title-databox5'), description: text('desc-databox5') },
    { title: text('title-databox5'), description: text('desc-databox5') },
  ];

  return (
    <div className={`flex flex-col items-center bg-gradient-to-b from-black to-background py-32`}>
      <div
        className={`
          relative grid grid-cols-1 gap-10 px-6

          md:grid-cols-3

          sm:grid-cols-2
        `}
      >
        {infoCards.map((card, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <div
              className={`
                group relative transform rounded-lg bg-white from-secondary to-fuchsia-500 p-4 shadow-md
                transition-transform

                hover:scale-105 hover:bg-gradient-to-r
              `}
              style={{
                transform: `rotate(${getRandomRotation()}deg) translate(${getRandomOffset()}px, ${getRandomOffset()}px)`,
              }}
            >
              <h2
                className={`
                  text-lg font-semibold text-gray-800

                  group-hover:text-white
                `}
              >
                {card.title}
              </h2>
              <p
                className={`
                  mt-2 text-gray-600

                  group-hover:text-white
                `}
              >
                {card.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function getRandomRotation() {
  return Math.random() * 6 - 3;
}

function getRandomOffset() {
  return Math.random() * 10 - 5;
}
