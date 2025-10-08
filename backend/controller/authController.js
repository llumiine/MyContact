//routeur du user 

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const routeurAuth = require("express").Router();
const requireAuth = require("../auth/requireAuth");

routeurAuth.post('/inscription', async (req, res) => {
    try {
        const { email, mdp } = req.body;
        const hash = await bcrypt.hash(mdp, 10); 
        const user = new User({ email, mdp: hash });
        await user.save();
        res.status(201).json({ message: "Utilisateur créé ^^" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}); 

routeurAuth.post('/connexion', async (req, res) => {
    try {
        const { email, mdp } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Utilisateur pas trouver" });

        const valid = await bcrypt.compare(mdp, user.mdp);
        if (!valid) return res.status(400).json({ message: "Mot de passe incorrect" });

        const secret = process.env.JWT_SECRET;
if (!secret) console.warn('JWT_SECRET non défini dans les env vars');
const token = jwt.sign({ userId: user._id }, secret || 'DEV_SECRET', { expiresIn: '1h' });
res.json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = routeurAuth;

// Documentation Swagger 

/**
 * @swagger
 * /api/auth/inscription:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               mdp:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */

/**
 * @swagger
 * /api/auth/connexion:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               mdp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT retourné
 */

