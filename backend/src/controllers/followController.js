import User from '../models/userModel.js';

// Follow a user
export const followUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const followerId = req.user._id;

    // Check if the user is not trying to follow themselves
    if (userId.toString() === followerId.toString()) {
      return res.status(400).json({ message: 'You cannot follow yourself' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { followers: followerId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      followerId,
      { $push: { following: userId } },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Unfollow a user
export const unfollowUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const followerId = req.user._id;

    // Check if the user is not trying to unfollow themselves
    if (userId.toString() === followerId.toString()) {
      return res.status(400).json({ message: 'You cannot unfollow yourself' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { followers: followerId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      followerId,
      { $pull: { following: userId } },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Get a user's followers
export const getFollowers = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId)
      .populate({
        path: 'followers',
        select: 'username fullName profilePicture',
      })
      .select('followers');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.followers);
  } catch (err) {
    next(err);
  }
};

// Get a user's following
export const getFollowing = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId)
      .populate({
        path: 'following',
        select: 'username fullName profilePicture',
      })
      .select('following');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.following);
  } catch (err) {
    next(err);
  }
};