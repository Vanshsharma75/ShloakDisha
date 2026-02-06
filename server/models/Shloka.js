import mongoose from 'mongoose';

const shlokaSchema = new mongoose.Schema({
  chapter_id: { type: Number, required: true },
  chapter_number: { type: Number, required: true },
  externalId: { type: Number },
  id: { type: Number },
  text: { type: String, required: true },
  title: { type: String },
  verse_number: { type: Number },
  verse_id: { type: Number },
  transliteration: { type: String },
  word_meanings: { type: String },
  translation: { type: String },
  explanation: { type: String },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Shloka = mongoose.model('Shloka', shlokaSchema);

export default Shloka;
