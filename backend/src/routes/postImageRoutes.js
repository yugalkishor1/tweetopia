import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
  uploadPostImages,
  getPostImages,
  deletePostImage,
} from '../controllers/postImageController.js';
import upload from '../middlewares/upload.js';

const router = express.Router({ mergeParams: true });

// Upload images for a post
router.post(
  '/:postId/images',
  auth,
  upload.array('images', 4),
  uploadPostImages
);

// Get images for a post
router.get('/:postId/images', getPostImages);

// Delete an image from a post
router.delete('/:postId/images/:imageId', auth, deletePostImage);

export default router;