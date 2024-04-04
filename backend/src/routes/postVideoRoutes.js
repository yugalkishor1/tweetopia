import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
 uploadPostVideo,
 getPostVideo,
 deletePostVideo,
} from '../controllers/postVideoController.js';
import upload from '../middlewares/upload.js';

const router = express.Router({ mergeParams: true });

// Upload a video for a post
router.post(
 '/:postId/video',
 auth,
 upload.single('video'),
 uploadPostVideo
);

// Get a video for a post
router.get('/:postId/video', getPostVideo);

// Delete a video from a post
router.delete('/:postId/video/:videoId', auth, deletePostVideo);

export default router;