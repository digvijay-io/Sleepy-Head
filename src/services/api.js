const API_BASE_URL = 'http://localhost:5000';

export const chatAPI = {
  /**
   * Send a message to the backend and get AI response
   */
  sendMessage: async (message, conversationHistory = []) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversation_history: conversationHistory,
          session_id: 'default'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  /**
   * Analyze sentiment of text (for testing)
   */
  analyzeSentiment: async (text) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sentiment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      throw error;
    }
  },

  /**
   * Check if backend is running
   */
  healthCheck: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return { status: 'unhealthy' };
    }
  }
};