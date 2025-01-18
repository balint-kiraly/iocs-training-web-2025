import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reveal } from '@/components/ui/Reveal';

const DetailsSection = () => {
  return (
    <section className='mx-auto mb-40 flex w-fit gap-4 p-6'>
      <Reveal>
        <Card className='max-w-screen-sm'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold text-primary'>Mire számíts?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-2'>
              Képzésünk során izgalmas programok, elméleti és gyakorlati modulok várnak, amelyek segítenek fejleszteni
              készségeidet.
            </p>
            <p className='mb-2'>
              Inspiráló közösség, tapasztalt mentorok és egy támogató környezet, ahol te lehetsz a középpontban.
            </p>
            <p className=''>Töltsd ki a jelentkezési lapot, és légy részese valami igazán különlegesnek!</p>
          </CardContent>
        </Card>
      </Reveal>
      <Reveal delay={0.3}>
        <Card className='max-w-screen-sm'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold text-primary'>Mi az az IÖCS?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-2'>
              Az Instruktor Öntevékeny Csoport (IÖCS) egy lelkes és elkötelezett közösség, amely segíti az elsőéves
              hallgatók beilleszkedését az egyetemi életbe.
            </p>
            <p className='mb-2'>
              Az IÖCS tagjai önkéntes alapon szerveznek táborokat, tréningeket és eseményeket, hogy támogassák a diákok
              közösségbe való integrálódását.
            </p>
            <p>
              Célunk, hogy barátságos és inspiráló környezetet teremtsünk, ahol mindenki megtalálhatja a helyét és
              kibontakoztathatja képességeit.
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
};

export default DetailsSection;
