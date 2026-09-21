// ISL Curriculum Dataset, Badges, & MediaPipe Gesture Recognition Engine for Hana AI Companion
import { SIGN_IMAGES } from './signImages';

export const ISL_CATEGORIES = [
  { id: 'alphabet', title: 'Alphabet & Fingerspelling (A–Z)', icon: 'Type', count: 26 },
  { id: 'numbers', title: 'Numbers (1–10)', icon: 'Hash', count: 10 },
  { id: 'greetings', title: 'Greetings & Courtesy', icon: 'Smile', count: 10 },
  { id: 'phrases', title: 'Conversational Phrases', icon: 'MessageSquare', count: 6 }
];

export const ISL_BADGES = [
  {
    id: 'badge-first-sign',
    title: 'First Sign Mastered',
    description: 'Master your very first ISL sign with Hana!',
    icon: 'Sparkles',
    unlockedAt: 1
  },
  {
    id: 'badge-alphabet-starter',
    title: 'Fingerspeller Apprentice',
    description: 'Master 5 letters of the ISL alphabet.',
    icon: 'Type',
    unlockedAt: 5
  },
  {
    id: 'badge-alphabet-master',
    title: 'Alphabet Conqueror',
    description: 'Master all 26 letters of the ISL alphabet!',
    icon: 'Award',
    unlockedAt: 26
  },
  {
    id: 'badge-number-whiz',
    title: 'Number Whiz',
    description: 'Master ISL numbers 1 through 10.',
    icon: 'Hash',
    unlockedAt: 10
  },
  {
    id: 'badge-courtesy-star',
    title: 'Polite Conversationalist',
    description: 'Master Hello, Thank You, Please, and I Love You.',
    icon: 'Heart',
    unlockedAt: 4
  },
  {
    id: 'badge-streak-3',
    title: '3-Day Practice Fire',
    description: 'Maintain a 3-day practice streak with Hana.',
    icon: 'Flame',
    type: 'streak',
    target: 3
  },
  {
    id: 'badge-streak-7',
    title: 'Weekly ISL Champion',
    description: 'Maintain a 7-day practice streak with Hana.',
    icon: 'Flame',
    type: 'streak',
    target: 7
  },
  {
    id: 'badge-quiz-ace',
    title: 'Quiz Ace',
    description: 'Score 100% on Hana\'s ISL Knowledge Quiz.',
    icon: 'HelpCircle',
    type: 'quiz',
    target: 100
  }
];

// MediaPipe Helper Functions for Gesture Recognizers
const isExtended = (lm, fingerIdx) => {
  const tipMap = { index: 8, middle: 12, ring: 16, pinky: 20 };
  const pipMap = { index: 6, middle: 10, ring: 14, pinky: 18 };
  const tip = lm[tipMap[fingerIdx]];
  const pip = lm[pipMap[fingerIdx]];
  return tip.y < pip.y;
};

const isClosed = (lm, fingerIdx) => {
  const tipMap = { index: 8, middle: 12, ring: 16, pinky: 20 };
  const pipMap = { index: 6, middle: 10, ring: 14, pinky: 18 };
  const tip = lm[tipMap[fingerIdx]];
  const pip = lm[pipMap[fingerIdx]];
  return tip.y > pip.y;
};

