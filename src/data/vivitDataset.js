// ProcessedData_vivit ISL Dataset Loader & Metadata Registry
// Contains 76 real Indian Sign Language video categories

export const VIVIT_CATEGORIES = [
  { id: 'time', title: 'Time, Days & Calendar', icon: 'Clock', count: 21, color: 'from-amber-500 to-orange-600' },
  { id: 'adjectives', title: 'Descriptive Words & Opposites', icon: 'Sliders', count: 27, color: 'from-purple-500 to-indigo-600' },
  { id: 'animals', title: 'Animals & Nature', icon: 'Sparkles', count: 8, color: 'from-emerald-500 to-teal-600' },
  { id: 'clothing', title: 'Clothing & Accessories', icon: 'Tag', count: 10, color: 'from-pink-500 to-rose-600' },
  { id: 'people', title: 'People & Deaf Culture', icon: 'Users', count: 3, color: 'from-blue-500 to-cyan-600' }
];

export const VIVIT_SIGN_METADATA = {
  // --- TIME & CALENDAR (21 signs) ---
  morning: {
    sign: 'MORNING',
    title: 'Morning',
    category: 'time',
    meaning: 'ISL time gesture for Morning',
    description: 'Place non-dominant arm horizontal, move dominant hand up under non-dominant arm like the sun rising over the horizon.',
    tips: 'Sun rising motion with relaxed fingertips.',
    takes: ['MVI_4651.MOV', 'MVI_4652.MOV', 'MVI_4653.MOV', 'MVI_4654.MOV', 'MVI_5060.MOV']
  },
  afternoon: {
    sign: 'AFTERNOON',
    title: 'Afternoon',
    category: 'time',
    meaning: 'ISL time gesture for Afternoon',
    description: 'Rest non-dominant arm horizontally while pointing dominant open hand angled slightly downward toward the sun at mid-day.',
    tips: 'Hand angled at mid-afternoon sun position.',
    takes: ['MVI_4655.MOV', 'MVI_4656.MOV', 'MVI_4657.MOV', 'MVI_5063.MOV']
  },
  evening: {
    sign: 'EVENING',
    title: 'Evening',
    category: 'time',
    meaning: 'ISL time gesture for Evening',
    description: 'Curve wrist downward over non-dominant wrist representing the sun setting below the horizon.',
    tips: 'Gentle downward arc over the wrist.',
    takes: ['MVI_4658.MOV', 'MVI_4659.MOV', 'MVI_4660.MOV', 'MVI_5066.MOV']
  },
  night: {
    sign: 'NIGHT',
    title: 'Night',
    category: 'time',
    meaning: 'ISL time gesture for Night',
    description: 'Cup dominant hand over non-dominant hand as night falls over the earth.',
    tips: 'Smooth cupping motion over wrist.',
    takes: ['MVI_4661.MOV', 'MVI_4662.MOV', 'MVI_4663.MOV', 'MVI_5069.MOV']
  },
  today: {
    sign: 'TODAY',
    title: 'Today',
    category: 'time',
    meaning: 'Present day in ISL',
    description: 'Bring both Y-hands downward together in front of body firmly.',
    tips: 'Two Y-hands drop downward together.',
    takes: ['MVI_4664.MOV', 'MVI_4665.MOV', 'MVI_4666.MOV']
  },
  tomorrow: {
    sign: 'TOMORROW',
    title: 'Tomorrow',
    category: 'time',
    meaning: 'The next day in ISL',
    description: 'Touch thumb to cheek near ear and rotate wrist forward.',
    tips: 'Thumb flips forward from cheek.',
    takes: ['MVI_4667.MOV', 'MVI_4668.MOV', 'MVI_4669.MOV']
  },
  yesterday: {
    sign: 'YESTERDAY',
    title: 'Yesterday',
    category: 'time',
    meaning: 'The previous day in ISL',
    description: 'Touch thumb to chin and move backward toward jaw/ear.',
    tips: 'Thumb moves backward past ear.',
    takes: ['MVI_4670.MOV', 'MVI_4671.MOV', 'MVI_4672.MOV']
  },
  time: {
    sign: 'TIME',
    title: 'Time',
    category: 'time',
    meaning: 'Asking or pointing out time in ISL',
    description: 'Tap index finger twice on wrist where wristwatch is worn.',
    tips: 'Tap wrist firmly twice.',
    takes: ['MVI_4673.MOV', 'MVI_4674.MOV', 'MVI_4675.MOV']
  },
  hour: {
    sign: 'HOUR',
    title: 'Hour',
    category: 'time',
    meaning: 'Duration of an hour in ISL',
    description: 'Rotate dominant index finger in full 360 degree circle over non-dominant palm.',
    tips: 'Full clock circle over palm.',
    takes: ['MVI_4676.MOV', 'MVI_4677.MOV', 'MVI_4678.MOV']
  },
  minute: {
    sign: 'MINUTE',
    title: 'Minute',
    category: 'time',
    meaning: 'Duration of a minute in ISL',
    description: 'Touch index finger to non-dominant palm and twitch forward slightly like a minute hand tick.',
    tips: 'Quick tick motion on palm.',
    takes: ['MVI_4679.MOV', 'MVI_4680.MOV', 'MVI_4681.MOV']
  },
  second: {
    sign: 'SECOND',
    title: 'Second',
    category: 'time',
    meaning: 'Unit of time in ISL',
    description: 'Flick index finger forward once rapidly.',
    tips: 'Quick single flick forward.',
    takes: ['MVI_4682.MOV', 'MVI_4683.MOV', 'MVI_4684.MOV']
  },
  week: {
    sign: 'WEEK',
    title: 'Week',
    category: 'time',
    meaning: 'Duration of a week in ISL',
    description: 'Slide index finger across flat non-dominant palm from heel to fingertips.',
    tips: 'Smooth slide across palm.',
    takes: ['MVI_4685.MOV', 'MVI_4686.MOV', 'MVI_4687.MOV']
  },
  month: {
    sign: 'MONTH',
    title: 'Month',
    category: 'time',
    meaning: 'Duration of a month in ISL',
    description: 'Slide dominant index finger down back of non-dominant index finger.',
    tips: 'Downward slide against index finger.',
    takes: ['MVI_4688.MOV', 'MVI_4689.MOV', 'MVI_4690.MOV']
  },
  year: {
    sign: 'YEAR',
    title: 'Year',
    category: 'time',
    meaning: 'Duration of a year in ISL',
    description: 'Make two fists and revolve dominant fist completely around non-dominant fist.',
    tips: 'Orbit fist around static fist.',
    takes: ['MVI_4691.MOV', 'MVI_4692.MOV', 'MVI_4693.MOV']
  },
  monday: {
    sign: 'MONDAY',
    title: 'Monday',
    category: 'time',
    meaning: 'Day of the week - Monday',
    description: 'Form ISL "M" hand and move in small circular pattern.',
    tips: 'Circular movement with M hand.',
    takes: ['MVI_4694.MOV', 'MVI_4695.MOV', 'MVI_4696.MOV']
  },
  tuesday: {
    sign: 'TUESDAY',
    title: 'Tuesday',
    category: 'time',
    meaning: 'Day of the week - Tuesday',
    description: 'Form ISL "T" hand and circle gently.',
    tips: 'Circular movement with T hand.',
    takes: ['MVI_4697.MOV', 'MVI_4698.MOV', 'MVI_4699.MOV']
  },
  wednesday: {
    sign: 'WEDNESDAY',
    title: 'Wednesday',
    category: 'time',
    meaning: 'Day of the week - Wednesday',
    description: 'Form ISL "W" hand and circle gently.',
    tips: 'Circular movement with W hand.',
    takes: ['MVI_4700.MOV', 'MVI_4701.MOV', 'MVI_4702.MOV']
  },
  thursday: {
    sign: 'THURSDAY',
    title: 'Thursday',
    category: 'time',
    meaning: 'Day of the week - Thursday',
    description: 'Form ISL "H" hand shape and circle gently.',
    tips: 'Circular movement with H hand.',
    takes: ['MVI_4703.MOV', 'MVI_4704.MOV', 'MVI_4705.MOV']
  },
  friday: {
    sign: 'FRIDAY',
    title: 'Friday',
    category: 'time',
    meaning: 'Day of the week - Friday',
    description: 'Form ISL "F" hand shape and circle gently.',
    tips: 'Circular movement with F hand.',
    takes: ['MVI_4706.MOV', 'MVI_4707.MOV', 'MVI_4708.MOV']
  },
  saturday: {
    sign: 'SATURDAY',
    title: 'Saturday',
    category: 'time',
    meaning: 'Day of the week - Saturday',
    description: 'Form ISL "S" fist and circle gently.',
    tips: 'Circular movement with S fist.',
    takes: ['MVI_4709.MOV', 'MVI_4710.MOV', 'MVI_4711.MOV']
  },
  sunday: {
    sign: 'SUNDAY',
    title: 'Sunday',
    category: 'time',
    meaning: 'Day of the week - Sunday',
    description: 'Hold both open palms up and move apart smoothly with joyful expression.',
    tips: 'Both open palms moving outward.',
    takes: ['MVI_4712.MOV', 'MVI_4713.MOV', 'MVI_4714.MOV']
  },

  // --- ADJECTIVES & OPPOSITES (27 signs) ---
  good: {
    sign: 'GOOD',
    title: 'Good',
    category: 'adjectives',
    meaning: 'Expressing approval or quality in ISL',
    description: 'Touch fingertips to chin and move forward into non-dominant open palm.',
    tips: 'Chin to open palm motion.',
    takes: ['MVI_5183.MOV', 'MVI_5184.MOV', 'MVI_5185.MOV']
  },
  bad: {
    sign: 'BAD',
    title: 'Bad',
    category: 'adjectives',
    meaning: 'Expressing disapproval in ISL',
    description: 'Touch fingertips to chin and flip hand downward sharply with negative head shake.',
    tips: 'Flip hand downward from chin.',
    takes: ['MVI_5161.MOV', 'MVI_5162.MOV', 'MVI_5163.MOV', 'MVI_5241.MOV']
  },
  happy: {
    sign: 'HAPPY',
    title: 'Happy',
    category: 'adjectives',
    meaning: 'Feeling or showing pleasure',
    description: 'Brush open palm upward against chest repeatedly with smile.',
    tips: 'Upward gentle chest brushing.',
    takes: ['MVI_5183.MOV', 'MVI_5184.MOV', 'MVI_5185.MOV', 'MVI_5263.MOV']
  },
  sad: {
    sign: 'SAD',
    title: 'Sad',
    category: 'adjectives',
    meaning: 'Feeling unhappy or sorrowful',
    description: 'Place both hands near eyes and draw fingers slowly down face with sad expression.',
    tips: 'Fingers draw down face.',
    takes: ['MVI_5164.MOV', 'MVI_5165.MOV', 'MVI_5166.MOV']
  },
  big: {
    sign: 'BIG',
    title: 'Big',
    category: 'adjectives',
    meaning: 'Large in size or extent',
    description: 'Start with hands close and move them wide apart in large arc.',
    tips: 'Arc hands wide apart.',
    takes: ['MVI_5167.MOV', 'MVI_5168.MOV', 'MVI_5169.MOV']
  },
  small: {
    sign: 'SMALL',
    title: 'Small',
    category: 'adjectives',
    meaning: 'Little in size',
    description: 'Hold palms facing each other close together.',
    tips: 'Bring palms close together.',
    takes: ['MVI_5170.MOV', 'MVI_5171.MOV', 'MVI_5172.MOV']
  },
  fast: {
    sign: 'FAST',
    title: 'Fast',
    category: 'adjectives',
    meaning: 'Moving or capable of moving at high speed',
    description: 'Flick thumbs and index fingers backward rapidly.',
    tips: 'Quick backward flick.',
    takes: ['MVI_5173.MOV', 'MVI_5174.MOV', 'MVI_5175.MOV']
  },
  slow: {
    sign: 'SLOW',
    title: 'Slow',
    category: 'adjectives',
    meaning: 'Moving at low speed',
    description: 'Slide dominant hand very slowly up the back of non-dominant hand and arm.',
    tips: 'Slow upward slide on arm.',
    takes: ['MVI_5176.MOV', 'MVI_5177.MOV', 'MVI_5178.MOV']
  },
  hot: {
    sign: 'HOT',
    title: 'Hot',
    category: 'adjectives',
    meaning: 'High temperature',
    description: 'Place clawed hand at mouth and twist outward quickly as if dropping hot food.',
    tips: 'Twist hand away from mouth.',
    takes: ['MVI_5179.MOV', 'MVI_5180.MOV', 'MVI_5181.MOV']
  },
  cold: {
    sign: 'COLD',
    title: 'Cold',
    category: 'adjectives',
    meaning: 'Low temperature',
    description: 'Make two S-fists and shiver arms back and forth.',
    tips: 'Shiver fists near shoulders.',
    takes: ['MVI_5182.MOV', 'MVI_5183.MOV', 'MVI_5184.MOV']
  },
  warm: {
    sign: 'WARM',
    title: 'Warm',
    category: 'adjectives',
    meaning: 'Comfortably high temperature',
    description: 'Place loose fist at mouth and slowly blow into palm as it opens upward.',
    tips: 'Opening palm moving up from mouth.',
    takes: ['MVI_5185.MOV', 'MVI_5186.MOV', 'MVI_5187.MOV']
  },
  cheap: {
    sign: 'CHEAP',
    title: 'Cheap',
    category: 'adjectives',
    meaning: 'Low cost',
    description: 'Brush dominant B-hand downward past non-dominant palm.',
    tips: 'Brush down non-dominant palm.',
    takes: ['MVI_5188.MOV', 'MVI_5189.MOV', 'MVI_5190.MOV']
  },
  expensive: {
    sign: 'EXPENSIVE',
    title: 'Expensive',
    category: 'adjectives',
    meaning: 'High cost',
    description: 'Lift money sign off palm and throw hand open to the side.',
    tips: 'Throw open hand to side.',
    takes: ['MVI_5191.MOV', 'MVI_5192.MOV', 'MVI_5193.MOV']
  },
  loud: {
    sign: 'LOUD',
    title: 'Loud',
    category: 'adjectives',
    meaning: 'Producing much noise',
    description: 'Point to ear then shake fists back and forth in front.',
    tips: 'Point to ear and shake fists.',
    takes: ['MVI_5194.MOV', 'MVI_5195.MOV', 'MVI_5196.MOV']
  },
  quiet: {
    sign: 'QUIET',
    title: 'Quiet',
    category: 'adjectives',
    meaning: 'Making little or no noise',
    description: 'Cross index fingers at lips and lower palms smoothly to sides.',
    tips: 'Cross fingers at lips and lower.',
    takes: ['MVI_5197.MOV', 'MVI_5198.MOV', 'MVI_5199.MOV']
  },
  tall: {
    sign: 'TALL',
    title: 'Tall',
    category: 'adjectives',
    meaning: 'Great vertical height',
    description: 'Slide index finger or flat hand up high along non-dominant palm.',
    tips: 'Raise hand high above head.',
    takes: ['MVI_5200.MOV', 'MVI_5201.MOV', 'MVI_5202.MOV']
  },
  short: {
    sign: 'SHORT',
    title: 'Short',
    category: 'adjectives',
    meaning: 'Small vertical height',
    description: 'Hold flat palm facing down at low waist level.',
    tips: 'Pat flat palm low near waist.',
    takes: ['MVI_5203.MOV', 'MVI_5204.MOV', 'MVI_5205.MOV']
  },
  long: {
    sign: 'LONG',
    title: 'Long',
    category: 'adjectives',
    meaning: 'Measuring a great distance',
    description: 'Draw index finger all the way up forearm from wrist to shoulder.',
    tips: 'Trace line up forearm.',
    takes: ['MVI_5206.MOV', 'MVI_5207.MOV', 'MVI_5208.MOV']
  },
  new: {
    sign: 'NEW',
    title: 'New',
    category: 'adjectives',
    meaning: 'Recently produced or introduced',
    description: 'Scoop dominant curved palm across non-dominant palm.',
    tips: 'Scoop palm across hand.',
    takes: ['MVI_5209.MOV', 'MVI_5210.MOV', 'MVI_5211.MOV']
  },
  old: {
    sign: 'OLD',
    title: 'Old',
    category: 'adjectives',
    meaning: 'Having lived for a long time',
    description: 'Pull C-hand down from chin into a fist like pulling a beard.',
    tips: 'Pull down from chin.',
    takes: ['MVI_5212.MOV', 'MVI_5213.MOV', 'MVI_5214.MOV']
  },
  young: {
    sign: 'YOUNG',
    title: 'Young',
    category: 'adjectives',
    meaning: 'In an early stage of life',
    description: 'Brush fingertips of both hands upward on chest with lively motion.',
    tips: 'Lively upward brush on chest.',
    takes: ['MVI_5215.MOV', 'MVI_5216.MOV', 'MVI_5217.MOV']
  },
  healthy: {
    sign: 'HEALTHY',
    title: 'Healthy',
    category: 'adjectives',
    meaning: 'In good physical condition',
    description: 'Touch clawed hands to shoulders and pull out into strong fists.',
    tips: 'Pull strong fists from chest.',
    takes: ['MVI_5218.MOV', 'MVI_5219.MOV', 'MVI_5220.MOV']
  },
  sick: {
    sign: 'SICK',
    title: 'Sick',
    category: 'adjectives',
    meaning: 'Affected by illness',
    description: 'Touch dominant middle finger to forehead and non-dominant middle finger to stomach.',
    tips: 'Middle finger on forehead & stomach.',
    takes: ['MVI_5221.MOV', 'MVI_5222.MOV', 'MVI_5223.MOV']
  },
  beautiful: {
    sign: 'BEAUTIFUL',
    title: 'Beautiful',
    category: 'adjectives',
    meaning: 'Pleasing to the senses',
    description: 'Circle open hand around face, closing fingertips gracefully at chin.',
    tips: 'Graceful circle around face.',
    takes: ['MVI_5224.MOV', 'MVI_5225.MOV', 'MVI_5226.MOV']
  },
  ugly: {
    sign: 'UGLY',
    title: 'Ugly',
    category: 'adjectives',
    meaning: 'Unpleasant to look at',
    description: 'Cross index finger under nose and pull sideways while curling into hook.',
    tips: 'Pull hooked finger under nose.',
    takes: ['MVI_5227.MOV', 'MVI_5228.MOV', 'MVI_5229.MOV']
  },
  dry: {
    sign: 'DRY',
    title: 'Dry',
    category: 'adjectives',
    meaning: 'Free from moisture',
    description: 'Draw index finger across chin and curl into X-hook.',
    tips: 'Wipe index finger across chin.',
    takes: ['MVI_5230.MOV', 'MVI_5231.MOV', 'MVI_5232.MOV']
  },
  wet: {
    sign: 'WET',
    title: 'Wet',
    category: 'adjectives',
    meaning: 'Covered with liquid',
    description: 'Bring open hands down from chin while closing fingertips into drops.',
    tips: 'Lower hands closing tips like drops.',
    takes: ['MVI_5233.MOV', 'MVI_5234.MOV', 'MVI_5235.MOV']
  },
  flat: {
    sign: 'FLAT',
    title: 'Flat',
    category: 'adjectives',
    meaning: 'Level and smooth surface',
    description: 'Move flat palm horizontally forward.',
    tips: 'Smooth horizontal glide.',
    takes: ['MVI_5236.MOV', 'MVI_5237.MOV', 'MVI_5238.MOV']
  },
  curved: {
    sign: 'CURVED',
    title: 'Curved',
    category: 'adjectives',
    meaning: 'Bent or curved shape',
    description: 'Trace curved arc with C-hand.',
    tips: 'Trace curved arc in air.',
    takes: ['MVI_5239.MOV', 'MVI_5240.MOV', 'MVI_5241.MOV']
  },
  narrow: {
    sign: 'NARROW',
    title: 'Narrow',
    category: 'adjectives',
    meaning: 'Small width',
    description: 'Hold flat palms close together.',
    tips: 'Palms close facing each other.',
    takes: ['MVI_5242.MOV', 'MVI_5243.MOV', 'MVI_5244.MOV']
  },
  wide: {
    sign: 'WIDE',
    title: 'Wide',
    category: 'adjectives',
    meaning: 'Great width',
    description: 'Start palms close and open wide apart.',
    tips: 'Palms move wide apart.',
    takes: ['MVI_5245.MOV', 'MVI_5246.MOV', 'MVI_5247.MOV']
  },
  light: {
    sign: 'LIGHT',
    title: 'Light',
    category: 'adjectives',
    meaning: 'Not heavy / bright',
    description: 'Flick middle fingers upward from chest.',
    tips: 'Flick middle fingers up.',
    takes: ['MVI_5248.MOV', 'MVI_5249.MOV', 'MVI_5250.MOV']
  },
  loose: {
    sign: 'LOOSE',
    title: 'Loose',
    category: 'adjectives',
    meaning: 'Not tight or firmly fixed',
    description: 'Wiggle open relaxed fingers side to side.',
    tips: 'Relaxed wiggling fingers.',
    takes: ['MVI_5251.MOV', 'MVI_5252.MOV', 'MVI_5253.MOV']
  },
  famous: {
    sign: 'FAMOUS',
    title: 'Famous',
    category: 'adjectives',
    meaning: 'Known by many people',
    description: 'Touch index fingers to lips and spiral outward into star shape.',
    tips: 'Index fingers spiral outward from lips.',
    takes: ['MVI_5254.MOV', 'MVI_5255.MOV', 'MVI_5256.MOV']
  },

  // --- ANIMALS (8 signs) ---
  animal: {
    sign: 'ANIMAL',
    title: 'Animal',
    category: 'animals',
    meaning: 'Living organism sign in ISL',
    description: 'Rest fingertips on chest near shoulders and rock elbows back and forth.',
    tips: 'Fingertips on chest, sway elbows.',
    takes: ['MVI_2999.MOV', 'MVI_3000.MOV', 'MVI_3001.MOV']
  },
  bird: {
    sign: 'BIRD',
    title: 'Bird',
    category: 'animals',
    meaning: 'Feathered animal sign in ISL',
    description: 'Place thumb and index finger at mouth like a beak and open/close twice.',
    tips: 'Beak motion at mouth.',
    takes: ['MVI_3025.MOV', 'MVI_3026.MOV', 'MVI_3027.MOV']
  },
  cat: {
    sign: 'CAT',
    title: 'Cat',
    category: 'animals',
    meaning: 'Cat animal sign in ISL',
    description: 'Pinch index finger and thumb near cheek and pull outward tracing whiskers.',
    tips: 'Trace whiskers out from cheeks.',
    takes: ['MVI_3056.MOV', 'MVI_3057.MOV', 'MVI_3058.MOV']
  },
  cow: {
    sign: 'COW',
    title: 'Cow',
    category: 'animals',
    meaning: 'Cow animal sign in ISL',
    description: 'Touch thumb of Y-hand to temple and twist wrist forward like a horn.',
    tips: 'Y-hand horn twist at temple.',
    takes: ['MVI_3082.MOV', 'MVI_3083.MOV', 'MVI_3084.MOV']
  },
  dog: {
    sign: 'DOG',
    title: 'Dog',
    category: 'animals',
    meaning: 'Canine sign in ISL',
    description: 'Pat thigh and snap fingers together twice calling a dog.',
    tips: 'Pat thigh and snap fingers.',
    takes: ['MVI_3107.MOV', 'MVI_3108.MOV', 'MVI_3109.MOV']
  },
  fish: {
    sign: 'FISH',
    title: 'Fish',
    category: 'animals',
    meaning: 'Aquatic animal sign in ISL',
    description: 'Wiggle flat hand forward like a fish swimming through water.',
    tips: 'Swimming hand motion.',
    takes: ['MVI_4167.MOV', 'MVI_4168.MOV', 'MVI_4169.MOV']
  },
  horse: {
    sign: 'HORSE',
    title: 'Horse',
    category: 'animals',
    meaning: 'Horse sign in ISL',
    description: 'Place thumb to temple with index and middle finger pointing up, flapping twice like ears.',
    tips: 'Flap two fingers at temple.',
    takes: ['MVI_4170.MOV', 'MVI_4171.MOV', 'MVI_4172.MOV']
  },
  mouse: {
    sign: 'MOUSE',
    title: 'Mouse',
    category: 'animals',
    meaning: 'Small rodent sign in ISL',
    description: 'Flick index finger across tip of nose twice.',
    tips: 'Flick nose tip twice.',
    takes: ['MVI_4173.MOV', 'MVI_4174.MOV', 'MVI_4175.MOV']
  },

  // --- CLOTHING & ACCESSORIES (10 signs) ---
  clothing: {
    sign: 'CLOTHING',
    title: 'Clothing',
    category: 'clothing',
    meaning: 'Apparel sign in ISL',
    description: 'Brush open thumbs down chest twice.',
    tips: 'Brush thumbs down chest.',
    takes: ['MVI_4176.MOV', 'MVI_4177.MOV', 'MVI_4178.MOV']
  },
  dress: {
    sign: 'DRESS',
    title: 'Dress',
    category: 'clothing',
    meaning: 'One-piece garment sign in ISL',
    description: 'Place flat palms at upper chest and sweep downward expanding past hips.',
    tips: 'Sweep palms down past waist.',
    takes: ['MVI_4179.MOV', 'MVI_4180.MOV', 'MVI_4181.MOV']
  },
  hat: {
    sign: 'HAT',
    title: 'Hat',
    category: 'clothing',
    meaning: 'Headwear sign in ISL',
    description: 'Tap palm against top of head twice.',
    tips: 'Tap top of head.',
    takes: ['MVI_4182.MOV', 'MVI_4183.MOV', 'MVI_4184.MOV']
  },
  pant: {
    sign: 'PANT',
    title: 'Pants',
    category: 'clothing',
    meaning: 'Trousers sign in ISL',
    description: 'Place open palms at waist and pull up along legs.',
    tips: 'Pull palms up along legs.',
    takes: ['MVI_4185.MOV', 'MVI_4186.MOV', 'MVI_4187.MOV']
  },
  pocket: {
    sign: 'POCKET',
    title: 'Pocket',
    category: 'clothing',
    meaning: 'Garment pocket sign in ISL',
    description: 'Slide hand into pocket area at hip twice.',
    tips: 'Slide hand into hip area.',
    takes: ['MVI_4188.MOV', 'MVI_4189.MOV', 'MVI_4190.MOV']
  },
  shirt: {
    sign: 'SHIRT',
    title: 'Shirt',
    category: 'clothing',
    meaning: 'Upper body garment sign in ISL',
    description: 'Pinch shirt cloth near chest with thumb and index finger.',
    tips: 'Pinch shirt cloth at chest.',
    takes: ['MVI_4191.MOV', 'MVI_4192.MOV', 'MVI_4193.MOV']
  },
  shoes: {
    sign: 'SHOES',
    title: 'Shoes',
    category: 'clothing',
    meaning: 'Footwear sign in ISL',
    description: 'Bang two S-fists together at wrists twice.',
    tips: 'Bang fists at wrists.',
    takes: ['MVI_4194.MOV', 'MVI_4195.MOV', 'MVI_4196.MOV']
  },
  skirt: {
    sign: 'SKIRT',
    title: 'Skirt',
    category: 'clothing',
    meaning: 'Lower garment sign in ISL',
    description: 'Place hands at waist and sweep outward to sides.',
    tips: 'Sweep palms out from waist.',
    takes: ['MVI_4197.MOV', 'MVI_4198.MOV', 'MVI_4199.MOV']
  },
  suit: {
    sign: 'SUIT',
    title: 'Suit',
    category: 'clothing',
    meaning: 'Formal suit sign in ISL',
    description: 'Trace jacket lapels down chest from shoulders to waist.',
    tips: 'Trace lapels down chest.',
    takes: ['MVI_4200.MOV', 'MVI_4201.MOV', 'MVI_4202.MOV']
  },
  t_shirt: {
    sign: 'T_SHIRT',
    title: 'T-Shirt',
    category: 'clothing',
    meaning: 'Casual shirt sign in ISL',
    description: 'Pinch sleeve of arm and shirt collar.',
    tips: 'Pinch sleeve and collar.',
    takes: ['MVI_4203.MOV', 'MVI_4204.MOV', 'MVI_4205.MOV']
  },

  // --- PEOPLE & DEAF CULTURE (3 signs) ---
  deaf: {
    sign: 'DEAF',
    title: 'Deaf',
    category: 'people',
    meaning: 'Deaf culture & identity sign in ISL',
    description: 'Touch index finger to ear then to corner of mouth.',
    tips: 'Touch ear then mouth.',
    takes: ['MVI_4206.MOV', 'MVI_4207.MOV', 'MVI_4208.MOV']
  },
  blind: {
    sign: 'BLIND',
    title: 'Blind',
    category: 'people',
    meaning: 'Visually impaired sign in ISL',
    description: 'Point V-hand fingers back towards eyes and pull downward.',
    tips: 'V-hand pull down near eyes.',
    takes: ['MVI_4209.MOV', 'MVI_4210.MOV', 'MVI_4211.MOV']
  },
  female: {
    sign: 'FEMALE',
    title: 'Female / Woman',
    category: 'people',
    meaning: 'Female or woman sign in ISL',
    description: 'Trace thumb down cheek/jawline from ear to chin.',
    tips: 'Trace thumb down jawline.',
    takes: ['MVI_4212.MOV', 'MVI_4213.MOV', 'MVI_4214.MOV']
  }
};

// Helper function to build structured ISL curriculum item from Vivit metadata
export const getVivitCurriculumItems = () => {
  return Object.entries(VIVIT_SIGN_METADATA).map(([key, item]) => {
    const primaryVideo = `/ProcessedData_vivit/${key}/${item.takes[0]}`;
    const allVideoTakes = item.takes.map(filename => `/ProcessedData_vivit/${key}/${filename}`);
    
    return {
      id: `vivit-${key}`,
      key: key,
      category: item.category,
      sign: item.sign,
      title: item.title,
      meaning: item.meaning,
      description: item.description,
      tips: item.tips,
      videoSrc: primaryVideo,
      takes: allVideoTakes,
      isVivitDataset: true,
      pose3d: { thumb: [0.2, 0.4, 0.1], index: [1.4, 0.1, 0.1], middle: [1.4, 0.1, 0.1], ring: [1.4, 0.1, 0.1], pinky: [1.4, 0.1, 0.1] }
    };
  });
};
