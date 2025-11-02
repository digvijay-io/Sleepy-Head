import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ChatPage from "./components/ChatPage";
import MindGamesPage from "./components/MindGamesPage";
import MoodTrackerPage from "./components/MoodTrackerPage";
import SettingsPage from "./components/SettingsPage";

const App = () => {
  const [moodHistory, setMoodHistory] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", text: "Hello! I'm SleepyHead, your AI companion. How can I help you today?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleMoodSelect = (selectedMood) => {
    const timestamp = new Date().toLocaleString();
    setMoodHistory((prev) => [...prev, { mood: selectedMood, time: timestamp }]);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages((prev) => [
        ...prev,
        { type: "user", text: inputMessage },
        { type: "bot", text: "I understand. Tell me more about how you're feeling." }
      ]);
      setInputMessage("");
    }
  };

  return (
    <Router>
      <div className="app-container">
        {/* Sidebar stays exactly the same */}
        <Sidebar />

        {/* Main content renders directly, preserving your original layout */}
        <Routes>
          <Route
            path="/"
            element={<Dashboard handleMoodSelect={handleMoodSelect} />}
          />
          <Route
            path="/chat"
            element={
              <ChatPage
                chatMessages={chatMessages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
              />
            }
          />
          <Route path="/mindgames" element={<MindGamesPage />} />
          <Route
            path="/mood"
            element={
              <MoodTrackerPage
                moodHistory={moodHistory}
                handleMoodSelect={handleMoodSelect}
              />
            }
          />
          <Route path="/settings" element={<SettingsPage />} />

          <Route path="*" element={<h1 className="text-center p-10">404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
