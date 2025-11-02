import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, Brain, BarChart3, Settings } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img 
          src="/logo.png" 
          alt="Sleepyhead Logo" 
          style={{ 
            width: '100%',
            height: 'auto', 
            display: 'block',
            padding: '0 8px'
          }}
        />
      </div>

      <nav className="nav-menu">
        <Link to="/" className={`nav-button ${isActive("/")}`}>
          <Home size={18} className="nav-icon" />
          <span>Dashboard</span>
        </Link>

        <Link to="/chat" className={`nav-button ${isActive("/chat")}`}>
          <MessageCircle size={18} className="nav-icon" />
          <span>Chat</span>
        </Link>

        <Link
          to="/mindgames"
          className={`nav-button ${isActive("/mindgames")}`}
        >
          <Brain size={18} className="nav-icon" />
          <span>Mind Games</span>
        </Link>

        <Link to="/mood" className={`nav-button ${isActive("/mood")}`}>
          <BarChart3 size={18} className="nav-icon" />
          <span>Rage Board</span>
        </Link>
      </nav>

      <Link to="/settings" className={`nav-button ${isActive("/settings")}`}>
        <Settings size={18} className="nav-icon" />
        <span>Settings</span>
      </Link>
    </div>
  );
};

export default Sidebar;