const RAW_ISL_CURRICULUM = [
  // --- ALPHABET A - Z ---
  {
    id: 'isl-a',
    category: 'alphabet',
    sign: 'A',
    title: 'Letter A',
    meaning: 'The letter A in ISL fingerspelling',
    description: 'Make a fist with fingers resting against your palm. Keep thumb resting straight up against the side of your index finger.',
    tips: 'Thumb stays flat against the side of your index finger.',
    pose3d: { thumb: [0.2, 0.4, 0.1], index: [1.4, 0.1, 0.1], middle: [1.4, 0.1, 0.1], ring: [1.4, 0.1, 0.1], pinky: [1.4, 0.1, 0.1] },
    recognize: (lm) => isClosed(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring') && isClosed(lm, 'pinky') && lm[4].y < lm[3].y
  },
  {
    id: 'isl-b',
    category: 'alphabet',
    sign: 'B',
    title: 'Letter B',
    meaning: 'The letter B in ISL fingerspelling',
    description: 'Hold four fingers flat and upright together. Tuck thumb across your palm.',
    tips: 'Four fingers together tightly, thumb folded across palm.',
    pose3d: { thumb: [1.2, 1.0, 0.0], index: [0, 0, 0], middle: [0, 0, 0], ring: [0, 0, 0], pinky: [0, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isExtended(lm, 'ring') && isExtended(lm, 'pinky')
  },
  {
    id: 'isl-c',
    category: 'alphabet',
    sign: 'C',
    title: 'Letter C',
    meaning: 'The letter C in ISL fingerspelling',
    description: 'Curve thumb and four fingers into an open C shape.',
    tips: 'Form a curved mug-holding shape.',
    pose3d: { thumb: [0.6, 0.4, 0.5], index: [0.7, 0.5, 0.2], middle: [0.7, 0.5, 0.2], ring: [0.7, 0.5, 0.2], pinky: [0.7, 0.5, 0.2] },
    recognize: (lm) => {
      const dist = Math.hypot(lm[4].x - lm[8].x, lm[4].y - lm[8].y);
      return dist > 0.10 && dist < 0.28;
    }
  },
  {
    id: 'isl-d',
    category: 'alphabet',
    sign: 'D',
    title: 'Letter D',
    meaning: 'The letter D in ISL fingerspelling',
    description: 'Point index finger straight up while touching thumb to middle, ring, and pinky tips.',
    tips: 'Index finger straight up, others form a circle with thumb.',
    pose3d: { thumb: [0.8, 0.6, 0], index: [0, 0, 0], middle: [1.2, 0.8, 0], ring: [1.2, 0.8, 0], pinky: [1.2, 0.8, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring') && isClosed(lm, 'pinky')
  },
  {
    id: 'isl-e',
    category: 'alphabet',
    sign: 'E',
    title: 'Letter E',
    meaning: 'The letter E in ISL fingerspelling',
    description: 'Curl all four fingers down to rest near your thumb tucked underneath.',
    tips: 'Finger tips curl tightly touching thumb.',
    pose3d: { thumb: [1.1, 0.5, 0], index: [1.5, 0.2, 0], middle: [1.5, 0.2, 0], ring: [1.5, 0.2, 0], pinky: [1.5, 0.2, 0] },
    recognize: (lm) => isClosed(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring') && isClosed(lm, 'pinky') && lm[4].y > lm[8].y
  },
  {
    id: 'isl-f',
    category: 'alphabet',
    sign: 'F',
    title: 'Letter F',
    meaning: 'The letter F in ISL fingerspelling',
    description: 'Touch tip of index finger to thumb, holding middle, ring, and pinky fingers spread upright.',
    tips: 'Like the "OK" gesture with three fingers extended up.',
    pose3d: { thumb: [0.8, 0.6, 0], index: [1.2, 0.8, 0], middle: [0, 0, 0], ring: [0, 0, 0], pinky: [0, 0, 0] },
    recognize: (lm) => isClosed(lm, 'index') && isExtended(lm, 'middle') && isExtended(lm, 'ring') && isExtended(lm, 'pinky')
  },
  {
    id: 'isl-g',
    category: 'alphabet',
    sign: 'G',
    title: 'Letter G',
    meaning: 'The letter G in ISL fingerspelling',
    description: 'Point index finger and thumb horizontally to the side, parallel to each other.',
    tips: 'Index finger and thumb extend sideways like pinchers.',
    pose3d: { thumb: [0.3, -0.6, 0], index: [0, -0.8, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => Math.abs(lm[8].x - lm[6].x) > 0.08 && isClosed(lm, 'middle') && isClosed(lm, 'ring')
  },
  {
    id: 'isl-h',
    category: 'alphabet',
    sign: 'H',
    title: 'Letter H',
    meaning: 'The letter H in ISL fingerspelling',
    description: 'Extend index and middle fingers together horizontally sideways, tucking thumb in.',
    tips: 'Two fingers extended sideways together.',
    pose3d: { thumb: [1.2, 0.5, 0], index: [0, -0.8, 0], middle: [0, -0.8, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => Math.abs(lm[8].x - lm[6].x) > 0.07 && Math.abs(lm[12].x - lm[10].x) > 0.07 && isClosed(lm, 'ring')
  },
  {
    id: 'isl-i',
    category: 'alphabet',
    sign: 'I',
    title: 'Letter I',
    meaning: 'The letter I in ISL fingerspelling',
    description: 'Point pinky finger straight up while keeping index, middle, ring fingers and thumb folded in.',
    tips: 'Only pinky finger extended upwards.',
    pose3d: { thumb: [1.2, 0.5, 0], index: [1.4, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [0, 0, 0] },
    recognize: (lm) => isClosed(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring') && isExtended(lm, 'pinky')
  },
  {
    id: 'isl-j',
    category: 'alphabet',
    sign: 'J',
    title: 'Letter J',
    meaning: 'The letter J in ISL fingerspelling',
    description: 'Extend pinky finger and trace a "J" curve swooping down and inward.',
    tips: 'Start with letter I and trace a dynamic curve.',
    pose3d: { thumb: [1.2, 0.5, 0], index: [1.4, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [0, 0.3, 0.4] },
    recognize: (lm) => isExtended(lm, 'pinky') && isClosed(lm, 'index') && isClosed(lm, 'middle')
  },
  {
    id: 'isl-k',
    category: 'alphabet',
    sign: 'K',
    title: 'Letter K',
    meaning: 'The letter K in ISL fingerspelling',
    description: 'Point index finger straight up, middle finger angled forward, and rest thumb between them.',
    tips: 'Index up, middle out, thumb in middle.',
    pose3d: { thumb: [0.2, 0, 0], index: [0, 0, 0], middle: [0.6, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && lm[12].y < lm[14].y && isClosed(lm, 'ring')
  },
  {
    id: 'isl-l',
    category: 'alphabet',
    sign: 'L',
    title: 'Letter L',
    meaning: 'The letter L in ISL fingerspelling',
    description: 'Extend thumb out and index finger straight up, forming a right-angle L shape.',
    tips: 'Makes a clear "L" shape.',
    pose3d: { thumb: [0, 0, -0.8], index: [0, 0, 0], middle: [1.4, 0.1, 0.1], ring: [1.4, 0.1, 0.1], pinky: [1.4, 0.1, 0.1] },
    recognize: (lm) => isExtended(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring') && isClosed(lm, 'pinky') && Math.abs(lm[4].x - lm[8].x) > 0.15
  },
  {
    id: 'isl-m',
    category: 'alphabet',
    sign: 'M',
    title: 'Letter M',
    meaning: 'The letter M in ISL fingerspelling',
    description: 'Tuck thumb under index, middle, and ring fingers.',
    tips: 'Thumb peeks under three fingers.',
    pose3d: { thumb: [1.3, 0.4, 0], index: [1.4, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isClosed(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring') && isClosed(lm, 'pinky')
  },
  {
    id: 'isl-n',
    category: 'alphabet',
    sign: 'N',
    title: 'Letter N',
    meaning: 'The letter N in ISL fingerspelling',
    description: 'Tuck thumb under index and middle fingers.',
    tips: 'Thumb peeks under two fingers.',
    pose3d: { thumb: [1.3, 0.4, 0], index: [1.4, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isClosed(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring')
  },
  {
    id: 'isl-o',
    category: 'alphabet',
    sign: 'O',
    title: 'Letter O',
    meaning: 'The letter O in ISL fingerspelling',
    description: 'Touch all four fingertips to thumb tip forming a circle O.',
    tips: 'Fingertips meet thumb forming a perfect "O".',
    pose3d: { thumb: [0.8, 0.5, 0], index: [0.9, 0.5, 0], middle: [0.9, 0.5, 0], ring: [0.9, 0.5, 0], pinky: [0.9, 0.5, 0] },
    recognize: (lm) => Math.hypot(lm[4].x - lm[8].x, lm[4].y - lm[8].y) < 0.12 && isClosed(lm, 'middle')
  },
  {
    id: 'isl-p',
    category: 'alphabet',
    sign: 'P',
    title: 'Letter P',
    meaning: 'The letter P in ISL fingerspelling',
    description: 'Hold hand like K, but point fingers downwards.',
    tips: 'Downward facing K hand shape.',
    pose3d: { thumb: [0.5, 0.5, 0], index: [1.2, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => lm[8].y > lm[5].y && isClosed(lm, 'ring')
  },
  {
    id: 'isl-q',
    category: 'alphabet',
    sign: 'Q',
    title: 'Letter Q',
    meaning: 'The letter Q in ISL fingerspelling',
    description: 'Hold hand like G, but point fingers downwards.',
    tips: 'Downward facing G hand shape.',
    pose3d: { thumb: [0.5, 0.5, 0], index: [1.2, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => lm[8].y > lm[5].y && isClosed(lm, 'middle')
  },
  {
    id: 'isl-r',
    category: 'alphabet',
    sign: 'R',
    title: 'Letter R',
    meaning: 'The letter R in ISL fingerspelling',
    description: 'Cross index finger over middle finger.',
    tips: 'Crossed fingers for good luck!',
    pose3d: { thumb: [1.2, 0.5, 0], index: [0, 0.1, 0], middle: [0, -0.1, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isClosed(lm, 'ring') && Math.abs(lm[8].x - lm[12].x) < 0.05
  },
  {
    id: 'isl-s',
    category: 'alphabet',
    sign: 'S',
    title: 'Letter S',
    meaning: 'The letter S in ISL fingerspelling',
    description: 'Make a fist with thumb wrapped across front of fingers.',
    tips: 'Fist with thumb over front of fingers.',
    pose3d: { thumb: [1.2, 0.8, 0], index: [1.4, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isClosed(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring') && isClosed(lm, 'pinky') && lm[4].x < lm[6].x
  },
  {
    id: 'isl-t',
    category: 'alphabet',
    sign: 'T',
    title: 'Letter T',
    meaning: 'The letter T in ISL fingerspelling',
    description: 'Tuck thumb under index finger only.',
    tips: 'Thumb peeks out between index and middle finger.',
    pose3d: { thumb: [1.1, 0.4, 0], index: [1.4, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isClosed(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring')
  },
  {
    id: 'isl-u',
    category: 'alphabet',
    sign: 'U',
    title: 'Letter U',
    meaning: 'The letter U in ISL fingerspelling',
    description: 'Hold index and middle fingers straight up together touching.',
    tips: 'Two fingers up together.',
    pose3d: { thumb: [1.2, 0.5, 0], index: [0, 0, 0], middle: [0, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isClosed(lm, 'ring') && isClosed(lm, 'pinky') && Math.abs(lm[8].x - lm[12].x) < 0.06
  },
  {
    id: 'isl-v',
    category: 'alphabet',
    sign: 'V',
    title: 'Letter V',
    meaning: 'The letter V in ISL fingerspelling',
    description: 'Hold index and middle fingers up spread apart in a V.',
    tips: 'Peace / Victory V shape.',
    pose3d: { thumb: [1.0, 0.5, 0], index: [0, -0.2, 0], middle: [0, 0.2, 0], ring: [1.4, 0.1, 0.1], pinky: [1.4, 0.1, 0.1] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isClosed(lm, 'ring') && isClosed(lm, 'pinky') && Math.abs(lm[8].x - lm[12].x) >= 0.06
  },
  {
    id: 'isl-w',
    category: 'alphabet',
    sign: 'W',
    title: 'Letter W',
    meaning: 'The letter W in ISL fingerspelling',
    description: 'Extend index, middle, and ring fingers up spread apart.',
    tips: 'Three fingers up like W.',
    pose3d: { thumb: [1.2, 0.5, 0], index: [0, -0.2, 0], middle: [0, 0, 0], ring: [0, 0.2, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isExtended(lm, 'ring') && isClosed(lm, 'pinky')
  },
  {
    id: 'isl-x',
    category: 'alphabet',
    sign: 'X',
    title: 'Letter X',
    meaning: 'The letter X in ISL fingerspelling',
    description: 'Hook index finger like a pirate hook while keeping others closed.',
    tips: 'Curved index finger hook.',
    pose3d: { thumb: [1.2, 0.5, 0], index: [0.8, 0.5, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => lm[8].y > lm[6].y && lm[6].y < lm[5].y && isClosed(lm, 'middle') && isClosed(lm, 'ring')
  },
  {
    id: 'isl-y',
    category: 'alphabet',
    sign: 'Y',
    title: 'Letter Y',
    meaning: 'The letter Y in ISL fingerspelling',
    description: 'Extend thumb and pinky out wide while curling index, middle, and ring fingers in.',
    tips: 'Hang loose phone gesture.',
    pose3d: { thumb: [0, 0, -0.8], index: [1.4, 0.1, 0.1], middle: [1.4, 0.1, 0.1], ring: [1.4, 0.1, 0.1], pinky: [0, 0, 0.8] },
    recognize: (lm) => (lm[4].y < lm[3].y || Math.abs(lm[4].x - lm[0].x) > 0.18) && isExtended(lm, 'pinky') && isClosed(lm, 'index') && isClosed(lm, 'middle')
  },
  {
    id: 'isl-z',
    category: 'alphabet',
    sign: 'Z',
    title: 'Letter Z',
    meaning: 'The letter Z in ISL fingerspelling',
    description: 'Extend index finger and draw a "Z" path in the air.',
    tips: 'Trace a Z shape with index finger.',
    pose3d: { thumb: [1.2, 0.5, 0], index: [0, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring') && isClosed(lm, 'pinky')
  },

  // --- NUMBERS 1 - 10 ---
  {
    id: 'isl-1',
    category: 'numbers',
    sign: '1',
    title: 'Number 1',
    meaning: 'The number 1 in ISL',
    description: 'Hold index finger straight up with palm facing inward toward body.',
    tips: 'Only index finger extended.',
    pose3d: { thumb: [1, 0.5, 0], index: [0, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring') && isClosed(lm, 'pinky')
  },
  {
    id: 'isl-2',
    category: 'numbers',
    sign: '2',
    title: 'Number 2',
    meaning: 'The number 2 in ISL',
    description: 'Hold index and middle fingers straight up with palm facing inward.',
    tips: 'Index and middle fingers extended up.',
    pose3d: { thumb: [1, 0.5, 0], index: [0, 0, 0], middle: [0, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isClosed(lm, 'ring') && isClosed(lm, 'pinky')
  },
  {
    id: 'isl-3',
    category: 'numbers',
    sign: '3',
    title: 'Number 3',
    meaning: 'The number 3 in ISL',
    description: 'Extend thumb, index, and middle fingers with palm facing inward.',
    tips: 'Thumb, index, and middle extended in ISL number 3.',
    pose3d: { thumb: [0, 0, -0.6], index: [0, 0, 0], middle: [0, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isClosed(lm, 'ring') && lm[4].x < lm[3].x
  },
  {
    id: 'isl-4',
    category: 'numbers',
    sign: '4',
    title: 'Number 4',
    meaning: 'The number 4 in ISL',
    description: 'Hold all four fingers up with thumb tucked across palm.',
    tips: 'Four fingers up, thumb folded.',
    pose3d: { thumb: [1.2, 1.0, 0], index: [0, 0, 0], middle: [0, 0, 0], ring: [0, 0, 0], pinky: [0, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isExtended(lm, 'ring') && isExtended(lm, 'pinky')
  },
  {
    id: 'isl-5',
    category: 'numbers',
    sign: '5',
    title: 'Number 5',
    meaning: 'The number 5 in ISL',
    description: 'Spread all five fingers wide open facing forward.',
    tips: 'Open hand with all 5 digits relaxed.',
    pose3d: { thumb: [-0.4, 0, -0.6], index: [0, -0.2, 0], middle: [0, 0, 0], ring: [0, 0.2, 0], pinky: [0, 0.4, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isExtended(lm, 'ring') && isExtended(lm, 'pinky')
  },
  {
    id: 'isl-6',
    category: 'numbers',
    sign: '6',
    title: 'Number 6',
    meaning: 'The number 6 in ISL',
    description: 'Touch tip of thumb to tip of pinky finger, extending index, middle, and ring fingers up.',
    tips: 'Thumb touches pinky.',
    pose3d: { thumb: [0.8, 0.6, 0], index: [0, 0, 0], middle: [0, 0, 0], ring: [0, 0, 0], pinky: [1.2, 0.8, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isExtended(lm, 'ring') && isClosed(lm, 'pinky')
  },
  {
    id: 'isl-7',
    category: 'numbers',
    sign: '7',
    title: 'Number 7',
    meaning: 'The number 7 in ISL',
    description: 'Touch tip of thumb to tip of ring finger, extending index, middle, and pinky fingers.',
    tips: 'Thumb touches ring finger.',
    pose3d: { thumb: [0.8, 0.6, 0], index: [0, 0, 0], middle: [0, 0, 0], ring: [1.2, 0.8, 0], pinky: [0, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isClosed(lm, 'ring') && isExtended(lm, 'pinky')
  },
  {
    id: 'isl-8',
    category: 'numbers',
    sign: '8',
    title: 'Number 8',
    meaning: 'The number 8 in ISL',
    description: 'Touch tip of thumb to tip of middle finger, extending index, ring, and pinky fingers.',
    tips: 'Thumb touches middle finger.',
    pose3d: { thumb: [0.8, 0.6, 0], index: [0, 0, 0], middle: [1.2, 0.8, 0], ring: [0, 0, 0], pinky: [0, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isClosed(lm, 'middle') && isExtended(lm, 'ring') && isExtended(lm, 'pinky')
  },
  {
    id: 'isl-9',
    category: 'numbers',
    sign: '9',
    title: 'Number 9',
    meaning: 'The number 9 in ISL',
    description: 'Touch tip of thumb to tip of index finger, extending middle, ring, and pinky fingers.',
    tips: 'Thumb touches index finger.',
    pose3d: { thumb: [0.8, 0.6, 0], index: [1.2, 0.8, 0], middle: [0, 0, 0], ring: [0, 0, 0], pinky: [0, 0, 0] },
    recognize: (lm) => isClosed(lm, 'index') && isExtended(lm, 'middle') && isExtended(lm, 'ring') && isExtended(lm, 'pinky')
  },
  {
    id: 'isl-10',
    category: 'numbers',
    sign: '10',
    title: 'Number 10',
    meaning: 'The number 10 in ISL',
    description: 'Make an "A" fist with thumb pointing up, shaking hand side to side.',
    tips: 'Thumbs up motion with a gentle wiggle.',
    pose3d: { thumb: [0, 0, -0.6], index: [1.4, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isClosed(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring') && isClosed(lm, 'pinky') && lm[4].y < lm[3].y
  },

  // --- GREETINGS & COURTESY ---
  {
    id: 'isl-hello',
    category: 'greetings',
    sign: 'HELLO',
    title: 'Hello',
    meaning: 'A friendly greeting in ISL',
    description: 'Place flat right hand near forehead with palm facing out, then move outward in a salute motion.',
    tips: 'Polite salute starting near temple.',
    pose3d: { thumb: [0, 0, 0], index: [0, 0, 0], middle: [0, 0, 0], ring: [0, 0, 0], pinky: [0, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isExtended(lm, 'ring') && lm[9].y < 0.48
  },
  {
    id: 'isl-thank-you',
    category: 'greetings',
    sign: 'THANK YOU',
    title: 'Thank You',
    meaning: 'Expressing gratitude in ISL',
    description: 'Touch fingertips to chin/lips with flat hand, then move forward toward the other person.',
    tips: 'Warm facial expression and nod.',
    pose3d: { thumb: [0.2, 0, 0], index: [0, 0, 0], middle: [0, 0, 0], ring: [0, 0, 0], pinky: [0, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isExtended(lm, 'ring')
  },
  {
    id: 'isl-please',
    category: 'greetings',
    sign: 'PLEASE',
    title: 'Please',
    meaning: 'Polite request in ISL',
    description: 'Place open palm flat over your chest and rub in a gentle clockwise circle.',
    tips: 'Circle palm over heart area.',
    pose3d: { thumb: [0.2, 0, 0], index: [0, 0, 0], middle: [0, 0, 0], ring: [0, 0, 0], pinky: [0, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isExtended(lm, 'ring')
  },
  {
    id: 'isl-sorry',
    category: 'greetings',
    sign: 'SORRY',
    title: 'Sorry',
    meaning: 'Apologizing in ISL',
    description: 'Make an "S" fist and rub it in a small circle over your chest.',
    tips: 'Gentle circular motion with fist on chest.',
    pose3d: { thumb: [1.2, 0.8, 0], index: [1.4, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isClosed(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring')
  },
  {
    id: 'isl-yes',
    category: 'greetings',
    sign: 'YES',
    title: 'Yes',
    meaning: 'Affirmation sign in ISL',
    description: 'Make an "S" fist and tilt wrist up and down repeatedly like a head nodding yes.',
    tips: 'Fist acts like a head nodding up and down.',
    pose3d: { thumb: [1.0, 0.5, 0], index: [1.4, 0.1, 0.1], middle: [1.4, 0.1, 0.1], ring: [1.4, 0.1, 0.1], pinky: [1.4, 0.1, 0.1] },
    recognize: (lm) => isClosed(lm, 'index') && isClosed(lm, 'middle') && isClosed(lm, 'ring')
  },
  {
    id: 'isl-no',
    category: 'greetings',
    sign: 'NO',
    title: 'No',
    meaning: 'Negation sign in ISL',
    description: 'Bring index and middle fingers together and tap them quickly against your thumb tip.',
    tips: 'Like a bird beak snapping shut.',
    pose3d: { thumb: [0.6, 0.4, 0], index: [0.8, 0.4, 0], middle: [0.8, 0.4, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isClosed(lm, 'ring') && isClosed(lm, 'pinky')
  },
  {
    id: 'isl-iloveyou',
    category: 'greetings',
    sign: 'I LOVE YOU',
    title: 'I Love You (ILY)',
    meaning: 'Iconic sign expressing love and warmth',
    description: 'Extend thumb, index, and pinky fingers while holding middle and ring fingers flat.',
    tips: 'Combines I, L, and Y fingerspelling letters.',
    pose3d: { thumb: [0, 0, -0.6], index: [0, 0, 0], middle: [1.4, 0.1, 0.1], ring: [1.4, 0.1, 0.1], pinky: [0, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'pinky') && isClosed(lm, 'middle') && isClosed(lm, 'ring')
  },
  {
    id: 'isl-good-morning',
    category: 'greetings',
    sign: 'GOOD MORNING',
    title: 'Good Morning',
    meaning: 'Morning greeting in ISL',
    description: 'Sign GOOD (chin to open palm) followed by MORNING (arm raising like the sun).',
    tips: 'Sun rising gesture.',
    pose3d: { thumb: [0.2, 0, 0], index: [0, 0, 0], middle: [0, 0, 0], ring: [0, 0, 0], pinky: [0, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle')
  },
  {
    id: 'isl-nice-to-meet-you',
    category: 'greetings',
    sign: 'NICE TO MEET YOU',
    title: 'Nice to Meet You',
    meaning: 'Welcoming phrase in ISL',
    description: 'Sign NICE (wiping flat palm over hand) then bring index fingers together (MEET).',
    tips: 'Two index fingers meeting together.',
    pose3d: { thumb: [1.0, 0.5, 0], index: [0, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isClosed(lm, 'middle')
  },

  // --- PHRASES ---
  {
    id: 'isl-learn-isl',
    category: 'phrases',
    sign: 'LEARN ISL',
    title: 'I am learning ISL',
    meaning: 'Expressing your learning goal in sign language',
    description: 'Lift knowledge from palm into forehead (LEARN) followed by fingerspelling I-S-L.',
    tips: 'Bring right fingertips up to temple.',
    pose3d: { thumb: [0.4, 0.2, 0], index: [0.5, 0.3, 0], middle: [0.5, 0.3, 0], ring: [0.5, 0.3, 0], pinky: [0.5, 0.3, 0] },
    recognize: (lm) => isExtended(lm, 'index')
  },
  {
    id: 'isl-my-name-is',
    category: 'phrases',
    sign: 'MY NAME IS',
    title: 'My Name Is...',
    meaning: 'Introducing yourself in ISL',
    description: 'Tap flat hand on chest (MY) then tap crossed "H" fingers together twice (NAME).',
    tips: 'Tap two H fingers together.',
    pose3d: { thumb: [1.2, 0.5, 0], index: [0, -0.8, 0], middle: [0, -0.8, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle')
  },
  {
    id: 'isl-happy',
    category: 'phrases',
    sign: 'HAPPY',
    title: 'Happy',
    meaning: 'Expressing joy in ISL',
    description: 'Brush open palm upward against chest repeatedly.',
    tips: 'Upward gentle motion on chest.',
    pose3d: { thumb: [-0.4, 0, -0.6], index: [0, 0, 0], middle: [0, 0, 0], ring: [0, 0, 0], pinky: [0, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle') && isExtended(lm, 'ring')
  },
  {
    id: 'isl-help',
    category: 'phrases',
    sign: 'HELP',
    title: 'Help',
    meaning: 'Asking for or offering assistance in ISL',
    description: 'Place right "thumbs up" fist on top of left open palm, lifting both up together.',
    tips: 'Thumbs up resting on supportive open palm.',
    pose3d: { thumb: [0, 0, -0.6], index: [1.4, 0, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isClosed(lm, 'index') && isClosed(lm, 'middle') && lm[4].y < lm[3].y
  },
  {
    id: 'isl-friend',
    category: 'phrases',
    sign: 'FRIEND',
    title: 'Friend',
    meaning: 'Friendship sign in ISL',
    description: 'Hook right index finger over left index finger, then reverse and hook again.',
    tips: 'Interlocked index fingers.',
    pose3d: { thumb: [1.2, 0.5, 0], index: [0.8, 0.5, 0], middle: [1.4, 0, 0], ring: [1.4, 0, 0], pinky: [1.4, 0, 0] },
    recognize: (lm) => isClosed(lm, 'middle') && isClosed(lm, 'ring')
  },
  {
    id: 'isl-how-are-you',
    category: 'greetings',
    sign: 'HOW ARE YOU',
    title: 'How Are You?',
    meaning: 'Asking how someone is doing in ISL',
    description: 'Place both curved hands with knuckles touching chest, roll outward (HOW) then point to the person (YOU).',
    tips: 'Roll curved hands forward and point gently.',
    pose3d: { thumb: [0.5, 0.3, 0], index: [0.6, 0.4, 0], middle: [0.6, 0.4, 0], ring: [0.6, 0.4, 0], pinky: [0.6, 0.4, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle')
  },
  {
    id: 'isl-pleased-to-know',
    category: 'phrases',
    sign: 'PLEASED TO KNOW',
    title: 'Pleased to Know You',
    meaning: 'Expressing pleasure in meeting or knowing someone',
    description: 'Flat hand wipes horizontally over non-dominant palm (PLEASED/NICE) followed by tapping forehead (KNOW).',
    tips: 'Smooth wiping motion transitioning to temple/forehead tap.',
    pose3d: { thumb: [0.2, 0, 0], index: [0, 0, 0], middle: [0, 0, 0], ring: [0, 0, 0], pinky: [0, 0, 0] },
    recognize: (lm) => isExtended(lm, 'index') && isExtended(lm, 'middle')
  }
];

export const ISL_CURRICULUM = RAW_ISL_CURRICULUM.map(item => ({
  ...item,
  image: SIGN_IMAGES[item.sign] || SIGN_IMAGES[item.id] || null
}));

// Backwards compatibility aliases
export const ASL_CATEGORIES = ISL_CATEGORIES;
export const ASL_BADGES = ISL_BADGES;
export const ASL_CURRICULUM = ISL_CURRICULUM;

export const HANA_PERSONALITY = {
  name: 'Hana',
  role: 'AI Voice & ISL Companion',
  greeting: "Namaste! I'm Hana, your AI friend and sign-language learning companion! 🌸 I'm so excited to practice Indian Sign Language (ISL) with you today! Would you like to try the alphabet (A-Z), numbers (1-10), or greetings?",
  safetyNotice: "Remember: I'm a friendly AI tutor to help you build confidence in beginner ISL. I'm not Deaf or a certified interpreter, so I always encourage connecting with human Deaf educators for full fluency!",
  encouragements: [
    "You're doing fantastic! Every single practice count helps build muscle memory! ✨",
    "Great attempt! Your hand positioning is looking clearer every time! 💡",
    "Awesome effort! Keep your fingers relaxed and practice at your own comfy pace! 💖",
    "Spot on! Your gesture alignment was super clean right there! 🌟"
  ]
};
