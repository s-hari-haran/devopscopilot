# 🤖 JARVIS - Complete Capabilities Guide

## What is JARVIS?

JARVIS is a **voice-controlled Windows AI assistant** that listens to natural language commands and executes actions intelligently. Press **Windows+H** and speak naturally—JARVIS understands and executes.

---

## ⚡ Core Features

### 1. **Voice Activation**
- **Hotkey**: Windows+H (or Ctrl+Shift+J as fallback)
- **Speech Recognition**: Real-time Google Speech-to-Text
- **Language Support**: English (US, but configurable)
- **Response Time**: <2 seconds (voice → action complete)
- **Accuracy**: High with noise calibration

### 2. **AI Understanding (Gemini API)**
- Natural language processing
- Intent classification
- Parameter extraction
- Confidence scoring
- Fallback handling for unclear commands

### 3. **Action Execution**
- Application launching
- Text typing
- Web browsing
- System control
- File operations

### 4. **Visual Feedback**
- GUI overlay showing status
- Real-time status updates
- Auto-hiding notifications
- Customizable position

---

## 🎯 Supported Commands

### **Launch Applications**

| Command | What It Does |
|---------|-------------|
| "Open Edge browser" | Launches Microsoft Edge |
| "Open Chrome" | Launches Google Chrome |
| "Open Firefox" | Launches Firefox |
| "Open Notepad" | Opens Notepad text editor |
| "Open Calculator" | Opens Windows Calculator |
| "Open VS Code" | Opens Visual Studio Code |
| "Open Explorer" | Opens File Explorer |
| "Open PowerShell" | Opens PowerShell |
| "Open Command Prompt" | Opens CMD |

**How it works**: Recognizes app names and launches from configured paths

---

### **Web Search & Browsing**

| Command | What It Does |
|---------|-------------|
| "Search for Python tutorials" | Opens Google search results |
| "Search pizza near me" | Searches on Google Maps/Search |
| "Go to YouTube" | Opens YouTube in default browser |
| "Open Gmail" | Opens Gmail (mail.google.com) |
| "Open GitHub" | Opens GitHub.com |
| "Open Twitter" | Opens Twitter/X |
| "Go to facebook.com" | Opens Facebook |

**How it works**: Converts query to Google search URL or website URL and opens in browser

---

### **Text Typing**

| Command | What It Does |
|---------|-------------|
| "Type hello world" | Types "hello world" at cursor position |
| "Type an email to John" | Types formatted text |
| "Type my password" | Types anything you say (⚠️ be careful!) |

**How it works**: Uses PyAutoGUI to simulate keyboard input

**Requirements**: PyAutoGUI must be installed

---

### **System Control**

| Command | What It Does |
|---------|-------------|
| "Close window" | Closes active window (Alt+F4) |
| "Minimize all" | Minimizes all windows (Win+D) |
| "Lock screen" | Locks Windows |
| "Screenshot" | Opens Windows Snip tool |
| "Volume up" | Increases volume |
| "Volume down" | Decreases volume |
| "Mute" | Toggles mute |

**How it works**: Simulates keyboard shortcuts and system commands

---

### **File & Folder Operations**

| Command | What It Does |
|---------|-------------|
| "Open Downloads folder" | Opens Downloads directory |
| "Open Documents" | Opens Documents directory |
| "Open Desktop" | Opens Desktop directory |

**How it works**: Opens standard Windows directories using file explorer

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│         VOICE COMMAND (e.g., "Open Edge")          │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
     ┌───────────────────────┐
     │  Hotkey Listener      │
     │  (Windows+H or        │
     │   Ctrl+Shift+J)       │
     └───────────┬───────────┘
                 │ (Triggered)
                 ▼
     ┌───────────────────────┐
     │ Voice Recognition     │
     │ (Google Speech API)   │
     │ → "open edge"         │
     └───────────┬───────────┘
                 │
                 ▼
     ┌───────────────────────┐
     │ Gemini AI Brain       │
     │ Analyzes intent       │
     │ {"action": "launch_app",
     │  "param": "edge",
     │  "confidence": 0.98}  │
     └───────────┬───────────┘
                 │
                 ▼
     ┌───────────────────────┐
     │ Action Executor       │
     │ Launches Edge browser │
     └───────────┬───────────┘
                 │
                 ▼
     ┌───────────────────────┐
     │ GUI Overlay           │
     │ Shows status & result │
     └───────────────────────┘
