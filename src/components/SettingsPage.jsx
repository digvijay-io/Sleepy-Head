const SettingsPage = () => {
  return (
    <div className="main-content">
      <div className="settings-container">
        <div className="page-header">
          <h1 className="page-title">Settings</h1>
          <p className="page-description">Customize your SleepyHead experience</p>
        </div>

        <div className="settings-card">
          <div className="settings-section">
            <h3 className="settings-section-title">Notifications</h3>
            <label className="settings-toggle">
              <span>Daily affirmations</span>
              <input type="checkbox" className="settings-checkbox" defaultChecked />
            </label>
          </div>

          <div className="settings-section">
            <h3 className="settings-section-title">Theme</h3>
            <select className="settings-select">
              <option>Light Mode</option>
              <option>Dark Mode</option>
            </select>
          </div>

          <div className="settings-section">
            <h3 className="settings-section-title">Privacy</h3>
            <button className="settings-link">Manage data</button>
          </div>

          <div className="settings-section">
            <h3 className="settings-section-title">About</h3>
            <p className="settings-info">SleepyHead v1.0</p>
            <p className="settings-info">Your AI companion for better sleep and wellness</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
