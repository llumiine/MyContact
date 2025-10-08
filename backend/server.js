require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const routeurContact = require("./controller/routeurContact.js");
const routeurAuth = require("./controller/authController.js");
const { swaggerUi, swaggerSpec } = require("./swagger");

app.use("/api/contacts", routeurContact);
app.use("/api/auth", routeurAuth);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/MyContact";
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("BD Connectée");
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB :", err.message);
  });

// Démarre le serveur uniquement si ce fichier est lancé directement
if (require.main === module) {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
