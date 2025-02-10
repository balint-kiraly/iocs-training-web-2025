'use client';

import { ViktimActivity } from '@prisma/client';
import { Loader, Send } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import EncryptButton from '@/components/ui/EncryptButton';
import { Input } from '@/components/ui/input';
import { Reveal } from '@/components/ui/Reveal';

export default function ViktimPage() {
  const [activities, setActivities] = useState<ViktimActivity[]>([]);
  const [activity, setActivity] = useState('');
  const [userIdea, setUserIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/viktim');
        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities().then((activities) => {
      if (activities) {
        setActivities(activities);
        const randomIndex = Math.floor(Math.random() * activities.length);
        setActivity(activities[randomIndex]?.content || 'Nincs elérhető program');
      }
    });
  }, []);

  const getRandomActivity = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 600); // Reset glitch effect after animation
    const randomIndex = Math.floor(Math.random() * activities.length);
    setActivity(activities[randomIndex]?.content || 'Nincs elérhető program');
  };

  const handleSubmit = async () => {
    setError(null);
    if (userIdea.trim().length > 0) {
      if (userIdea.length > 100) {
        setError('Túl hosszú. Próbáld 100 karakterbe besűríteni.');
        return;
      }
      try {
        const response = await fetch('/api/viktim', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ activity: userIdea, approved: true }),
        });

        if (response.ok) {
          const newIdea = await response.json();
          setActivities([...activities, newIdea]);
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
            setUserIdea('');
          }, 5000);
        } else {
          setError('Valami hiba történt. Próbáld újra.');
        }
      } catch (error) {
        console.error('Error submitting idea:', error);
        setError('Valami hiba történt. Próbáld újra.');
      }
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white'>
      <Reveal>
        <div className='text-center'>
          <h1 className='text-5xl font-extrabold text-fuchsia-400 drop-shadow-[0_0_15px_#f0f]'>Üdv, Vándor</h1>
          <p className='mt-2 text-lg italic text-gray-400'>
            Nem tudod mit kezdj magaddal tavasszal, vagy szeptember elején?
          </p>
          <p className='text-lg italic text-gray-400'>
            Ne aggódj, íme néhány remek programötlet, amivel el tudod tölteni a szabadidődet:
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        {activity ? (
          <div
            className={`
              mt-8 w-full max-w-lg rounded-xl border border-pink-400/30 bg-gradient-to-br from-fuchsia-500 to-purple-700
              p-6 text-center shadow-lg

              ${glitch ? 'animate-glitch' : ''}
            `}
          >
            <h2 className='text-2xl font-semibold text-white drop-shadow'>{activity}</h2>
          </div>
        ) : (
          <div className='mt-8 w-full max-w-lg text-center'>
            <Loader className='h-10 w-10 animate-spin text-fuchsia-400' />
          </div>
        )}
      </Reveal>

      <Reveal delay={0.2}>
        <div className='mt-5'>
          <EncryptButton onClick={getRandomActivity} />
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className='mt-10 w-full max-w-lg text-center'>
          <p className='mb-2 text-lg text-gray-300'>
            Van egy jó programötleted?
            <br /> Oszd meg, hátha mások is kedvet kapnak hozzá:
          </p>
          <div className='flex gap-2'>
            <Input
              type='text'
              value={userIdea}
              onChange={(e) => setUserIdea(e.target.value)}
              placeholder="Pl. 'Készíts Soba™ tésztát 🍝'"
              className='min-w-60 flex-1 rounded-lg border border-gray-700 bg-gray-900 p-3 text-white'
            />
            <Button onClick={handleSubmit} variant='light' className='drop-shadow-[0_0_5px_#f0f]'>
              <Send />
              Küldés
            </Button>
          </div>
          {submitted && (
            <p className='mt-2 animate-pulse text-green-400'>
              Köszönjük az ötletet, tudunk róla, esetleg számításba vesszük.
            </p>
          )}
          {error && <p className='mt-2 text-red-400'>{error}</p>}
        </div>
      </Reveal>
    </div>
  );
}
