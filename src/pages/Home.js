import React from 'react';

const Home = () => {
  const featuredBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: "$12.99",
      genre: "Fiction",
      rating: 4.8,
      image: "📚"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: "$9.99",
      genre: "Self-Help",
      rating: 4.9,
      image: "⚡"
    },
    {
      id: 3,
      title: "The Seven Husbands",
      author: "Taylor Jenkins Reid",
      price: "$11.99",
      genre: "Historical Fiction",
      rating: 4.7,
      image: "🎭"
    },
    {
      id: 4,
      title: "Project Hail Mary",
      author: "Andy Weir",
      price: "$14.99",
      genre: "Science Fiction",
      rating: 4.6,
      image: "🚀"
    }
  ];

  const revolutionaryFeatures = [
    {
      icon: "🤖",
      title: "AI-Powered Reading Journey",
      description: "Track your reading progress with intelligent insights and personalized recommendations based on your reading patterns, mood, and preferences."
    },
    {
      icon: "👥",
      title: "Social Reading Revolution",
      description: "Join vibrant book clubs, share reading experiences, and connect with fellow readers around the world in real-time discussions."
    },
    {
      icon: "🎮",
      title: "Gamified Learning",
      description: "Earn achievements, badges, and points as you read. Complete challenges and climb the leaderboard while building lasting reading habits."
    }
  ];

  const quickActions = [
    {
      icon: "📈",
      title: "Track Progress",
      description: "Monitor your reading journey with detailed analytics and insights"
    },
    {
      icon: "🏆",
      title: "Earn Achievements",
      description: "Unlock badges and climb the leaderboard"
    },
    {
      icon: "📚",
      title: "Virtual Bookshelf",
      description: "Organize your digital library in immersive 3D"
    }
  ];

  return (
    <div className="home">
      {/* Hero Section with Parallax */}
      <section className="hero parallax">
        <div className="hero-content">
          <h1>Welcome to LitVerse</h1>
          <p>Beyond the Bookstore - Where Reading Meets Innovation</p>
          <div className="hero-buttons">
            <a href="/books" className="btn btn-primary">
              Explore Books
            </a>
            <a href="/virtual-bookshelf" className="btn btn-secondary">
              Virtual Bookshelf
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-card hover-lift">
          <span className="stat-number">10,000+</span>
          <span className="stat-label">Books Available</span>
        </div>
        <div className="stat-card hover-lift">
          <span className="stat-number">50,000+</span>
          <span className="stat-label">Active Readers</span>
        </div>
        <div className="stat-card hover-lift">
          <span className="stat-number">1,000+</span>
          <span className="stat-label">Book Clubs</span>
        </div>
        <div className="stat-card hover-lift">
          <span className="stat-number">95%</span>
          <span className="stat-label">Satisfaction Rate</span>
        </div>
      </section>

      {/* Featured Books with AI Carousel */}
      <section className="featured-books">
        <h2 className="section-title">AI-Recommended for You</h2>
        <div className="books-grid">
          {featuredBooks.map((book) => (
            <div key={book.id} className="book-card scale-on-hover">
              <div className="book-image">
                {book.image}
              </div>
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <div className="book-price">{book.price}</div>
              <div className="book-actions">
                <button className="btn btn-primary">Add to Cart</button>
                <button className="btn btn-secondary">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Revolutionary Features */}
      <section className="features">
        <h2 className="section-title" style={{color: 'white'}}>Revolutionary Features</h2>
        <div className="features-grid">
          {revolutionaryFeatures.map((feature, index) => (
            <div key={index} className="feature-card hover-lift">
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section style={{background: 'var(--bg-primary)', padding: '4rem 2rem'}}>
        <h2 className="section-title">Quick Actions</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto'}}>
          {quickActions.map((action, index) => (
            <div key={index} className="stat-card hover-lift scale-on-hover" style={{cursor: 'pointer'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{action.icon}</div>
              <h3 style={{fontFamily: 'Merriweather, serif', fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem'}}>{action.title}</h3>
              <p style={{fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)', lineHeight: '1.6'}}>{action.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section style={{background: 'linear-gradient(135deg, var(--royal-purple) 0%, var(--soft-rose) 100%)', padding: '6rem 2rem', textAlign: 'center'}}>
        <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <h2 style={{fontFamily: 'Merriweather, serif', fontSize: '3rem', fontWeight: '700', color: 'white', marginBottom: '1.5rem'}}>
            Ready to Start Your Reading Journey?
          </h2>
          <p style={{fontFamily: 'Inter, sans-serif', fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem', lineHeight: '1.6'}}>
            Join thousands of readers who are already experiencing the future of reading with LitVerse.
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="/register" className="btn btn-primary">
              Get Started
            </a>
            <a href="/book-clubs" className="btn btn-secondary">
              Join a Book Club
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 