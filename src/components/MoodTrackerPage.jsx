import ThoughtJournal from './ThoughtJournal';

const MoodTrackerPage = ({ moodHistory, handleMoodSelect }) => {
  return (
    <div className="main-content">
      <div className="mood-tracker-container">
        <div className="page-header">
          <h1 className="page-title">Rage Board</h1>
          <p className="page-description">Just Say it all</p>
        </div>

        { /* Rage Board */}
          <ThoughtJournal />


        { /* Mood Emoji Board  */}
        <div className="mood-selection-card">
          <h2 className="mood-selection-title">How are you feeling?</h2>
          <div className="mood-options">
            <button onClick={() => handleMoodSelect('happy')} className="mood-option">
              <span className="mood-emoji">😊</span>
              <span className="mood-label">Happy</span>
            </button>
            <button onClick={() => handleMoodSelect('neutral')} className="mood-option">
              <span className="mood-emoji">😐</span>
              <span className="mood-label">Neutral</span>
            </button>
            <button onClick={() => handleMoodSelect('sad')} className="mood-option">
              <span className="mood-emoji">😢</span>
              <span className="mood-label">Sad</span>
            </button>
          </div>
        </div>

        { /* Mood Emoji Board - Tracking History */}
        <div className="mood-history-card">
          <h2 className="mood-history-title">Mood History</h2>
          {moodHistory.length === 0 ? (
            <p className="mood-history-empty">No mood entries yet. Start tracking your mood!</p>
          ) : (
            <div className="mood-history-list">
              {moodHistory.slice().reverse().map((entry, idx) => (
                <div key={idx} className="mood-history-item">
                  <div className="mood-history-left">
                    <span className="mood-history-emoji">
                      {entry.mood === 'happy' ? '😊' : entry.mood === 'neutral' ? '😐' : '😢'}
                    </span>
                    <span className="mood-history-mood">{entry.mood}</span>
                  </div>
                  <span className="mood-history-time">{entry.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTrackerPage;