import { motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { useRef, useState } from 'react';

const TARGET_TEXT = 'Adj egy másikat';
const CYCLES_PER_LETTER = 1;
const SHUFFLE_TIME = 30;

const CHARS = '!@#$%^&*():{};|,.<>/?';

const EncryptButton = ({ onClick }: { onClick: () => void }) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split('')
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          return CHARS[randomCharIndex];
        })
        .join('');

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);

    setText(TARGET_TEXT);
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-lg border-[1px] border-gray-700 bg-cyan-500 px-4 py-2 font-mono text-base
        font-semibold text-purple-950 transition-colors

        hover:text-purple-900
      `}
    >
      <div className='relative z-10 flex items-center gap-2'>
        <Sparkle className='h-4 w-4' />
        <span>{text}</span>
      </div>
      <motion.span
        initial={{
          y: '100%',
        }}
        animate={{
          y: '-100%',
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 1,
          ease: 'linear',
        }}
        className={`
          absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0
          to-60% opacity-0 transition-opacity duration-300

          group-hover:opacity-100
        `}
      />
    </motion.button>
  );
};

export default EncryptButton;
