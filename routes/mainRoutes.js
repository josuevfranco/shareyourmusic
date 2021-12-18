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

//Group by Category
router.get('/category', mainController.category);

//Get all of the users
router.get('/ourUser', mainController.ourUser);

module.exports = router;