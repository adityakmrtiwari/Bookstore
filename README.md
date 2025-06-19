# 📚 BookStore - Full Stack Book Management System

A modern, responsive full-stack web application for managing personal book collections with user authentication, CRUD operations, and beautiful UI/UX.

![BookStore](https://img.shields.io/badge/BookStore-Live%20Production-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-blue)

## 🌐 Live Demo

**Frontend**: https://bookstore-psi-lime.vercel.app/  
**Backend API**: https://bookstore-backend-6p4c.onrender.com  
**Health Check**: https://bookstore-backend-6p4c.onrender.com/api/health

## ✨ Features

### 🎯 Core Functionality
- **User Authentication** - Secure login/signup with JWT tokens
- **Book Management** - Full CRUD operations for personal book collections
- **User Dashboard** - Personalized book management interface
- **Responsive Design** - Mobile-first approach with modern UI/UX
- **Real-time Stats** - Live statistics and book analytics

### 🎨 Modern UI/UX
- **Dark Theme** - Elegant dark gradient design
- **Purple-Pink Accents** - Modern color scheme with gradients
- **Smooth Animations** - Enhanced hover effects and transitions
- **Icon Animations** - Interactive icons with rotation and scale effects
- **Loading States** - Professional loading spinners and feedback

### 🔒 Security Features
- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - User-specific data access
- **Input Validation** - Server-side validation and sanitization
- **Error Handling** - Comprehensive error management
- **CORS Protection** - Secure cross-origin resource sharing

## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| React Router | 6.8.0 | Client-side routing |
| CSS3 | - | Styling with modern features |
| Axios | 1.8.4 | HTTP client |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 22.16.0 | Runtime environment |
| Express.js | 4.18.2 | Web framework |
| MongoDB | 6.0+ | Database |
| Mongoose | 8.13.2 | ODM for MongoDB |
| JWT | 9.0.2 | Authentication |
| bcryptjs | 2.4.3 | Password hashing |
| cors | 2.8.5 | Cross-origin resource sharing |

### Development Tools
| Tool | Purpose |
|------|---------|
| nodemon | Development server with auto-restart |
| dotenv | Environment variable management |

## 📁 Project Structure

```
Bookstore/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   │   ├── logo-bookstore.jpeg
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── BookForm.js
│   │   │   ├── BookList.js
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js
│   │   │   └── Dashboard.js
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── App.js          # Main application component
│   │   ├── App.css         # Global styles
│   │   ├── index.js        # Application entry point
│   │   └── index.css       # Global CSS variables and styles
│   ├── package.json
│   └── README.md
├── backend/                 # Node.js backend API
│   ├── config/             # Configuration files
│   │   └── db.js          # Database connection
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   └── statsController.js
│   ├── middlewares/        # Custom middlewares
│   │   └── authMiddleware.js
│   ├── models/            # Database models
│   │   ├── Book.js
│   │   └── User.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   └── stats.js
│   ├── scripts/           # Utility scripts
│   │   └── migrateBooks.js
│   ├── utils/             # Utility functions
│   │   └── errorHandler.js
│   ├── server.js          # Express server
│   └── package.json
├── DEPLOYMENT.md          # Deployment guide
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/adityakmrtiwari/Bookstore.git
   cd Bookstore/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_refresh_secret_key
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/refresh` - Refresh JWT token

### Books
- `GET /api/books` - Get user's books
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Statistics
- `GET /api/stats` - Get user statistics

### Health Check
- `GET /api/health` - Server health status

## 🎨 UI Components

### Pages
- **Home** - Landing page with features and statistics
- **Dashboard** - User's book management interface
- **Login** - User authentication
- **Signup** - User registration

### Components
- **BookForm** - Add/edit book form with validation
- **BookList** - Display books in responsive table
- **Navigation** - Header with logo and navigation links

## 🚀 Deployment

### Production Deployment

This application is currently deployed using:
- **Frontend**: Vercel (https://bookstore-psi-lime.vercel.app/)
- **Backend**: Render (https://bookstore-backend-6p4c.onrender.com)
- **Database**: MongoDB Atlas

### Environment Variables for Production

**Backend (Render)**
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
NODE_ENV=production
FRONTEND_URL=https://bookstore-psi-lime.vercel.app
```

**Frontend (Vercel)**
```env
REACT_APP_API_BASE_URL=https://bookstore-backend-6p4c.onrender.com/api
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🔧 Configuration

### Database Schema

**User Model**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Book Model**
```javascript
{
  title: String,
  author: String,
  category: String,
  price: Number,
  rating: Number,
  publishedDate: Date,
  userId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Available Categories
- Fiction
- Non-Fiction
- Science
- Technology
- History
- Biography
- Self-Help

## 🎯 Features in Detail

### User Authentication
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Protected routes and middleware
- Session management
- Token refresh functionality

### Book Management
- Add new books with validation
- Edit existing book details
- Delete books with confirmation
- Category-based organization
- Rating and price tracking

### User Interface
- Responsive design for all devices
- Modern dark theme with gradients
- Smooth animations and transitions
- Interactive hover effects
- Loading states and error handling

### Data Persistence
- MongoDB Atlas cloud database
- Mongoose ODM for data modeling
- User-specific data isolation
- Real-time statistics

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify connection string in `.env`
   - Check network connectivity
   - Ensure MongoDB service is running

2. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Clear browser storage if needed

3. **CORS Errors**
   - Update FRONTEND_URL in backend
   - Check frontend API URL configuration
   - Ensure no trailing slashes in URLs

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

## 📊 Performance

- **Bundle Size**: ~89KB (gzipped)
- **CSS Size**: ~5KB (gzipped)
- **Load Time**: < 2 seconds
- **Responsive**: Mobile-first design
- **SEO Optimized**: Meta tags and structured data

## 🔒 Security

- JWT token authentication
- Password hashing with bcryptjs
- Input validation and sanitization
- CORS configuration
- Environment variable protection
- HTTPS enforcement in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

**Created by**: Aditya Kumar Tiwari  
**GitHub**: [adityakmrtiwari](https://github.com/adityakmrtiwari)  
**Project**: [Bookstore Repository](https://github.com/adityakmrtiwari/Bookstore)

---

## 🎉 Production Ready!

This BookStore application is fully production-ready and **LIVE** with:
- ✅ Modern, responsive UI/UX
- ✅ Secure authentication system
- ✅ Full CRUD functionality
- ✅ Database integration
- ✅ Error handling
- ✅ Performance optimization
- ✅ Production deployment
- ✅ CORS security
- ✅ Environment configuration

**Successfully deployed and serving users worldwide!** 🌍

## 📸 Screenshots

### SignUp Page
![SignUp Page](https://github.com/user-attachments/assets/49a33dc0-42c3-4b29-b84c-5077246c56a7)

### Login Page
![Login Page](https://github.com/user-attachments/assets/37fd3a83-b35f-4d11-9127-acea970ee6b5)

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/f6984462-f730-4050-84a8-a29dfe121496)

# 📚 Bookstore API & Frontend

A full-stack Bookstore Application with **JWT authentication**, **CRUD operations**, **search/filtering**, and a clean **Tailwind UI**. Built using:

- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Frontend**: React.js, Tailwind CSS

---


## 🚀 Features

### 🔐 Authentication
- Signup/Login with JWT-based authentication
- Protected routes for book operations

### 📘 Books API
- Create, Read, Update, Delete books
- Filter by author/category/rating
- Search by title (partial match)

### 🎁 Bonus Features
- Responsive UI
- Logout flow
- Form validation
- Clean folder structure

---

## 🛠 Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Backend     | Node.js, Express, MongoDB     |
| Frontend    | React.js, Tailwind CSS        |
| Auth        | JWT, bcrypt                   |
| Tools       | dotenv, nodemon, Axios        |

---

## 📦 Backend Setup

1. Clone the repo

```bash
git clone https://github.com/adityakmrtiwari/Bookstore.git
cd Bookstore


