# Deployment Guide — Vercel (Maquette / Demo)

## Target URL
`https://feeltohome.vercel.app`

## Prerequisites
- A Vercel account linked to GitHub repository.
- Node.js 20+ runtime on Vercel.

## Configuration Steps

1. **Connect Repository to Vercel**:
   - Import the `feeltohome` GitHub repository into Vercel dashboard.
   - Set **Root Directory** to `frontend`.

2. **Framework Preset**:
   - Select **Next.js**.

3. **Environment Variables**:
   In the Vercel project settings, configure:
   - `NEXT_PUBLIC_API_URL`: URL of the production/staging Django backend (e.g., `https://api.feeltohome.com` or backend server URL).
   - `NEXT_PUBLIC_DEFAULT_LOCALE`: `fr`

4. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next` (default Next.js output)

5. **Deployment Verification**:
   - Verify build step logs complete with status `BUILD_SUCCESS`.
   - Test responsive layout on mobile, tablet, and desktop devices.
   - Check clickable Donayem Tech footer link.
