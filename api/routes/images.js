import express from 'express';
import { createImage, getImages, deleteImage } from '../controllers/images.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();
router.use(isAuthenticated);

router.get('/', getImages);
router.post('/', createImage);
router.delete('/:id', deleteImage);

export default router;
