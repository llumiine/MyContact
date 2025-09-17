const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {MongoClient} = require('mongodb');

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
})

mongoose.connect("mongodb+srv://laamahmed:8nBn8jKIAUG25HfC@mycontact.gmiwqrx.mongodb.net/Node-API?retryWrites=true&w=majority&appName=MyContact").then(() => {
    console.log("DB Connected")});
    
