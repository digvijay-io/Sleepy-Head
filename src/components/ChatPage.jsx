// src/components/ChatPage.jsx
import React, { useState } from "react";

const ChatPage = () => {
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", text: "Hello! I'm SleepyHead, your AI companion. How can I help you today?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sentimentInfo, setSentimentInfo] = useState(null);

  // API call function
  const sendMessageToAPI = async (message, conversationHistory) => {
    const API_BASE_URL = "http://localhost:5001";
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        conversation_history: conversationHistory,
        session_id: "default",
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isLoading) {
      const userMsg = inputMessage;
      const newMessages = [...chatMessages, { type: "user", text: userMsg }];
      setChatMessages(newMessages);
      setInputMessage("");
      setIsLoading(true);

      try {
        const response = await sendMessageToAPI(userMsg, chatMessages);

        setChatMessages([
          ...newMessages,
          { type: "bot", text: response.response },
        ]);
        setSentimentInfo(response.sentiment);
      } catch (error) {
        console.error("Chat API error:", error);
        setChatMessages([
          ...newMessages,
          {
            type: "bot",
            text: "Sorry, I’m having trouble connecting. Please make sure the backend server is running.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="main-content">
      <div className="chat-container">
        <div className="chat-header">
          <h1 className="chat-title">Chat with SleepyHead</h1>
          <p className="chat-subtitle">Your AI companion is here to listen</p>
         
        </div>

        <div className="chat-messages">
          <div className="message-list">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                <div className={`message-bubble ${msg.type}`}>{msg.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-bubble bot">
                 <i>Typing...</i> 
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
              placeholder={isLoading ? "Processing..." : "Type your message..."}
              className="chat-input"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="send-button"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Send"}
            </button>
          </div>

          {sentimentInfo && (
            <div
              style={{
                marginTop: "12px",
                padding: "10px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                fontSize: "13px",
                fontFamily: "monospace",
              }}
            >
              <div style={{ marginBottom: "4px" }}>
                <strong>Sentiment:</strong> {sentimentInfo.classification}
                <span style={{ marginLeft: "10px", color: "#666" }}>
                  (Compound: {sentimentInfo.scores.compound.toFixed(3)})
                </span>
              </div>
              <div>
                <strong>Tone:</strong> {sentimentInfo.tone}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
