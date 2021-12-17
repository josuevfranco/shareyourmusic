const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);


//Create a Post
router.post('/createPost', mainController.createPost);

//Music News Category
router.get('/musicNews', mainController.musicNews);

//Taylor Swift
router.get('/taylorSwift', mainController.taylorSwift);

//Music Quotes
router.get('/musicQuotes', mainController.musicQuotes);

//Heart Break Songs
router.get('/heartBreakSongs', mainController.heartBreakSongs);

module.exports = router;