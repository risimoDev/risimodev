const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session middleware (simplified for this example)
app.use(require('express-session')({
  secret: 'app-marketplace-secret',
  resave: false,
  saveUninitialized: true
}));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, '../public'),
  path.join(__dirname, '../admin')
]);

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Routes
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', publicRoutes);
app.use(process.env.ADMIN_PATH, adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Handle 404
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Admin panel accessible at http://localhost:${PORT}${process.env.ADMIN_PATH}`);
  console.log('Make sure to set up your MySQL database using the database-setup.sql script');
});

module.exports = app;