const request = require('supertest');
const app = require('../server');

describe('Tests API Contacts', () => {
  let token;
  let contactId;

  beforeAll(async () => {
    // Inscription et connexion pour obtenir le token
    await request(app)
      .post('/api/auth/inscription')
      .send({ email: 'contactuser@example.com', mdp: 'contactpass' });

    const res = await request(app)
      .post('/api/auth/connexion')
      .send({ email: 'contactuser@example.com', mdp: 'contactpass' });

    token = res.body.token;
  });

  test('Créer un contact', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nom: 'Dupont',
        prenom: 'Jean',
        phone: 123456789,
        email: 'jean.dupont@example.com',
        user_id: 'contactuser'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    contactId = res.body._id;
  });

  test('Récupérer tous les contacts', async () => {
    const res = await request(app)
      .get('/api/contacts/all')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Récupérer un contact par ID', async () => {
    const res = await request(app)
      .get(`/api/contacts/${contactId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', contactId);
  });

  test('Modifier un contact', async () => {
    const res = await request(app)
      .patch(`/api/contacts/modif/${contactId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ prenom: 'Pierre' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('prenom', 'Pierre');
  });

  test('Supprimer un contact', async () => {
    const res = await request(app)
      .delete(`/api/contacts/supprimer/${contactId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  test('Supprimer un contact inexistant', async () => {
    const res = await request(app)
      .delete(`/api/contacts/supprimer/000000000000000000000000`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message');
  });
});