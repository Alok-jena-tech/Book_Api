require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const booksRoutes=require("./routes/books")

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api",booksRoutes)
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log('Connected to MongoDB');
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
console.error('MongoDB connection error:', err);
process.exit(1);
});