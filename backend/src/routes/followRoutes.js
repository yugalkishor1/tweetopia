import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
 followUser,
 unfollowUser,
 getFollowers,
 getFollowing,
} from '../controllers/followController.js';

const router = express.Router();

// Follow a user
router.put('/users/:userId/follow', auth, followUser);

// Unfollow a user
router.put('/users/:userId/unfollow', auth, unfollowUser);

// Get a user's followers
router.get('/users/:userId/followers', getFollowers);

// Get a user's following
router.get('/users/:userId/following', getFollowing);

export default router;