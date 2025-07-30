import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import VirtualBookshelf from './pages/VirtualBookshelf';
import BookClubs from './pages/BookClubs';
import ReadingJourney from './pages/ReadingJourney';
import Gamification from './pages/Gamification';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

// Floating Action Bar Component
function FloatingActionBar() {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="floating-actions">
      <button className="floating-action-btn cart" onClick={handleCartClick}>
        🛒
        <span className="badge">3</span>
        <span className="tooltip">Shopping Cart (3 items)</span>
      </button>
      <button className="floating-action-btn profile" onClick={handleProfileClick}>
        👤
        <span className="tooltip">User Profile</span>
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        
        {/* Floating Action Bar */}
        <FloatingActionBar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/virtual-bookshelf" element={<VirtualBookshelf />} />
            <Route path="/book-clubs" element={<BookClubs />} />
            <Route path="/reading-journey" element={<ReadingJourney />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App; 