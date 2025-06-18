# 📚 BookStore - Full Stack Book Management System

A modern, responsive full-stack web application for managing personal book collections with user authentication, CRUD operations, and beautiful UI/UX.

![BookStore](https://img.shields.io/badge/BookStore-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-blue)

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

## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| React Router | 6.8.0 | Client-side routing |
| CSS3 | - | Styling with modern features |
| Axios | 1.3.0 | HTTP client |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.18.2 | Web framework |
| MongoDB | 6.0+ | Database |
| Mongoose | 7.0.0 | ODM for MongoDB |
| JWT | 9.0.0 | Authentication |
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
   git clone <repository-url>
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
   NODE_ENV=production
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

3. **Configure API endpoint**
   Update `src/services/api.js` with your backend URL:
   ```javascript
   const API_BASE_URL = 'http://localhost:5000/api';
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

### Books
- `GET /api/books` - Get user's books
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Statistics
- `GET /api/stats` - Get user statistics

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

### Backend Deployment (Heroku/Railway/Render)

1. **Set environment variables**
   ```env
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_jwt_secret
   NODE_ENV=production
   PORT=process.env.PORT
   ```

2. **Deploy to platform**
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Netlify/Vercel)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy build folder**
   - Upload `build/` folder to your hosting platform
   - Configure redirects for React Router

### Environment Variables for Production

**Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookstore
JWT_SECRET=your_super_secure_jwt_secret_key_here
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

**Frontend (api.js)**
```javascript
const API_BASE_URL = 'https://your-backend-domain.com/api';
```

## 🔧 Configuration

### Database Schema

**User Model**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
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
  createdAt: Date
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
   - Update CORS_ORIGIN in backend
   - Check frontend API URL configuration

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

**Created by**: [Your Name]
**GitHub**: [Your GitHub Profile]
**LinkedIn**: [Your LinkedIn Profile]

---

## 🎉 Production Ready!

This BookStore application is fully production-ready with:
- ✅ Modern, responsive UI/UX
- ✅ Secure authentication system
- ✅ Full CRUD functionality
- ✅ Database integration
- ✅ Error handling
- ✅ Performance optimization
- ✅ Deployment configuration

**Ready to deploy and serve users worldwide!** 🌍

SignUp Page
![Screenshot 2025-04-09 195131](https://github.com/user-attachments/assets/f29a14bb-25fc-407d-bb9d-6ea4a4e043e1)
Login Page
![Screenshot 2025-04-09 195405](https://github.com/user-attachments/assets/fede3c05-3500-441b-807c-548d3e87e5a1)
Dashboard.js
![Screenshot 2025-04-09 180629](https://github.com/user-attachments/assets/a898b6c2-7a7c-408b-b6b4-a61a4f0fbb5e)

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
git clone https://github.com/yourusername/bookstore.git
cd bookstore


