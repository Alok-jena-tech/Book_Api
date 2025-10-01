const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    publishDate: { type: Date },
  },
  { timestamps: true }
);


bookSchema.index({ name: "text", description: "text",author:"text" });


module.exports = mongoose.model("Book", bookSchema);
