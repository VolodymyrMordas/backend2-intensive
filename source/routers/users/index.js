// Core
import express from 'express';
import passport from 'passport';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, removeByHash } from './hash';
import { limiter, validator, authenticate } from '../../utils';

// Schema
import { createUser } from '../../schemas';

export const router = express.Router();

router.get('/', passport.authenticate('github', { failureRedirect: '/api/login' }), get);
router.post('/', [ validator(createUser) ], post);

router.get('/:userHash', [ authenticate ], getByHash);
router.put('/:userHash', [ authenticate ], updateByHash);
router.delete('/:userHash', [ authenticate ], removeByHash);

export { router as users };
