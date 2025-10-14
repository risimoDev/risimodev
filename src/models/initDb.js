const db = require('./db');

// Create tables
const createTables = () => {
  const projectsTable = `
    CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      link VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const servicesTable = `
    CREATE TABLE IF NOT EXISTS services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      price VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const messagesTable = `
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const siteTextsTable = `
    CREATE TABLE IF NOT EXISTS site_texts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      \`key\` VARCHAR(100) UNIQUE NOT NULL,
      value TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(projectsTable, (err) => {
    if (err) throw err;
    console.log('Projects table created or already exists');
  });

  db.query(servicesTable, (err) => {
    if (err) throw err;
    console.log('Services table created or already exists');
  });

  db.query(messagesTable, (err) => {
    if (err) throw err;
    console.log('Messages table created or already exists');
  });

  db.query(siteTextsTable, (err) => {
    if (err) throw err;
    console.log('Site texts table created or already exists');
    
    // Insert default site texts
    const defaultTexts = [
      ['site_title', 'App & Website Marketplace'],
      ['site_description', 'We create amazing mobile apps and custom websites for businesses of all sizes.'],
      ['hero_title', 'Professional Mobile Apps & Custom Websites'],
      ['hero_subtitle', 'Transform your ideas into reality with our expert development team'],
      ['portfolio_title', 'Our Portfolio'],
      ['services_title', 'Our Services'],
      ['contact_title', 'Get In Touch'],
      ['contact_subtitle', 'Have a project in mind? Reach out to us and let\'s build something amazing together.']
    ];
    
    defaultTexts.forEach(([key, value]) => {
      const checkQuery = 'SELECT * FROM site_texts WHERE `key` = ?';
      db.query(checkQuery, [key], (err, results) => {
        if (err) throw err;
        
        if (results.length === 0) {
          const insertQuery = 'INSERT INTO site_texts (`key`, value) VALUES (?, ?)';
          db.query(insertQuery, [key, value], (err) => {
            if (err) throw err;
            console.log(`Default site text "${key}" inserted`);
          });
        }
      });
    });
  });
};

// Initialize database
createTables();

console.log('Database initialization complete');