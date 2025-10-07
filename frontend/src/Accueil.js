import React from 'react';
import { Link } from 'react-router-dom';
import mimi from './mimi.jpg';

export default function Accueil() {
  return (
    <div>
      <h1>Accueil: Veuillez vous connecter ou vous inscrire</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={mimi} alt="mimi" style={{ maxWidth: '200px', marginRight: '20px' }} />
        <div>
          <Link to="/inscription">
            <button>Inscription</button>
          </Link>
          <br />
          <Link to="/connexion">
            <button>Connexion</button>
          </Link>
        </div>
      </div>
    </div>
  );
}