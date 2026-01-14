# Sushimi - Application de commande de Sushis 🍣

Application web Angular pour la commande de boxes de sushis en ligne.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (v18 ou supérieur) - [Télécharger ici](https://nodejs.org/)
- **XAMPP** (ou équivalent avec Apache + MySQL) - [Télécharger ici](https://www.apachefriends.org/)
- **Angular CLI** (installé globalement) : `npm install -g @angular/cli`

---

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd SAE-301-303
```

### 2. Installer les dépendances Node.js

```bash
npm install
```

---

## 🗄️ Configuration de la Base de Données (XAMPP)

### Étape 1 : Démarrer XAMPP
1. Lancez **XAMPP Control Panel**
2. Démarrez **Apache** et **MySQL**

### Étape 2 : Créer la base de données
1. Allez sur [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. Créez une nouvelle base de données nommée : `sushimi_database`

### Étape 3 : Importer les tables
1. Sélectionnez la base `sushimi_database`
2. Cliquez sur l'onglet **Importer**
3. Importez le fichier : `bdd/create_table.sql`
4. Ensuite, importez : `bdd/insert_test.sql` (données de test)

> 💡 **Migration** : Si vous avez déjà une base existante, exécutez `bdd/migration_add_status.sql` pour ajouter le champ tarif étudiant.

### Étape 4 : Placer l'API PHP
Copiez le dossier `bdd/` dans votre répertoire `htdocs` de XAMPP :

```
C:\xampp\htdocs\sushimi\bdd\
```

> ⚠️ **Important** : Le dossier doit être nommé `sushimi` dans `htdocs` pour que l'API fonctionne avec la configuration par défaut.

---

## ⚙️ Configuration de l'URL de l'API

Si vous avez installé l'API dans un dossier différent de `htdocs/sushimi`, modifiez le fichier :

**`src/environments/environment.ts`**

```typescript
export const environment = {
    production: false,
    apiBaseUrl: 'http://localhost/VOTRE_DOSSIER/bdd/api'  // ← Modifiez ici
};
```

---

## 🏃 Lancer l'application

### Développement

```bash
npm start
```

L'application sera accessible sur : [http://localhost:4200](http://localhost:4200)

### Production (Build)

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`.

---

## 📁 Structure du Projet

```
SAE-301-303/
├── bdd/                          # Backend PHP + SQL
│   ├── api/                      # Endpoints API
│   │   ├── boxes/                # API des boxes (produits)
│   │   ├── users/                # API authentification
│   │   └── orders/               # API commandes
│   ├── manager/                  # Classes PHP utilitaires
│   ├── create_table.sql          # Script de création des tables
│   └── insert_test.sql           # Données de test
│
├── src/                          # Frontend Angular
│   ├── app/
│   │   ├── core/                 # Services, Guards, Models
│   │   ├── features/             # Pages (Home, Products, Auth...)
│   │   └── shared/               # Composants réutilisables
│   ├── assets/                   # Images, fonts
│   └── environments/             # Configuration API
│
├── package.json                  # Dépendances Node.js
└── README.md                     # Ce fichier
```

---

## 🎯 Fonctionnalités

- ✅ Affichage des boxes de sushis
- ✅ Page détail produit
- ✅ Système de panier **persistant** (localStorage)
- ✅ Inscription / Connexion utilisateur
- ✅ **Validation de commandes** avec confirmation
- ✅ **Dashboard Admin** avec graphiques (Chart.js)
- ✅ **Tarif étudiant** (-10% automatique)
- ✅ Page équipe
- ✅ Page contact
- ✅ Politique de confidentialité (RGPD)

---

## 🛠️ Technologies Utilisées

| Catégorie | Technologie |
|-----------|-------------|
| Frontend | Angular 19 (Signals, SSR) |
| Backend | PHP 8 (PDO, Transactions) |
| Base de données | MySQL (MariaDB) |
| Serveur local | XAMPP (Apache) |
| Styles | SCSS |
| Graphiques | Chart.js |

---

## 👥 Équipe

Projet réalisé dans le cadre de la SAE 301-303 du BUT MMI.

---

## 📝 Notes pour l'oral

1. **Vérifiez que XAMPP est lancé** avant de démarrer l'application
2. **La base de données doit être importée** (les 2 fichiers SQL)
3. **L'API doit être dans `htdocs/sushimi/bdd/`** pour fonctionner sans modification
4. **Test F5** : Ajoutez des produits au panier, rafraîchissez la page → le panier reste !
5. **Dashboard Admin** : Accessible via le footer ou `/admin`

