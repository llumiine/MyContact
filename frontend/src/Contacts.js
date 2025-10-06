import React, { useEffect, useState } from 'react';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
//il charge les donnée qui viens du backend
  useEffect(() => {
    fetch('http://localhost:8080/api/contacts/all')
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(() => setMessage('Erreur lors du chargement des contacts'));
  }, []);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8080/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, prenom, phone, email }),
    });
    setMessage('Contact ajouté');
    setShowForm(false);
    setNom('');
    setPrenom('');
    setPhone('');
    setEmail('');
    // Recharge la liste
    fetch('http://localhost:8080/api/contacts/all')
      .then(res => res.json())
      .then(data => setContacts(data));
  };

  const handleEdit = (id) => {
    alert('Modifier le contact ' + id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/contacts/${id}`, {
      method: 'DELETE',
    });
    setContacts(contacts.filter(c => c._id !== id));
    setMessage('Contact supprimé');
  };

  return (
    <div>
      <h2>Liste des contacts</h2>
      <button onClick={() => setShowForm(true)}>Ajouter</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={e => setNom(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Prenom"
            value={prenom}
            onChange={e => setPrenom(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit">Valider</button>
        </form>
      )}
      {message && <p>{message}</p>}
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            {contact.nom} - {contact.email}
            <button onClick={() => handleEdit(contact._id)}>Modifier</button>
            <button onClick={() => handleDelete(contact._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}