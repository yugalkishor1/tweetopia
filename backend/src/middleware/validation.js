export const validateRegistration = (req, res, next) => {
  const { username, email, password, fullName, bio } = JSON.parse(req.body.data);
  if (!username ) {
    return res.status(400).json({ error: 'Username is required.' });
  }
  req.body.username = username.trim();

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
  }

  if (!fullName) {
    return res.status(400).json({ error: 'Full Name is required.' });
  }

  if (!bio) {
    return res.status(400).json({ error: 'Bio is required.' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'file is not uploaded properly' });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password is required.' });
  }

  next();
};




// export const validateForgotPassword = (req, res, next) => {
//   const { email } = req.body;

//   // Validate email
//   if (!email || !isEmail(email)) {
//     return res.status(400).json({ error: 'Invalid email address.' });
//   }

//   // If all validations pass, call the next middleware
//   next();
// };

// export const validateResetPassword = (req, res, next) => {
//   const { password } = req.body;

//   // Validate password
//   if (!password || password.length < 8 || !hasNumber(password) || !hasLowercase(password) || !hasUppercase(password)) {
//     return res.status(400).json({ error: 'Password must be at least 8 characters long, contain at least one number, one lowercase letter, and one uppercase letter.' });
//   }

//   // If all validations pass, call the next middleware
//   next();
// };

// // Helper functions
// function isEmail(email) {
//   // Email validation logic
//   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
// }

// function hasNumber(str) {
//   return /\d/.test(str);
// }

// function hasLowercase(str) {
//   return /[a-z]/.test(str);
// }

// function hasUppercase(str) {
//   return /[A-Z]/.test(str);
// }