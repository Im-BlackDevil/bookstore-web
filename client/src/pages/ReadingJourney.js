import React from 'react';

const ReadingJourney = () => {
  // const [selectedPeriod, setSelectedPeriod] = useState('month');

  const journeyData = [
    {
      id: 1,
      date: '2024-07-15',
      book: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      action: 'Completed',
      pages: 180,
      timeSpent: 6,
      mood: 'Reflective',
      notes: 'Beautiful prose and tragic love story. The American Dream theme really resonated.'
    },
    {
      id: 2,
      date: '2024-07-10',
      book: '1984',
      author: 'George Orwell',
      action: 'Started',
      pages: 50,
      timeSpent: 2,
      mood: 'Thoughtful',
      notes: 'Disturbing but important read. The surveillance themes are more relevant than ever.'
    },
    {
      id: 3,
      date: '2024-07-05',
      book: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      action: 'Completed',
      pages: 281,
      timeSpent: 8,
      mood: 'Inspired',
      notes: 'Timeless classic about justice and growing up. Atticus Finch is a hero.'
    },
    {
      id: 4,
      date: '2024-06-28',
      book: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      action: 'Completed',
      pages: 310,
      timeSpent: 12,
      mood: 'Adventurous',
      notes: 'Epic fantasy journey. Bilbo\'s character development is masterful.'
    }
  ];

  const analytics = {
    totalBooks: 23,
    totalPages: 8450,
    totalHours: 156,
    averageRating: 4.3,
    favoriteGenre: 'Fiction',
    readingSpeed: '45 pages/hour',
    currentStreak: 12,
    longestStreak: 28
  };

  const aiInsights = [
    {
      type: 'Reading Pattern',
      insight: 'You tend to read more in the evenings, particularly on weekends.',
      icon: '📊'
    },
    {
      type: 'Genre Preference',
      insight: 'You enjoy character-driven stories with strong themes of justice and morality.',
      icon: '🎯'
    },
    {
      type: 'Reading Speed',
      insight: 'Your reading speed has improved by 15% over the last 3 months.',
      icon: '⚡'
    },
    {
      type: 'Recommendation',
      insight: 'Based on your love for "To Kill a Mockingbird", try "The Color Purple" by Alice Walker.',
      icon: '🤖'
    }
  ];

  return (
    <div className="reading-journey-page">
      <div className="hero">
        <h1>📈 Your Reading Journey</h1>
        <p>Track your progress, discover patterns, and get AI-powered insights</p>
      </div>

      {/* Analytics Overview */}
      <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Reading Analytics</h3>
        <div className="grid grid-4">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              {analytics.totalBooks}
            </div>
            <div style={{ color: '#666' }}>Books Read</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
              {analytics.totalPages.toLocaleString()}
            </div>
            <div style={{ color: '#666' }}>Pages Read</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>
              {analytics.totalHours}
            </div>
            <div style={{ color: '#666' }}>Hours Spent</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>
              {analytics.currentStreak}
            </div>
            <div style={{ color: '#666' }}>Day Streak</div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          🤖 AI-Powered Insights
        </h3>
        <div className="grid grid-2">
          {aiInsights.map((insight, index) => (
            <div key={index} className="feature-card">
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{insight.icon}</div>
              <div className="feature-title">{insight.type}</div>
              <div className="feature-description">{insight.insight}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Timeline */}
      <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Your Reading Timeline</h3>
        <div className="journey-timeline">
          {journeyData.map((entry, index) => (
            <div key={entry.id} className="timeline-item">
              <div className="timeline-content">
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h4 style={{ margin: 0 }}>{entry.book}</h4>
                    <p style={{ margin: 0, color: '#666' }}>by {entry.author}</p>
                  </div>
                  <div style={{ 
                    background: entry.action === 'Completed' ? '#28a745' : '#ffc107',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {entry.action}
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#666' }}>
                    <span>📅 {entry.date}</span>
                    <span>📖 {entry.pages} pages</span>
                    <span>⏱️ {entry.timeSpent} hours</span>
                    <span>😊 {entry.mood}</span>
                  </div>
                </div>
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '1rem', 
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontStyle: 'italic'
                }}>
                  "{entry.notes}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Goals */}
      <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Reading Goals</h3>
        <div className="grid grid-3">
          <div className="feature-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📚</div>
            <h4>Books This Year</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>23/30</div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              background: '#e9ecef', 
              borderRadius: '4px',
              marginTop: '1rem',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '77%',
                height: '100%',
                background: '#667eea'
              }}></div>
            </div>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📖</div>
            <h4>Pages This Month</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>1,250/1,500</div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              background: '#e9ecef', 
              borderRadius: '4px',
              marginTop: '1rem',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '83%',
                height: '100%',
                background: '#28a745'
              }}></div>
            </div>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔥</div>
            <h4>Reading Streak</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>12 days</div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              background: '#e9ecef', 
              borderRadius: '4px',
              marginTop: '1rem',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '43%',
                height: '100%',
                background: '#ffc107'
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Recommendations */}
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>🎯 Personalized Recommendations</h3>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Based on your reading journey, here are some books you might enjoy next
        </p>
        <div className="grid grid-3">
          <div className="feature-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📚</div>
            <h4>The Color Purple</h4>
            <p>Alice Walker</p>
            <div style={{ color: '#667eea', fontWeight: 'bold' }}>95% Match</div>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📖</div>
            <h4>Brave New World</h4>
            <p>Aldous Huxley</p>
            <div style={{ color: '#667eea', fontWeight: 'bold' }}>92% Match</div>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📘</div>
            <h4>The Grapes of Wrath</h4>
            <p>John Steinbeck</p>
            <div style={{ color: '#667eea', fontWeight: 'bold' }}>88% Match</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingJourney; 