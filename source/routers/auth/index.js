// Core
import express from 'express';

import { login, logout}  from './routes';

import { validator } from '../../utils';
import { schemaLogout } from '../../schemas';

import { password } from '../../middleware/request.password';

export const router = express.Router();


router.post('/login', login);

router.post('/logout',  password);
router.post('/logout',  logout);

export { router as auth };
