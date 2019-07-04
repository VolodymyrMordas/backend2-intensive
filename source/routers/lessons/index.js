// Core
import express from 'express';

import {
    getLesson,
    createLesson,
    getLessons,
    createVideo,
    createKeynote,
    getVideoByHash,
    deleteVideoByHash,
    getKeynoteByHash,
    deleteKeynoteByHash, getLessonByHash, updateLessonByHash, deleteLessonByHash,
} from './route';

export const router = express.Router();

// todo: define validation here
router.get('/', getLessons);
router.post('/',  createLesson);

// todo: define validation here
router.get('/:lessonHash', getLessonByHash);
router.put('/:lessonHash', updateLessonByHash);
router.delete('/:lessonHash', deleteLessonByHash);

router.post('/:lessonHash/videos',  createVideo);
router.post('/:lessonHash/keynotes',  createKeynote);

router.get('/:lessonHash/videos/:videoHash',  getVideoByHash);
router.delete('/:lessonHash/videos/:videoHash',  deleteVideoByHash);

router.get('/:lessonHash/keynotes/:keynoteHash',  getKeynoteByHash);
router.delete('/:lessonHash/keynotes/:keynoteHash',  deleteKeynoteByHash);

export { router as lessons };
