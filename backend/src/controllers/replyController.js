import Reply from '../models/replyModel.js';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import Like from '../models/likeModel.js';

// Create a new reply
export const createReply = async (req, res, next) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newReply = new Reply({
      text,
      user: userId,
      post: postId,
    });

    const savedReply = await newReply.save();
    post.replies.push(savedReply._id);
    await post.save();

    res.status(201).json(savedReply);
  } catch (err) {
    next(err);
  }
};

// Get all replies for a post
export const getReplies = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId).populate({
      path: 'replies',
      populate: {
        path: 'user',
        select: 'username fullName profilePicture',
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post.replies);
  } catch (err) {
    next(err);
  }
};

// Update a reply
export const updateReply = async (req, res, next) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;
    const postId = req.params.postId;
    const replyId = req.params.replyId;

    const reply = await Reply.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    if (reply.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this reply' });
    }

    reply.text = text;
    reply.updatedAt = Date.now();

    const updatedReply = await reply.save();
    res.status(200).json(updatedReply);
  } catch (err) {
    next(err);
  }
};

// Delete a reply
export const deleteReply = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;
    const replyId = req.params.replyId;

    const reply = await Reply.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    if (reply.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this reply' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.replies = post.replies.filter((reply) => reply.toString() !== replyId);
    await post.save();

    await Like.deleteMany({ likedItem: replyId, likedItemType: 'Reply' });
    await reply.remove();

    res.status(200).json({ message: 'Reply deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Like a reply
export const likeReply = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const replyId = req.params.replyId;

    const existingLike = await Like.findOne({
      user: userId,
      likedItem: replyId,
      likedItemType: 'Reply',
    });

    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this reply' });
    }

    const newLike = new Like({
      user: userId,
      likedItem: replyId,
      likedItemType: 'Reply',
    });

    await newLike.save();

    const reply = await Reply.findByIdAndUpdate(
      replyId,
      { $push: { likes: userId } },
      { new: true }
    );

    res.status(200).json(reply);
  } catch (err) {
    next(err);
  }
};

// Unlike a reply
export const unlikeReply = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const replyId = req.params.replyId;

    const existingLike = await Like.findOne({
      user: userId,
      likedItem: replyId,
      likedItemType: 'Reply',
    });

    if (!existingLike) {
      return res.status(400).json({ message: 'You have not liked this reply' });
    }

    await existingLike.remove();

    const reply = await Reply.findByIdAndUpdate(
      replyId,
      { $pull: { likes: userId } },
      { new: true }
    );

    res.status(200).json(reply);
  } catch (err) {
    next(err);
  }
};