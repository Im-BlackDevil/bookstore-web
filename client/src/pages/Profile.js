import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    username: 'bookworm_alex',
    avatar: '👤',
    joinDate: 'March 2024',
    membership: 'Premium',
    readingLevel: 'Advanced',
    totalBooks: 156,
    totalPages: 45230,
    readingStreak: 28,
    favoriteGenres: ['Fiction', 'Science Fiction', 'Mystery'],
    achievements: 23,
    points: 1450
  };

  const readingStats = {
    thisMonth: { books: 8, pages: 2450, hours: 45 },
    thisYear: { books: 67, pages: 18230, hours: 320 },
    averageRating: 4.3,
    readingSpeed: '52 pages/hour',
    favoriteAuthor: 'Neil Gaiman',
    currentlyReading: 'The Midnight Library'
  };

  const recentActivity = [
    { type: 'finished', book: 'Dune', date: '2 days ago', rating: 5 },
    { type: 'started', book: 'The Midnight Library', date: '1 week ago' },
    { type: 'reviewed', book: 'Project Hail Mary', date: '1 week ago', rating: 4 },
    { type: 'joined', club: 'Sci-Fi Book Club', date: '2 weeks ago' },
    { type: 'achievement', title: 'Speed Reader', date: '3 weeks ago' }
  ];

  const accountSettings = {
    notifications: {
      email: true,
      push: true,
      bookRecommendations: true,
      clubUpdates: true,
      achievementAlerts: true
    },
    privacy: {
      profilePublic: true,
      readingHistory: false,
      showOnlineStatus: true
    }
  };

  return (
    <div className="profile-page">
      {/* Hero Section */}
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}>
            {user.avatar}
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
            fontWeight: '700',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            {user.name}
          </h1>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.9,
            marginBottom: '1rem'
          }}>
            {user.membership} Member • {user.readingLevel} Reader
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{user.totalBooks}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Books Read</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{user.readingStreak}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Day Streak</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{user.achievements}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Achievements</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{user.points}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-tabs" style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 2rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '0',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'reading', label: 'Reading Stats', icon: '📚' },
            { id: 'activity', label: 'Activity', icon: '📈' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
            { id: 'orders', label: 'Orders', icon: '📦' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem 1.5rem',
                border: 'none',
                background: activeTab === tab.id ? '#6b46c1' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#6b7280',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                borderBottom: activeTab === tab.id ? '3px solid #6b46c1' : '3px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="profile-content" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Personal Info */}
              <div className="card" style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1f2937', fontSize: '1.25rem' }}>
                  Personal Information
                </h3>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f9fafb'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f9fafb'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    Username
                  </label>
                  <input
                    type="text"
                    value={user.username}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f9fafb'
                    }}
                  />
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  style={{
                    background: isEditing ? '#10b981' : '#6b46c1',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              {/* Reading Preferences */}
              <div className="card" style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1f2937', fontSize: '1.25rem' }}>
                  Reading Preferences
                </h3>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    Favorite Genres
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {user.favoriteGenres.map(genre => (
                      <span key={genre} style={{
                        background: '#6b46c1',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    Currently Reading
                  </label>
                  <div style={{
                    background: '#f3f4f6',
                    padding: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <strong>{readingStats.currentlyReading}</strong>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      Started 3 days ago • 45% complete
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    Favorite Author
                  </label>
                  <div style={{
                    background: '#f3f4f6',
                    padding: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <strong>{readingStats.favoriteAuthor}</strong>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      12 books read • 4.8 average rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reading' && (
          <div className="reading-tab">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Reading Stats */}
              <div className="card" style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1f2937', fontSize: '1.25rem' }}>
                  Reading Statistics
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6b46c1' }}>
                      {readingStats.thisMonth.books}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>This Month</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6b46c1' }}>
                      {readingStats.thisYear.books}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>This Year</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6b46c1' }}>
                      {readingStats.averageRating}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Avg Rating</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6b46c1' }}>
                      {readingStats.readingSpeed}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Reading Speed</div>
                  </div>
                </div>
              </div>

              {/* Reading Goals */}
              <div className="card" style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1f2937', fontSize: '1.25rem' }}>
                  Reading Goals
                </h3>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Books This Year</span>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>67/100</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: '67%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #6b46c1, #ec4899)',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Pages This Month</span>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>2,450/3,000</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: '82%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #10b981, #3b82f6)',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Reading Streak</span>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>28 days</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: '93%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-tab">
            <div className="card" style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ marginBottom: '1.5rem', color: '#1f2937', fontSize: '1.25rem' }}>
                Recent Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recentActivity.map((activity, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      fontSize: '1.2rem'
                    }}>
                      {activity.type === 'finished' && '✅'}
                      {activity.type === 'started' && '📖'}
                      {activity.type === 'reviewed' && '⭐'}
                      {activity.type === 'joined' && '👥'}
                      {activity.type === 'achievement' && '🏆'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500', color: '#1f2937' }}>
                        {activity.type === 'finished' && `Finished reading "${activity.book}"`}
                        {activity.type === 'started' && `Started reading "${activity.book}"`}
                        {activity.type === 'reviewed' && `Reviewed "${activity.book}"`}
                        {activity.type === 'joined' && `Joined "${activity.club}"`}
                        {activity.type === 'achievement' && `Earned "${activity.title}" achievement`}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {activity.date}
                        {activity.rating && ` • ${activity.rating}⭐`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-tab">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Notification Settings */}
              <div className="card" style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1f2937', fontSize: '1.25rem' }}>
                  Notification Settings
                </h3>
                {Object.entries(accountSettings.notifications).map(([key, value]) => (
                  <div key={key} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid #f3f4f6'
                  }}>
                    <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={value}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: value ? '#6b46c1' : '#d1d5db',
                        borderRadius: '24px',
                        transition: '0.3s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '""',
                          height: '18px',
                          width: '18px',
                          left: '3px',
                          bottom: '3px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: '0.3s',
                          transform: value ? 'translateX(26px)' : 'translateX(0)'
                        }}></span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              {/* Privacy Settings */}
              <div className="card" style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1f2937', fontSize: '1.25rem' }}>
                  Privacy Settings
                </h3>
                {Object.entries(accountSettings.privacy).map(([key, value]) => (
                  <div key={key} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid #f3f4f6'
                  }}>
                    <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={value}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: value ? '#6b46c1' : '#d1d5db',
                        borderRadius: '24px',
                        transition: '0.3s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '""',
                          height: '18px',
                          width: '18px',
                          left: '3px',
                          bottom: '3px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: '0.3s',
                          transform: value ? 'translateX(26px)' : 'translateX(0)'
                        }}></span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-tab">
            <div className="card" style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ marginBottom: '1.5rem', color: '#1f2937', fontSize: '1.25rem' }}>
                Order History
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { id: 'ORD-001', date: '2024-07-28', status: 'Delivered', total: '$45.99', items: 3 },
                  { id: 'ORD-002', date: '2024-07-20', status: 'Shipped', total: '$32.50', items: 2 },
                  { id: 'ORD-003', date: '2024-07-15', status: 'Delivered', total: '$67.25', items: 4 },
                  { id: 'ORD-004', date: '2024-07-10', status: 'Processing', total: '$28.75', items: 1 }
                ].map(order => (
                  <div key={order.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500', color: '#1f2937' }}>
                        Order {order.id}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {order.date} • {order.items} items
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '500', color: '#1f2937' }}>
                        {order.total}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        background: order.status === 'Delivered' ? '#dcfce7' : 
                                   order.status === 'Shipped' ? '#dbeafe' : '#fef3c7',
                        color: order.status === 'Delivered' ? '#166534' : 
                               order.status === 'Shipped' ? '#1e40af' : '#92400e'
                      }}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile; 