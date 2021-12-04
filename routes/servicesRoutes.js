const express = require('express');
const router = express.Router();

const controller = require('../controllers/servicesController');

router.get('/', controller.top);

module.exports = router;