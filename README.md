

# API de Gestion des Recettes

## Description

Cette API permet de gérer des/recipes et des catégories dans une application de gestion de/recipes. Elle permet de créer, lire, mettre à jour et supprimer des/recipes, ainsi que de gérer les catégories associées à chaque recette.

## Endpoints

### Recettes

- **GET /api/recipes**
  - Récupère toutes les/recipes.
  - **Exemple de réponse** :
    ```json
    [
      {
        "id": 1,
        "titre": "Salade César revisitée",
        "ingredients": "Laitue, Poulet grillé",
        "type": "Entrée",
        "categorie_id": 2
      }
    ]
    ```

- **GET /api/recipes/:id**
  - Récupère une recette par ID.
  - **Paramètre** :
    - `id` : L'ID de la recette à récupérer.
  - **Exemple de requête** :
    ```bash
    GET /api/recipes/1
    ```
  - **Exemple de réponse** :
    ```json
    {
      "id": 1,
      "titre": "Salade César revisitée",
      "ingredients": "Laitue, Poulet grillé",
      "type": "Entrée",
      "categorie_id": 2
    }
    ```

- **POST /api/recipes**
  - Crée une nouvelle recette.
  - **Exemple de requête** :
    ```bash
    POST /api/recipes
    Content-Type: application/json
    ```
  - **Corps de la requête (Body)** :
    ```json
    {
      "titre": "Pâtes à la carbonara",
      "ingredients": "Pâtes, Œufs, Lardons",
      "type": "Plat principal",
      "categorie_id": 1
    }
    ```

  - **Exemple de réponse** :
    ```json
    {
      "id": 2,
      "titre": "Pâtes à la carbonara",
      "ingredients": "Pâtes, Œufs, Lardons",
      "type": "Plat principal",
      "categorie_id": 1
    }
    ```

- **PUT /api/recipes/:id**
  - Met à jour une recette existante.
  - **Paramètre** :
    - `id` : L'ID de la recette à mettre à jour.
  - **Exemple de requête** :
    ```bash
    PUT /api/recipes/1
    Content-Type: application/json
    ```
  - **Corps de la requête (Body)** :
    ```json
    {
      "titre": "Salade César améliorée",
      "ingredients": "Laitue, Poulet grillé, Parmesan",
      "type": "Entrée",
      "categorie_id": 2
    }
    ```
  - **Exemple de réponse** :
    ```json
    {
      "id": 1,
      "titre": "Salade César améliorée",
      "ingredients": "Laitue, Poulet grillé, Parmesan",
      "type": "Entrée",
      "categorie_id": 2
    }
    ```

- **DELETE /api/recipes/:id**
  - Supprime une recette par ID.
  - **Paramètre** :
    - `id` : L'ID de la recette à supprimer.
  - **Exemple de requête** :
    ```bash
    DELETE /api/recipes/1
    ```
  - **Exemple de réponse** :
    ```json
    {
      "message": "Recette supprimée avec succès."
    }
    ```

### Catégories

- **GET /api/categories**
  - Récupère toutes les catégories.
  - **Exemple de réponse** :
    ```json
    [
      {
        "id": 1,
        "name": "Plat principal"
      },
      {
        "id": 2,
        "name": "Entrée"
      }
    ]
    ```

- **GET /api/categories/:id**
  - Récupère une catégorie par ID.
  - **Paramètre** :
    - `id` : L'ID de la catégorie à récupérer.
  - **Exemple de requête** :
    ```bash
    GET /api/categories/1
    ```
  - **Exemple de réponse** :
    ```json
    {
      "id": 1,
      "name": "Plat principal"
    }
    ```

- **POST /api/categories**
  - Crée une nouvelle catégorie.
  - **Exemple de requête** :
    ```bash
    POST /api/categories
    Content-Type: application/json
    ```
  - **Corps de la requête (Body)** :
    ```json
    {
      "name": "Dessert"
    }
    ```

  - **Exemple de réponse** :
    ```json
    {
      "id": 3,
      "name": "Dessert"
    }
    ```

- **PUT /api/categories/:id**
  - Met à jour une catégorie existante.
  - **Paramètre** :
    - `id` : L'ID de la catégorie à mettre à jour.
  - **Exemple de requête** :
    ```bash
    PUT /api/categories/1
    Content-Type: application/json
    ```
  - **Corps de la requête (Body)** :
    ```json
    {
      "name": "Apéritif"
    }
    ```
  - **Exemple de réponse** :
    ```json
    {
      "id": 1,
      "name": "Apéritif"
    }
    ```

- **DELETE /api/categories/:id**
  - Supprime une catégorie par ID.
  - **Paramètre** :
    - `id` : L'ID de la catégorie à supprimer.
  - **Exemple de requête** :
    ```bash
    DELETE /api/categories/1
    ```
  - **Exemple de réponse** :
    ```json
    {
      "message": "Catégorie supprimée avec succès."
    }
    ```

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- Node.js (v16 ou supérieure)
- MySQL
- Postman (pour tester l'API)

## Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/Abdarahmane/Conception-app_backend.git
```
2. Accédez au répertoire du projet :
```bash
cd Conception-app_backend
```

3. Installez les dépendances :

```bash
npm install
```

4. Configurez la base de données :

Dans le projet le fichier .env.example faut le renommé en .env et ajouter vos identifiant pour pouvoir se conncter à la base de donnée

pour se connecter sur la machine local et faire de test dans le fichier .env mettez :

DB_HOST=localhost


```bash

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mypassWord
DB_NAME=db_name 
DB_PORT=port_spécifier

```
5. Démarrez le serveur :

```bash
 npm start
 ```
## Exécution des commandes
 - Pour exécuter les tests unitaires, utilisez la commande suivante :

```bash
npm test
```

- Pour linting, exécutez la commande suivante 

```bash

npm run lint
```
Pour formater le code avec Prettier, exécutez :

```bash

npm run format
```

## Auteur
  [Abdarahmane Ibrahima Demba](https://github.com/Abdarahmane)
