const Book = require("../models/books");

function parseDate(str, endOfDay = false) {
  const [year, month, day] = str.split("-").map(Number);
  if (!year || !month || !day) return null;

  if (endOfDay) {
    // Set time to 23:59:59 for 'to' date filter
    return new Date(year, month - 1, day, 23, 59, 59, 999);
  } else {
    // Beginning of the day (00:00:00)
    return new Date(year, month - 1, day);
  }
}

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const exploreBooks = async (req, res) => {
  try {
    
    const index = await Book.collection.getIndexes();

    let {
      search,
      author,
      from,
      to,
      page = "1",
      limit = "10",
      sortBy = "publishDate",
      sortOrder = "desc",
    } = req.query;

    // normalize strings
    search = String(search || "").trim();
    author = String(author || "").trim();
    from = String(from || "").trim();
    to = String(to || "").trim();
    sortBy = String(sortBy || "publishDate").trim();
    sortOrder = String(sortOrder || "desc")
      .trim()
      .toLowerCase();

    const query = {};
    if (search.length > 0) {
      query.$text = { $search: search };
    }

    if (author.length > 0) {
      query.author = new RegExp(`^${escapeRegex(author)}$`, "i");
    }

    if (from.length > 0 || to.length > 0) {
      query.publishDate = {};
      if (from.length > 0) {
        const d = parseDate(from.trim());
        if (!d) {
          return res
            .status(400)
            .json({ message: "Invalid 'from' date. Use YYYY-MM-DD." });
        }
        query.publishDate.$gte = d;
      }

      if (to.length > 0) {
        const d = parseDate(to.trim(), true);
        if (!d) {
          return res
            .status(400)
            .json({ message: "Invalid 'to' date. Use YYYY-MM-DD." });
        }
        query.publishDate.$lte = d;
      }
    }

    // pagination
    const pageNumber = Math.max(1, parseInt(page) || 1);
    let pageSize = Math.min(Math.max(1, parseInt(limit) || 10), 50);
    const skip = (pageNumber - 1) * pageSize;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const books = await Book.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const total = await Book.countDocuments(query);

    res.json({
      total,
      page: pageNumber,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = exploreBooks;
