const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);


//Create a Post
router.post('/createPost', mainController.createPost);


module.exports = router;