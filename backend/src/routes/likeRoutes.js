import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
 likePost,
 unlikePost,
 likeReply,
 unlikeReply,
 getLikes,
} from '../controllers/likeController.js';

const router = express.Router();

// Like a post
router.put('/posts/:postId/like', auth, likePost);

// Unlike a post
router.put('/posts/:postId/unlike', auth, unlikePost);

// Like a reply
router.put('/replies/:replyId/like', auth, likeReply);

// Unlike a reply
router.put('/replies/:replyId/unlike', auth, unlikeReply);

// Get likes for a post or reply
router.get('/:itemId', auth, getLikes);

export default router;