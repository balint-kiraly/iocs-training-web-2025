import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import React from 'react';

export default function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Preview>Fontos információk a 2025-ös Instruktorképzésről</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#055c55',
                offwhite: '#fafbfb',
              },
              spacing: {
                0: '0px',
                20: '20px',
                45: '45px',
              },
            },
          },
        }}
      >
        <Body className='bg-offwhite font-sans text-base'>
          {process.env.APP_URL && (
            <Img
              src={`${process.env.APP_URL}/images/logo.png`}
              width='60'
              height='60'
              alt='IÖCS'
              className='mx-auto my-20'
            />
          )}
          <Container className='bg-white p-45'>
            <Heading className='my-0 mb-20 text-center leading-8'>Üdvözlünk az Instruktorképzésen, {name} 👋</Heading>

            <Section>
              <Row>
                <Text className='text-base'>
                  Hálásak vagyunk, hogy jelentkeztél a <strong>2025-ös Instruktorképzésre</strong>!
                </Text>

                <Text className='text-base'>Szeretnénk néhány fontos információt megosztani Veled:</Text>
              </Row>
            </Section>

            <ul>
              <li className='mb-20'>
                A megnyitó <strong>február 13-án, 17 órakor</strong> kezdődik. Arra szeretnénk kérni Téged, hogy{' '}
                <strong>16:45-re érkezz</strong> a<strong>Nagyvárad téri Elméleti Tömb Dísztermébe</strong>
                (1089 Budapest, Nagyvárad tér 4.), hogy a megnyitót időben tudjuk kezdeni.
              </li>
              <li className='mb-20'>
                A megnyitó után rögtön sor kerül az első képzésalkalomra, ezért készülj úgy, hogy ez egy{' '}
                <strong>egész estés elfoglaltság</strong> lesz. Cserébe viszont sok izgalmas programmal és meglepetéssel
                készülünk Neked!
              </li>
              <li className='mb-20'>
                A képzésekre ezenkívül <strong>hozz magaddal innivalót és saját repoharat/poharat</strong>, a jókedvedet
                és a lelkesedésedet! Valamint az első alkalmon derül ki, hogy mikor lesznek a további képzésalkalmak,
                így készülj az órarendeddel és a határidőnaplóddal!
              </li>
            </ul>

            <Section>
              <Row>
                <Text className='text-base'>
                  Már nagyon várjuk, hogy találkozzunk{' '}
                  <strong>16:45-kor a Nagyvárad téri Elméleti Tömb Dísztermében</strong>! Addig is kövesd figyelemmel az
                  IÖCS <Link href='https://www.facebook.com/iocs.hu'>Facebook</Link>, illetve{' '}
                  <Link href='https://www.instagram.com/iocs.hu'>Instagram</Link> oldalát és az esemény bejegyzéseit!
                </Text>

                <Text className='text-base'>
                  Ha bármilyen kérdésed van, fordulj hozzánk bizalommal! Keress minket a{' '}
                  <Link href='mailto:kepzes@iocs.hu'>kepzes@iocs.hu</Link> címen!
                </Text>
              </Row>
            </Section>

            <Section className='mt-10 text-center'>
              <Button href={process.env.APP_URL} className='bg-brand rounded-lg px-[18px] py-3 text-white'>
                Weboldal megtekintése
              </Button>
            </Section>
          </Container>

          <Container>
            <Text className='text-center text-gray-400 mb-45'>
              Instruktor Öntevékeny Csoport | Nagyvárad tér 4, Budapest, 1089
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
