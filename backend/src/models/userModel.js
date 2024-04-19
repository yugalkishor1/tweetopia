import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String },
    bio: { type: String },
    location: { type: String },
    posts: [{ type: mongoose.Schema.ObjectId,ref:"postModel" }],
    website: { type: String },
    profilePicture:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"UserImage"
    },
    coverPhoto:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"UserImage"
    },
    joinedAt: { type: Date, default: Date.now },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }]
  });

  const userModel = mongoose.model("userModel",userSchema)

  export default userModel;