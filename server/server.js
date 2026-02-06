import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Shloka from './models/Shloka.js';
import User from './models/User.js';
import { explainShloka } from './utils/mistral.js'; // ✅ Mistral via Hugging Face
import { getCache, setCache, keyForText } from './utils/aiCache.js';
import authRoutes from './routes/auth.js';
import auth from './middleware/auth.js';
// WebSocket removed; ws server disabled

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('🟢 ShloakDisha API is running');
});

// ✅ Routes
app.use('/api/auth', authRoutes);

// ✅ MongoDB Connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Profile Route
app.get('/api/profile', auth, async (req, res) => {
  if (!req.user?.userId) {
    return res.status(401).json({ error: 'Unauthorized - user not attached' });
  }

  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Shloka Routes
app.get('/api/shlokas', async (req, res) => {
  try {
    const { chapter, verse, page = 1, limit = 10 } = req.query;
    const query = {};
    if (chapter) query.chapter_number = parseInt(chapter);
    if (verse) query.verse_number = parseInt(verse);

    const totalDocs = await Shloka.countDocuments(query);
    const shlokas = await Shloka.find(query).sort({ chapter_number: 1, verse_number: 1 });

    res.json({
      shlokas,
      totalPages: Math.ceil(totalDocs / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch shlokas' });
  }
});

app.get('/api/shlokas/:id', async (req, res) => {
  try {
    const shloka = await Shloka.findById(req.params.id);
    if (!shloka) return res.status(404).json({ message: 'Shloka not found' });
    res.json(shloka);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch shloka' });
  }
});

app.post('/api/shlokas', async (req, res) => {
  try {
    const newShloka = new Shloka(req.body);
    const saved = await newShloka.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save shloka' });
  }
});

// ✅ Shloka Explanation (Falcon AI)
app.post('/api/explain', async (req, res) => {
  try {
    const { verse, shlokaId } = req.body;
    if (!verse) return res.status(400).json({ error: 'Verse is required for explanation' });

    const force = req.query.force === 'true' || req.body.force === true;

    // 1) check in-memory cache
    const key = keyForText(verse);
    if (!force) {
      const cached = getCache(key);
      if (cached) return res.json({ explanation: cached, cached: true, source: 'memory' });
    }

    // 2) check DB-stored explanation when shlokaId provided (unless forced)
    if (!force && shlokaId) {
      const existing = await Shloka.findById(shlokaId);
      if (existing?.explanation) {
        // put into memory cache
        try { setCache(key, existing.explanation); } catch (e) {}
        return res.json({ explanation: existing.explanation, cached: true, source: 'db' });
      }
    }

    // 3) call AI
    const explanation = await explainShloka(verse);

    // store in-memory and DB when possible
    try { setCache(key, explanation); } catch (e) {}
    if (shlokaId) {
      await Shloka.findByIdAndUpdate(shlokaId, { explanation });
    }

    res.json({ explanation, cached: false, source: 'ai' });
  } catch (err) {
    console.error("❌ Error in /api/explain:", err.message);
    res.status(500).json({ error: 'Failed to get explanation' });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
