import React, { useState } from 'react';
//ca gere les chmaps fin les valeurs
export default function Inscription() {
  const [email, setEmail] = useState('');
  const [mdp, setmdp] = useState('');
  const [message, setMessage] = useState('');
//pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/auth/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mdp }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Inscription réussie :)');
      } else {
        setMessage(data.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setMessage('Erreur');
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :<input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
        </div>
        <div>
          <label>Mot de passe :<input type="password" name="mdp" value={mdp} onChange={e => setmdp(e.target.value)} required /></label>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}