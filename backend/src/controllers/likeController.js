import Like from '../models/likeModel.js';
import Post from '../models/postModel.js';
import Reply from '../models/replyModel.js';

// Like a post
export const likePost = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;

    const existingLike = await Like.findOne({
      user: userId,
      likedItem: postId,
      likedItemType: 'Post',
    });

    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }

    const newLike = new Like({
      user: userId,
      likedItem: postId,
      likedItemType: 'Post',
    });

    await newLike.save();

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: userId } },
      { new: true }
    );

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

// Unlike a post
export const unlikePost = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;

    const existingLike = await Like.findOne({
      user: userId,
      likedItem: postId,
      likedItemType: 'Post',
    });

    if (!existingLike) {
      return res.status(400).json({ message: 'You have not liked this post' });
    }

    await existingLike.remove();

    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );

    res.status(200).json(post);
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

// Get likes for a post or reply
export const getLikes = async (req, res, next) => {
  try {
    const itemId = req.params.itemId;

    const likes = await Like.find({
      likedItem: itemId,
    }).populate('user', 'username fullName profilePicture');

    res.status(200).json(likes);
  } catch (err) {
    next(err);
  }
};