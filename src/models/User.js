import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  age: { type: Number },
  maritalStatus: { 
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    required: true
  },
  agree:{type: Boolean,require:true ,default:true},
  occupation: { type: String },
  location: { type: String },
  image: { type: String },
  profilePic: { type: String },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
