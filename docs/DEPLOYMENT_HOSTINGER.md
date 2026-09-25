# Audit et Guide de Déploiement — Hostinger (Production Final)

## Contexte
La version finale de **FeelToHome** (`feeltohome.com`) sera hébergée sur le compte Hostinger de l'entreprise **Donayem Tech**.

---

## 1. Audit des Options d'Hébergement Hostinger

Hostinger propose plusieurs formules d'hébergement. L'architecture de FeelToHome s'adapte selon le type exact d'hébergement disponible :

### Option A : Hostinger VPS (Recommandé)
- **Compatibilité** : 100% compatible.
- **Stack** :
  - **Backend** : Django exécuté via Gunicorn / Uvicorn sous supervisor ou systemd.
  - **Frontend** : Next.js exécuté via Node.js + PM2.
  - **Base de données** : PostgreSQL local ou géré.
  - **Reverse Proxy** : NGINX avec certificats SSL gratuits via Let's Encrypt / Certbot.
  - **Fichiers média** : Stockage local `/var/www/feeltohome/media/` ou Amazon S3 / Cloudflare R2 / DigitalOcean Spaces pour les photos des hébergements.

### Option B : Hostinger Shared Hosting (Hébergement Mutualisé hPanel)
- **Compatibilité** : Nécessite une adaptation spécifique.
- **Contraintes** :
  - **Backend** : Nécessite l'application "Python Setup" dans hPanel (WSGI via Passenger).
  - **Frontend** :
    - Soit exécution Node.js via Setup Node.js (selon offre hPanel).
    - Soit génération d'un export statique Next.js (`output: 'export'`) servi directement par Apache.
  - **Base de données** : PostgreSQL (si disponible sur l'offre) ou MySQL.
  - **Fichiers média** : Dossier `media/` dans le `public_html`.

---

## 2. Informations Requises Avant Déploiement Final

Pour valider le déploiement sur le compte Donayem Tech, l'équipe technique doit fournir :
1. **Type d'offre Hostinger** (VPS KVM vs Cloud Hosting vs Shared Web Hosting Premium/Business).
2. **Accès SSH / hPanel**.
3. **Moteur de base de données disponible** (PostgreSQL ou MySQL/MariaDB).
4. **Nom de domaine** : Configuration DNS pour `feeltohome.com` (Enregistrements `A` et `CNAME`).

---

## 3. Liste de Contrôle Pré-Déploiement

- [ ] Clé secrète Django générée de manière sécurisée (`DJANGO_SECRET_KEY`).
- [ ] Variables d'environnement configurées dans le serveur production.
- [ ] Migrations Django exécutées sur la base PostgreSQL production.
- [ ] Dynamic CORS configuré pour autoriser uniquement `https://feeltohome.com` et `https://www.feeltohome.com`.
- [ ] `DEBUG = False` configuré dans Django settings.
- [ ] HTTPS / SSL activé.
- [ ] Stockage media configuré pour les photos des logements.
