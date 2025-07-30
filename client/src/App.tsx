import React from 'react';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <h1 style={{ color: '#333', marginBottom: '1rem' }}>
          📚 LitVerse - Beyond the Bookstore
        </h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Welcome to the future of reading! Our innovative e-commerce platform is coming soon.
        </p>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '1rem', 
          borderRadius: '5px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ color: '#495057', marginBottom: '0.5rem' }}>
            🚀 Features Coming Soon:
          </h3>
          <ul style={{ 
            textAlign: 'left', 
            color: '#6c757d',
            lineHeight: '1.6'
          }}>
            <li>AI-Powered Reading Journey Tracker</li>
            <li>Social Reading Revolution</li>
            <li>Immersive Book Experience</li>
            <li>Gamified Learning Ecosystem</li>
            <li>Smart Book Discovery</li>
            <li>Virtual 3D Bookshelf</li>
          </ul>
        </div>
        <p style={{ 
          marginTop: '2rem', 
          color: '#28a745',
          fontWeight: 'bold'
        }}>
          ✅ Backend server is running successfully!
        </p>
      </div>
    </div>
  );
}

export default App; 