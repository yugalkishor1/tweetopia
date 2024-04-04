import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  retweetPost,
  addComment,
  getPostComments,
} from '../controllers/postController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Create a new post
router.post('/', auth, createPost);

// Get all posts
router.get('/', getAllPosts);

// Get a post by id
router.get('/:postId', getPostById);

// Update a post
router.put('/:postId', auth, updatePost);

// Delete a post
router.delete('/:postId', auth, deletePost);

// Like a post
router.put('/:postId/like', auth, likePost);

// Unlike a post
router.put('/:postId/unlike', auth, unlikePost);

// Retweet a post
router.put('/:postId/retweet', auth, retweetPost);

// Add a comment to a post
router.post('/:postId/comments', auth, addComment);

// Get comments for a post
router.get('/:postId/comments', getPostComments);

export default router;