# Workflow CI/CD

Ce projet utilise GitHub Actions avec des workflows séparés pour les branches `main` et `develop`.

## 🚀 Workflows CI/CD

### **Main Branch** (`.github/workflows/ci-main.yml`)

- **Déclenchement** : Push et PR vers `main`
- **Objectif** : Production avec vérifications strictes
- **Caractéristiques** :
  - Tests multi-versions Node.js (18.x et 20.x)
  - Audit de sécurité strict (niveau "high")
  - Déploiement automatique en production
  - Vérifications complètes de qualité

### **Develop Branch** (`.github/workflows/ci-develop.yml`)

- **Déclenchement** : Push et PR vers `develop`
- **Objectif** : Développement avec vérifications modérées
- **Caractéristiques** :
  - Tests sur Node.js 20.x uniquement
  - Audit de sécurité modéré (niveau "moderate")
  - Pas de déploiement automatique
  - Vérifications de base

## 📋 Étapes des workflows

### **Workflow Main (Production)**

1. **Job de Test** : Vérifications TypeScript, linting, build
2. **Job de Qualité** : Audit strict, analyse bundle, format
3. **Job de Déploiement** : Build et déploiement en production

### **Workflow Develop (Développement)**

1. **Job de Test** : Vérifications TypeScript, linting, build
2. **Job de Qualité** : Audit modéré, analyse bundle, format

## 🛠️ Scripts disponibles

```bash
# Vérification du type TypeScript
npm run type-check

# Linting du code
npm run lint

# Formatage du code
npm run format

# Vérification du formatage
npm run format-check

# Build du projet
npm run build
```

## 📁 Fichiers de configuration

- `.github/workflows/ci-main.yml` : Workflow pour la branche main
- `.github/workflows/ci-develop.yml` : Workflow pour la branche develop
- `.eslintrc.json` : Configuration ESLint
- `.prettierrc` : Configuration Prettier
- `.github/dependabot.yml` : Mise à jour automatique des dépendances

## 🔧 Configuration requise

Assurez-vous que votre projet a :

- Node.js 18.x ou 20.x
- TypeScript configuré
- ESLint configuré
- Les scripts npm appropriés dans `package.json`

## 📊 Monitoring

Vous pouvez suivre l'exécution des workflows dans l'onglet "Actions" de votre repository GitHub.

## 🚨 Résolution des problèmes

Si un workflow échoue :

1. Vérifiez les logs dans GitHub Actions
2. Corrigez les erreurs de linting localement avec `npm run lint`
3. Vérifiez les erreurs TypeScript avec `npm run type-check`
4. Assurez-vous que le build fonctionne avec `npm run build`

## 🔄 Stratégie de branches

- **`develop`** : Branche de développement avec CI modéré
- **`main`** : Branche de production avec CI strict + déploiement
- Les PR vers `main` doivent passer par `develop` d'abord
