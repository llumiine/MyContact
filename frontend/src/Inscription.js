import React from 'react';

export default function Inscription() {
  return (
    <div>
      <h2>Inscription</h2>
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
        <button type="submit">S'inscire</button>
      </form>
    </div>
  );
}