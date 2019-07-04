// Core
import express from 'express';

import {getClass, updateClass, deleteClass, enroll, expel} from './route';

export const router = express.Router();

// todo: define validation here
router.get('/:classHash', getClass);
router.put('/:classHash',  updateClass);
router.delete('/:classHash', deleteClass);

router.put('/enroll',  enroll);
router.put('/expel',  expel);

export { router as classes };
