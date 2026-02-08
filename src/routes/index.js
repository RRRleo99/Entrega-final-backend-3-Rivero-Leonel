import express from 'express';
import usersRouter from './users';
import petsRouter from './pets';
import mocksRouter from './mocks.router';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/pets', petsRouter);
router.use('/api/mocks', mocksRouter);

export default router;