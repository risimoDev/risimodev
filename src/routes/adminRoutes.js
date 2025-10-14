const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
require('dotenv').config();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect(process.env.ADMIN_PATH + '/login');
  }
};

// Login routes
router.get('/login', AdminController.loginPage);
router.post('/login', AdminController.login);

// Logout route
router.get('/logout', AdminController.logout);

// Admin routes (protected)
router.get('/dashboard', isAdmin, AdminController.dashboard);
router.get('/projects', isAdmin, AdminController.projectsPage);
router.get('/services', isAdmin, AdminController.servicesPage);
router.get('/messages', isAdmin, AdminController.messagesPage);
router.get('/site-texts', isAdmin, AdminController.siteTextsPage);

// Project management routes
router.post('/projects/create', isAdmin, AdminController.createProject);
router.post('/projects/update', isAdmin, AdminController.updateProject);
router.post('/projects/delete', isAdmin, AdminController.deleteProject);

// Service management routes
router.post('/services/create', isAdmin, AdminController.createService);
router.post('/services/update', isAdmin, AdminController.updateService);
router.post('/services/delete', isAdmin, AdminController.deleteService);

// Message management routes
router.post('/messages/delete', isAdmin, AdminController.deleteMessage);

// Site text management routes
router.post('/site-texts/update', isAdmin, AdminController.updateSiteText);

module.exports = router;