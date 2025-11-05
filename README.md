# 🌙 Sleepy Head

A mental wellness application that combines mood tracking, thought journaling, and AI-powered insights to help you understand and improve your mental health.

## ✨ Features

- **Mood Tracking**: Log and visualize your daily mood patterns
- **Thought Journal**: Write and reflect on your thoughts and feelings
- **AI Insights**: Get intelligent feedback powered by local LLM
- **Privacy First**: All data stays on your device with local model processing
- **Beautiful UI**: Clean, intuitive interface for easy daily use

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Node.js 16+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/digvijay-io/Sleepy-Head.git
   cd Sleepy-Head
   ```

2. **Backend Setup**
   ```bash
   cd backend
   
   # Create virtual environment
   python -m venv venv
   
   # Activate virtual environment
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # On Mac/Linux:
   source venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Download Model Files**
   
   The application uses local LLM models. Download the following models and place them in `backend/models/`:
   
   - [TinyLlama-1.1B-Chat](https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF) (Q4_K_M variant)
   - [OpenHermes-2.5-Mistral-7B](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF) (Q4_K_M variant)
   
   Or run the download script:
   ```bash
   python download_model.py
   ```

4. **Frontend Setup**
   ```bash
   cd ..  # Back to root directory
   npm install
   ```

### Running the Application

1. **Start the Backend**
   ```bash
   cd backend
   # Activate venv if not already active
   flask run
   # Or
   python app.py
   ```

2. **Start the Frontend** (in a new terminal)
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
Sleepy-Head/
├── backend/
│   ├── models/          # LLM model files (not in Git)
│   ├── venv/           # Python virtual environment (not in Git)
│   ├── app.py          # Flask backend server
│   ├── llm_handler.py  # LLM integration logic
│   ├── download_model.py
│   └── requirements.txt
├── src/
│   ├── components/
│   │   ├── MoodTrackerPage.jsx
│   │   ├── ThoughtJournal.jsx
│   │   └── Sidebar.jsx
│   └── App.jsx
├── index.html
├── package.json
├── .gitignore
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- React
- Vite
- Tailwind CSS (or your CSS framework)

### Backend
- Flask
- Python
- llama-cpp-python (for local LLM inference)

### AI/ML
- TinyLlama / Mistral models
- Local inference (privacy-focused)

## 🔒 Privacy & Security

- All processing happens locally on your device
- No data is sent to external servers
- Your journal entries and mood data stay private
- Models run offline after initial download

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

**Digvijay**
- GitHub: [@digvijay-io](https://github.com/digvijay-io)

**Maruf**
- GitHub: [@MaruffCodes](https://github.com/MaruffCodes)

**Vishnupriya**
- GitHub: [@vishnupriya](https://github.com/vishnupriya)

## 🙏 Acknowledgments

- Model creators on Hugging Face
- Open source LLM community
- Contributors and testers

## 📧 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Made with ❤️ for better mental wellness
