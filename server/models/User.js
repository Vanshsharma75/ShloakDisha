import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },

  // 🔽 New Editable Fields
  gender: { type: String },
  dob: { type: Date },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pincode: { type: String },
  avatar: { type: String }, // Add this line for avatar URL
  // Social + Gamification
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  points: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActive: { type: Date },
  badges: [{ type: String }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
