const mongoose = require('mongoose');



const LesContact = mongoose.Schema(
    {
        nom: {
            type: String,
            required: [true, "Entrez le nom de famille"],
        },

        prenom: {
            type: String,
            required: [true, "Entrez le prénom"],
        },
         phone: {
            type: Number,
            required: [true, "Entrez le numéro de téléphone"],
        },
         email: {
            type: String,
            required: [true, "Entrez l'email"],
        },
        
    }
);   

const Contact = mongoose.model("Contact", LesContact);
module.exports = Contact;