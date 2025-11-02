import { useState, useEffect } from 'react';

export default function ThoughtJournal() {
  const [thought, setThought] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const saved = localStorage.getItem('savedThought');
    if (saved) {
      setThought(saved);
    }
  }, []);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const saveThought = () => {
    if (!thought.trim()) {
      showNotification('Please write something before saving!', 'error');
      return;
    }
    localStorage.setItem('savedThought', thought);
    showNotification('Thought saved successfully! 💭', 'success');
  };

  const exportThought = () => {
    if (!thought.trim()) {
      showNotification('Nothing to export!', 'error');
      return;
    }
    
    const date = new Date().toLocaleString();
    const content = `THOUGHT JOURNAL\n\nDate: ${date}\nCharacters: ${thought.length}\n\n${thought}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thought_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Exported successfully! 📄', 'success');
  };

  const printThought = () => {
    if (!thought.trim()) {
      showNotification('Nothing to print!', 'error');
      return;
    }
    window.print();
  };

  const clearThought = () => {
    if (thought.trim() && !window.confirm('Are you sure you want to clear your thought?')) {
      return;
    }
    setThought('');
    localStorage.removeItem('savedThought');
    showNotification('Cleared! 🧹', 'success');
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .thought-journal-container {
          margin-bottom: 2rem;
        }

        .thought-notification {
          animation: slideIn 0.3s ease;
        }

        .thought-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .thought-title {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 6px;
        }

        .thought-subtitle {
          color: #64748b;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .thought-textarea {
          width: 100%;
          min-height: 180px;
          padding: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 15px;
          font-family: inherit;
          resize: vertical;
          transition: all 0.3s ease;
          line-height: 1.5;
          color: #1e293b;
        }

        .thought-textarea:focus {
          outline: none;
          border-color: #0E0662;
          box-shadow: 0 0 0 3px rgba(14, 6, 98, 0.1);
        }

        .thought-textarea::placeholder {
          color: #94a3b8;
        }

        .thought-char-count {
          text-align: right;
          color: #64748b;
          font-size: 13px;
          margin: 10px 0 16px 0;
          font-weight: 500;
        }

        .thought-button-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }

        .thought-btn {
          padding: 10px 18px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .thought-btn-save {
          background: #0E0662;
          color: white;
          grid-column: span 3;
        }

        .thought-btn-save:hover {
          background: #1a0d8f;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(14, 6, 98, 0.3);
        }

        .thought-btn-save:active {
          transform: translateY(0);
        }

        .thought-btn-export {
          background: #48bb78;
          color: white;
        }

        .thought-btn-export:hover {
          background: #38a169;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
        }

        .thought-btn-print {
          background: #ed8936;
          color: white;
        }

        .thought-btn-print:hover {
          background: #dd6b20;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(237, 137, 54, 0.3);
        }

        .thought-btn-clear {
          background: #f1f5f9;
          color: #64748b;
          border: 2px solid #e2e8f0;
        }

        .thought-btn-clear:hover {
          background: #e2e8f0;
          border-color: #cbd5e0;
        }

        .thought-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: white;
          padding: 14px 20px;
          border-radius: 10px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          font-weight: 500;
          font-size: 14px;
        }

        .thought-notification.success {
          border-left: 4px solid #48bb78;
        }

        .thought-notification.error {
          border-left: 4px solid #f56565;
        }

        @media print {
          .thought-button-grid,
          .thought-char-count {
            display: none !important;
          }
          .thought-card {
            box-shadow: none;
          }
          .thought-textarea {
            border: none;
            padding: 0;
          }
        }

        @media (max-width: 640px) {
          .thought-card {
            padding: 20px;
          }
          .thought-title {
            font-size: 18px;
          }
          .thought-button-grid {
            grid-template-columns: 1fr;
          }
          .thought-btn-save {
            grid-column: span 1;
          }
        }
      `}</style>

      <div className="thought-journal-container">
        {notification.show && (
          <div className={`thought-notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <div className="thought-card">
          <h1 className="thought-title">What's on your mind?</h1>
          <p className="thought-subtitle">Express your thoughts freely</p>
          
          <textarea
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            placeholder="Write it here..."
            className="thought-textarea"
          />
          
          <div className="thought-char-count">
            {thought.length.toLocaleString()} characters
          </div>
          
          <div className="thought-button-grid">
            <button onClick={saveThought} className="thought-btn thought-btn-save">
              💾 Save
            </button>
            <button onClick={exportThought} className="thought-btn thought-btn-export">
              📥 Export
            </button>
            <button onClick={printThought} className="thought-btn thought-btn-print">
              🖨️ Print
            </button>
            <button onClick={clearThought} className="thought-btn thought-btn-clear">
              🗑️ Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}