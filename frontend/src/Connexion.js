import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/connexion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mdp }),
      });
      const data = await res.json();
      if (res.ok) {
        //ca permet de sauvegarder le token 
        localStorage.setItem('token', data.token); // Sauvegarde le token
        setMessage("Connexion réussie :O");
        navigate("/contacts"); 
      } else {
        setMessage(data.message || "Erreur de connexion");
      }
    } catch (err) {
      setMessage("Erreur serveur");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email :
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Mot de passe :
            <input
              type="password"
              name="mdp"
              value={mdp}
              onChange={(e) => setMdp(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
