# 🚀 Deployment Guide — Hana AI Companion

This project is fully configured and optimized for instant production deployment to Vercel, Netlify, GitHub Pages, Cloudflare Pages, and Firebase Hosting.

---

## 🛠️ Vercel "Permission Denied" Resolution (Applied)

If you saw `sh: line 1: /vercel/path0/node_modules/.bin/vite: Permission denied` during deployment:
- **Fixed permanently** in `package.json`:
  - `"build"` now directly calls `node node_modules/vite/bin/vite.js build`.
  - Added `"postinstall": "chmod +x node_modules/.bin/* 2>/dev/null || true"` for Linux permission compatibility.

---

## 1. Deploy to Vercel (Recommended — 1-Click)

### Option A: Via Vercel Web Dashboard (Easiest)
1. Push your updated code to GitHub, GitLab, or Bitbucket:
   ```bash
   git add .
   git commit -m "Fix Vercel build permissions & optimize production deployment"
   git push
   ```
2. Open your project on [Vercel Dashboard](https://vercel.com).
3. Click **Redeploy** (or Vercel will automatically trigger a new deployment upon git push).

---

## 2. Deploy to Netlify

1. Push your code to GitHub.
2. Netlify reads `netlify.toml` automatically:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

---

## 💡 Important Deployment Notes

- **HTTPS Required for Camera & Speech**:
  Webcam MediaPipe hand-tracking and Web Speech API synthesis require an **HTTPS connection** in production browsers (Vercel, Netlify, GitHub Pages, and Cloudflare Pages automatically provide free HTTPS/SSL).
- **LocalStorage Data Persistence**:
  User progress (streak, mastered signs, quiz scores, custom settings) is stored in the browser's `localStorage` and persists seamlessly across user visits.
