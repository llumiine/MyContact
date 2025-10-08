import React, { useEffect, useState } from 'react';
// pour gerer les etats 
export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    chargerContacts();
  }, []);
//il recupere la liste des contacts depuis le lien fetch
  const chargerContacts = () => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/api/contacts/all`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(() => setMessage('Erreur lors du chargement des contacts'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    const user_id = payload.userId;

    if (editId) {
      // Modification d'un contact
      await fetch(`http://localhost:8080/api/contacts/modif/${editId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nom, prenom, phone, email }),
      });
      setMessage('Contact modifié');
    } else {
      // ajout de contact 
      await fetch('http://localhost:8080/api/contacts', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nom, prenom, phone, email, user_id }),
      });
      setMessage('Contact ajouté');
    }
    //ca reanitilise les champs apres ajout ou modif 
    setShowForm(false);
    setEditId(null);
    setNom('');
    setPrenom('');
    setPhone('');
    setEmail('');
    chargerContacts();
  };
//sers a a modifier le contact quand j'appuie sur le bouton modifier
  const handleEdit = (contact) => {
    setEditId(contact._id);
    setNom(contact.nom);
    setPrenom(contact.prenom);
    setPhone(contact.phone);
    setEmail(contact.email);
    setShowForm(true);
  };
//sers a supprimer le contact la methode c'est delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:8080/api/contacts/supprimer/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setMessage('Contact supprimé');
    chargerContacts();
  };

  return (
    <div>
      <h2>Liste des contacts</h2>
      <button onClick={() => {
        setShowForm(true);
        setEditId(null);
        setNom('');
        setPrenom('');
        setPhone('');
        setEmail('');
      }}>Ajouter</button>
      {/* Formulaire d'ajout et modif */}
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
          <button type="submit">{editId ? 'Modifier' : 'Valider'}</button>
        </form>
      )}
      {message && <p>{message}</p>}
      {/* affichager la liste des contacts */}
      <ul>
      
        {contacts.map(contact => (
          <li key={contact._id}>
            Nom: {contact.nom} - Prénom: {contact.prenom} - Numéro: {contact.phone} - Email: {contact.email}
            <button onClick={() => handleEdit(contact)}>Modifier</button>
            <button onClick={() => handleDelete(contact._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}