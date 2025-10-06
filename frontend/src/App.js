import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Accueil from './Accueil';
import Connexion from './Connexion';
import Inscription from './Inscription';
import Contacts from './Contacts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
