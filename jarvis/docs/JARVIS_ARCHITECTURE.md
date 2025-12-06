# JARVIS - Full AI Assistant Architecture
**Your Personal AI Assistant - Voice Controlled, Lightning Fast**

## 🎯 Goal
Build a complete Windows AI assistant that:
- Activates with **Windows+H**
- Listens to your voice in natural English
- Uses **Gemini AI** to understand commands intelligently
- **EXECUTES ACTIONS**: Opens apps, types text, controls system, searches web
- Works **very fast** with minimal latency (< 2 seconds response time)

## 💡 Example Commands
- "Open Edge browser" → Launches Microsoft Edge
- "Type an email to John" → Types formatted email
- "Search for Python tutorials" → Opens browser with search
- "Open VS Code" → Launches VS Code
- "Play music" → Opens Spotify/media player
- "What's the weather" → Searches and reads result
- "Close this window" → Closes active window
- **And much more!**

---

## 🏗️ System Architecture

### **1. Core Components**

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERACTION                      │
│              "Open Edge browser"                         │
└─────────────────────────────────────────────────────────┘
                            ↓
              Press Windows+H (Hotkey Trigger)
                            ↓
┌─────────────────────────────────────────────────────────┐
│              JARVIS AI ASSISTANT                         │
│                                                          │
│  ┌──────────────┐   ┌──────────────┐   ┌────────────┐  │
│  │   Hotkey     │   │    Voice     │   │   Gemini   │  │
│  │   Listener   │──→│ Recognition  │──→│  AI Brain  │  │
│  │ (Windows+H)  │   │  (Speech)    │   │ (Understands│  │
│  └──────────────┘   └──────────────┘   │  Intent)   │  │
│                                         └────────────┘  │
│                                               ↓          │
│                              ┌────────────────────────┐ │
│                              │  ACTION DECISION       │ │
│                              │  (What to do?)         │ │
│                              └────────────────────────┘ │
│                                        ↓                │
│         ┌──────────────┬───────────────┼─────────────┐ │
│         ↓              ↓               ↓             ↓ │
│  ┌───────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │   Open    │  │   Type   │  │  Search  │  │ System ││
│  │   Apps    │  │   Text   │  │   Web    │  │Control ││
│  └───────────┘  └──────────┘  └──────────┘  └────────┘│
└─────────────────────────────────────────────────────────┘
                            ↓
              Action executed on Windows
              (Edge browser opens)
