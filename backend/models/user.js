const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Entrez l'email"],
            unique: true
        }, 

        mdp: {
            type: String,
            required: [true, "Entrez le mot de passe"],
        },
        createdAt: {
        type: Date,
        default: Date.now
        }
        
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;