```

---

## 🔧 Technical Components

### **1. Voice Recognition Module** (`voice_recognition.py`)
- Google Speech Recognition API
- Microphone calibration for noise
- Timeout & phrase limits
- Error handling

**Key Methods**:
```python
listen()              # Listen and return text
listen_async()        # Listen in background thread
_calibrate_microphone() # Auto-calibrate for noise
```

### **2. Gemini AI Brain** (`gemini_brain.py`)
- Google Gemini API (gemini-pro model)
- Natural language understanding
- Intent classification
- Command caching for instant responses

**Key Methods**:
```python
understand_command()  # Convert text to action dict
get_smart_response()  # Get conversational response
```

**Supported Actions**:
- `launch_app` - Launch an application
- `type_text` - Type on keyboard
- `web_search` - Google search
- `open_website` - Open website
- `system_control` - System commands
- `file_operation` - Open folders
- `unknown` - Command not understood

### **3. Action Executor Module** (`action_executor.py`)
- Launches applications
- Types text
- Opens websites
- Performs web searches
- Controls system
- Manages files

**Supported OS**: Windows (primary), macOS, Linux (basic support)

### **4. Hotkey Listener** (`hotkey_listener.py`)
- Global hotkey detection
- Uses `pynput` library
- Background listener thread
- Multiple hotkey combinations

**Default Hotkeys**:
- Windows+H
- Ctrl+Shift+J (fallback)

### **5. GUI Overlay** (`gui_overlay.py`)
- Visual status display
- Tkinter-based
- Auto-positioning
- Status icons/emojis
- Customizable appearance

**Status Indicators**:
- 🎤 Listening
- 🔄 Recognizing
- 🤖 Thinking
- ⚡ Executing
- ✓ Success
- ❌ Error

### **6. Configuration** (`config.py`)
- API keys
- Hotkey settings
- GUI customization
- Application paths
- Command caching
- Performance settings

---

## ⚙️ Configuration Options

### **Voice Settings**
```python
VOICE_LANGUAGE = "en-US"          # Language for recognition
VOICE_TIMEOUT = 5                  # Seconds to wait for speech
VOICE_PHRASE_LIMIT = 10            # Max seconds per phrase
```

### **AI Settings**
```python
GEMINI_MODEL = "gemini-pro"        # AI model to use
GEMINI_TEMPERATURE = 0.3           # 0=deterministic, 1=creative
GEMINI_MAX_TOKENS = 500            # Max response length
```

### **Hotkey Settings**
```python
HOTKEY = "<cmd>+h"                 # Primary hotkey (Windows+H)
HOTKEY_ALTERNATIVE = "ctrl+shift+j" # Fallback hotkey
```

### **GUI Settings**
```python
OVERLAY_POSITION = "top-right"     # Window position
OVERLAY_WIDTH = 300                # Width in pixels
OVERLAY_HEIGHT = 80                # Height in pixels
OVERLAY_OPACITY = 0.9              # Transparency (0-1)
```

### **Application Paths**
```python
APP_PATHS = {
    "edge": "msedge",
    "chrome": "chrome",
    "firefox": "firefox",
    "notepad": "notepad",
    "calculator": "calc",
    "vscode": "code",
    # ... and more
}
```

### **Command Cache**
```python
COMMAND_CACHE = {
    "open edge": {"action": "launch_app", "param": "edge"},
    "open chrome": {"action": "launch_app", "param": "chrome"},
    # Instant responses for cached commands
}
```

---

## 🚀 Usage Workflow

### **Step 1: Activation**
Press **Windows+H** → GUI overlay appears → "🎤 LISTENING" status

### **Step 2: Voice Command**
Speak naturally → "Search for Python tutorials"

### **Step 3: Recognition**
Speech converted to text → "search for python tutorials"

### **Step 4: AI Understanding**
Gemini analyzes → `{"action": "web_search", "param": "python tutorials", "confidence": 0.95}`

### **Step 5: Execution**
Action executor runs → Opens Google search in browser

### **Step 6: Feedback**
GUI shows "✓ SUCCESS" → Auto-hides after 1.5 seconds

---

## 📊 Performance Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| Hotkey Response | <100ms | Instant activation |
| Speech Recognition | <1s | Google API speed |
| AI Understanding | <1s | Gemini API speed |
| Action Execution | <500ms | App launch, typing, etc. |
| **Total Latency** | **<2.5s** | End-to-end voice → action |

---

## 🔐 Security Considerations

⚠️ **Important Security Notes**:

1. **API Key**: Store GEMINI_API_KEY securely
   - Don't commit to git
   - Use environment variables in production
   - Rotate keys regularly

2. **Voice Input**: Anyone nearby can hear your commands
   - Commands are logged if `LOG_COMMANDS = True`
   - Consider privacy when using

3. **Action Execution**: JARVIS can type passwords
   - ⚠️ Be careful with "type" commands
   - Ensure screen privacy when typing sensitive data

4. **Microphone Access**: Requires microphone permissions
   - Grant permissions if prompted
   - Verify microphone is available

---

## 🧪 Testing JARVIS

### **Test Voice Recognition**
```bash
python src/voice_recognition.py
```
Speaks and recognizes your speech

### **Test AI Brain**
```bash
python src/gemini_brain.py
```
Tests command understanding with Gemini

### **Test Action Executor**
```bash
python src/action_executor.py
```
Tests launching apps and web operations

### **Test All Components**
```bash
python src/main.py --test
```
Runs through all components in sequence

### **Run JARVIS Normally**
```bash
python src/main.py
```
Full JARVIS with hotkey activation

---

## 🐛 Troubleshooting

### **Hotkey Not Working**
- Try alternative: Ctrl+Shift+J
- Run as Administrator on Windows
- Check if another app uses Windows+H
- Modify config: `HOTKEY = "ctrl+alt+j"`

### **Microphone Not Detected**
- Check system audio settings
- Install PyAudio: `pip install pyaudio`
- Windows: May need VC++ redistributables
- Test: `python src/voice_recognition.py`

### **Speech Not Recognized**
- Speak clearly and loudly
- Reduce background noise
- Check microphone volume
- Increase `VOICE_TIMEOUT` in config

### **API Key Invalid**
- Verify GEMINI_API_KEY in config.py
- Get new key from aistudio.google.com
- Check for extra spaces/quotes

### **Action Not Executing**
- Install PyAutoGUI: `pip install pyautogui`
- Check app paths in APP_PATHS config
- Run as Administrator (some actions need it)
- Enable Windows+H permission if prompted

---

## 🎯 Potential Enhancements

### **Could Be Added**:
- Email sending ("Send email to John")
- Meeting scheduling ("Schedule meeting at 3pm")
- Reminder creation ("Remind me in 5 minutes")
- Custom command recording
- Context awareness
- Multi-language support
- Voice output (text-to-speech)
- Application-specific commands
- Advanced file operations
- Windows integration (Cortana-like)

---

## 📦 Dependencies

```python
# Speech Recognition
speech_recognition>=3.10.0
# Auto GUI control
pyautogui>=0.9.53
# Hotkey detection
pynput>=1.7.6
# Google Generative AI
google-generativeai>=0.3.0
# Audio support
pyaudio>=0.2.13  # (Windows may need special installation)
```

---

## 🎮 Example Conversation

```
User: (Presses Windows+H)
JARVIS: 🎤 LISTENING

