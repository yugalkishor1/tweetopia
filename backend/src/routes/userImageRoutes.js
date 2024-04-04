import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
  uploadProfilePicture,
  uploadCoverPhoto,
  getProfilePicture,
  getCoverPhoto,
  deleteProfilePicture,
  deleteCoverPhoto,
} from '../controllers/userImageController.js';
import upload from '../middlewares/upload.js';

const router = express.Router({ mergeParams: true });

// Upload a new profile picture
router.post(
  '/:userId/profile-picture',
  auth,
  upload.single('profilePicture'),
  uploadProfilePicture
);

// Upload a new cover photo
router.post(
  '/:userId/cover-photo',
  auth,
  upload.single('coverPhoto'),
  uploadCoverPhoto
);

// Get a user's profile picture
router.get('/:userId/profile-picture', getProfilePicture);

// Get a user's cover photo
router.get('/:userId/cover-photo', getCoverPhoto);

// Delete a user's profile picture
router.delete('/:userId/profile-picture', auth, deleteProfilePicture);

// Delete a user's cover photo
router.delete('/:userId/cover-photo', auth, deleteCoverPhoto);

export default router;