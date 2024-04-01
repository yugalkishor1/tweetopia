import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    bio: { type: String },
    location: { type: String },
    website: { type: String },
    profilePicture: { type: String }, // URL or file path
    coverPhoto: { type: String }, // URL or file path
    joinedAt: { type: Date, default: Date.now },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });

  const userModel = mongoose.model("User",userSchema)

  export default userModel;