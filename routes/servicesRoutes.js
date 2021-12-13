const express = require('express');
const router = express.Router();

const controller = require('../controllers/servicesController');

router.get('/', controller.top);
router.get('/search', controller.search);

module.exports = router;