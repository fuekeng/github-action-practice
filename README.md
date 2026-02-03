# github-action-practice
This is a complete project to practice CI/CD testing on github actions 

# API REST Node.js

Une API REST complète construite avec Node.js et Express.

## 🚀 Fonctionnalités

- ✅ Architecture MVC
- ✅ Validation des données
- ✅ Gestion des erreurs centralisée
- ✅ Middleware de sécurité (Helmet, CORS)
- ✅ Logging avec Morgan
- ✅ Compression des réponses
- ✅ Routes versionnées
- ✅ Variables d'environnement

## 📋 Prérequis

- Node.js >= 14.x
- npm ou yarn

## 🔧 Installation

```bash
# Cloner le projet
git clone <votre-repo>

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Démarrer le serveur en développement
npm run dev

# Démarrer le serveur en production
npm start
```

## � Docker et CI/CD

### Build local avec Docker

```bash
# Construire l'image
docker build -t nodejs-api:latest .

# Lancer le conteneur
docker run -p 3000:3000 --env-file .env nodejs-api:latest
```

### Versioning et GitHub Actions

L'image Docker est automatiquement construite et publiée sur Docker Hub à chaque push et tag.

#### 📌 Procédure de versioning avec tags Git

Les images Docker sont générées automatiquement avec les tags suivants:
- `latest` - pour la branche main
- `develop` - pour la branche develop
- `v1.2.3` - pour les tags de version sémantique
- `1.2` et `1` - versions majeures et mineures
- `develop-sha1234567` - commit SHA de la branche

#### 🔖 Comment créer un tag de version

**Étape 1: Faire un commit**
```bash
git add .
git commit -m "feat: add new feature"
```

**Étape 2: Créer un tag sémantique**
```bash
# Format: vX.Y.Z (ex: v1.0.0, v1.2.3)
git tag v1.0.0
```

**Étape 3: Pusher vers GitHub**
```bash
git push origin main
git push origin v1.0.0  # ou git push origin --tags
```

#### 📋 Exemples de tags valides

```bash
v1.0.0      # Version majeure.mineure.patch
v2.1.5      # Nouvelle version
v0.1.0-rc1  # Release candidate
```

#### 🎯 Résultat

Une fois le tag poussé, GitHub Actions va:
1. ✅ Builder l'image Docker
2. ✅ La tagger automatiquement (`v1.0.0`, `1.0`, `1`, etc.)
3. ✅ Publier sur Docker Hub

**Utiliser l'image:**
```bash
docker pull username/nodejs-api:v1.0.0
docker pull username/nodejs-api:1.0
docker pull username/nodejs-api:latest
```

## �📁 Structure du projet

```
├── src/
│   ├── controllers/      # Logique métier
│   ├── routes/          # Définition des routes
│   ├── middlewares/     # Middlewares personnalisés
│   ├── validators/      # Validation des données
│   ├── app.js          # Configuration Express
│   └── server.js       # Point d'entrée
├── .env                # Variables d'environnement
├── .gitignore
└── package.json
```

## 🛣️ Routes API

### Utilisateurs

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/users` | Récupérer tous les utilisateurs |
| GET | `/api/v1/users/:id` | Récupérer un utilisateur |
| POST | `/api/v1/users` | Créer un utilisateur |
| PUT | `/api/v1/users/:id` | Mettre à jour un utilisateur |
| DELETE | `/api/v1/users/:id` | Supprimer un utilisateur |

### Produits

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/products` | Récupérer tous les produits |
| GET | `/api/v1/products/:id` | Récupérer un produit |
| POST | `/api/v1/products` | Créer un produit |
| PUT | `/api/v1/products/:id` | Mettre à jour un produit |
| DELETE | `/api/v1/products/:id` | Supprimer un produit |

## 📝 Exemples d'utilisation

### Créer un utilisateur

```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }'
```

### Récupérer tous les produits

```bash
curl http://localhost:3000/api/v1/products
```

### Filtrer les produits

```bash
# Par catégorie
curl http://localhost:3000/api/v1/products?category=Electronics

# Par prix
curl http://localhost:3000/api/v1/products?minPrice=20&maxPrice=100
```

## 🔐 Variables d'environnement

```env
PORT=3000
NODE_ENV=development
API_VERSION=v1
```

## 🧪 Tests

```bash
npm test
```

## 📦 Dépendances principales

- **express** - Framework web
- **dotenv** - Gestion des variables d'environnement
- **cors** - Gestion CORS
- **helmet** - Sécurité HTTP
- **morgan** - Logger HTTP
- **express-validator** - Validation des données
- **compression** - Compression des réponses

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

ISC

# 1. Committer les changements
git add .

git commit -m "feat: description de la feature"

# 2. Créer un tag sémantique (v1.0.0, v1.0.1, etc.)
git tag v1.0.0

# 3. Pousser vers GitHub
git push origin main 

git push origin v1.0.0