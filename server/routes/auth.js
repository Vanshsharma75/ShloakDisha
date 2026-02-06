import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Configure multer for avatar uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// ===== Signup =====
router.post('/signup', async (req, res) => {
  const { fullName, username, email, phone, password } = req.body;

  if (!fullName || !username || !email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'Email already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, username, email, phone, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ===== Login =====
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password.' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ===== View Profile =====
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// ===== Follow a user =====
router.post('/users/:id/follow', auth, async (req, res) => {
  try {
    const targetId = req.params.id;
    const me = await User.findById(req.user.userId);
    const target = await User.findById(targetId);
    if (!me || !target) return res.status(404).json({ error: 'User not found.' });
    if (me.following.includes(targetId)) return res.status(400).json({ error: 'Already following.' });

    me.following.push(targetId);
    target.followers.push(me._id);
    await me.save();
    await target.save();

    res.json({ message: 'Followed.' });
  } catch (err) {
    console.error('Follow error:', err);
    res.status(500).json({ error: 'Failed to follow user.' });
  }
});

// ===== Unfollow a user =====
router.post('/users/:id/unfollow', auth, async (req, res) => {
  try {
    const targetId = req.params.id;
    const me = await User.findById(req.user.userId);
    const target = await User.findById(targetId);
    if (!me || !target) return res.status(404).json({ error: 'User not found.' });
    if (!me.following.includes(targetId)) return res.status(400).json({ error: 'Not following.' });

    me.following = me.following.filter(id => id.toString() !== targetId.toString());
    target.followers = target.followers.filter(id => id.toString() !== me._id.toString());
    await me.save();
    await target.save();

    res.json({ message: 'Unfollowed.' });
  } catch (err) {
    console.error('Unfollow error:', err);
    res.status(500).json({ error: 'Failed to unfollow user.' });
  }
});

// ===== Leaderboard =====
router.get('/users/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const top = await User.find({}).select('username fullName points badges avatar').sort({ points: -1 }).limit(limit).lean();
    res.json({ leaderboard: top });
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard.' });
  }
});

// ===== Record activity (points/streaks) =====
router.post('/activity', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const points = Number(req.body.points || 10);
    user.points = (user.points || 0) + points;

    const today = new Date();
    const last = user.lastActive ? new Date(user.lastActive) : null;
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = last && last.toDateString() === today.toDateString();
    const wasYesterday = last && last.toDateString() === yesterday.toDateString();

    if (!isSameDay) {
      if (wasYesterday) user.streak = (user.streak || 0) + 1;
      else user.streak = 1;
      user.lastActive = today;
    }

    // award simple badges
    const badges = new Set(user.badges || []);
    if (user.streak >= 7) badges.add('7-day-streak');
    if (user.points >= 100) badges.add('100-points');
    user.badges = Array.from(badges);

    await user.save();
    res.json({ message: 'Activity recorded.', points: user.points, streak: user.streak, badges: user.badges });
  } catch (err) {
    console.error('Activity error:', err);
    res.status(500).json({ error: 'Failed to record activity.' });
  }
});

// ===== Update Profile =====
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = {
      fullName: req.body.fullName,
      username: req.body.username,
      phone: req.body.phone,
      gender: req.body.gender,
      dob: req.body.dob,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      pincode: req.body.pincode
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updates },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// ===== Request Password Reset =====
router.post('/request-reset', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  try {
    const user = await User.findOne({ email });
    // Always return success message to avoid leaking whether email exists
    if (!user) return res.json({ message: 'If an account exists, a reset token was sent.' });

    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // NOTE: In production you should email this token to the user. For now we return it
    // to enable testing in development.
    res.json({ message: 'Reset token generated.', resetToken });
  } catch (err) {
    console.error('Request reset error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ===== Reset Password (using token) =====
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ error: 'Token and new password are required.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(400).json({ error: 'Invalid or expired token.' });
  }
});

// ===== Change Password (authenticated) =====
router.put('/change-password', auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.status(400).json({ error: 'Old and new passwords are required.' });

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Old password is incorrect.' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ===== Update Profile =====
router.put('/profile', auth, async (req, res) => {
  const { fullName, username, phone, gender, dob, address, city, state, country, pincode, avatar } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    // Update fields
    if (fullName) user.fullName = fullName;
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;
    if (address) user.address = address;
    if (city) user.city = city;
    if (state) user.state = state;
    if (country) user.country = country;
    if (pincode) user.pincode = pincode;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.json({ message: 'Profile updated successfully.', user });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ===== Upload Avatar =====
router.post('/upload-avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    // Convert buffer to Base64 data URI
    const base64Avatar = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    user.avatar = base64Avatar;
    await user.save();

    res.json({ message: 'Avatar uploaded successfully.', avatar: base64Avatar });
  } catch (err) {
    console.error('Upload avatar error:', err);
    res.status(500).json({ error: 'Failed to upload avatar.' });
  }
});

export default router;
