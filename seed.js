require('dotenv').config();

const mongoose = require("mongoose");
const Book=require("./models/books")
const books = require("./booksData"); // the above array

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log("✅ Seeded books successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
