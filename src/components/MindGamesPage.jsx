import React from 'react';
import { Brain } from 'lucide-react';

const MindGamesPage = () => {
  const games = [
    { name: 'Memory Match', desc: 'Test your memory skills', colorClass: 'pink' },
    { name: 'Word Puzzle', desc: 'Challenge your vocabulary', colorClass: 'blue' },
    { name: 'Pattern Recognition', desc: 'Improve cognitive skills', colorClass: 'green' },
    { name: 'Math Challenge', desc: 'Quick mental calculations', colorClass: 'yellow' },
    { name: 'Color Match', desc: 'Test your reflexes', colorClass: 'purple' },
    { name: 'Meditation Timer', desc: 'Relax and focus', colorClass: 'indigo' }
  ];

  return (
    <div className="main-content">
      <div className="content-wrapper">
        <div className="page-header">
          <h1 className="page-title">Mind Games</h1>
          <p className="page-description">Boost your cognitive wellness with fun activities</p>
        </div>

        <div className="games-grid">
          {games.map((game, idx) => (
            <div key={idx} className={`game-card ${game.colorClass}`}>
              <div className="game-icon-container">
                <Brain size={48} className="game-icon" />
              </div>
              <h3 className="game-name">{game.name}</h3>
              <p className="game-desc">{game.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MindGamesPage;