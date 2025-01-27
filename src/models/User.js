import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: {type: Number,},
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    agree: { type: Boolean, required: true, default: false },
    occupation: { type: String },
    location: { type: String },
    image: { type: String },
    profilePic: { type: String },
    wishlist: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isMutual: { type: Boolean, default: false },
      },
    ], // Wishlist with mutual tracking
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
