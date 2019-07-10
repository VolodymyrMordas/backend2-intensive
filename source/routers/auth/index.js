// Core
import express from 'express';

// Instruments
import { login, logout, loginCookies } from './route';
import { limiter, authenticate } from '../../utils';

export const router = express.Router();

router.post('/login', [ limiter(5, 60 * 1000) ], login);
router.post('/logout', [ authenticate, limiter(5, 60 * 1000) ], logout);

router.post('/auth/login', [ limiter(5, 60 * 1000) ], loginCookies);

export { router as auth };
