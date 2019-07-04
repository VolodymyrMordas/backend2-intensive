// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import {getByHash, userDelete, userUpdate} from './hash/route';
import { limiter, validator } from '../../utils';

// Schema
import { createUser } from '../../schemas';

export const router = express.Router();

router.get('/', get);
router.post('/', [ validator(createUser) ], post);

router.get('/:userHash', getByHash);

// todo: should be finished
router.put('/:userHash', [ validator(createUser) ], userUpdate);

// todo: should be finished
router.delete('/:userHash', userDelete);

export { router as users };
