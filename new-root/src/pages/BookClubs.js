import React, { useState } from 'react';

const BookClubs = () => {
  const [activeTab, setActiveTab] = useState('my-clubs');

  const myClubs = [
    {
      id: 1,
      name: "Classic Literature Lovers",
      currentBook: "Pride and Prejudice",
      members: 45,
      nextMeeting: "2024-08-05",
      progress: 75
    },
    {
      id: 2,
      name: "Sci-Fi Explorers",
      currentBook: "Dune",
      members: 32,
      nextMeeting: "2024-08-12",
      progress: 60
    }
  ];

  const availableClubs = [
    {
      id: 3,
      name: "Mystery & Thriller",
      currentBook: "The Silent Patient",
      members: 28,
      nextMeeting: "2024-08-08",
      category: "Mystery"
    },
    {
      id: 4,
      name: "Contemporary Fiction",
      currentBook: "Normal People",
      members: 52,
      nextMeeting: "2024-08-10",
      category: "Fiction"
    }
  ];

  return (
    <div className="book-clubs-page">
      <div className="hero">
        <h1>👥 Book Clubs</h1>
        <p>Join reading communities and discuss books with fellow readers</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', borderBottom: '2px solid #e9ecef' }}>
          <button
            className={`tab-btn ${activeTab === 'my-clubs' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-clubs')}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === 'my-clubs' ? '2px solid #667eea' : 'none',
              color: activeTab === 'my-clubs' ? '#667eea' : '#666'
            }}
          >
            My Clubs
          </button>
          <button
            className={`tab-btn ${activeTab === 'discover' ? 'active' : ''}`}
            onClick={() => setActiveTab('discover')}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === 'discover' ? '2px solid #667eea' : 'none',
              color: activeTab === 'discover' ? '#667eea' : '#666'
            }}
          >
            Discover Clubs
          </button>
        </div>

        <div style={{ padding: '2rem' }}>
          {activeTab === 'my-clubs' && (
            <div className="grid grid-2">
              {myClubs.map(club => (
                <div key={club.id} className="card" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>{club.name}</h3>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>
                    Currently reading: <strong>{club.currentBook}</strong>
                  </p>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      background: '#e9ecef', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${club.progress}%`,
                        height: '100%',
                        background: '#667eea'
                      }}></div>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginTop: '0.5rem',
                      fontSize: '0.9rem'
                    }}>
                      <span>{club.progress}% complete</span>
                      <span>{club.members} members</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    Next meeting: {club.nextMeeting}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'discover' && (
            <div className="grid grid-2">
              {availableClubs.map(club => (
                <div key={club.id} className="card" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>{club.name}</h3>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>
                    Currently reading: <strong>{club.currentBook}</strong>
                  </p>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ 
                      background: '#667eea', 
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem'
                    }}>
                      {club.category}
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>
                      {club.members} members
                    </span>
                    <button className="btn btn-primary">Join Club</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookClubs; 