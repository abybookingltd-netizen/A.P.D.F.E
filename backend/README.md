# HR Management System - Backend API

Backend API for the HR Management System built with Node.js, Express, MySQL2, and Sequelize.

## Features

- RESTful API endpoints for all entities
- JWT-based authentication
- Role-based authorization (Admin/Helper)
- MySQL database with Sequelize ORM
- CRUD operations for:
  - Users/Helpers
  - Projects with Goals
  - News Updates
  - Gallery Items
  - Events
  - Volunteers
  - Donations
  - Expenses

## Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Create MySQL database:
```sql
CREATE DATABASE hr_management;
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

5. Seed initial data (optional):
```bash
npm run seed
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/register-staff` - Register staff (Admin only)

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `PUT /api/users/profile` - Update current user profile
- `DELETE /api/users/:id` - Delete user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get news by ID
- `POST /api/news` - Create news
- `PUT /api/news/:id` - Update news
- `DELETE /api/news/:id` - Delete news

### Gallery
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get gallery item by ID
- `POST /api/gallery` - Create gallery item
- `PUT /api/gallery/:id` - Update gallery item
- `DELETE /api/gallery/:id` - Delete gallery item

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Volunteers
- `GET /api/volunteers` - Get all volunteers
- `POST /api/volunteers` - Create volunteer

### Donations
- `GET /api/donations` - Get all donations
- `POST /api/donations` - Create donation

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create expense

### Dashboard
- `GET /api/dashboard/aggregates` - Get dashboard statistics

## Environment Variables

See `.env.example` for all available configuration options.

## License

ISC
