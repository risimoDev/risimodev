# App & Website Marketplace

A complete Node.js + Express + MySQL project for selling mobile apps and custom websites.

## Features

- **Public Pages**: Home, Portfolio, Services, and Contact pages
- **Admin Panel**: Hidden admin panel at `/admin-XYZ123` with PIN code authentication
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Database Storage**: All data stored in MySQL database
- **Modular Architecture**: Clean separation of routes, controllers, and models

## Project Structure

```
project/
┣ public/
┃ ┣ index.html
┃ ┣ portfolio.html
┃ ┣ services.html
┃ ┣ contact.html
┃ ┣ assets/
┃ ┃ ┣ css/
┃ ┃ ┣ js/
┃ ┃ ┗ images/
┣ admin/
┃ ┣ index.html  (login form with PIN)
┃ ┣ dashboard.html (admin dashboard)
┃ ┣ projects.html (manage projects)
┃ ┣ services.html (manage services)
┃ ┣ messages.html (view messages)
┃ ┣ site-texts.html (edit site texts)
┃ ┣ js/
┃ ┗ css/
┣ src/
┃ ┣ app.js
┃ ┣ routes/
┃ ┃ ┣ publicRoutes.js
┃ ┃ ┣ adminRoutes.js
┃ ┣ controllers/
┃ ┃ ┣ publicController.js
┃ ┃ ┣ adminController.js
┃ ┣ models/
┃ ┃ ┣ db.js
┃ ┃ ┣ projectModel.js
┃ ┃ ┣ serviceModel.js
┃ ┃ ┣ messageModel.js
┃ ┃ ┗ siteTextModel.js
┣ .env
┣ package.json
┗ README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd app-website-marketplace
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a MySQL database using the provided `database-setup.sql` script
   - Update the database credentials in the `.env` file

4. Start the server:
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Database Setup

1. Create a MySQL database using the provided script:
   ```sql
   -- Create database
   CREATE DATABASE IF NOT EXISTS app_marketplace;
   USE app_marketplace;
   
   -- Create tables and insert default data
   -- (see database-setup.sql for full script)
   ```

2. Execute the full database setup script:
   ```bash
   mysql -u root -p < database-setup.sql
   ```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
ADMIN_PATH=/admin-XYZ123
ADMIN_PIN=1234

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=app_marketplace
```

## Admin Panel

Access the admin panel at `http://localhost:3000/admin-XYZ123`

Default PIN: `1234` (change in `.env` file)

Features:
- Dashboard with statistics
- Manage portfolio projects
- Manage services
- View and delete contact messages
- Edit site texts

## Database Schema

The application uses four tables:

1. **projects**: Store portfolio projects
2. **services**: Store service offerings
3. **messages**: Store contact form submissions
4. **site_texts**: Store editable site content

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Frontend**: HTML, Tailwind CSS, Vanilla JavaScript
- **Template Engine**: EJS
- **Other**: dotenv for environment variables

## Development

To run in development mode with auto-restart:
```bash
npm run dev
```

## License

This project is licensed under the MIT License.