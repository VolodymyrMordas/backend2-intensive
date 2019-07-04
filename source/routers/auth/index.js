// Core
import express from 'express';

import { login, logout}  from './routes';

import { validator } from '../../utils';
import { schemaLogout } from '../../schemas';

export const router = express.Router();

router.post('/login', login);
router.post('/logout',  [ validator(schemaLogout) ],  logout);

export { router as auth };
