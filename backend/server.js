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

mongoose
  .connect(
    "mongodb+srv://laamahmed:8nBn8jKIAUG25HfC@mycontact.gmiwqrx.mongodb.net/Node-API?retryWrites=true&w=majority&appName=MyContact"
  )
  .then(() => {
    console.log("BD Connectée");
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB :", err.message);
  });

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
