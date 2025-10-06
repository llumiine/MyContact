//reouteur des contacts

const express = require('express');
const Contact = require('../models/contact.js');
const routeurContact = express.Router();
const mongoose = require('mongoose');
const requireAuth = require('../auth/requireAuth.js');

routeurContact.get('/', (req, res) => {
    res.send('coucou le monde!');
});


routeurContact.get('/all', async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


routeurContact.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


routeurContact.patch('/modif/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
});


routeurContact.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact non trouvé" });
        }
        res.status(200).json({ message: "Contact supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


routeurContact.post('/', async (req, res) => {
    try {
        const { nom, prenom, phone, email } = req.body;
        const contact = new Contact({ nom, prenom, phone, email });
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = routeurContact;

// Documentation Swagger 

/**
 * @swagger
 * /api/contacts/all:
 *   get:
 *     summary: Récupère tous les contacts
 *     responses:
 *       200:
 *         description: Liste des contacts
 */

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Récupère un contact par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact trouvé
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Ajoute un nouveau contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact créé
 */

/**
 * @swagger
 * /api/contacts/modif/{id}:
 *   patch:
 *     summary: Modifie un contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Contact modifié
 */

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Supprime un contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact supprimé
 */

