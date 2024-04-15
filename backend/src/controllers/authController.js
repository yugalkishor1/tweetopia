import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password,fullName,bio,profilePicture} = req.body;
    console.log("REQFILE",profilePicture);
   

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists, Try another Email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password:hashedPassword, fullName, bio, profilePicture })

    res.status(200).json({message:"user created succesfully",user:newUser})
   
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Enter right password' });
    }

    const token = jwt.sign({ userId: user._id }, "my secret key");

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

// // Forgot password
// export const forgotPassword = async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate a reset token and save it to the user document
//     const resetToken = crypto.randomBytes(20).toString('hex');
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//     await user.save();

//     // Send a password reset email
//     const transporter = nodemailer.createTransport({
//       // Configure your email service provider
//     });

//     const mailOptions = {
//       from: 'your-email@example.com',
//       to: email,
//       subject: 'Password Reset Request',
//       text: `You have requested a password reset. Please click the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${resetToken}`,
//     };

//     transporter.sendMail(mailOptions, (err) => {
//       if (err) {
//         next(err);
//       } else {
//         res.status(200).json({ message: 'Password reset link sent to your email' });
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // Reset password
// export const resetPassword = async (req, res, next) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     // Check if the reset token is valid and not expired
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired reset token' });
//     }

//     // Hash the new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Update the user's password and remove the reset token
//     user.password = hashedPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();

//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (err) {
//     next(err);
//   }
// };