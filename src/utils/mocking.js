
import bcrypt from 'bcrypt';
import User from '../models/User';
import Pet from '../models/Pet';

const saltRounds = 10;

export const hashPassword = async (password) => {
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

export const generateUsers = async (count) => {
  const roles = ['user', 'admin'];
  const users = [];

  for (let i = 0; i < count; i++) {
    const username = `mockuser${i + 1}`;
    const email = `mockuser${i + 1}@example.com`;
    const passwordHash = await hashPassword('coder123');
    const role = roles[i % roles.length];
    const pets = [];

    const user = {
      username,
      email,
      password: passwordHash,
      role,
      pets
    };

    users.push(user);
  }

  return users;
};

export const generatePets = async (count) => {
  const types = ['perro', 'gato', 'pájaro'];
  const pets = [];

  for (let i = 0; i < count; i++) {
    const name = `mascota${i + 1}`;
    const type = types[i % types.length];
    const age = Math.floor(Math.random() * 10) + 1;

    const pet = {
      name,
      type,
      age,
      adopted: false
    };

    pets.push(pet);
  }

  return pets;
};