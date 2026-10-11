import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sync generated AI character sign images from brain artifact directory into images and public/signs
try {
  const brainDir = 'C:/Users/krish/.gemini/antigravity-ide/brain/5a3a41a1-6d80-49a4-b295-48da4bd56713';
  const publicSignsDir = path.resolve(__dirname, 'public/signs');
  const imagesDir = path.resolve(__dirname, 'images');

  if (!fs.existsSync(publicSignsDir)) {
    fs.mkdirSync(publicSignsDir, { recursive: true });
  }
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  if (fs.existsSync(brainDir)) {
    const files = fs.readdirSync(brainDir);
    for (const f of files) {
      if (f.endsWith('.png') || f.endsWith('.jpeg') || f.endsWith('.jpg')) {
        const srcFile = path.join(brainDir, f);
        fs.copyFileSync(srcFile, path.join(publicSignsDir, f));
        fs.copyFileSync(srcFile, path.join(imagesDir, f));
        
        // Also create clean alias names without timestamps
        if (f.startsWith('isl_namaste_sign')) {
          fs.copyFileSync(srcFile, path.join(publicSignsDir, 'namaste.png'));
          fs.copyFileSync(srcFile, path.join(imagesDir, 'Namaste.png'));
        } else if (f.startsWith('isl_hello_sign')) {
          fs.copyFileSync(srcFile, path.join(publicSignsDir, 'hello.png'));
          fs.copyFileSync(srcFile, path.join(imagesDir, 'Hello_HD.png'));
        } else if (f.startsWith('isl_thankyou_sign')) {
          fs.copyFileSync(srcFile, path.join(publicSignsDir, 'thankyou.png'));
          fs.copyFileSync(srcFile, path.join(imagesDir, 'ThankYou_HD.png'));
        } else if (f.startsWith('isl_iloveyou_sign')) {
          fs.copyFileSync(srcFile, path.join(publicSignsDir, 'iloveyou.png'));
          fs.copyFileSync(srcFile, path.join(imagesDir, 'ILoveYou_HD.png'));
        } else if (f.startsWith('isl_help_sign')) {
          fs.copyFileSync(srcFile, path.join(publicSignsDir, 'help.png'));
          fs.copyFileSync(srcFile, path.join(imagesDir, 'Help_HD.png'));
        } else if (f.startsWith('isl_friend_sign')) {
          fs.copyFileSync(srcFile, path.join(publicSignsDir, 'friend.png'));
          fs.copyFileSync(srcFile, path.join(imagesDir, 'Friend_HD.png'));
        } else if (f.startsWith('isl_letter_s')) {
          fs.copyFileSync(srcFile, path.join(publicSignsDir, 's.png'));
          fs.copyFileSync(srcFile, path.join(imagesDir, 'S.png'));
        } else if (f.startsWith('isl_number_9')) {
          fs.copyFileSync(srcFile, path.join(publicSignsDir, '9.png'));
          fs.copyFileSync(srcFile, path.join(imagesDir, '9.png'));
        } else if (f.startsWith('isl_number_10')) {
          fs.copyFileSync(srcFile, path.join(publicSignsDir, '10.png'));
          fs.copyFileSync(srcFile, path.join(imagesDir, '10.png'));
        } else if (f.startsWith('isl_number_1_')) {
          fs.copyFileSync(srcFile, path.join(publicSignsDir, '1.png'));
          fs.copyFileSync(srcFile, path.join(imagesDir, '1.png'));
        } else if (f.startsWith('isl_number_2_')) {
          fs.copyFileSync(srcFile, path.join(publicSignsDir, '2.png'));
          fs.copyFileSync(srcFile, path.join(imagesDir, '2.png'));
        }
      }
    }
  }

  // Read exact dimensions of master sheets
  function getJpegDimensions(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const buf = fs.readFileSync(filePath);
    let offset = 2;
    while (offset < buf.length) {
      if (buf[offset] !== 0xFF) break;
      const marker = buf[offset + 1];
      if (marker === 0xC0 || marker === 0xC2) {
        return {
          height: buf.readUInt16BE(offset + 5),
          width: buf.readUInt16BE(offset + 7)
        };
      }
      const len = buf.readUInt16BE(offset + 2);
      offset += 2 + len;
    }
    return null;
  }

  const gestureDim = getJpegDimensions(path.join(__dirname, 'gesture.jpeg'));
  const azDim = getJpegDimensions(path.join(__dirname, 'A-Z.jpeg'));

  const dimData = {
    gesture: gestureDim || { width: 853, height: 1280 },
    az: azDim || { width: 853, height: 1280 }
  };
  const sheetDimDir = path.resolve(__dirname, 'src/data');
  if (!fs.existsSync(sheetDimDir)) {
    fs.mkdirSync(sheetDimDir, { recursive: true });
  }
  fs.writeFileSync(path.join(sheetDimDir, 'sheetDimensions.json'), JSON.stringify(dimData, null, 2));

  // Copy master sheets to public/ for web access
  if (fs.existsSync(path.join(__dirname, 'gesture.jpeg'))) {
    fs.copyFileSync(path.join(__dirname, 'gesture.jpeg'), path.join(publicSignsDir, 'gesture.jpeg'));
    fs.copyFileSync(path.join(__dirname, 'gesture.jpeg'), path.join(__dirname, 'public/gesture.jpeg'));
  }
  if (fs.existsSync(path.join(__dirname, 'A-Z.jpeg'))) {
    fs.copyFileSync(path.join(__dirname, 'A-Z.jpeg'), path.join(publicSignsDir, 'A-Z.jpeg'));
    fs.copyFileSync(path.join(__dirname, 'A-Z.jpeg'), path.join(__dirname, 'public/A-Z.jpeg'));
  }

  // Copy all existing images to public/signs
  if (fs.existsSync(imagesDir)) {
    const imgFiles = fs.readdirSync(imagesDir);
    for (const f of imgFiles) {
      if (f.endsWith('.png') || f.endsWith('.jpeg') || f.endsWith('.jpg')) {
        const src = path.join(imagesDir, f);
        const dest = path.join(publicSignsDir, f);
        if (!fs.existsSync(dest)) {
          fs.copyFileSync(src, dest);
        }
      }
    }
  }
} catch (e) {
  console.warn('Asset sync notice:', e.message);
}

// Middleware to save browser-cropped high-res JPEG panels directly to disk
function saveCropPlugin() {
  return {
    name: 'save-crop-middleware',
    configureServer(server) {
      server.middlewares.use('/api/save-crop', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const { filename, base64 } = JSON.parse(body);
            if (!filename || !base64) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Missing filename or base64' }));
              return;
            }
            const data = base64.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(data, 'base64');
            const imagesDir = path.resolve(__dirname, 'images');
            const publicSignsDir = path.resolve(__dirname, 'public/signs');
            fs.writeFileSync(path.join(imagesDir, filename), buffer);
            fs.writeFileSync(path.join(publicSignsDir, filename), buffer);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, file: filename }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), saveCropPlugin()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-utils': ['canvas-confetti'],
          'vendor-three': ['three']
        }
      }
    }
  }
});
