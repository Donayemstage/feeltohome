# 🏠 FeelToHome — Platforme de Réservation de Logements au Cameroun

> **Slogan** : *« Votre logement, votre sensation de chez vous »*  
> **Domaine de production cible** : [feeltohome.com](https://feeltohome.com)  
> **Déploiement Démo / Maquette** : [feeltohome.vercel.app](https://feeltohome.vercel.app)

---

## 📋 1. Présentation du Projet

**FeelToHome** est une plateforme web moderne de réservation de logements au Cameroun inspirée fonctionnellement des meilleures expériences de réservation mondiales (Booking.com, Airbnb), spécialement adaptée au marché camerounais.

La plateforme prend en charge **6 types de logements obligatoires** :
1. **Hôtel**
2. **Appartement meublé**
3. **Studio**
4. **Résidence**
5. **Villa**
6. **Auberge**

---

## 🛠️ 2. Architecture Technique (Phase 0)

L'application repose sur une architecture découplée avec autorité métier strictly réservée au backend :

```
+-------------------------------------------------------------+
|                      FEELTOHOME                             |
+-------------------------------------------------------------+
|                                                             |
|   Frontend (Next.js 15+ / React 19 / Tailwind CSS / TS)     |
|   - Interface responsive (Mobile 375px, Tablette, Desktop)  |
|   - Support multilingue (FR par défaut, EN, DE)              |
|   - Composants réutilisables, Header & Footer global         |
|   - Cartes logements avec données de démonstration           |
|                                                             |
+------------------------------+------------------------------+
                               | REST API (JSON)
+------------------------------v------------------------------+
|   Backend (Python 3.14 / Django 5.1+ / DRF 3.15+)            |
|   - Application accounts : Custom User (Client/Host/Admin)   |
|   - Application logements : Logement, Photo, Equipement      |
|   - Application reservations : Reservation stub              |
|   - Base de données : SQLite (Dev local) / PostgreSQL (Prod) |
|                                                             |
+-------------------------------------------------------------+
```

---

## 📁 3. Structure du Projet

```text
feeltohome/
├── frontend/                  # Application Next.js Frontend
│   ├── app/                   # Next.js App Router (layout, page.tsx, globals.css)
│   ├── components/            # Header, Hero, ListingCard, Footer, LanguageContext
│   ├── lib/                   # Dictionnaire d'i18n (FR, EN, DE)
│   ├── package.json
│   ├── tailwind.config.ts
│   └── .env.example
│
├── backend/                   # Application Django REST Backend
│   ├── config/                # Configuration globale Django (settings, urls, wsgi)
│   ├── accounts/              # Modèle utilisateur personnalisé (roles: CLIENT, PROPRIETAIRE, ADMIN)
│   ├── logements/             # Modèles Logement, PhotoLogement, Equipement & API Endpoints
│   ├── reservations/          # Modèle Réservation
│   ├── avis/                  # Modèle Avis (stub)
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── docs/                      # Guides de déploiement
│   ├── DEPLOYMENT_VERCEL.md    # Procédure Vercel (feeltohome.vercel.app)
│   └── DEPLOYMENT_HOSTINGER.md # Audit technique Hostinger VPS & Mutualisé
│
├── .gitignore                 # Exclusion stricte des secrets (.env), caches et venv
└── README.md                  # Documentation officielle du projet
```

---

## ⚡ 4. Guide d'Installation et Lancement Local

### Prérequis
- **Node.js** >= v20.0 (détecté: v24.14.0)
- **npm** >= v10.0 (détecté: 11.9.0)
- **Python** >= 3.10 (détecté: 3.14.3)
- **Git** (détecté: 2.54.0)

---

### A. Lancement du Backend Django

1. Naviguer dans le dossier `backend` :
   ```bash
   cd backend
   ```

2. Créer et activer l'environnement virtuel Python :
   ```bash
   # Windows PowerShell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. Installer les dépendances Python :
   ```bash
   pip install -r requirements.txt
   ```

4. Appliquer les migrations de base de données :
   ```bash
   python manage.py migrate
   ```

5. Charger les données de démonstration (Logements & Équipements de démo) :
   ```bash
   python manage.py seed_demo
   ```

6. Exécuter la vérification système et les tests unitaires backend :
   ```bash
   python manage.py check
   python manage.py test accounts.tests logements.tests
   ```

7. Démarrer le serveur de développement backend (port 8000) :
   ```bash
   python manage.py runserver 8000
   ```
   *L'API de santé est accessible sur : `http://127.0.0.1:8000/api/health/`*

---

### B. Lancement du Frontend Next.js

1. Naviguer dans le dossier `frontend` :
   ```bash
   cd frontend
   ```

2. Installer les dépendances Node :
   ```bash
   npm install
   ```

3. Exécuter le build de production frontend pour vérifier l'absence d'erreurs :
   ```bash
   npm run build
   ```

4. Démarrer le serveur de développement frontend (port 3000) :
   ```bash
   npm run dev
   ```
   *L'interface web est accessible sur : `http://localhost:3000`*

---

## 🔐 5. Variables d'Environnement

### Backend (`backend/.env`)
```env
SECRET_KEY=votre_cle_secrete_django
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
DATABASE_URL=sqlite:///db.sqlite3
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_LOCALE=fr
```

> [!CAUTION]
> Les fichiers `.env` réels contenant des secrets sont strictement ignorés par Git via `.gitignore`.

---

## 🌐 6. Déploiement

- **Vercel (Maquette)** : Configuré pour le frontend Next.js (`feeltohome.vercel.app`). Voir [docs/DEPLOYMENT_VERCEL.md](docs/DEPLOYMENT_VERCEL.md).
- **Hostinger (Production)** : Audit technique préparé pour Hostinger VPS / Mutualisé cPanel Donayem Tech. Voir [docs/DEPLOYMENT_HOSTINGER.md](docs/DEPLOYMENT_HOSTINGER.md).

---

## 🏢 7. Signature Footer Obligatoire
Conformément aux exigences du projet, le footer global intègre la signature obligatoire :  
**Réalisé par [Donayem Tech](https://www.donayemtech.com/fr)** (`target="_blank" rel="noopener noreferrer"`).

---

## 🗺️ 8. Prochaines Phases

- **Phase 1** : Moteur de recherche complet & filtrage dynamique par ville, prix, type et équipements.
- **Phase 2** : Système complet d'authentification (JWT / Session), inscription clients et propriétaires.
- **Phase 3** : Espace Propriétaire (Publication de logement, upload de photos, tarification).
- **Phase 4** : Moteur de réservation (gestion des calendriers et disponibilités sans chevauchement).
- **Phase 5** : Notifications (Email et WhatsApp Business API).
- **Phase 6** : Dashboard d'administration global.
- **Phase 7** : Multilingue dynamique avancé.
- **Phase 8** : Intégration des paiements Mobile Money (Orange Money, MTN MoMo).
- **Phase 9** : Recette complète, sécurité et optimisations performances.
- **Phase 10** : Déploiement final en production sur Hostinger (`feeltohome.com`).
