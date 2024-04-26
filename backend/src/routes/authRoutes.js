import express from 'express';
import { registerUser,loginUser } from '../controllers/authController.js';
import { validateRegistration,validateLogin} from '../middleware/validation.js';
// import { auth } from '../middleware/auth.js';
import fileUpload from '../middleware/upload.js';

const router = express.Router();

router.post('/register',
function(req,res,next){
    console.log("REQBODY",req.body);
    console.log("REQHEADERS",req.headers);
    console.log("REQRAWHEADERS",req.rawHeaders);
    next()
}
,fileUpload.single("profilePicture"),function(req,res,next){console.log("REQFILE",req.file);console.log(req.body);next()},validateRegistration,registerUser)

router.post('/login', validateLogin, loginUser);

// // Forgot password
// router.post('/forgot-password', validateForgotPassword, forgotPassword);

// // Reset password
// router.put('/reset-password/:token', validateResetPassword, resetPassword);

// // Get the authenticated user's profile
// router.get('/profile', auth, (req, res) => {
//   res.json({ user: req.user });
// });

export default router;