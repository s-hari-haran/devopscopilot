# AI-Powered DevOps & Assistant Platform

A complete workspace containing two independent, production-grade AI projects.

## 📋 Projects Overview

This workspace contains two separate projects:

### 1. **DevOps Copilot** - Full-Stack Web Platform
A production-grade DevOps automation platform with AI-powered incident detection, analysis, and automated fixing.

- **Location**: `/devops-copilot`
- **Tech Stack**: Next.js (Frontend) + Express.js (Backend) + Gemini API
- **Purpose**: Detect security bugs, analyze with AI, auto-generate fixes, create pull requests
- **Ports**: Frontend (3000), Backend (3001)

**Key Features**:
- 🔍 Bug injection and detection
- 🧠 Gemini AI code analysis
- 🤖 5-agent orchestration system
- 📋 Incident lifecycle management
- 🔧 Automated PR generation
- 🎨 Neo-brutalism UI design

**Quick Start**:
```bash
# Terminal 1 - Backend
cd devops-copilot/backend
npm install
npm run dev

# Terminal 2 - Frontend
cd devops-copilot/frontend
npm install
npm run dev

# Open http://localhost:3000
```

For details: See `devops-copilot/docs/README.md`

---

### 2. **JARVIS** - Personal AI Assistant
A voice-controlled Windows AI assistant that listens to your commands and executes actions intelligently.

- **Location**: `/jarvis`
- **Language**: Python
- **Purpose**: Voice-activated AI assistant for Windows automation
- **Activation**: Windows+H or Ctrl+Shift+J

**Key Features**:
- 🎤 Voice recognition (speech-to-text)
- 🧠 Gemini AI understanding
- 🚀 Action execution (open apps, type, search, system control)
- ⚡ <2 second response time
- 🔊 Real-time feedback

**Supported Commands**:
- "Open Edge browser"
- "Search for Python tutorials"
- "Type an email to John"
- "Close window"
- "Volume up"
- And many more!

**Quick Start**:
```bash
cd jarvis
pip install -r requirements.txt
python src/main.py

# Press Windows+H to activate
```

For details: See `jarvis/docs/README.md`

---

## 🗂️ Project Structure

```
.
├── devops-copilot/              ← Full-stack Web Platform
│   ├── backend/                 # Express.js server
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── services/
│   │   ├── package.json
│   │   └── .env.example
│   ├── frontend/                # Next.js React app
│   │   ├── pages/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── styles/
│   │   ├── package.json
│   │   └── next.config.js
│   ├── docs/                    # Documentation
│   │   ├── README.md
│   │   ├── ARCHITECTURE.md
│   │   └── QUICKSTART.md
│   └── verify-setup.js
│
├── jarvis/                      ← Voice Assistant (Python)
│   ├── src/                     # Source code
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── voice_recognition.py
│   │   ├── gemini_brain.py
│   │   ├── action_executor.py
│   │   ├── hotkey_listener.py
│   │   └── gui_overlay.py
│   ├── docs/                    # Documentation
│   │   ├── README.md
│   │   └── ARCHITECTURE.md
│   ├── requirements.txt
│   └── setup.py
│
├── README.md                    ← This file
└── SETUP.md                     ← Full setup instructions
```

---

## 🚀 Getting Started

### Prerequisites
- **For DevOps Copilot**: Node.js 16+, npm
- **For JARVIS**: Python 3.8+, pip
- **API Key**: Google Gemini API key (free tier available)

### Setup Both Projects

```bash
# 1. DevOps Copilot Setup
cd devops-copilot/backend && npm install
cd ../frontend && npm install

# 2. JARVIS Setup
cd ../../jarvis && pip install -r requirements.txt
```

### Run DevOps Copilot

```bash
# Terminal 1 - Backend (port 3001)
cd devops-copilot/backend
npm run dev

# Terminal 2 - Frontend (port 3000)
cd devops-copilot/frontend
npm run dev

# Open http://localhost:3000 in browser
```

### Run JARVIS

```bash
cd jarvis
python src/main.py

# Press Windows+H to activate (or Ctrl+Shift+J)
```

---

## 📚 Documentation

### DevOps Copilot
- [DevOps README](devops-copilot/docs/README.md) - Full documentation
- [Architecture](devops-copilot/docs/ARCHITECTURE.md) - System design
- [Quick Start](devops-copilot/docs/QUICKSTART.md) - Getting started

### JARVIS
- [JARVIS README](jarvis/docs/README.md) - Full documentation
- [Architecture](jarvis/docs/ARCHITECTURE.md) - System design

---

## 🔑 API Keys & Configuration

### DevOps Copilot
Create `.env` in `devops-copilot/backend/`:
```
GEMINI_API_KEY=your_api_key_here
PORT=3001
```

### JARVIS
Edit `jarvis/src/config.py`:
```python
GEMINI_API_KEY = "your_api_key_here"
VOICE_LANGUAGE = "en-US"
HOTKEY = "<cmd>+h"  # Windows+H
```

---

## 🛠️ Development

### DevOps Copilot Stack
- **Frontend**: React 18, Next.js 14, Tailwind CSS, TypeScript
- **Backend**: Express.js, Node.js, Gemini API
- **Services**: 5-agent orchestration, repo simulation, incident management

### JARVIS Stack
- **Language**: Python 3.8+
- **Libraries**: pynput, speech_recognition, google-generative-ai
- **Integration**: Gemini API for AI understanding

---

## 📋 Troubleshooting

### DevOps Copilot
| Issue | Solution |
|-------|----------|
| Port 3000/3001 in use | Change PORT in `.env` or kill process |
| Module not found | Run `npm install` in backend/frontend |
| API key invalid | Verify GEMINI_API_KEY in `.env` |
| CORS error | Check backend is running on 3001 |

### JARVIS
| Issue | Solution |
|-------|----------|
| Microphone not found | Check system audio, install PyAudio |
| Hotkey not working | Try alternative hotkey in config.py |
| API key error | Verify GEMINI_API_KEY in config.py |
| No speech detected | Check microphone volume, try speaking louder |

---

## 🤝 Project Independence

These are **two completely separate projects**:
- Different tech stacks (Node/React vs Python)
- Different purposes (Web platform vs Desktop assistant)
- Independent dependencies
- Separate documentation
- Independent deployment

You can run, develop, or deploy either one independently.

---

## 📄 License

Both projects are open source and available under the MIT License.

---

## 🎯 Next Steps

1. **Choose your project**:
   - DevOps Copilot? → `cd devops-copilot && cat docs/QUICKSTART.md`
   - JARVIS? → `cd jarvis && cat docs/README.md`

2. **Install dependencies** for your chosen project
3. **Configure API keys** in appropriate `.env` or `config.py`
4. **Start developing!**

---

## 📞 Support

For each project, refer to their respective documentation:
- DevOps Copilot: `devops-copilot/docs/`
- JARVIS: `jarvis/docs/`

Good luck! 🚀
