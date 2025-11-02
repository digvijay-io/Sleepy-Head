from flask import Flask, request, jsonify
from flask_cors import CORS
from sentiment_analyzer import SentimentAnalyzer
from llm_handler import LLMHandler
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Initialize components
sentiment_analyzer = SentimentAnalyzer()

# Path to your GGUF model - now reads from .env
MODEL_NAME = os.getenv('MODEL_NAME', 'OpenHermes-2.5-Mistral-7B')
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', MODEL_NAME)

# Check if model exists
if not os.path.exists(MODEL_PATH):
    print("\n" + "="*60)
    print("ERROR: Model file not found!")
    print("="*60)
    print(f"Expected location: {MODEL_PATH}")
    print("\nPlease run the model downloader first:")
    print("  python download_model.py")
    print("="*60 + "\n")
    exit(1)

print(f"\nLoading model: {MODEL_NAME}")
print(f"Path: {MODEL_PATH}")
llm_handler = LLMHandler(MODEL_PATH)

# Store conversation history (in production, use a database)
conversation_sessions = {}

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "SleepyHead backend is running"})

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Main chat endpoint
    Receives user message, performs sentiment analysis, and generates response
    """
    try:
        data = request.json
        user_message = data.get('message', '')
        session_id = data.get('session_id', 'default')
        conversation_history = data.get('conversation_history', [])
        
        if not user_message:
            return jsonify({"error": "Message is required"}), 400
        
        # Step 1: Perform sentiment analysis
        sentiment_result = sentiment_analyzer.analyze(user_message)
        tone = sentiment_analyzer.get_response_tone(sentiment_result)
        
        print(f"\n{'='*60}")
        print(f"User message: {user_message}")
        print(f"Sentiment: {sentiment_result['sentiment']}, Compound: {sentiment_result['compound']:.3f}")
        print(f"Response tone: {tone}")
        
        # Step 2: Generate response using LLM based on sentiment
        print(f"Generating response...")
        response = llm_handler.generate_response(
            user_message=user_message,
            tone=tone,
            conversation_history=conversation_history
        )
        
        print(f"Generated response: {response}")
        print(f"{'='*60}\n")
        
        # Return response with sentiment data
        return jsonify({
            "response": response,
            "sentiment": {
                "classification": sentiment_result['sentiment'],
                "scores": sentiment_result['scores'],
                "tone": tone
            }
        })
    
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route('/api/sentiment', methods=['POST'])
def analyze_sentiment():
    """
    Endpoint to only analyze sentiment (useful for testing)
    """
    try:
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({"error": "Text is required"}), 400
        
        result = sentiment_analyzer.analyze(text)
        tone = sentiment_analyzer.get_response_tone(result)
        
        return jsonify({
            "sentiment": result['sentiment'],
            "scores": result['scores'],
            "tone": tone
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting SleepyHead backend server...")
    print(f"Model path: {MODEL_PATH}")
    app.run(host='0.0.0.0', port=5001, debug=True)