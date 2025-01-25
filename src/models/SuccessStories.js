const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Check if model already exists, if not, create it
const SuccessStory = mongoose.models.SuccessStory || mongoose.model('SuccessStory', successStorySchema);

module.exports = SuccessStory;