User: "Search for best Python libraries"
JARVIS: 🔄 RECOGNIZING
JARVIS: 🤖 THINKING
JARVIS: ⚡ EXECUTING
→ Opens Google search for "best Python libraries"
JARVIS: ✓ SUCCESS

User: "Open VS Code"
JARVIS: 🎤 LISTENING
User: "Open VS Code"
JARVIS: → Launches Visual Studio Code
JARVIS: ✓ SUCCESS

User: "Close window"
JARVIS: → Closes current window (Alt+F4)
JARVIS: ✓ SUCCESS
```

---

## 🚀 Quick Start

```bash
# Install
cd jarvis
pip install -r requirements.txt

# Configure
# Edit src/config.py with your Gemini API key

# Run
python src/main.py

# Press Windows+H and start speaking!
```

---

## 💡 Tips & Tricks

1. **Cache Commands**: Add frequent commands to `COMMAND_CACHE` for instant response
2. **Debug Mode**: Set `DEBUG_MODE = True` to see AI reasoning
3. **Test Components**: Use individual test commands before running full JARVIS
4. **Customize Apps**: Add new apps to `APP_PATHS` dictionary
5. **Adjust Hotkey**: Change `HOTKEY` in config if Windows+H conflicts
6. **Position GUI**: Change `OVERLAY_POSITION` to suit your screen
7. **Silence Typing**: Reduce `TYPING_SPEED` for faster text entry

---

## 📞 Summary

**JARVIS is a fully-featured voice AI assistant capable of**:

✅ Understanding natural language commands  
✅ Launching any application  
✅ Searching the web  
✅ Opening websites  
✅ Typing text automatically  
✅ Controlling system (volume, lock, screenshot, etc.)  
✅ Opening folders and files  
✅ Providing visual feedback  
✅ Running in <2.5 seconds end-to-end  
✅ Customizable for any use case  

**Perfect for**: Productivity automation, hands-free control, accessibility, workflow optimization.

---

Happy commanding! 🎙️✨
