// High-Definition Vector ISL Gesture Illustrations & Sign Cards
// Provides clean, anatomically accurate hand postures and directional cues for all ISL curriculum items

function createSvgDataUri(svgContent) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
}

// Generate a sleek, high-definition SVG card for any ISL sign
export function generateSignCardSvg({
  sign,
  title,
  category = 'alphabet',
  description = '',
  handType = 'one-hand', // 'one-hand' | 'two-hand'
  gestureType = 'fist',  // 'fist' | 'open' | 'pointing' | 'peace' | 'namaste' | 'salute' | etc.
  motionCue = null       // 'circle' | 'forward' | 'upward' | 'tap' | 'wave' | null
}) {
  const isTwoHanded = handType === 'two-hand';
  const categoryColor = category === 'greetings' ? '#ec4899' : category === 'numbers' ? '#f59e0b' : category === 'phrases' ? '#06b6d4' : '#a855f7';
  const badgeLabel = isTwoHanded ? '👐 ISL Two-Handed' : '🖐️ ISL Hand Sign';

  // Render hand gesture graphics based on gestureType
  const handGraphics = renderHandGraphic(gestureType, isTwoHanded);

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070913" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
    <linearGradient id="handGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#818cf8" />
    </linearGradient>
    <linearGradient id="handGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Background Card -->
  <rect width="400" height="400" rx="28" fill="url(#bgGrad)" stroke="#334155" stroke-width="2" />
  
  <!-- Subtle Grid Accent -->
  <circle cx="200" cy="180" r="110" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="6,6" />
  <circle cx="200" cy="180" r="140" fill="none" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,8" />

  <!-- Top Category & Mode Badges -->
  <rect x="24" y="24" width="130" height="26" rx="13" fill="${categoryColor}22" stroke="${categoryColor}88" stroke-width="1.5" />
  <text x="89" y="41" fill="${categoryColor}" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="0.5">${badgeLabel}</text>

  <!-- Mascot Tag -->
  <text x="376" y="41" fill="#94a3b8" font-family="Outfit, Inter, sans-serif" font-size="11" font-weight="600" text-anchor="end">Hana ISL Guide 🌸</text>

  <!-- Central Hand Graphic -->
  <g transform="translate(0, -10)" filter="url(#neonGlow)">
    ${handGraphics}
  </g>

  <!-- Motion Cue (if any) -->
  ${renderMotionCue(motionCue)}

  <!-- Bottom Information Bar -->
  <rect x="18" y="296" width="364" height="86" rx="20" fill="#030712dd" stroke="#334155" stroke-width="1.5" />
  
  <!-- Large Sign Title -->
  <text x="36" y="338" fill="#f8fafc" font-family="Outfit, Inter, sans-serif" font-size="28" font-weight="900">${escapeXml(sign)}</text>
  <text x="36" y="364" fill="#94a3b8" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="500">${escapeXml(title)}</text>

  <!-- Category Tag on right -->
  <rect x="260" y="324" width="106" height="32" rx="16" fill="${categoryColor}25" stroke="${categoryColor}" stroke-width="1" />
  <text x="313" y="345" fill="#f8fafc" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="0.5">${category.toUpperCase()}</text>
</svg>
`;

  return createSvgDataUri(svg);
}

function escapeXml(unsafe) {
  return (unsafe || '').replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function renderMotionCue(cue) {
  if (!cue) return '';
  if (cue === 'circle') {
    return `
      <!-- Circular motion arrow -->
      <path d="M 160 170 A 45 45 0 1 1 240 190" fill="none" stroke="#f59e0b" stroke-width="3.5" stroke-dasharray="5,4" />
      <polygon points="240,185 248,198 234,198" fill="#f59e0b" />
      <text x="200" y="235" fill="#f59e0b" font-family="Inter, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Circular motion</text>
    `;
  }
  if (cue === 'forward') {
    return `
      <!-- Forward motion arrow -->
      <path d="M 150 180 L 250 180" fill="none" stroke="#38bdf8" stroke-width="3.5" />
      <polygon points="250,174 262,180 250,186" fill="#38bdf8" />
      <text x="200" y="205" fill="#38bdf8" font-family="Inter, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Move forward</text>
    `;
  }
  if (cue === 'upward') {
    return `
      <!-- Upward motion arrow -->
      <path d="M 200 230 L 200 135" fill="none" stroke="#ec4899" stroke-width="3.5" />
      <polygon points="194,135 200,123 206,135" fill="#ec4899" />
      <text x="200" y="248" fill="#ec4899" font-family="Inter, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Raise upward</text>
    `;
  }
  if (cue === 'salute') {
    return `
      <!-- Salute outward arrow -->
      <path d="M 170 140 Q 220 120 260 135" fill="none" stroke="#38bdf8" stroke-width="3.5" />
      <polygon points="255,127 268,138 257,143" fill="#38bdf8" />
      <text x="215" y="112" fill="#38bdf8" font-family="Inter, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Salute outward</text>
    `;
  }
  return '';
}

function renderHandGraphic(type, isTwoHanded) {
  if (type === 'namaste') {
    // Both open palms pressed together vertically in prayer pose
    return `
      <g>
        <!-- Left Palm -->
        <path d="M 185 240 L 185 140 Q 185 120 195 110 Q 198 120 198 240 Z" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        <!-- Right Palm -->
        <path d="M 215 240 L 215 140 Q 215 120 205 110 Q 202 120 202 240 Z" fill="url(#handGrad2)" stroke="#ffffff" stroke-width="2" />
        <!-- Palm Base -->
        <ellipse cx="200" cy="242" rx="26" ry="12" fill="#38bdf8" />
        <circle cx="200" cy="110" r="5" fill="#ffffff" />
      </g>
    `;
  }

  if (type === 'help') {
    // Thumbs-up fist resting on flat palm
    return `
      <g>
        <!-- Horizontal base open hand -->
        <rect x="130" y="220" width="140" height="22" rx="11" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        <!-- Vertical fist resting on top -->
        <rect x="175" y="150" width="50" height="65" rx="16" fill="url(#handGrad2)" stroke="#ffffff" stroke-width="2" />
        <!-- Upright Thumb -->
        <rect x="172" y="105" width="22" height="48" rx="11" fill="url(#handGrad2)" stroke="#ffffff" stroke-width="2" />
      </g>
    `;
  }

  if (type === 'friend') {
    // Both index fingers hooked together
    return `
      <g>
        <!-- Left Hand Hook -->
        <path d="M 150 210 L 175 160 Q 190 145 200 160 L 185 180" fill="none" stroke="url(#handGrad)" stroke-width="18" stroke-linecap="round" />
        <!-- Right Hand Hook Interlinked -->
        <path d="M 250 210 L 225 160 Q 210 145 200 160 L 215 180" fill="none" stroke="url(#handGrad2)" stroke-width="18" stroke-linecap="round" />
      </g>
    `;
  }

  if (type === 'iloveyou') {
    // Thumb, index, pinky extended; middle, ring folded
    return `
      <g transform="translate(200, 190)">
        <!-- Palm -->
        <rect x="-35" y="-10" width="70" height="75" rx="18" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        <!-- Thumb -->
        <path d="M -30 25 L -65 0" stroke="url(#handGrad)" stroke-width="16" stroke-linecap="round" />
        <!-- Index Finger -->
        <rect x="-30" y="-85" width="16" height="78" rx="8" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        <!-- Middle Finger (folded) -->
        <rect x="-10" y="-20" width="16" height="25" rx="8" fill="#1e293b" stroke="#ffffff" stroke-width="2" />
        <!-- Ring Finger (folded) -->
        <rect x="10" y="-20" width="16" height="25" rx="8" fill="#1e293b" stroke="#ffffff" stroke-width="2" />
        <!-- Pinky Finger -->
        <rect x="25" y="-75" width="14" height="68" rx="7" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
      </g>
    `;
  }

  if (type === 'salute' || type === 'open') {
    // Flat open hand
    return `
      <g transform="translate(200, 190)">
        <!-- Palm -->
        <rect x="-35" y="-10" width="70" height="75" rx="18" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        <!-- Thumb -->
        <path d="M -32 20 L -55 0" stroke="url(#handGrad)" stroke-width="15" stroke-linecap="round" />
        <!-- 4 Upright Fingers -->
        <rect x="-32" y="-85" width="15" height="78" rx="7.5" fill="url(#handGrad)" stroke="#ffffff" stroke-width="1.8" />
        <rect x="-14" y="-92" width="15" height="85" rx="7.5" fill="url(#handGrad)" stroke="#ffffff" stroke-width="1.8" />
        <rect x="4" y="-88" width="15" height="81" rx="7.5" fill="url(#handGrad)" stroke="#ffffff" stroke-width="1.8" />
        <rect x="22" y="-75" width="14" height="68" rx="7" fill="url(#handGrad)" stroke="#ffffff" stroke-width="1.8" />
      </g>
    `;
  }

  if (type === 'pointing' || type === 'one') {
    // Index finger pointing up
    return `
      <g transform="translate(200, 195)">
        <!-- Palm / Fist -->
        <rect x="-32" y="-10" width="64" height="70" rx="18" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        <!-- Thumb over fingers -->
        <rect x="-30" y="10" width="40" height="18" rx="9" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        <!-- Index Finger extended up -->
        <rect x="-24" y="-90" width="16" height="85" rx="8" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        <!-- Curled other fingers -->
        <rect x="-5" y="-15" width="14" height="20" rx="7" fill="#1e293b" stroke="#ffffff" stroke-width="1.5" />
        <rect x="12" y="-15" width="14" height="20" rx="7" fill="#1e293b" stroke="#ffffff" stroke-width="1.5" />
      </g>
    `;
  }

  if (type === 'peace' || type === 'two') {
    // Two fingers (index & middle) upright in V
    return `
      <g transform="translate(200, 195)">
        <rect x="-32" y="-10" width="64" height="70" rx="18" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        <rect x="-30" y="10" width="40" height="18" rx="9" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        <!-- Index Finger tilted left -->
        <g transform="rotate(-12, -18, -10)">
          <rect x="-24" y="-85" width="15" height="80" rx="7.5" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        </g>
        <!-- Middle Finger tilted right -->
        <g transform="rotate(12, 10, -10)">
          <rect x="2" y="-85" width="15" height="80" rx="7.5" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        </g>
      </g>
    `;
  }

  if (type === 'three') {
    // Thumb, index, middle extended
    return `
      <g transform="translate(200, 195)">
        <rect x="-32" y="-10" width="64" height="70" rx="18" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        <!-- Thumb out -->
        <path d="M -30 20 L -55 0" stroke="url(#handGrad)" stroke-width="15" stroke-linecap="round" />
        <!-- Index & Middle extended -->
        <rect x="-20" y="-85" width="15" height="78" rx="7.5" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        <rect x="2" y="-85" width="15" height="78" rx="7.5" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
      </g>
    `;
  }

  if (type === 'four') {
    // Four fingers upright, thumb tucked across
    return `
      <g transform="translate(200, 195)">
        <rect x="-35" y="-10" width="70" height="70" rx="18" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
        <rect x="-30" y="15" width="45" height="18" rx="9" fill="#1e293b" stroke="#ffffff" stroke-width="2" />
        <rect x="-32" y="-82" width="14" height="75" rx="7" fill="url(#handGrad)" stroke="#ffffff" stroke-width="1.8" />
        <rect x="-14" y="-88" width="14" height="81" rx="7" fill="url(#handGrad)" stroke="#ffffff" stroke-width="1.8" />
        <rect x="4" y="-85" width="14" height="78" rx="7" fill="url(#handGrad)" stroke="#ffffff" stroke-width="1.8" />
        <rect x="22" y="-76" width="13" height="69" rx="6.5" fill="url(#handGrad)" stroke="#ffffff" stroke-width="1.8" />
      </g>
    `;
  }

  if (type === 'c_shape') {
    // Curved C shape
    return `
      <g transform="translate(200, 180)">
        <path d="M 30 -50 C -40 -60 -40 60 30 50" fill="none" stroke="url(#handGrad)" stroke-width="32" stroke-linecap="round" />
      </g>
    `;
  }

  // Default: Fist (Letter A, S, E, etc.)
  return `
    <g transform="translate(200, 195)">
      <!-- Palm Fist -->
      <rect x="-34" y="-18" width="68" height="75" rx="20" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
      <!-- Finger Knuckles -->
      <rect x="-30" y="-30" width="13" height="24" rx="6.5" fill="#1e293b" stroke="#ffffff" stroke-width="1.5" />
      <rect x="-13" y="-34" width="13" height="28" rx="6.5" fill="#1e293b" stroke="#ffffff" stroke-width="1.5" />
      <rect x="4" y="-32" width="13" height="26" rx="6.5" fill="#1e293b" stroke="#ffffff" stroke-width="1.5" />
      <rect x="20" y="-24" width="12" height="20" rx="6" fill="#1e293b" stroke="#ffffff" stroke-width="1.5" />
      <!-- Thumb straight up against index -->
      <rect x="-42" y="-38" width="18" height="58" rx="9" fill="url(#handGrad)" stroke="#ffffff" stroke-width="2" />
    </g>
  `;
}
