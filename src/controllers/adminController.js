const ProjectModel = require('../models/projectModel');
const ServiceModel = require('../models/serviceModel');
const MessageModel = require('../models/messageModel');
const SiteTextModel = require('../models/siteTextModel');
const path = require('path');
require('dotenv').config();

class AdminController {
  // Render admin login page
  static loginPage(req, res) {
    res.sendFile(path.join(__dirname, '../../admin/index.html'));
  }

  // Handle admin login
  static login(req, res) {
    const { pin } = req.body;
    
    if (pin === process.env.ADMIN_PIN) {
      req.session.isAdmin = true;
      res.redirect(process.env.ADMIN_PATH + '/dashboard');
    } else {
      // For simplicity, we'll just send the login page again with an error
      res.sendFile(path.join(__dirname, '../../admin/index.html'));
    }
  }

  // Handle admin logout
  static logout(req, res) {
    req.session.isAdmin = false;
    res.redirect(process.env.ADMIN_PATH + '/login');
  }

  // Render admin dashboard
  static dashboard(req, res) {
    // Get counts for dashboard
    ProjectModel.getAll((err, projects) => {
      if (err) {
        console.error('Database error:', err);
        projects = [];
      }
      
      ServiceModel.getAll((err, services) => {
        if (err) {
          console.error('Database error:', err);
          services = [];
        }
        
        MessageModel.getAll((err, messages) => {
          if (err) {
            console.error('Database error:', err);
            messages = [];
          }
          
          // For simplicity, we'll send the dashboard file directly
          // In a real application, you might want to use a templating engine
          res.sendFile(path.join(__dirname, '../../admin/dashboard.html'));
        });
      });
    });
  }

  // Render projects management page
  static projectsPage(req, res) {
    ProjectModel.getAll((err, projects) => {
      if (err) {
        console.error('Database error:', err);
        projects = [];
      }
      
      // For simplicity, we'll send the projects file directly
      res.sendFile(path.join(__dirname, '../../admin/projects.html'));
    });
  }

  // Render services management page
  static servicesPage(req, res) {
    ServiceModel.getAll((err, services) => {
      if (err) {
        console.error('Database error:', err);
        services = [];
      }
      
      // For simplicity, we'll send the services file directly
      res.sendFile(path.join(__dirname, '../../admin/services.html'));
    });
  }

  // Render messages management page
  static messagesPage(req, res) {
    MessageModel.getAll((err, messages) => {
      if (err) {
        console.error('Database error:', err);
        messages = [];
      }
      
      // For simplicity, we'll send the messages file directly
      res.sendFile(path.join(__dirname, '../../admin/messages.html'));
    });
  }

  // Render site text management page
  static siteTextsPage(req, res) {
    SiteTextModel.getAll((err, texts) => {
      if (err) {
        console.error('Database error:', err);
        texts = [];
      }
      
      // For simplicity, we'll send the site-texts file directly
      res.sendFile(path.join(__dirname, '../../admin/site-texts.html'));
    });
  }

  // Handle create project
  static createProject(req, res) {
    const { title, description, link } = req.body;
    
    if (!title || !description) {
      return res.status(400).send('Title and description are required');
    }
    
    const project = {
      title,
      description,
      link: link || '',
      created_at: new Date()
    };
    
    ProjectModel.create(project, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error creating project. Please try again.');
      }
      
      res.redirect(process.env.ADMIN_PATH + '/projects');
    });
  }

  // Handle update project
  static updateProject(req, res) {
    const { id, title, description, link } = req.body;
    
    if (!id || !title || !description) {
      return res.status(400).send('ID, title and description are required');
    }
    
    const project = {
      title,
      description,
      link: link || ''
    };
    
    ProjectModel.update(id, project, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error updating project. Please try again.');
      }
      
      res.redirect(process.env.ADMIN_PATH + '/projects');
    });
  }

  // Handle delete project
  static deleteProject(req, res) {
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).send('ID is required');
    }
    
    ProjectModel.delete(id, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error deleting project. Please try again.');
      }
      
      res.redirect(process.env.ADMIN_PATH + '/projects');
    });
  }

  // Handle create service
  static createService(req, res) {
    const { title, description, price } = req.body;
    
    if (!title || !description) {
      return res.status(400).send('Title and description are required');
    }
    
    const service = {
      title,
      description,
      price: price || '',
      created_at: new Date()
    };
    
    ServiceModel.create(service, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error creating service. Please try again.');
      }
      
      res.redirect(process.env.ADMIN_PATH + '/services');
    });
  }

  // Handle update service
  static updateService(req, res) {
    const { id, title, description, price } = req.body;
    
    if (!id || !title || !description) {
      return res.status(400).send('ID, title and description are required');
    }
    
    const service = {
      title,
      description,
      price: price || ''
    };
    
    ServiceModel.update(id, service, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error updating service. Please try again.');
      }
      
      res.redirect(process.env.ADMIN_PATH + '/services');
    });
  }

  // Handle delete service
  static deleteService(req, res) {
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).send('ID is required');
    }
    
    ServiceModel.delete(id, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error deleting service. Please try again.');
      }
      
      res.redirect(process.env.ADMIN_PATH + '/services');
    });
  }

  // Handle delete message
  static deleteMessage(req, res) {
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).send('ID is required');
    }
    
    MessageModel.delete(id, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error deleting message. Please try again.');
      }
      
      res.redirect(process.env.ADMIN_PATH + '/messages');
    });
  }

  // Handle update site text
  static updateSiteText(req, res) {
    const { key, value } = req.body;
    
    if (!key || !value) {
      return res.status(400).send('Key and value are required');
    }
    
    SiteTextModel.update(key, value, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error updating site text. Please try again.');
      }
      
      res.redirect(process.env.ADMIN_PATH + '/site-texts');
    });
  }
}

module.exports = AdminController;