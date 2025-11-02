import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ handleMoodSelect }) => {
  const affirmations = [
    "Life will always hand you tangerines, it's up to you whether you taste the sourness or bring out the sweetness.",
    "You are capable of amazing things.",
    "Every day is a fresh start.",
    "Your potential is endless.",
    "Believe in yourself and all that you are.",
    "You are stronger than you think."
  ];

  const [currentAffirmation] = useState(affirmations[0]);

  return (
    <div className="main-content">
      <div className="content-wrapper">
        <div className="header-card">
          <h1 className="main-title">SleepyHead</h1>
          <p className="subtitle">A Friend till you fall asleep</p>
        </div>

        <div className="mood-selector">
          <span className="mood-question">How are you feeling today?</span>
          <div className="mood-buttons">
            <button onClick={() => handleMoodSelect('happy')} className="mood-button">😊</button>
            <button onClick={() => handleMoodSelect('neutral')} className="mood-button">😐</button>
            <button onClick={() => handleMoodSelect('sad')} className="mood-button">😢</button>
          </div>
        </div>

        <div className="feature-grid">
          <Link to="/chat" className="feature-card">
            <div className="feature-icon-wrapper">
              <svg viewBox="0 0 200 150" style={{ width: '100%', height: '100%' }}>
                <rect x="40" y="20" width="120" height="80" rx="8" fill="#d8b4e2" opacity="0.6"/>
                <rect x="50" y="30" width="100" height="60" rx="4" fill="#f0e6f6"/>
                <line x1="60" y1="45" x2="140" y2="45" stroke="#d8b4e2" strokeWidth="3"/>
                <line x1="60" y1="60" x2="140" y2="60" stroke="#d8b4e2" strokeWidth="3"/>
                <line x1="60" y1="75" x2="110" y2="75" stroke="#d8b4e2" strokeWidth="3"/>
              </svg>
            </div>
            <h3 className="feature-title">Start Chatting</h3>
            <p className="feature-description">Talk to your AI companion</p>
          </Link>

          <Link to="/mindgames" className="feature-card">
            <div className="feature-icon-wrapper">
              <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                <rect x="60" y="40" width="80" height="120" rx="8" fill="#d8b4e2" opacity="0.6"/>
                <ellipse cx="100" cy="60" rx="25" ry="30" fill="#f0e6f6"/>
                <rect x="70" y="90" width="60" height="60" rx="4" fill="#f0e6f6"/>
              </svg>
            </div>
            <h3 className="feature-title">Mind Games</h3>
            <p className="feature-description">Let's check your cognitive wellness</p>
          </Link>

          <Link to="/mood" className="feature-card">
            <div className="feature-icon-wrapper">
              <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                <path d="M60,140 L60,100 L80,80 L100,100 L120,60 L140,80 L140,140 Z" fill="#d8b4e2" opacity="0.6"/>
                <rect x="50" y="140" width="100" height="30" rx="6" fill="#f0e6f6"/>
                <line x1="60" y1="140" x2="60" y2="100" stroke="#b084cc" strokeWidth="3"/>
                <line x1="80" y1="140" x2="80" y2="80" stroke="#b084cc" strokeWidth="3"/>
                <line x1="100" y1="140" x2="100" y2="100" stroke="#b084cc" strokeWidth="3"/>
                <line x1="120" y1="140" x2="120" y2="60" stroke="#b084cc" strokeWidth="3"/>
                <line x1="140" y1="140" x2="140" y2="80" stroke="#b084cc" strokeWidth="3"/>
              </svg>
            </div>
            <h3 className="feature-title">Mood Tracker</h3>
            <p className="feature-description">Go track your mood</p>
          </Link>
        </div>

        <div className="affirmation-card">
          <div className="affirmation-header">
            <span className="affirmation-sparkle">✨</span>
            <h2 className="affirmation-title">Today's Affirmation</h2>
            <span className="affirmation-sparkle">✨</span>
          </div>
          <p className="affirmation-text">"{currentAffirmation}"</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
