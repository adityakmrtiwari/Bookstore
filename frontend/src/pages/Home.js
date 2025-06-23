import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home({ isAuthenticated, setIsAuthenticated }) {
  const [user, setUser] = useState(null);
  const [recentBooks, setRecentBooks] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    topGenres: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const { data } = await api.get('/auth/verify');
          setUser(data.user);
        } catch (error) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };
    fetchUserData();
  }, [isAuthenticated, setIsAuthenticated]);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      if (isAuthenticated) {
        try {
          const { data } = await api.get('/books');
          setRecentBooks((data?.data || []).slice(-3).reverse());
        } catch (error) {
          setRecentBooks([]);
        }
      }
    };
    fetchRecentBooks();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/stats/public');
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const dummyTestimonials = [
    { name: 'Riya Sharma', comment: 'Helped me organize my reading life!', avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
    { name: 'Aman Gupta', comment: 'The smart search is a game changer.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Neha Das', comment: 'Saves so much time managing books.', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  ];

  const dummyTrendingBooks = [
    { title: 'Atomic Habits', author: 'James Clear' },
    { title: 'The Pragmatic Programmer', author: 'Andy Hunt' },
    { title: 'Deep Work', author: 'Cal Newport' },
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-accent-100 to-secondary">
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} />
        <main className="flex-1 flex flex-col items-center px-4 py-8 gap-12">
          {/* Hero Section */}
          <section className="card max-w-3xl w-full text-center fade-in bg-white/10 backdrop-blur border border-white/20 rounded-xl">
            <div className="flex flex-col items-center gap-4">
              <span className="text-5xl">📚</span>
              <h1 className="text-4xl font-extrabold text-primary mb-2">Welcome to Your Digital Library</h1>
              <p className="text-accent-600 text-lg mb-6">Discover, manage, and organize your books with ease.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup" className="btn btn-primary">Get Started</Link>
                <Link to="#features" className="btn btn-outline">Learn More</Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="card max-w-4xl w-full fade-in bg-white/10 backdrop-blur border border-white/20 rounded-xl">
            <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">✨ Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:shadow-xl border border-white/20">
                <span className="text-3xl mb-3">📚</span>
                <h3 className="font-semibold text-primary mb-2">Book Management</h3>
                <p className="text-accent-600 text-sm">Easily add, edit, and organize your books.</p>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:shadow-xl border border-white/20">
                <span className="text-3xl mb-3">🔍</span>
                <h3 className="font-semibold text-primary mb-2">Smart Search</h3>
                <p className="text-accent-600 text-sm">Find books instantly with advanced search.</p>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:shadow-xl border border-white/20">
                <span className="text-3xl mb-3">📱</span>
                <h3 className="font-semibold text-primary mb-2">Mobile Friendly</h3>
                <p className="text-accent-600 text-sm">Access your library on any device.</p>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:shadow-xl border border-white/20">
                <span className="text-3xl mb-3">🏷️</span>
                <h3 className="font-semibold text-primary mb-2">Categories</h3>
                <p className="text-accent-600 text-sm">Organize books by genre and category.</p>
              </div>
            </div>
          </section>

          {/* Tech Stacks Section */}
          <section className="card max-w-3xl w-full fade-in bg-white/10 backdrop-blur border border-white/20 rounded-xl mt-4">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">🛠️ Tech Stacks</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-1">⚛️</span>
                <span className="text-primary font-semibold">React</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-1">🌐</span>
                <span className="text-primary font-semibold">Node.js</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-1">🍃</span>
                <span className="text-primary font-semibold">MongoDB</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-1">🎨</span>
                <span className="text-primary font-semibold">Tailwind CSS</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-1">🔗</span>
                <span className="text-primary font-semibold">Express.js</span>
              </div>
            </div>
          </section>

          {/* Trending Books */}
          <section className="card max-w-3xl w-full fade-in bg-white/10 backdrop-blur border border-white/20 rounded-xl">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">🔥 Trending Books</h2>
            <ul className="divide-y divide-accent-200">
              {dummyTrendingBooks.map((book, i) => (
                <li key={i} className="py-2 flex justify-between text-accent-700">
                  <span className="flex items-center gap-2"><span className="text-lg">📘</span> <span>{book.title}</span></span>
                  <span className="text-sm text-accent-500 flex items-center gap-1">👤 {book.author}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Platform Stats Section */}
          <section className="card max-w-4xl w-full fade-in bg-white/10 backdrop-blur border border-white/20 rounded-xl">
            <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">📊 Platform Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20 flex flex-col items-center">
                <span className="text-3xl mb-3">👥</span>
                <h3 className="font-bold text-3xl text-primary mb-2">{stats.totalUsers}</h3>
                <p className="text-accent-600">Total Users</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20 flex flex-col items-center">
                <span className="text-3xl mb-3">📚</span>
                <h3 className="font-bold text-3xl text-primary mb-2">{stats.totalBooks}</h3>
                <p className="text-accent-600">Books Added</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20 flex flex-col items-center">
                <span className="text-3xl mb-3">🏷️</span>
                <h3 className="font-bold text-3xl text-primary mb-2">{stats.topGenres.length}</h3>
                <p className="text-accent-600">Active Genres</p>
              </div>
            </div>
          </section>

          {/* Active Genres Section */}
          <section className="card max-w-4xl w-full fade-in bg-white/10 backdrop-blur border border-white/20 rounded-xl">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">🏷️ Active Genres</h2>
            {stats.topGenres && stats.topGenres.length > 0 ? (
              <div className="flex flex-wrap gap-3 justify-center">
                {stats.topGenres.map((genre, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-primary/80 text-white font-semibold text-sm shadow-elegant border border-white/20 flex items-center gap-2">
                    <span>🏷️</span> {genre}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-accent-600 text-center">No active genres found.</p>
            )}
          </section>

          {/* Testimonials */}
          <section className="card max-w-4xl w-full fade-in bg-white/10 backdrop-blur border border-white/20 rounded-xl">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">💬 What Our Users Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dummyTestimonials.map((t, i) => (
                <div key={i} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 text-center flex flex-col items-center">
                  <img src={t.avatar} className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-primary" alt={t.name} />
                  <p className="italic text-accent-600 mb-2 flex items-center gap-1"><span>"</span>{t.comment}<span>"</span></p>
                  <h4 className="font-semibold text-primary flex items-center gap-1">👤 {t.name}</h4>
                </div>
              ))}
            </div>
          </section>

          {/* Mission Section */}
          <section className="card max-w-3xl w-full fade-in bg-white/10 backdrop-blur border border-white/20 rounded-xl">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">🎯 Our Mission</h2>
            <p className="text-accent-600 flex items-center gap-2"><span>📖</span> BookStore is designed to help book enthusiasts and collectors manage their personal libraries efficiently. We believe in making book management accessible, organized, and enjoyable for everyone.</p>
          </section>

          {/* Developer Section */}
          <section className="card max-w-3xl w-full fade-in bg-white/10 backdrop-blur border border-white/20 rounded-xl mt-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <img src="/logo-bookstore.jpeg" alt="Aditya Kumar Tiwari" className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-elegant mb-4 sm:mb-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">👨‍💻 Aditya Kumar Tiwari</h2>
                <p className="text-accent-700 text-lg font-semibold mb-2">Full Stack Developer & Book Enthusiast</p>
                <p className="text-accent-600 mb-3">Passionate about building scalable web apps, UI/UX, and open source. Loves reading, tech, and helping others learn.</p>
                <div className="flex flex-wrap gap-3 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20"><span>💻</span> MERN Stack</span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20"><span>🎨</span> UI/UX</span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20"><span>📚</span> Books</span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20"><span>🚀</span> Productivity</span>
                </div>
                <div className="flex gap-3 mt-2">
                  <a href="https://github.com/adityakmrtiwari" target="_blank" rel="noopener noreferrer" className="btn btn-outline">GitHub</a>
                  <a href="https://www.linkedin.com/in/adityakmrtiwari/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">LinkedIn</a>
                </div>
              </div>
            </div>
          </section>

          {/* Reach Out Section */}
          <section className="card max-w-2xl w-full fade-in text-center bg-white/10 backdrop-blur border border-white/20 rounded-xl mt-4">
            <h2 className="text-2xl font-bold text-primary mb-2">📬 Reach Out to Us</h2>
            <p className="text-accent-600 mb-4">Have questions, suggestions, or want to collaborate?</p>
            <a href="mailto:adityakmrtiwari@gmail.com" className="btn btn-primary inline-block">Email: adityakmrtiwari@gmail.com</a>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Home;
