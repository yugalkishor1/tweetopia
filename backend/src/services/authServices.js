import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/userModel.js"


exports.register = async (req,res) => {
  try {
    
    const {username,email,fullName,password} = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.password, salt);

    const newUser = await User.create({
      username,
      email,
      password : hashedPassword,
      fullName,
      bio,
      profilePicture,
      coverPhoto,
    })
    if(newUser) return  res.json(newUser)

  } catch (error) {
    return res.json(error.message) 
  }
};


exports.login = async (req,res) => {
  try {
    const {email,password} = req.body
   
    const user = await User.find({email})

    if(!user) return res.json("invalid user")
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    return  res.json({ user, token });

  } catch (error) {
    return res.json(error.message) 
  }
};