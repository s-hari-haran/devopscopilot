# Running DevOps Copilot & JARVIS Locally

## Quick Overview

**DevOps Copilot**: Full-stack web app (React + Node.js)  
**JARVIS**: Voice AI assistant (Python - Windows only)

---

## SETUP OPTIONS

### Option 1: DevOps Copilot Only (Recommended First)

#### Prerequisites
- Node.js 18+ and npm
- Gemini API key (get from [Google AI Studio](https://aistudio.google.com/apikey))

#### Steps

```bash
# Clone the repo
git clone https://github.com/s-hari-haran/devopscopilot.git
cd devopscopilot

# 1. BACKEND SETUP
cd devops-copilot/backend
npm install

# Create .env file with your Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Start backend (runs on port 3001)
npm start
# Output: "Backend running on http://localhost:3001"
```

```bash
# 2. FRONTEND SETUP (in new terminal)
cd devops-copilot/frontend
npm install

# Start frontend (runs on port 3000)
npm run dev
# Output: "http://localhost:3000"
```

**Access**: Open http://localhost:3000 in your browser

---

### Option 2: JARVIS (Python - Windows Only)

#### Prerequisites
- Python 3.8+
- Windows OS (uses Windows-specific APIs)
- Gemini API key
- Google Speech-to-Text API credentials (optional, can use offline)

#### Steps

```bash
# Navigate to JARVIS
cd jarvis

# Install dependencies
pip install -r requirements.txt

# Configure API key
# Edit src/config.py and add your Gemini API key:
# GEMINI_API_KEY = "your_api_key_here"

# Run JARVIS
python src/main.py

# Activation: Press Windows+H to activate
```

**Troubleshooting**:
- If speech recognition fails, install: `pip install pyaudio`
- On Windows 11, ensure microphone permissions are granted
- Check `src/config.py` for hotkey customization

---

### Option 3: Both Projects (Full Setup)

```bash
# Follow Option 1 (DevOps Copilot) first
# Then follow Option 2 (JARVIS) on a Windows machine

# Run in parallel:
# Terminal 1: Backend (port 3001)
# Terminal 2: Frontend (port 3000)
# Terminal 3 (Windows): JARVIS (press Windows+H)
```

---

## REQUIRED API KEYS

### Gemini API Key (Both Projects)

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Create API Key"
3. Copy the key
4. Add to:
   - **DevOps Copilot**: `backend/.env`
   - **JARVIS**: `src/config.py`

### Google Speech-to-Text (JARVIS Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project
3. Enable Speech-to-Text API
4. Create service account credentials
5. Download JSON key
6. Save to `jarvis/credentials.json`

(If not set up, JARVIS uses Windows' built-in speech recognition)

---

## VERIFICATION

### DevOps Copilot
```bash
# Test backend
curl http://localhost:3001/api/health

# Test frontend
# Visit http://localhost:3000
# Should see dashboard with 5 agent cards
```

### JARVIS
```bash
# Run and check output
python src/main.py

# Should output:
# JARVIS initialized successfully
# Listening for hotkey (Windows+H)
# Press Windows+H and speak a command
```

---

## ENVIRONMENT FILES

### DevOps Copilot - `backend/.env`
```
GEMINI_API_KEY=sk-your-key-here
PORT=3001
NODE_ENV=development
```

### JARVIS - `src/config.py`
```python
# Line ~20
GEMINI_API_KEY = "sk-your-key-here"
GEMINI_MODEL = "gemini-2.0-flash"

# Optional - speech credentials
SPEECH_CREDENTIALS_PATH = "credentials.json"
```

---

## QUICK START COMMANDS

### All-in-one (macOS/Linux)
```bash
# Terminal 1: Backend
cd devops-copilot/backend && npm install && npm start

# Terminal 2: Frontend
cd devops-copilot/frontend && npm install && npm run dev

# Browser: http://localhost:3000
```

### Windows + JARVIS
```bash
# Terminal 1: Backend
cd devops-copilot\backend && npm install && npm start

# Terminal 2: Frontend
cd devops-copilot\frontend && npm install && npm run dev

# Terminal 3: JARVIS
cd jarvis && pip install -r requirements.txt && python src/main.py
```

---

## PORT REFERENCE

| Service | Port | URL |
|---------|------|-----|
| Frontend (React) | 3000 | http://localhost:3000 |
| Backend (Express) | 3001 | http://localhost:3001 |
| JARVIS | N/A | Windows hotkey activation |

---

## TROUBLESHOOTING

### Frontend won't load
```bash
# Clear cache and reinstall
rm -rf devops-copilot/frontend/node_modules package-lock.json
npm install
npm run dev
```

### Backend fails to start
```bash
# Check port 3001 is free
lsof -i :3001
# Kill if needed: kill -9 <PID>

# Verify Gemini API key
echo $GEMINI_API_KEY  # Should print your key
```

### JARVIS won't listen
```bash
# Check microphone
# Windows Settings → Privacy & Security → Microphone → Allow

# Test hotkey
python src/main.py  # Should print "Listening for Windows+H"

# Check config.py hotkey settings
cat src/config.py | grep -A 5 "HOTKEY"
```

### Speech recognition not working
```bash
# Try offline (no API needed)
# Or set up Google Speech-to-Text credentials
# See "Google Speech-to-Text" section above
```

---

## NEXT STEPS

### DevOps Copilot
- Dashboard should show 5 agent cards
- Click "Simulate Incident" to test workflow
- Check backend console for agent logs

### JARVIS
- Press Windows+H
- Try: "Open Chrome"
- Try: "Search for Python"
- Try: "Type hello world"

---

## USEFUL LINKS

- **Gemini API**: https://aistudio.google.com/
- **Google Cloud Console**: https://console.cloud.google.com
- **Node.js**: https://nodejs.org/ (18+)
- **Python**: https://www.python.org/ (3.8+)

---

## Still Stuck?

1. Check `.env` files have correct API keys
2. Verify ports 3000-3001 are available
3. Ensure Python 3.8+ or Node.js 18+
4. JARVIS needs Windows (macOS/Linux not supported)
5. Check docs in respective project folders

Happy coding! 🚀
