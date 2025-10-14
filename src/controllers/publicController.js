const ProjectModel = require('../models/projectModel');
const ServiceModel = require('../models/serviceModel');
const MessageModel = require('../models/messageModel');
const SiteTextModel = require('../models/siteTextModel');

class PublicController {
  // Render home page
  static home(req, res) {
    SiteTextModel.getAll((err, texts) => {
      if (err) {
        console.error('Database error:', err);
        // Return default values if database error
        return res.render('index', { 
          siteTexts: {
            site_title: 'App & Website Marketplace',
            site_description: 'We create amazing mobile apps and custom websites',
            hero_title: 'Professional Mobile Apps & Custom Websites',
            hero_subtitle: 'Transform your ideas into reality with our expert development team'
          }
        });
      }
      
      // Convert texts array to object for easier access
      const siteTexts = {};
      texts.forEach(text => {
        siteTexts[text.key] = text.value;
      });
      
      res.render('index', { siteTexts });
    });
  }

  // Render portfolio page
  static portfolio(req, res) {
    ProjectModel.getAll((err, projects) => {
      if (err) {
        console.error('Database error:', err);
        // Return empty array if database error
        projects = [];
      }
      
      SiteTextModel.getByKey('portfolio_title', (err, title) => {
        if (err) {
          console.error('Database error:', err);
          // Return default title if database error
          return res.render('portfolio', { 
            projects,
            portfolioTitle: 'Our Portfolio'
          });
        }
        
        res.render('portfolio', { 
          projects,
          portfolioTitle: title ? title.value : 'Our Portfolio'
        });
      });
    });
  }

  // Render services page
  static services(req, res) {
    ServiceModel.getAll((err, services) => {
      if (err) {
        console.error('Database error:', err);
        // Return empty array if database error
        services = [];
      }
      
      SiteTextModel.getByKey('services_title', (err, title) => {
        if (err) {
          console.error('Database error:', err);
          // Return default title if database error
          return res.render('services', { 
            services,
            servicesTitle: 'Our Services'
          });
        }
        
        res.render('services', { 
          services,
          servicesTitle: title ? title.value : 'Our Services'
        });
      });
    });
  }

  // Render contact page
  static contact(req, res) {
    SiteTextModel.getByKey('contact_title', (err, title) => {
      if (err) {
        console.error('Database error:', err);
        // Return default title if database error
        return res.render('contact', { 
          contactTitle: 'Contact Us'
        });
      }
      
      res.render('contact', { 
        contactTitle: title ? title.value : 'Contact Us'
      });
    });
  }

  // Handle contact form submission
  static submitMessage(req, res) {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).send('All fields are required');
    }
    
    const newMessage = {
      name,
      email,
      message,
      created_at: new Date()
    };
    
    MessageModel.create(newMessage, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error saving message. Please try again.');
      }
      
      res.redirect('/contact?success=true');
    });
  }
}

module.exports = PublicController;