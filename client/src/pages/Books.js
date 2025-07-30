import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock books data
  const books = [
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.5,
      reviews: 1247,
      genre: 'Fiction',
      image: '📚',
      inStock: true,
      bestseller: true,
      newRelease: false
    },
    {
      id: 2,
      title: 'Dune',
      author: 'Frank Herbert',
      price: 19.99,
      originalPrice: 24.99,
      rating: 4.8,
      reviews: 2156,
      genre: 'Science Fiction',
      image: '📖',
      inStock: true,
      bestseller: true,
      newRelease: false
    },
    {
      id: 3,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      price: 22.50,
      originalPrice: 22.50,
      rating: 4.7,
      reviews: 892,
      genre: 'Science Fiction',
      image: '🚀',
      inStock: false,
      bestseller: false,
      newRelease: true
    },
    {
      id: 4,
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      price: 26.99,
      originalPrice: 26.99,
      rating: 4.6,
      reviews: 1567,
      genre: 'Fiction',
      image: '🎭',
      inStock: true,
      bestseller: true,
      newRelease: false
    },
    {
      id: 5,
      title: 'A Court of Thorns and Roses',
      author: 'Sarah J. Maas',
      price: 18.99,
      originalPrice: 22.99,
      rating: 4.4,
      reviews: 2341,
      genre: 'Fantasy',
      image: '🌹',
      inStock: true,
      bestseller: true,
      newRelease: false
    },
    {
      id: 6,
      title: 'Tomorrow, and Tomorrow, and Tomorrow',
      author: 'Gabrielle Zevin',
      price: 27.99,
      originalPrice: 27.99,
      rating: 4.3,
      reviews: 678,
      genre: 'Fiction',
      image: '🎮',
      inStock: true,
      bestseller: false,
      newRelease: true
    },
    {
      id: 7,
      title: 'Lessons in Chemistry',
      author: 'Bonnie Garmus',
      price: 25.99,
      originalPrice: 25.99,
      rating: 4.5,
      reviews: 945,
      genre: 'Fiction',
      image: '🧪',
      inStock: true,
      bestseller: true,
      newRelease: false
    },
    {
      id: 8,
      title: 'The House in the Cerulean Sea',
      author: 'TJ Klune',
      price: 23.99,
      originalPrice: 23.99,
      rating: 4.6,
      reviews: 1234,
      genre: 'Fantasy',
      image: '🏠',
      inStock: true,
      bestseller: false,
      newRelease: false
    }
  ];

  const genres = ['all', 'Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Romance', 'Non-Fiction'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
    
    return matchesSearch && matchesGenre && matchesPrice;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const addToCart = (bookId) => {
    // Here you would typically dispatch to a cart state management system
    console.log(`Added book ${bookId} to cart`);
    alert('Book added to cart!');
  };

  return (
    <div className="books-page" style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '0.5rem'
        }}>
          Discover Your Next Favorite Book
        </h1>
        <p style={{
          color: '#6b7280',
          fontSize: '1.1rem'
        }}>
          Explore our vast collection with AI-powered recommendations
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '1rem',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                background: '#f9fafb'
              }}
            />
            <span style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.2rem'
            }}>
              🔍
            </span>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '1rem 1.5rem',
              background: '#6b46c1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
        </div>

        {showFilters && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                Genre
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: '#d1d5db',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <p style={{
          color: '#6b7280',
          fontSize: '0.875rem'
        }}>
          Showing {sortedBooks.length} of {books.length} books
        </p>
        
        <div style={{
          display: 'flex',
          gap: '0.5rem'
        }}>
          <button style={{
            padding: '0.5rem 1rem',
            border: '1px solid #d1d5db',
            background: 'white',
            borderRadius: '6px',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}>
            📋 Grid
          </button>
          <button style={{
            padding: '0.5rem 1rem',
            border: '1px solid #d1d5db',
            background: 'white',
            borderRadius: '6px',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}>
            📄 List
          </button>
        </div>
      </div>

      {/* Books Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {sortedBooks.map(book => (
          <div key={book.id} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Badges */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              {book.bestseller && (
                <span style={{
                  background: '#fbbf24',
                  color: '#92400e',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  Bestseller
                </span>
              )}
              {book.newRelease && (
                <span style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  New
                </span>
              )}
            </div>

            {/* Book Image */}
            <div style={{
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '0.5rem',
                opacity: book.inStock ? 1 : 0.5
              }}>
                {book.image}
              </div>
            </div>

            {/* Book Info */}
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.25rem',
                lineHeight: '1.3'
              }}>
                {book.title}
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                marginBottom: '0.5rem'
              }}>
                by {book.author}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  ⭐ {book.rating}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af'
                }}>
                  ({book.reviews} reviews)
                </span>
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '0.5rem'
              }}>
                {book.genre}
              </div>
            </div>

            {/* Price */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#1f2937'
              }}>
                ${book.price}
              </span>
              {book.originalPrice > book.price && (
                <span style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  textDecoration: 'line-through'
                }}>
                  ${book.originalPrice}
                </span>
              )}
              {book.originalPrice > book.price && (
                <span style={{
                  fontSize: '0.75rem',
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}>
                  {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              <button
                onClick={() => addToCart(book.id)}
                disabled={!book.inStock}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: book.inStock ? 'linear-gradient(135deg, #6b46c1, #ec4899)' : '#9ca3af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: book.inStock ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease'
                }}
              >
                {book.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <Link to={`/books/${book.id}`} style={{
                padding: '0.75rem',
                background: 'white',
                color: '#6b46c1',
                border: '1px solid #6b46c1',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                👁️
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {sortedBooks.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '3rem'
        }}>
          <button style={{
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            background: 'white',
            borderRadius: '6px',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}>
            ← Previous
          </button>
          
          <button style={{
            padding: '0.75rem 1rem',
            border: '1px solid #6b46c1',
            background: '#6b46c1',
            color: 'white',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            1
          </button>
          
          <button style={{
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            background: 'white',
            borderRadius: '6px',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}>
            2
          </button>
          
          <button style={{
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            background: 'white',
            borderRadius: '6px',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}>
            3
          </button>
          
          <button style={{
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            background: 'white',
            borderRadius: '6px',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}>
            Next →
          </button>
        </div>
      )}

      {/* Empty State */}
      {sortedBooks.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            opacity: 0.5
          }}>
            📚
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            No books found
          </h3>
          <p style={{
            color: '#6b7280',
            fontSize: '1rem',
            marginBottom: '2rem'
          }}>
            Try adjusting your search criteria or filters
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGenre('all');
              setPriceRange([0, 100]);
            }}
            style={{
              background: 'linear-gradient(135deg, #6b46c1, #ec4899)',
              color: 'white',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Books; 