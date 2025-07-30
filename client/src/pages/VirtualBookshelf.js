import React from 'react';

const VirtualBookshelf = () => {
  const bookshelves = [
    {
      id: 1,
      name: "Currently Reading",
      books: [
        { id: 1, title: "The Midnight Library", author: "Matt Haig", progress: 75, rating: 4.8, image: "📚" },
        { id: 2, title: "Atomic Habits", author: "James Clear", progress: 45, rating: 4.9, image: "⚡" },
        { id: 3, title: "Project Hail Mary", author: "Andy Weir", progress: 20, rating: 4.6, image: "🚀" }
      ]
    },
    {
      id: 2,
      name: "Completed",
      books: [
        { id: 4, title: "The Seven Husbands", author: "Taylor Jenkins Reid", progress: 100, rating: 4.7, image: "🎭" },
        { id: 5, title: "Educated", author: "Tara Westover", progress: 100, rating: 4.8, image: "🎓" },
        { id: 6, title: "Sapiens", author: "Yuval Noah Harari", progress: 100, rating: 4.5, image: "🧠" }
      ]
    },
    {
      id: 3,
      name: "Want to Read",
      books: [
        { id: 7, title: "Klara and the Sun", author: "Kazuo Ishiguro", progress: 0, rating: 4.4, image: "🤖" },
        { id: 8, title: "The Push", author: "Ashley Audrain", progress: 0, rating: 4.3, image: "👶" },
        { id: 9, title: "The Four Winds", author: "Kristin Hannah", progress: 0, rating: 4.6, image: "🌾" }
      ]
    }
  ];

  const readingStats = {
    totalBooks: 23,
    completedBooks: 15,
    currentlyReading: 3,
    wantToRead: 5,
    totalPages: 8450,
    averageRating: 4.3,
    readingStreak: 12,
    favoriteGenre: "Fiction"
  };

  return (
    <div className="virtual-bookshelf-page">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--dark-navy) 0%, var(--royal-purple) 100%)',
        padding: '6rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <h1 style={{
            fontFamily: 'Merriweather, serif',
            fontSize: '3.5rem',
            fontWeight: '900',
            marginBottom: '1rem',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
          }}>
            Your Virtual Bookshelf
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.3rem',
            opacity: '0.9',
            lineHeight: '1.6'
          }}>
            Step into your personalized 3D library where every book tells a story of your reading journey.
          </p>
        </div>
      </section>

      {/* Reading Stats */}
      <section style={{background: 'var(--bg-primary)', padding: '4rem 2rem'}}>
        <h2 className="section-title">Your Reading Journey</h2>
        <div className="journey-stats">
          <div className="journey-stat hover-lift">
            <div className="journey-number">{readingStats.totalBooks}</div>
            <div className="journey-label">Total Books</div>
          </div>
          <div className="journey-stat hover-lift">
            <div className="journey-number">{readingStats.completedBooks}</div>
            <div className="journey-label">Completed</div>
          </div>
          <div className="journey-stat hover-lift">
            <div className="journey-number">{readingStats.currentlyReading}</div>
            <div className="journey-label">Currently Reading</div>
          </div>
          <div className="journey-stat hover-lift">
            <div className="journey-number">{readingStats.totalPages.toLocaleString()}</div>
            <div className="journey-label">Pages Read</div>
          </div>
          <div className="journey-stat hover-lift">
            <div className="journey-number">{readingStats.averageRating}</div>
            <div className="journey-label">Average Rating</div>
          </div>
          <div className="journey-stat hover-lift">
            <div className="journey-number">{readingStats.readingStreak}</div>
            <div className="journey-label">Day Streak</div>
          </div>
        </div>
      </section>

      {/* 3D Bookshelves */}
      <section style={{padding: '4rem 2rem'}}>
        <h2 className="section-title">Your 3D Library</h2>
        
        {bookshelves.map((shelf) => (
          <div key={shelf.id} className="bookshelf-container hover-lift">
            <h3 style={{
              fontFamily: 'Merriweather, serif',
              fontSize: '2rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              {shelf.name}
            </h3>
            
            <div className="bookshelf-grid">
              {shelf.books.map((book) => (
                <div key={book.id} className="bookshelf-book scale-on-hover">
                  <div style={{fontSize: '3rem', marginBottom: '1rem'}}>
                    {book.image}
                  </div>
                  <h4 style={{
                    fontFamily: 'Merriweather, serif',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}>
                    {book.title}
                  </h4>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    opacity: '0.8',
                    marginBottom: '1rem'
                  }}>
                    by {book.author}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${book.progress}%`}}
                    ></div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem'
                  }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      {book.progress}% Complete
                    </span>
                    <span style={{
                      color: '#fbbf24',
                      fontSize: '1.1rem'
                    }}>
                      ★ {book.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Interactive Features */}
      <section style={{
        background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
        padding: '4rem 2rem'
      }}>
        <h2 className="section-title">Interactive Features</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div className="feature-card hover-lift">
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🎯</div>
            <h3 style={{
              fontFamily: 'Merriweather, serif',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Reading Goals
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--text-secondary)',
              lineHeight: '1.6'
            }}>
              Set personalized reading goals and track your progress with detailed analytics and insights.
            </p>
          </div>
          
          <div className="feature-card hover-lift">
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📊</div>
            <h3 style={{
              fontFamily: 'Merriweather, serif',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Reading Analytics
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--text-secondary)',
              lineHeight: '1.6'
            }}>
              Get detailed insights into your reading habits, speed, and comprehension with advanced analytics.
            </p>
          </div>
          
          <div className="feature-card hover-lift">
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🎨</div>
            <h3 style={{
              fontFamily: 'Merriweather, serif',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Custom Themes
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--text-secondary)',
              lineHeight: '1.6'
            }}>
              Personalize your virtual bookshelf with custom themes, layouts, and organization options.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        background: 'linear-gradient(135deg, var(--royal-purple) 0%, var(--soft-rose) 100%)',
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{maxWidth: '600px', margin: '0 auto'}}>
          <h2 style={{
            fontFamily: 'Merriweather, serif',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Ready to Organize Your Library?
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.1rem',
            opacity: '0.9',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Start building your perfect virtual bookshelf and discover new ways to organize your reading journey.
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <button className="btn btn-primary">
              Add New Book
            </button>
            <button className="btn btn-secondary">
              Customize Shelf
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VirtualBookshelf; 