import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <span className="brand-logo">📚</span>
          <span className="brand-text">LitVerse</span>
        </Link>

        {/* Navigation Links */}
        <ul className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-icon">🏠</span>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/books" 
              className={`nav-link ${isActive('/books') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-icon">📖</span>
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/virtual-bookshelf" 
              className={`nav-link ${isActive('/virtual-bookshelf') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-icon">📚</span>
              Virtual Bookshelf
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/book-clubs" 
              className={`nav-link ${isActive('/book-clubs') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-icon">👥</span>
              Book Clubs
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/reading-journey" 
              className={`nav-link ${isActive('/reading-journey') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-icon">📈</span>
              Reading Journey
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/gamification" 
              className={`nav-link ${isActive('/gamification') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-icon">🏆</span>
              Achievements
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          <Link to="/cart" className="btn btn-secondary">
            🛒 Cart
          </Link>
          <Link to="/profile" className="btn btn-secondary">
            👤 Profile
          </Link>
          <Link to="/login" className="btn btn-primary">
            🔐 Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 