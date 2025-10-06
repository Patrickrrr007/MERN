# MERN Stack Product Management System 🚀

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) for managing products with user authentication.

## 📋 Table of Contents

- [MERN Stack Product Management System 🚀](#mern-stack-product-management-system-)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🛠 Tech Stack](#-tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Development Tools](#development-tools)
  - [📋 Prerequisites](#-prerequisites)
  - [🚀 Installation](#-installation)
  - [⚙️ Configuration](#️-configuration)
    - [MongoDB Setup](#mongodb-setup)
    - [JWT Secret](#jwt-secret)
  - [🎯 Usage](#-usage)
    - [Development Mode](#development-mode)
  - [🔌 API Endpoints](#-api-endpoints)
    - [Authentication](#authentication)
    - [Products](#products)
  - [📁 Project Structure](#-project-structure)
  - [🚀 Deployment](#-deployment)
    - [Vercel Deployment](#vercel-deployment)
    - [Railway Deployment](#railway-deployment)
    - [Environment Variables for Production](#environment-variables-for-production)
  - [📸 Screenshots](#-screenshots)
  - [🤝 Contributing](#-contributing)
  - [📝 License](#-license)
  - [👨‍💻 Author](#-author)

## ✨ Features

- **User Authentication**: Register and login functionality with JWT tokens
- **Product Management**: Create, view, and manage products
- **Responsive Design**: Modern UI built with Tailwind CSS and Chakra UI
- **State Management**: Zustand for efficient state management
- **Real-time Updates**: Dynamic product listing and user interactions
- **Secure API**: Protected routes with authentication middleware
- **Database Integration**: MongoDB with Mongoose ODM

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Chakra UI** - Component library
- **React Router DOM** - Client-side routing
- **Zustand** - State management
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Nodemon** - Development server
- **ESLint** - Code linting
- **Concurrently** - Run multiple commands

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "MERN 3"
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5003
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   ```

## ⚙️ Configuration

### MongoDB Setup
1. Create a MongoDB database (local or cloud)
2. Update the `MONGODB_URI` in your `.env` file
3. For local MongoDB: `mongodb://localhost:27017/your_database_name`
4. For MongoDB Atlas: Use your connection string

### JWT Secret
Generate a secure JWT secret for token signing:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🎯 Usage

### Development Mode

1. **Start the backend server**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5003`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`


## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product (protected)
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

## 📁 Project Structure

```
MERN 3/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── auth.controller.js # Authentication logic
│   │   └── product.controller.js # Product logic
│   ├── models/
│   │   ├── user.model.js      # User schema
│   │   └── product.model.js   # Product schema
│   ├── routes/
│   │   ├── auth.route.js      # Authentication routes
│   │   └── product.route.js   # Product routes
│   ├── utils/
│   │   └── generateToken.js   # JWT token generation
│   └── server.js              # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Navigation component
│   │   │   └── ProductCard.jsx # Product display component
│   │   ├── pages/
│   │   │   ├── HomePage.jsx   # Home page
│   │   │   ├── CreatePage.jsx # Product creation page
│   │   │   ├── LoginPage.jsx  # Login page
│   │   │   └── RegisterPage.jsx # Registration page
│   │   ├── store/
│   │   │   └── product.js     # Zustand store
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # App entry point
│   ├── dist/                  # Built frontend files
│   └── package.json
├── api/                       # Vercel serverless functions
├── package.json               # Root package.json
├── vercel.json               # Vercel deployment config
├── railway.json              # Railway deployment config
└── README.md
```

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Railway Deployment
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy using the `railway.json` configuration

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=your_frontend_url
```

## 📸 Screenshots

Check the `Screenshot/` directory for application screenshots showing:
- Home page with product listing
- User authentication pages
- Product creation interface
- Responsive design on different devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created as part of CS628 coursework - Winter 2025

---

**Happy Coding! 🎉**

For any questions or support, please open an issue in the repository.
