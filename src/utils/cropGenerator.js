// Utility to slice master sign sheets (gesture.jpeg & A-Z.jpeg) into individual high-definition sign images
// and auto-persist cropped panels via Vite dev server middleware (/api/save-crop).

const CROP_CACHE = new Map();

// Grid coordinate definitions (4 cols x 6 rows)
export const GESTURE_SHEET_GRID = {
  '3': { col: 2, row: 0, filename: '3.jpeg' },
  '4': { col: 3, row: 0, filename: '4.jpeg' },
  '5': { col: 0, row: 1, filename: '5.jpeg' },
  '6': { col: 1, row: 1, filename: '6.jpeg' },
  '7': { col: 2, row: 1, filename: '7.jpeg' },
  '8': { col: 3, row: 1, filename: '8.jpeg' }
};

export const ALPHABET_SHEET_GRID = {
  'I': { col: 0, row: 2, filename: 'I.jpeg' },
  'J': { col: 0, row: 2, filename: 'J.jpeg' },
  'U': { col: 2, row: 4, filename: 'U.jpeg' },
  'Y': { col: 2, row: 5, filename: 'Y.jpeg' }
};

let isCroppingInitialized = false;

export function initAutoCrop() {
  if (typeof window === 'undefined' || isCroppingInitialized) return;
  isCroppingInitialized = true;

  // Process gesture sheet (Numbers 3-8)
  cropSheet('/signs/gesture.jpeg', GESTURE_SHEET_GRID);

  // Process alphabet sheet (I, J, U, Y)
  cropSheet('/signs/A-Z.jpeg', ALPHABET_SHEET_GRID);
}

function cropSheet(srcUrl, gridMap) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const totalCols = 4;
    const totalRows = 6;
    const cellW = img.naturalWidth / totalCols;
    const cellH = img.naturalHeight / totalRows;

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(cellW);
    canvas.height = Math.round(cellH);
    const ctx = canvas.getContext('2d');

    Object.entries(gridMap).forEach(([key, spec]) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        spec.col * cellW,
        spec.row * cellH,
        cellW,
        cellH,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      CROP_CACHE.set(key, dataUrl);
      CROP_CACHE.set(key.toLowerCase(), dataUrl);
      CROP_CACHE.set(`isl-${key.toLowerCase()}`, dataUrl);

      // Save to localStorage for instant cached retrieval
      try {
        localStorage.setItem(`isl_crop_${key}`, dataUrl);
      } catch (e) {
        // storage quota fallback
      }

      // Persist to server disk via Vite middleware
      fetch('/api/save-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: spec.filename, base64: dataUrl })
      }).catch(() => {
        // ignore offline / preview mode errors
      });
    });

    window.dispatchEvent(new CustomEvent('isl-crops-updated'));
  };

  img.src = srcUrl;
}

export function getCachedCrop(key) {
  if (!key) return null;
  const upper = String(key).toUpperCase();
  if (CROP_CACHE.has(upper)) return CROP_CACHE.get(upper);

  // Check localStorage
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(`isl_crop_${upper}`);
      if (stored) {
        CROP_CACHE.set(upper, stored);
        return stored;
      }
    } catch (e) {}
  }
  return null;
}

// Instant synchronous photographic crop helper using SVG image viewBox clipping
export function getSheetCropSvg(sheetUrl, col, row, totalCols = 4, totalRows = 6) {
  const x = (col / totalCols) * 100;
  const y = (row / totalRows) * 100;
  const w = (1 / totalCols) * 100;
  const h = (1 / totalRows) * 100;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}" preserveAspectRatio="xMidYMid slice" width="100%" height="100%"><image href="${sheetUrl}" x="0" y="0" width="100" height="100" preserveAspectRatio="none"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
