import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    bio: { type: String },
    location: { type: String },
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
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });

  const userModel = mongoose.model("User",userSchema)

  export default userModel;