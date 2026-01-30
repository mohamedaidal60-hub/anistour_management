# Documentation de Déploiement - Anistour Management

## 1. Lancer l'application localement

Étant donné les restrictions de sécurité sur votre terminal, voici la méthode sûre pour lancer le projet :

1. Ouvrez un terminal (PowerShell ou CMD) dans ce dossier.
2. Initialisez la base de données (si ce n'est pas déjà fait) :
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
   *Cela va créer le compte Admin par défaut : `admin` / `admin123`*

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
4. Ouvrez votre navigateur sur : **http://localhost:3000**

## 2. Identifiants par défaut
- **Utilisateur** : `admin`
- **Mot de passe** : `admin123`

## 3. Déployer sur Vercel (Production)

Cette application est optimisée pour Vercel.

1. Créez un dépôt GitHub et poussez ce code :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <VOTRE_REPO_URL>
   git push -u origin main
   ```

2. Allez sur [Vercel.com](https://vercel.com) et connectez votre GitHub.
3. Importez le projet **anistour_management**.
4. **Important** : Pour la base de données en production (Vercel), vous devez utiliser **Vercel Postgres** ou une autre base de données PostgreSQL (Supabase, Neon, etc.).
   - Modifiez `prisma/schema.prisma` : changez `provider = "sqlite"` en `provider = "postgresql"`.
   - Dans les paramètres Vercel, ajoutez la variable `DATABASE_URL`.
   - Vercel détectera automatiquement Next.js et déploiera le site.

## 4. Fonctionnalités incluses
- **Authentification** : Sécurisée (JWT) avec rôles (Admin/Agent).
- **Design** : Charte Rouge & Noir, Glassmorphism, animations fluides.
- **Gestion** : Véhicules, Revenus, Charges, Entretiens.
- **Carnet d'Entretien** : Traçabilité complète.
