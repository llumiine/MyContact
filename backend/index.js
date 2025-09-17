const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {MongoClient} = require('mongodb');
const Contact = require('./models/contact.js');

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
})

app.use(express.json());

app.get('/',(req, res) => {
    res.send('Hello World!');
}
);

app.get('/api/contacts', async (req, res) => {

    try {
      await Contact.find({});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/contacts', async (req, res) => {
    try {
       const contact = await Contact.create(req.body);
        res.status(200).json(contact)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});



mongoose.connect("mongodb+srv://laamahmed:8nBn8jKIAUG25HfC@mycontact.gmiwqrx.mongodb.net/Node-API?retryWrites=true&w=majority&appName=MyContact").then(() => {
    console.log("BD Connecter")});
  
    
