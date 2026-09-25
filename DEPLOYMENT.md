# 🚀 Guide de Déploiement Gratuit (FeelToHome)

Ce guide vous explique comment déployer l'application **FeelToHome** 100% gratuitement avec **Render.com** (Backend Django) et **Vercel** (Frontend Next.js).

---

## 1. Pré-requis
1. Le code doit être poussé sur votre dépôt GitHub (ou celui de votre entreprise).

---

## 2. Déploiement du Backend (Django) sur Render (Gratuit)

1. Connectez-vous sur [dashboard.render.com](https://dashboard.render.com/) avec votre compte GitHub.
2. Cliquez sur **New +** ➔ **Web Service**.
3. Sélectionnez votre dépôt GitHub `feeltohome`.
4. Remplissez les informations suivantes :
   - **Name** : `feeltohome-backend`
   - **Root Directory** : `backend`
   - **Environment** : `Python 3`
   - **Region** : Frankfurt (ou celle de votre choix)
   - **Branch** : `phase1` (ou `master`)
   - **Build Command** : `./build.sh`
   - **Start Command** : `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
   - **Instance Type** : `Free`
5. Dans la section **Advanced** / **Environment Variables**, ajoutez :
   - `PYTHON_VERSION` : `3.12.0`
   - `DEBUG` : `False`
   - `SECRET_KEY` : *(générez une clé aléatoire)*
   - `ALLOWED_HOSTS` : `*`
   - `CORS_ALLOW_ALL_ORIGINS` : `True`
6. Cliquez sur **Create Web Service**.
7. Une fois le déploiement terminé, copiez l'URL fournie par Render (ex: `https://feeltohome-backend.onrender.com`).

---

## 3. Déploiement du Frontend (Next.js) sur Vercel (Gratuit)

1. Connectez-vous sur [vercel.com](https://vercel.com/) avec votre compte GitHub.
2. Cliquez sur **Add New...** ➔ **Project**.
3. Importez votre dépôt GitHub `feeltohome`.
4. Dans les paramètres du projet :
   - **Framework Preset** : Next.js
   - **Root Directory** : Cliquez sur *Edit* et sélectionnez `frontend`.
5. Dans la section **Environment Variables**, ajoutez :
   - **Key** : `NEXT_PUBLIC_API_URL`
   - **Value** : `https://feeltohome-backend.onrender.com` *(remplacez par l'URL de votre backend Render obtenu à l'étape 2)*
6. Cliquez sur **Deploy**.

🎉 Votre site FeelToHome est en ligne et connecté !