```

---

## 🔧 Technical Implementation

### **Component 1: Hotkey System**
**Library:** `pynput` or `keyboard`
**Function:** Background listener for Windows+H
```python
# Activates Jarvis instantly when Windows+H pressed
# Runs as system tray application
```

### **Component 2: Voice Recognition**
**Option A (Fast):** Google Speech Recognition
- Real-time speech-to-text
- Free, fast, works offline fallback

**Option B (Accurate):** OpenAI Whisper
- Higher accuracy
- Can run locally for privacy

**Implementation:**
```python
import speech_recognition as sr
# Captures microphone → converts to text in ~1-2 seconds
```

### **Component 3: Gemini AI Brain**
**API:** Google Gemini API (free tier available)
**Function:** 
- Understands natural language commands
- Decides what action to take
- Extracts parameters (app name, search query, text to type)
- Context-aware and smart

**Command Classification:**
```python
"Open Edge" → ACTION: launch_app, PARAM: "msedge"
"Type hello world" → ACTION: type_text, PARAM: "hello world"  
"Search for pizza" → ACTION: web_search, PARAM: "pizza"
"Close window" → ACTION: system_control, PARAM: "close_window"
"What's the weather" → ACTION: web_search + speak, PARAM: "weather"
```

### **Component 4: Action Execution Engine**
**Library:** `subprocess`, `os`, `webbrowser`, `psutil`
**Function:** Executes the action Gemini decides

**Actions Supported:**

1. **Launch Applications**
   ```python
   - "Open Edge" → os.startfile("msedge")
   - "Open Chrome" → subprocess.Popen(["chrome"])
   - "Open VS Code" → os.startfile("code")
   - "Open Notepad" → subprocess.Popen(["notepad"])
   ```

2. **System Control**
   ```python
   - "Close window" → pyautogui.hotkey('alt', 'f4')
   - "Minimize all" → pyautogui.hotkey('win', 'd')
   - "Lock computer" → subprocess.run(['rundll32', 'user32.dll,LockWorkStation'])
   - "Volume up/down" → Control system volume
   ```

3. **Web Actions**
   ```python
   - "Search for X" → webbrowser.open(f"https://google.com/search?q={query}")
   - "Open YouTube" → webbrowser.open("https://youtube.com")
   - "Go to Gmail" → webbrowser.open("https://mail.google.com")
   ```

4. **Type Text**
   ```python
   - "Type [text]" → pyautogui.write(text, interval=0.01)
   - Fast typing directly on screen
   ```

5. **File Operations**
   ```python
   - "Open Downloads folder" → os.startfile("Downloads")
   - "Create file X" → Create file
   - "Delete file X" → Remove file (with confirmation)
   ```

### **Component 5: Typing Module**
**Library:** `pyautogui`
**Function:** Types AI response at cursor position when needed
```python
import pyautogui
# Types character-by-character with configurable speed
# Works in ANY application
```

### **Component 6: Hotkey System**
**Library:** `pynput` or `keyboard`
**Function:** Background listener for Windows+H
```python
# Activates Jarvis instantly when Windows+H pressed
# Runs as system tray application
```

### **Component 7: GUI/Overlay**
**Library:** `tkinter` or `PyQt5`
**Function:** 
- Small floating window
- Shows: 🎤 Listening... / 🤖 Understanding... / ⚡ Executing...
- Transparent overlay
- Minimal, non-intrusive

---

## ⚡ Speed Optimizations

### **1. Background Process**
- Runs as Windows service
- Always ready, instant activation < 100ms
- Pre-loads AI models and libraries

### **2. Streaming Recognition**
- Start processing while still speaking
- Parallel voice recognition + AI processing
- No wait time between speaking and action

### **3. Command Caching**
- Cache common commands: "Open Edge", "Open Chrome"
- Instant execution for repeated commands
- Smart prediction of next command

### **4. Fast Execution**
- Direct OS calls for app launching
- No subprocess delays
- Optimized action mapping

### **5. Async Operations**
- Non-blocking voice capture
- Parallel AI processing
- Background action execution

### **6. Pre-warming**
- Keep Gemini API connection alive
- Pre-load common app paths
- Cache system commands

**Target Latency:**
- Hotkey → Listening: **< 100ms**
- Voice → Text: **< 1 second**
- AI Understanding: **< 1 second**
- Action Execution: **< 500ms**
- **Total: < 2.5 seconds** (voice → action complete)

---

## 📋 Complete Command List

### **🚀 Application Control**
| Voice Command | Action |
|---------------|--------|
| "Open Edge" / "Open Edge browser" | Launch Microsoft Edge |
| "Open Chrome" | Launch Google Chrome |
| "Open VS Code" | Launch Visual Studio Code |
| "Open Notepad" | Launch Notepad |
| "Open Calculator" | Launch Calculator |
| "Open File Explorer" | Open File Explorer |
| "Open Spotify" | Launch Spotify |
| "Open Discord" | Launch Discord |

### **⌨️ Text & Typing**
| Voice Command | Action |
|---------------|--------|
| "Type [anything]" | Types exactly what you say |
| "Type an email to [person]" | Generates and types email |
| "Write code for [task]" | Generates code snippet |
| "Paste" | Pastes clipboard content |

### **🌐 Web Actions**
| Voice Command | Action |
|---------------|--------|
| "Search for [query]" | Google search in browser |
| "Open YouTube" | Opens YouTube.com |
| "Open Gmail" | Opens Gmail |
| "Go to [website]" | Opens specific website |
| "What's the weather" | Searches weather |

### **💻 System Control**
| Voice Command | Action |
|---------------|--------|
| "Close window" | Closes active window |
| "Close this" | Closes active window |
| "Minimize all" | Minimizes all windows |
| "Lock computer" | Locks Windows |
| "Volume up" | Increases volume |
| "Volume down" | Decreases volume |
| "Mute" | Mutes audio |
| "Screenshot" | Takes screenshot |

### **📁 File Operations**
| Voice Command | Action |
|---------------|--------|
| "Open Downloads" | Opens Downloads folder |
| "Open Documents" | Opens Documents folder |
| "Open Desktop" | Opens Desktop folder |
| "Create file [name]" | Creates new file |

### **🤖 Smart Commands**
| Voice Command | Action |
|---------------|--------|
| "What time is it" | Speaks current time |
| "Tell me a joke" | AI tells a joke |
| "Remind me to [task]" | Sets reminder |
| "What can you do" | Lists capabilities |

---

## 🛠️ Technology Stack

```yaml
Language: Python 3.10+

Core Libraries:
  - pynput: Global hotkey listener (Windows+H)
  - speech_recognition: Voice → Text (fast, reliable)
  - google-generativeai: Gemini AI for understanding
  - pyautogui: Typing + UI control
  - subprocess: Launch applications
  - webbrowser: Web actions
  - psutil: System control
  - pyperclip: Clipboard operations
  - tkinter: GUI overlay
  - pyttsx3: Text-to-speech (optional feedback)

Windows Integration:
  - win32api: Windows API access
  - win32com: COM automation
  - pywin32: Advanced Windows control
