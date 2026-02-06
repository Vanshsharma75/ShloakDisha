import mongoose from "mongoose";
import dotenv from "dotenv";
import Shloka from "../models/Shloka.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

const shlokas = [
  {
    _id: { $oid: "683ccc2c4d34111832eef890" },
    chapter_id: { $numberInt: "1" },
    chapter_number: { $numberInt: "1" },
    externalId: { $numberInt: "40" },
    id: { $numberInt: "40" },
    text: "कुलक्षये प्रणश्यन्ति कुलधर्माः सनातनाः।\n\nधर्मे नष्टे कुलं कृत्स्नमधर्मोऽभिभवत्युत।।1.40।।\n ",
    title: "Verse 40",
    verse_number: { $numberInt: "40" },
    verse_id: { $numberInt: "40" },
    transliteration:
      "kula-kṣhaye praṇaśhyanti kula-dharmāḥ sanātanāḥ\ndharme naṣhṭe kulaṁ kṛitsnam adharmo ’bhibhavaty uta\n",
    word_meanings:
      "kula-kṣhaye—in the destruction of a dynasty; praṇaśhyanti—are vanquished; kula-dharmāḥ—family traditions; sanātanāḥ—eternal; dharme—religion; naṣhṭe—is destroyed; kulam—family; kṛitsnam—the whole; adharmaḥ—irreligion; abhibhavati—overcome; uta—indeed\n",
  },
  // Add more shlokas in this format
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    await Shloka.deleteMany({});
    console.log("Cleared existing shlokas");

    await Shloka.insertMany(shlokas);
    console.log("Inserted new shlokas");

    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
