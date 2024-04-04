import User from '../models/userModel.js';
import UserImage from '../models/userImageModel.js';
import fs from 'fs';
import path from 'path';

// Upload a new profile picture
export const uploadProfilePicture = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { filename, size, mimetype } = req.file;
    const dimensions = { width: req.file.width, height: req.file.height };

    // Create a new UserImage document
    const newUserImage = new UserImage({
      userId: user._id,
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/${filename}`,
      imageType: 'profilePicture',
      dimensions,
      size,
      mimetype,
    });

    const savedUserImage = await newUserImage.save();

    // Update the user's profilePicture field
    user.profilePicture = savedUserImage._id;
    await user.save();

    res.status(201).json(savedUserImage);
  } catch (err) {
    next(err);
  }
};

// Upload a new cover photo
export const uploadCoverPhoto = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { filename, size, mimetype } = req.file;
    const dimensions = { width: req.file.width, height: req.file.height };

    // Create a new UserImage document
    const newUserImage = new UserImage({
      userId: user._id,
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/${filename}`,
      imageType: 'coverPhoto',
      dimensions,
      size,
      mimetype,
    });

    const savedUserImage = await newUserImage.save();

    // Update the user's coverPhoto field
    user.coverPhoto = savedUserImage._id;
    await user.save();

    res.status(201).json(savedUserImage);
  } catch (err) {
    next(err);
  }
};

// Get a user's profile picture
export const getProfilePicture = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('profilePicture');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.profilePicture) {
      return res.status(404).json({ message: 'Profile picture not found' });
    }

    res.status(200).json(user.profilePicture);
  } catch (err) {
    next(err);
  }
};

// Get a user's cover photo
export const getCoverPhoto = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('coverPhoto');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.coverPhoto) {
      return res.status(404).json({ message: 'Cover photo not found' });
    }

    res.status(200).json(user.coverPhoto);
  } catch (err) {
    next(err);
  }
};

// Delete a user's profile picture
export const deleteProfilePicture = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('profilePicture');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.profilePicture) {
      return res.status(404).json({ message: 'Profile picture not found' });
    }

    // Delete the image file from the uploads directory
    const imagePath = path.join(__dirname, '..', 'uploads', user.profilePicture.imageUrl.split('/').pop());
    fs.unlinkSync(imagePath);

    // Delete the UserImage document from the database
    await UserImage.findByIdAndDelete(user.profilePicture._id);

    // Update the user's profilePicture field
    user.profilePicture = null;
    await user.save();

    res.status(200).json({ message: 'Profile picture deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Delete a user's cover photo
export const deleteCoverPhoto = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('coverPhoto');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.coverPhoto) {
      return res.status(404).json({ message: 'Cover photo not found' });
    }

    // Delete the image file from the uploads directory
    const imagePath = path.join(__dirname, '..', 'uploads', user.coverPhoto.imageUrl.split('/').pop());
    fs.unlinkSync(imagePath);

    // Delete the UserImage document from the database
    await UserImage.findByIdAndDelete(user.coverPhoto._id);

    // Update the user's coverPhoto field
    user.coverPhoto = null;
    await user.save();

    res.status(200).json({ message: 'Cover photo deleted successfully' });
  } catch (err) {
    next(err);
  }
};