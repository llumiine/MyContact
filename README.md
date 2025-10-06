# MyContact

## Objectif

Application de gestion de contacts avec authentification, API REST sécurisée et documentation Swagger.

## Structure du projet

- **frontend/** : Application React (client)
- **backend/** : API Node.js/Express (serveur)

## Fonctionnalités principales

- Authentification utilisateur (JWT)
- CRUD contacts (ajout, modification, suppression, liste, détail)
- Protection des routes sensibles (middleware requireAuth)
- Documentation interactive avec Swagger

## Installation

### Backend

```bash
cd backend
npm install
npx nodemon server.js
```

L’API sera disponible sur [http://localhost:8080](http://localhost:8080)  
La documentation Swagger sur [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

### Frontend

```bash
cd frontend
npm install
npm start
```

L’application React sera disponible sur [http://localhost:3000](http://localhost:3000)

## Technologies

- Node.js / Express
- MongoDB Atlas
- React
- Swagger
- JWT / bcrypt

## Auteur

Projet réalisé par Laam AHMED.

