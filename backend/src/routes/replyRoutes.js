import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
 createReply,
 getReplies,
 updateReply,
 deleteReply,
 likeReply,
 unlikeReply,
} from '../controllers/replyController.js';

const router = express.Router({ mergeParams: true });

// Create a new reply
router.post('/:postId/replies', auth, createReply);

// Get all replies for a post
router.get('/:postId/replies', getReplies);

// Update a reply
router.put('/:postId/replies/:replyId', auth, updateReply);

// Delete a reply
router.delete('/:postId/replies/:replyId', auth, deleteReply);

// Like a reply
router.put('/:postId/replies/:replyId/like', auth, likeReply);

// Unlike a reply
router.put('/:postId/replies/:replyId/unlike', auth, unlikeReply);

export default router;