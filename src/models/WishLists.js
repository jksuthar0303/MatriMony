import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    profiles: [
      {
        profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the profile the user liked
        addedAt: { type: Date, default: Date.now }, // Timestamp when profile was added to wishlist
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);
