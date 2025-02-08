// routes/notes.ts
import express from 'express';
import noteController from '../controllers/notesController.js';

const router = express.Router();

router.get('/notes', noteController.getAllNotes);
router.post('/notes', noteController.createNote);
router.put('/notes/:id', noteController.updateNote);
router.delete('/notes/:id', noteController.updateNote);

export default router;