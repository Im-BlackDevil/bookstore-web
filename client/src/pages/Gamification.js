import React, { useState } from 'react';

const Gamification = () => {
  const [activeTab, setActiveTab] = useState('achievements');

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Read your first book",
      icon: "📚",
      progress: 100,
      points: 50,
      unlocked: true
    },
    {
      id: 2,
      title: "Speed Reader",
      description: "Read 10 books in a month",
      icon: "⚡",
      progress: 70,
      points: 200,
      unlocked: false
    },
    {
      id: 3,
      title: "Genre Explorer",
      description: "Read books from 5 different genres",
      icon: "🗺️",
      progress: 80,
      points: 150,
      unlocked: false
    },
    {
      id: 4,
      title: "Book Club Champion",
      description: "Participate in 5 book club discussions",
      icon: "👥",
      progress: 40,
      points: 300,
      unlocked: false
    },
    {
      id: 5,
      title: "Review Master",
      description: "Write 20 book reviews",
      icon: "✍️",
      progress: 25,
      points: 250,
      unlocked: false
    },
    {
      id: 6,
      title: "Streak Master",
      description: "Read for 30 consecutive days",
      icon: "🔥",
      progress: 60,
      points: 500,
      unlocked: false
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Sarah Johnson", points: 2840, avatar: "👩‍💼" },
    { rank: 2, name: "Mike Chen", points: 2650, avatar: "👨‍💻" },
    { rank: 3, name: "Emma Davis", points: 2420, avatar: "👩‍🎨" },
    { rank: 4, name: "Alex Thompson", points: 2180, avatar: "👨‍🏫" },
    { rank: 5, name: "Lisa Wang", points: 1950, avatar: "👩‍⚕️" }
  ];

  const challenges = [
    {
      id: 1,
      title: "Summer Reading Challenge",
      description: "Read 5 books this summer",
      progress: 3,
      total: 5,
      reward: "Summer Reader Badge",
      deadline: "2024-08-31"
    },
    {
      id: 2,
      title: "Classic Literature",
      description: "Read 3 classic novels",
      progress: 1,
      total: 3,
      reward: "Classic Scholar Badge",
      deadline: "2024-09-15"
    },
    {
      id: 3,
      title: "Diverse Voices",
      description: "Read books by authors from 5 different countries",
      progress: 2,
      total: 5,
      reward: "Global Reader Badge",
      deadline: "2024-10-01"
    }
  ];

  const stats = {
    totalPoints: 1250,
    level: 8,
    booksRead: 23,
    currentStreak: 12,
    totalReadingTime: 156,
    achievementsUnlocked: 4,
    totalAchievements: 12
  };

  return (
    <div className="gamification-page">
      <div className="hero">
        <h1>🏆 Gamification Center</h1>
        <p>Earn points, unlock achievements, and climb the leaderboard</p>
      </div>

      {/* Stats Overview */}
      <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Your Progress</h3>
        <div className="grid grid-4">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              {stats.totalPoints}
            </div>
            <div style={{ color: '#666' }}>Total Points</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>
              Level {stats.level}
            </div>
            <div style={{ color: '#666' }}>Current Level</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
              {stats.currentStreak}
            </div>
            <div style={{ color: '#666' }}>Day Streak</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>
              {stats.achievementsUnlocked}/{stats.totalAchievements}
            </div>
            <div style={{ color: '#666' }}>Achievements</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', borderBottom: '2px solid #e9ecef' }}>
          <button
            className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === 'achievements' ? '2px solid #667eea' : 'none',
              color: activeTab === 'achievements' ? '#667eea' : '#666'
            }}
          >
            🏆 Achievements
          </button>
          <button
            className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('leaderboard')}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === 'leaderboard' ? '2px solid #667eea' : 'none',
              color: activeTab === 'leaderboard' ? '#667eea' : '#666'
            }}
          >
            📊 Leaderboard
          </button>
          <button
            className={`tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenges')}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === 'challenges' ? '2px solid #667eea' : 'none',
              color: activeTab === 'challenges' ? '#667eea' : '#666'
            }}
          >
            🎯 Challenges
          </button>
        </div>

        <div style={{ padding: '2rem' }}>
          {activeTab === 'achievements' && (
            <div className="achievement-grid">
              {achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-title">{achievement.title}</div>
                  <div className="achievement-description">{achievement.description}</div>
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      background: '#e9ecef', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${achievement.progress}%`,
                        height: '100%',
                        background: achievement.unlocked ? '#28a745' : '#667eea',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginTop: '0.5rem',
                      fontSize: '0.9rem'
                    }}>
                      <span>{achievement.progress}%</span>
                      <span>{achievement.points} pts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>Top Readers This Month</h3>
              <div className="leaderboard">
                {leaderboard.map((user, index) => (
                  <div key={user.rank} className="leaderboard-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    borderBottom: '1px solid #e9ecef',
                    background: index === 0 ? '#fff3cd' : 'white'
                  }}>
                    <div style={{ 
                      fontSize: '1.5rem', 
                      marginRight: '1rem',
                      color: index === 0 ? '#ffc107' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#666'
                    }}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${user.rank}`}
                    </div>
                    <div style={{ fontSize: '2rem', marginRight: '1rem' }}>{user.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                      <div style={{ color: '#666', fontSize: '0.9rem' }}>{user.points} points</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>Active Challenges</h3>
              <div className="grid grid-2">
                {challenges.map(challenge => (
                  <div key={challenge.id} className="card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem' }}>{challenge.title}</h4>
                    <p style={{ color: '#666', marginBottom: '1rem' }}>{challenge.description}</p>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ 
                        width: '100%', 
                        height: '8px', 
                        background: '#e9ecef', 
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${(challenge.progress / challenge.total) * 100}%`,
                          height: '100%',
                          background: '#667eea',
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        marginTop: '0.5rem',
                        fontSize: '0.9rem'
                      }}>
                        <span>{challenge.progress}/{challenge.total}</span>
                        <span>Reward: {challenge.reward}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      Deadline: {challenge.deadline}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Points Shop */}
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>🎁 Points Shop</h3>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Redeem your points for exclusive rewards and discounts
        </p>
        <div className="grid grid-3">
          <div className="feature-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎫</div>
            <h4>Free Shipping</h4>
            <p>500 points</p>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📚</div>
            <h4>Free Book</h4>
            <p>1000 points</p>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎨</div>
            <h4>Custom Bookshelf</h4>
            <p>750 points</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification; 