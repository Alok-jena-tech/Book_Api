const Book = require("../models/books");

const createBook = async (req, res) => {
  try {
    const { name, description, author, publishDate } = req.body;

    // ✅ Validate required fields
    if (!name || !description || !author) {
      return res.status(400).json({
        success: false,
        message: "name, description, and author are required",
      });
    }

    // ✅ Validate publishDate if provided
    let pubDate;
    if (publishDate) {
      pubDate = new Date(publishDate);
      if (isNaN(pubDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid publishDate. Use YYYY-MM-DD format.",
        });
      }
    }

    const book = new Book({
      name,
      description,
      author,
      publishDate: pubDate,
    });

    const savedBook = await book.save();

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: savedBook,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = createBook;
