//c'est le middleware pour protéger les routes


const jwt = require('jsonwebtoken');
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Token manquant" });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'SECRET_JWT');
        req.user = decoded;
        console.log("Utilisateur authentifié :", decoded);
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalide" });
    }
}

module.exports = requireAuth;