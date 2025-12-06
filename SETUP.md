# Complete Setup Guide

A comprehensive guide to setting up both **DevOps Copilot** and **JARVIS** projects.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [DevOps Copilot Setup](#devops-copilot-setup)
3. [JARVIS Setup](#jarvis-setup)
4. [Running Both Projects](#running-both-projects)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **OS**: Windows, macOS, or Linux
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 2GB available

### DevOps Copilot Requirements
- **Node.js**: v16 or higher
- **npm**: v7 or higher
- **Browser**: Modern browser (Chrome, Firefox, Edge, Safari)

Check:
```bash
node --version  # Should be v16+
npm --version   # Should be v7+
```

### JARVIS Requirements
- **Python**: 3.8 or higher
- **pip**: Latest version
- **Microphone**: System microphone configured
- **OS**: Windows (for full hotkey support)

Check:
```bash
python --version  # Should be 3.8+
pip --version
```

### Gemini API Key
Both projects require a Google Gemini API key:

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click "Create API Key"
3. Copy your API key
4. Save it safely

---

## DevOps Copilot Setup

### Step 1: Navigate to Backend
```bash
cd devops-copilot/backend
```

### Step 2: Install Backend Dependencies
```bash
npm install
```

Expected output:
```
added X packages in Ys
```

### Step 3: Configure Environment
Create `.env` file:
```bash
cat > .env << EOF
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=development
EOF
```

Replace `your_gemini_api_key_here` with your actual Gemini API key.

### Step 4: Test Backend
```bash
npm run dev
```

You should see:
```
DevOps Copilot Backend running on http://localhost:3001
API available at http://localhost:3001/api
```

Press `Ctrl+C` to stop.

### Step 5: Navigate to Frontend
```bash
cd ../frontend
```

### Step 6: Install Frontend Dependencies
```bash
npm install
```

### Step 7: Configure Frontend (Optional)
The frontend automatically detects the backend. For Codespaces:
- Edit `frontend/lib/api.js` if needed
- Default: `http://localhost:3001/api`

### Step 8: Test Frontend
```bash
npm run dev
```

You should see:
```
> ready - started server on 0.0.0.0:3000
```

### Step 9: Verify Everything
1. Open browser to `http://localhost:3000`
2. You should see the DevOps Copilot login/config page
3. Try clicking "Scan for Issues" (backend needs to be running)

✅ **DevOps Copilot is ready!**

---

## JARVIS Setup

### Step 1: Navigate to JARVIS
```bash
cd jarvis
```

### Step 2: Create Virtual Environment (Optional but Recommended)
```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

Expected output:
```
Successfully installed google-generative-ai speech-recognition pynput pyaudio ...
```

#### Windows PyAudio Issue?
If PyAudio installation fails on Windows:

```bash
pip install pipwin
pipwin install pyaudio
```

Or use pre-built wheel:
```bash
# Download from: https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio
# Then:
pip install PyAudio-0.2.13-cp39-cp39-win_amd64.whl
```

### Step 4: Configure JARVIS
Edit `src/config.py`:

```python
# Add your Gemini API key
GEMINI_API_KEY = "your_gemini_api_key_here"

# Optional: Customize settings
VOICE_LANGUAGE = "en-US"           # Language for voice recognition
HOTKEY = "<cmd>+h"                 # Windows+H (use <cmd> for Windows key)
HOTKEY_ALTERNATIVE = "ctrl+shift+j" # Fallback hotkey
OVERLAY_POSITION = "top-right"     # GUI position
DEBUG_MODE = True                  # Show debug output
```

### Step 5: Test Microphone
```bash
python src/voice_recognition.py
```

You should see:
```
Testing Voice Recognition...
Listening...
```

Speak something and press Enter. It should recognize your speech.

### Step 6: Test AI Brain
```bash
python src/gemini_brain.py
```

Test the AI understanding with example commands.

### Step 7: Run JARVIS
```bash
python src/main.py
```

You should see:
```
============================================================
JARVIS - Personal AI Assistant
============================================================

Initializing components...

============================================================
✓ JARVIS is ready!
============================================================

Press Windows+H or Ctrl+Shift+J to activate
Press Ctrl+C to exit
```

### Step 8: Activate JARVIS
Press **Windows+H** (or **Ctrl+Shift+J** if Windows+H doesn't work)

You should see an overlay appear. Now say a command:
- "Open Edge browser"
- "Search for Python tutorials"
- "Close window"

✅ **JARVIS is ready!**

---

## Running Both Projects

### Option 1: Separate Terminal Windows

**Terminal 1 - DevOps Copilot Backend:**
```bash
cd devops-copilot/backend
npm run dev
```

**Terminal 2 - DevOps Copilot Frontend:**
```bash
cd devops-copilot/frontend
npm run dev
```

**Terminal 3 - JARVIS:**
```bash
cd jarvis
python src/main.py
```

Then:
- Open `http://localhost:3000` for DevOps Copilot
- Press Windows+H for JARVIS

### Option 2: Using background processes

```bash
# Start everything in background (macOS/Linux)
cd devops-copilot/backend && npm run dev &
cd ../frontend && npm run dev &
cd ../../jarvis && python src/main.py &

# Stop all with:
killall node
killall python
```

---

## Troubleshooting

### DevOps Copilot Issues

#### "Port 3000 already in use"
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
cd frontend && PORT=3001 npm run dev
```

#### "Cannot connect to backend"
- Check backend is running: `http://localhost:3001/health`
- Verify no CORS errors in browser console
- Check `.env` in backend has correct GEMINI_API_KEY

#### "Module not found"
```bash
# Reinstall dependencies
cd devops-copilot/backend && rm -rf node_modules && npm install
cd ../frontend && rm -rf node_modules && npm install
```

#### "API key invalid"
- Verify GEMINI_API_KEY in `.env`
- Make sure it's a valid Gemini API key
- Check for extra spaces or quotes

---

### JARVIS Issues

#### "No module named 'speech_recognition'"
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

#### "PyAudio installation fails"
See Windows PyAudio Issue section above.

#### "Hotkey not working"
1. Try alternative hotkey in config.py: `HOTKEY_ALTERNATIVE = "ctrl+shift+j"`
2. On macOS, grant terminal accessibility permissions
3. Run with admin privileges on Windows

#### "Microphone not detected"
```bash
# Test microphone
python src/voice_recognition.py

# On Linux, check audio:
arecord -l

# On macOS, ensure microphone is set in System Preferences
# On Windows, ensure microphone is enabled in Settings
```

#### "No speech detected"
- Speak louder and clearer
- Move microphone closer
- Reduce background noise
- Increase `VOICE_TIMEOUT` in config.py

#### "API key invalid"
- Verify GEMINI_API_KEY in `src/config.py`
- Make sure it's a valid Gemini API key
- Check for extra spaces

---

## Verification Checklist

### DevOps Copilot ✓
- [ ] Backend runs on port 3001
- [ ] Frontend runs on port 3000
- [ ] Browser opens to config page
- [ ] Can see repository list
- [ ] Can inject bugs and scan for issues
- [ ] Gemini API key is configured

### JARVIS ✓
- [ ] Python 3.8+ installed
- [ ] All dependencies installed
- [ ] Microphone is detected
- [ ] Gemini API key is configured
- [ ] Hotkey activation works
- [ ] Can recognize speech
- [ ] Can execute commands

---

## Quick Verification Commands

```bash
# Check Node.js
node -v && npm -v

# Check Python
python --version && pip --version

# Test DevOps Backend
curl http://localhost:3001/health

# Test JARVIS Setup
cd jarvis && python src/voice_recognition.py
```

---

## Environment Variables Summary

### DevOps Copilot (`devops-copilot/backend/.env`)
```env
GEMINI_API_KEY=your_key_here
PORT=3001
NODE_ENV=development
```

### JARVIS (`jarvis/src/config.py`)
```python
GEMINI_API_KEY = "your_key_here"
VOICE_LANGUAGE = "en-US"
HOTKEY = "<cmd>+h"
DEBUG_MODE = True
```

---

## Getting Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with Google account
3. Click "Create API Key"
4. Select or create project
5. Copy the generated key
6. Paste in `.env` (DevOps) or `config.py` (JARVIS)
7. **Do not commit these files to git** (use `.gitignore`)

---

## Next Steps

1. **DevOps Copilot Tutorial**:
   ```bash
   cat devops-copilot/docs/QUICKSTART.md
   ```

2. **JARVIS Tutorial**:
   ```bash
   cat jarvis/docs/README.md
   ```

3. **Explore Features**:
   - Try different commands
   - Customize configuration
   - Check documentation for advanced features

---

## Need Help?

- **DevOps Copilot**: See `devops-copilot/docs/README.md`
- **JARVIS**: See `jarvis/docs/README.md`
- **Architecture**: Check `docs/ARCHITECTURE.md` in each project
- **Issues**: Check troubleshooting sections above

---

Happy coding! 🚀
