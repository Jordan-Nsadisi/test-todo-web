# TodoApp - Gestionnaire de Tâches Moderne

Une application web moderne de gestion de tâches développée avec **Next.js 14**, **TypeScript**, et **Tailwind CSS**. Responsive et optimisée mobile-first.

## Fonctionnalités

**Authentification complète** (Inscription, Connexion, Déconnexion)  
**CRUD Tâches** (Créer, Lire, Modifier, Supprimer)  
**Gestion des statuts** (En attente, Terminée, Annulée)  
**Interface responsive** (Desktop, Tablet, Mobile)  
**State management** avec Zustand + persistance  
**API Integration** avec React Query  
**Toast notifications** pour feedback utilisateur  
**Design system** avec composants réutilisables  

## Technologies

| Frontend | State | Styling | Tools |
|----------|-------|---------|--------|
| **Next.js 14** | **Zustand** | **Tailwind CSS** | **TypeScript** |
| **React 19** | **React Query** | **Radix UI** | **ESLint** |
| **React Hook Form** | **AsyncStorage** | **Lucide Icons** | **Prettier** |

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** v18+ ([Télécharger](https://nodejs.org/))
- **npm** ou **yarn** (inclus avec Node.js)
- **Git** ([Télécharger](https://git-scm.com/))

## Installation Rapide

### 1. **Cloner le projet**
```bash
git clone https://github.com/Jordan-Nsadisi/test-todo-web.git
cd test-todoweb
```

### 2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

### 3. **Configuration API**
le fichier `.env.local` est deja existant et à la racine du repos, non ignoré par git

### 4. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
```

### 5. **Ouvrir l'application**
Accédez à l'adresse du server dans votre navigateur.


## 🌐 Configuration API Backend

### Laravel API Endpoints
L'application communique avec une API Laravel via ces endpoints :

```typescript
// Authentification
POST /auth/register    // Inscription
POST /auth/login       // Connexion  
POST /auth/logout      // Déconnexion
GET  /auth/user        // Profil utilisateur

// Tâches
POST   /tasks          // Créer tâche
GET    /tasks/user/:id // Lister tâches utilisateur
PUT    /tasks/:id      // Modifier tâche
DELETE /tasks/:id      // Supprimer tâche
```

### Variables d'environnement
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🎨 Personnalisation

### Couleurs du thème (Tailwind)
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',      // Bleu principal
        background: '#FFFFFF',   // Fond clair
        muted: '#6B7280',       // Texte secondaire
      }
    }
  }
}
```

### Responsivité Mobile
L'app utilise une approche **mobile-first** :
```css
/* Mobile par défaut */
text-sm space-x-2 h-3 w-3

/* Tablette et plus */
md:text-base md:space-x-4 md:h-4 md:w-4
```


**Développé avec ❤️ par le teste d'insertion Mr Mukanza**
