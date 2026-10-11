---
name: vercel
description: Deploy, inspect, configure, and troubleshoot applications on Vercel. Use when deploying projects, managing environment variables, configuring vercel.json, debugging Vercel build errors, or inspecting deployment logs.
---

# Vercel Deployment & Platform Skill

This skill guides operations for deploying, inspecting, and managing projects on the Vercel platform.

## 1. Project Deployment Workflows

### Preview Deployment
To create a preview deployment for testing changes:
```bash
vercel
```
Options:
- `--yes`: Skip confirmation prompts
- `--debug`: Enable verbose debug logging

### Production Deployment
To deploy directly to production:
```bash
vercel --prod
```
Options:
- `--yes`: Automatically accept default project settings
- `--force`: Force a fresh build without build cache

## 2. Inspecting Deployments & Build Logs

When a build fails or you need to inspect runtime / build logs:
```bash
vercel inspect <deployment-url-or-id> --logs
```
Example:
```bash
vercel inspect dpl_447UZanwbFMsgTKF2G4WEXezJBps --logs
```

## 3. Environment Variables

Manage environment variables securely:
- List environment variables: `vercel env ls`
- Add an environment variable: `vercel env add <NAME> <production|preview|development>`
- Pull environment variables to local `.env`: `vercel env pull .env.local`

## 4. Project Configuration (`vercel.json`)

Standard configuration for Vite Single Page Applications (SPAs):
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

## 5. Troubleshooting Build Failures
1. Check ESBuild / Vite config syntax errors in `vite.config.js` or `package.json`.
2. Ensure build script is `"node node_modules/vite/bin/vite.js build"` or `"vite build"`.
3. Verify that `dist` directory is produced as expected.
4. Check that large binary assets are placed in `public/` or imported properly with relative paths.
