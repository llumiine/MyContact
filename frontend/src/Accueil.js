import React from 'react';
import { Link } from 'react-router-dom';

export default function Accueil() {
  return (
    <div>
      <h1>Accueil</h1>
            <Link to="/inscription">
              <button>Inscription</button>
            </Link>
      <Link to="/connexion">
        <button>Connexion</button>
      </Link>
    </div>
  );
}