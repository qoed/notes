import express from 'express';
import { createNote, getNotes, updateNote, deleteNote, getNote } from '../controllers/notes.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.use(isAuthenticated);
// prettier-ignore
router.route('/')
  .get(getNotes)
  .post(createNote);
// prettier-ignore
router.route('/:id')
  .get(getNote)
  .patch(updateNote)
  .delete(deleteNote);

export default router;
