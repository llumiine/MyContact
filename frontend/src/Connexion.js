import React from 'react';

export default function Connexion() {
  return (
    <div>
      <h2>Connexion</h2>
      <form>
        <div>
          <label>
            Email :
            <input type="email" name="email" />
          </label>
        </div>
        <div>
          <label>
            Mot de passe :
            <input type="password" name="password" />
          </label>
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}