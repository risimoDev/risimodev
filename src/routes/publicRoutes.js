const express = require('express');
const router = express.Router();
const PublicController = require('../controllers/publicController');

// Home page
router.get('/', PublicController.home);

// Portfolio page
router.get('/portfolio', PublicController.portfolio);

// Services page
router.get('/services', PublicController.services);

// Contact page
router.get('/contact', PublicController.contact);
router.post('/contact', PublicController.submitMessage);

module.exports = router;