import User from '../models/userModel.js';

export const createUser = async (req, res, next) => {
  try {
    const { username,
    email,
    password,
    fullName,
    bio,
    profilePicture} = req.body;
    // const user = new User({ username, email, password, fullName });
    // await user.save();
    
    const exsistedUser = await  User.find( { $or: [{ username }, { email },{bio}] })
    const newUser = await User.create({username,email,password,fullName,bio,profilePicture})

    res.status(201).json({ message: 'User created successfully'});
  } catch (err) {
    next(err);
  }
};


export const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('following followers');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Update user profile
export const updateUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { fullName, bio, location, website } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { fullName, bio, location, website },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Follow a user
export const followUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { followUserId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { following: followUserId } },
      { new: true }
    );
    const followedUser = await User.findByIdAndUpdate(
      followUserId,
      { $addToSet: { followers: userId } },
      { new: true }
    );
    res.json({ message: `User ${userId} is now following ${followUserId}` });
  } catch (err) {
    next(err);
  }
};

// Unfollow a user
export const unfollowUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { unfollowUserId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { following: unfollowUserId } },
      { new: true }
    );
    const unfollowedUser = await User.findByIdAndUpdate(
      unfollowUserId,
      { $pull: { followers: userId } },
      { new: true }
    );
    res.json({ message: `User ${userId} has unfollowed ${unfollowUserId}` });
  } catch (err) {
    next(err);
  }
};

// Get user followers
export const getUserFollowers = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('followers');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.followers);
  } catch (err) {
    next(err);
  }
};

// Get users following
export const getUserFollowing = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('following');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.following);
  } catch (err) {
    next(err);
  }
};