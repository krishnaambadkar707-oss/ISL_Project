# 🚀 Deployment Guide — Hana AI Companion

This project is fully configured and optimized for instant production deployment to all popular modern web hosting services.

---

## 1. Deploy to Vercel (Recommended — 1-Click)

### Option A: Via Vercel Web Dashboard (Easiest)
1. Push this codebase to a GitHub, GitLab, or Bitbucket repository.
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **"Add New Project"**.
3. Import your repository.
4. Vercel automatically detects **Vite**. The default settings will be:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Vercel will build and deploy your app with custom SSL and global CDN.

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 2. Deploy to Netlify

### Option A: Via Netlify Dashboard
1. Push your code to GitHub/GitLab.
2. Go to [Netlify App](https://app.netlify.com/) and click **"Add new site"** -> **"Import an existing project"**.
3. Select your repository.
4. Netlify will read `netlify.toml` automatically:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **Deploy Site**.

### Option B: Via Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --build --prod
```

---

## 3. Deploy to GitHub Pages

1. In `package.json`, add the `gh-pages` package (optional, or use GitHub Actions):
```bash
npm install --save-dev gh-pages
```
2. Add deploy script to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Run:
```bash
npm run deploy
```

Alternatively, set up a GitHub Action workflow in `.github/workflows/deploy.yml` targeting `dist`.

---

## 4. Deploy to Cloudflare Pages

1. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
2. Click **Create Application** -> **Pages** -> **Connect to Git**.
3. Select your repository.
4. Set Build Configurations:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
5. Click **Save and Deploy**.

---

## 5. Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```
2. Log in & initialize:
```bash
firebase login
firebase init hosting
```
   - **Public directory**: `dist`
   - **Configure as single-page app**: `Yes`
   - **Automatic builds with GitHub**: `Yes` (Optional)

3. Deploy:
```bash
npm run build
firebase deploy
```

---

## 💡 Important Deployment Notes

- **Camera & Microphone Access (HTTPS Required)**:
  Webcam MediaPipe hand-tracking and Web Speech API synthesis require an **HTTPS connection** in production browsers (Vercel, Netlify, GitHub Pages, and Cloudflare Pages automatically provide free HTTPS/SSL).
- **LocalStorage Data Persistence**:
  User progress (streak, mastered signs, quiz scores, custom settings) is stored in the browser's `localStorage` and persists seamlessly across user visits.