```

---

## 📦 Project Structure

```
jarvis/
├── main.py                    # Entry point, background service
├── hotkey_listener.py         # Windows+H detection
├── voice_recognition.py       # Speech-to-text engine
├── gemini_brain.py            # AI command understanding
├── action_executor.py         # Execute all actions
├── typing_module.py           # Text typing automation
├── app_launcher.py            # Application launching
├── system_control.py          # System commands
├── web_actions.py             # Browser/web operations
├── gui_overlay.py             # Visual feedback window
├── config.py                  # API keys, settings
├── command_cache.py           # Fast command lookup
├── requirements.txt           # Dependencies
└── install_service.py         # Windows startup installer
```

---

## 🚀 Workflow

**Complete User Journey:**

1. **Press Windows+H** anywhere on your laptop
2. **Overlay appears**: "🎤 Listening..."
3. **Speak command**: "Open Edge browser"
4. **Overlay shows**: "🤖 Understanding..."
5. **AI processes**: Gemini identifies intent = launch_app("edge")
6. **Overlay shows**: "⚡ Opening Edge..."
7. **Action executes**: Microsoft Edge launches
8. **Total time**: < 2 seconds from voice to action
9. **Overlay fades**: Clean, done!

**Another Example:**
1. Press Windows+H
2. Say: "Search for best pizza near me"
3. AI understands: web_search("best pizza near me")
4. Browser opens with Google search results
5. Done in < 2 seconds!

**Smart Example:**
1. Press Windows+H
2. Say: "Type an email thanking Sarah for yesterday's meeting"
3. AI generates professional email text
4. Text types automatically where cursor is
5. Done!

---

## 🔐 API Keys Needed

1. **Google Gemini API Key**
   - Free tier: 60 requests/minute
   - Sign up: https://makersuite.google.com/app/apikey

2. **Optional: Google Cloud Speech API**
   - For better voice recognition
   - Free tier: 60 minutes/month

---

## 💻 Installation Plan

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Configure API keys
python config.py --setup

# 3. Test components
python main.py --test

# 4. Install as Windows service (auto-start)
python install_service.py

# 5. Use it!
Press Windows+H anywhere and start talking
```

---

## 🎨 User Experience

### **Visual Feedback:**
- Minimal floating window (top-right corner)
- Color-coded status:
  - 🔵 Blue: Listening
  - 🟡 Yellow: Processing
  - 🟢 Green: Typing
- Auto-hide after completion

### **Audio Feedback (Optional):**
- Beep on activation
- Voice confirmation: "I'm listening..."
- Success chime when done

---

## 🔄 Advanced Features (Phase 2)

- **Voice Feedback**: Jarvis speaks responses (text-to-speech)
- **Context Memory**: Remembers previous commands in session
- **Custom Commands**: Create shortcuts ("morning routine" → opens email, calendar, news)
- **Application-Specific**: Different behaviors in different apps
- **Multi-Language**: Support for other languages
- **Clipboard Integration**: "Type what I copied"
- **Window Management**: "Split screen", "maximize", etc.
- **File Search**: "Find file named X"
- **Quick Calculations**: "Calculate 15% of 200"
- **Timer/Reminders**: "Set timer for 5 minutes"
- **Learning**: Adapts to your speech patterns and preferences

---

## ⚙️ Configuration Options

```python
CONFIG = {
    "hotkey": "win+h",                  # Customizable hotkey
    "voice_language": "en-US",          # Language for recognition
    "ai_model": "gemini-pro",           # Gemini model to use
    "overlay_position": "top-right",    # GUI position
    "auto_start": True,                 # Run on Windows startup
    "feedback_sound": True,             # Audio notifications
    "typing_speed": 0.01,               # Interval between keystrokes
    "voice_feedback": False,            # Text-to-speech responses
    "cache_commands": True,             # Cache common commands
    "log_commands": True,               # Keep command history
}
```

---

## 📊 Performance Metrics

**Target Benchmarks:**
- ✅ Hotkey activation: **< 100ms** (instant)
- ✅ Voice capture ready: **< 200ms**
- ✅ Speech-to-text: **< 1 second**
- ✅ Gemini AI understanding: **< 1 second**
- ✅ Action execution start: **< 500ms**
- ✅ **Total latency: 1.5-2.5 seconds** (voice → action complete)

**Real-world Examples:**
- "Open Edge" → **< 2 seconds** (spoken to browser open)
- "Type hello" → **< 2 seconds** (spoken to text appears)
- "Search pizza" → **< 2.5 seconds** (spoken to search results)
- "Close window" → **< 1.5 seconds** (spoken to window closed)

**This is VERY FAST for a voice assistant!**

---

## 🎯 Success Criteria

- ✅ Works with **ANY application** on Windows
- ✅ Understands **natural language** (not rigid commands)
- ✅ **Fast response** (< 2.5 seconds average)
- ✅ **High accuracy** speech recognition
- ✅ **Smart action execution** via Gemini AI
- ✅ **Reliable hotkey** detection (Windows+H)
- ✅ **Runs in background** without interrupting work
- ✅ **Opens apps instantly**
- ✅ **Types text accurately**
- ✅ **Controls system** effectively
- ✅ **Minimal UI** (non-intrusive)

---

## 🐛 Error Handling

- Microphone not detected → Show error, retry
- No internet → Use cached responses or notify
- Gemini API error → Fallback to basic typing
- Hotkey conflict → Allow rebinding
- Voice unclear → Ask to repeat

---

## 📝 Next Steps

**Review this architecture and confirm:**
1. Do you want any changes to the design?
2. Should I proceed with implementation?
3. Any specific features you want prioritized?
4. Do you have your Gemini API key ready?

Once approved, I'll start building the system step-by-step!
