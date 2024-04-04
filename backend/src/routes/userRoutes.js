import express from 'express';
import {
  createUser,
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowing,
} from '../controllers/userController.js';
import { authenticate } from '../middlewares/auth.js';

const userRoutes = express.Router();

router.post('/signup', createUser);

router.get('/profile/:userId', getUserProfile);

router.put('/profile', authenticate, updateUserProfile);

router.post('/follow/:userId', authenticate, followUser);

router.delete('/unfollow/:userId', authenticate, unfollowUser);

router.get('/followers/:userId', getUserFollowers);

router.get('/following/:userId', getUserFollowing);

export default userRoutes;