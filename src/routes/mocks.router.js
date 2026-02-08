import express from 'express';
import { Router } from 'express';
import { generateUsers, generatePets } from '../utils/mocking';
import User from '../models/User';
import Pet from '../models/Pet';

const router = Router();

router.get('/mockingpets', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/mockingusers', async (req, res) => {
  try {
    const count = req.query.count || 50;
    const users = await generateUsers(count);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/generateData', async (req, res) => {
  try {
    const { users, pets } = req.body;

    if (!users || !pets) {
      return res.status(400).json({ message: 'Faltan users o mascotas' });
    }

    
    const userDocs = await generateUsers(users);
    const createdUsers = await User.insertMany(userDocs);

    const petDocs = await generatePets(pets);
    const createdPets = await Pet.insertMany(petDocs);

    res.json({
      message: `Se crearon ${createdUsers.length} usuarios y ${createdPets.length} mascotas`,
      createdUsers: createdUsers.map(u => ({ id: u._id, username: u.username })),
      createdPets: createdPets.map(p => ({ id: p._id, name: p.name }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;