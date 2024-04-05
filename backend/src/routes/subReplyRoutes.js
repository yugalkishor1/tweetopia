import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
 createSubReply,
 getSubReplies,
 updateSubReply,
 deleteSubReply,
 likeSubReply,
 unlikeSubReply,
} from '../controllers/subReplyController.js';

const router = express.Router({ mergeParams: true });

// Create a new sub-reply
router.post('/:replyId/sub-replies', auth, createSubReply);

// Get all sub-replies for a reply
router.get('/:replyId/sub-replies', getSubReplies);

// Update a sub-reply
router.put('/:replyId/sub-replies/:subReplyId', auth, updateSubReply);

// Delete a sub-reply
router.delete('/:replyId/sub-replies/:subReplyId', auth, deleteSubReply);

// Like a sub-reply
router.put('/:replyId/sub-replies/:subReplyId/like', auth, likeSubReply);

// Unlike a sub-reply
router.put('/:replyId/sub-replies/:subReplyId/unlike', auth, unlikeSubReply);

export default router;