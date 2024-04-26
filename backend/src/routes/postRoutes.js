import express from 'express'
import {
  createPost,
  getAllPosts,
  getPostById,
  // updatePost,
  // deletePost,
  // likePost,
  // unlikePost,
  // retweetPost,
  // addComment,
  // getPostComments,
} from '../controllers/postController.js'

const router = express.Router();

router.post('/',  createPost);
router.get('/', getAllPosts);
router.get('/:postId', getPostById);

// // Update a post
// router.put('/:postId', updatePost);

// router.delete('/:postId',  deletePost);

// // Like a post
// router.put('/:postId/like',  likePost);

// // Unlike a post
// router.put('/:postId/unlike',  unlikePost);

// // Retweet a post
// router.put('/:postId/retweet',  retweetPost);

// // Add a comment to a post
// router.post('/:postId/comments',  addComment);

// // Get comments for a post
// router.get('/:postId/comments', getPostComments);

export default router;