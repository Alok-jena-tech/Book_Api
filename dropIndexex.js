require('dotenv').config();

const mongoose = require("mongoose");
const Book = require("./models/books");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected");

    const result = await Book.collection.dropIndexes();
    console.log("✅ Indexes dropped:", result);

    const after = await Book.collection.getIndexes();
    console.log("📜 Current Indexes:", after);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.disconnect();
  }
})();
