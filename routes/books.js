const express = require('express');
const router = express.Router();
const createBook= require('../controllers/booksController');
const exploreBooks=require("../controllers/booksExplore")

router.post('/create', createBook);
router.get('/bookExplore', exploreBooks);


module.exports = router;