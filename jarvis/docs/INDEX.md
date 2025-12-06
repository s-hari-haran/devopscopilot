# 🤖 JARVIS Documentation Index

Welcome! Here's a complete guide to understanding and using JARVIS.

## 📚 Quick Navigation

### **Start Here** 👈
- **[README.md](README.md)** - Introduction and quick start (5 min read)

### **Learn What JARVIS Can Do**
- **[CAPABILITIES.md](CAPABILITIES.md)** - Complete feature list and technical details (10 min read)
- **[COMMANDS.md](COMMANDS.md)** - All voice commands with examples (15 min read)

### **Understand How It Works**
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design and architecture (10 min read)

---

## 🎯 Quick Facts About JARVIS

| Aspect | Details |
|--------|---------|
| **Type** | Voice-controlled Windows AI assistant |
| **Activation** | Windows+H (or Ctrl+Shift+J) |
| **Response Time** | <2.5 seconds (voice → action) |
| **AI Engine** | Google Gemini API |
| **Voice Recognition** | Google Speech-to-Text |
| **Language** | English (US) - configurable |
| **Core Capabilities** | 5 main categories |
| **Built-in Commands** | 30+ (infinite custom possible) |
| **Configuration** | src/config.py |
| **Status: Ready** | ✅ Production-ready |

---

## 📖 Documentation by Purpose

### **If you want to...**

**...get started quickly**
→ Read [README.md](README.md)

**...know all commands**
→ Read [COMMANDS.md](COMMANDS.md)

**...understand capabilities**
→ Read [CAPABILITIES.md](CAPABILITIES.md)

**...understand the code**
→ Read [ARCHITECTURE.md](ARCHITECTURE.md)

**...customize JARVIS**
→ Edit `../src/config.py`

**...add new commands**
→ See [CAPABILITIES.md](CAPABILITIES.md#-extending-jarvis)

**...troubleshoot issues**
→ See [CAPABILITIES.md](CAPABILITIES.md#-troubleshooting-jarvis)

---

## 🚀 5-Minute Quick Start

```bash
# 1. Install
pip install -r ../requirements.txt

# 2. Configure
# Edit ../src/config.py and add your Gemini API key

# 3. Run
python ../src/main.py

# 4. Press Windows+H

# 5. Say a command
"Open Chrome"
"Search for Python tutorials"
```

---

## 🎯 The 5 Capabilities

### 1️⃣ **Launch Applications**
```
"Open Chrome"
"Open VS Code"
"Open Notepad"
```

### 2️⃣ **Web Search & Browsing**
```
"Search for Python tutorials"
"Go to YouTube"
"Open Gmail"
```

### 3️⃣ **Text Typing**
```
"Type hello world"
"Type my email"
```

### 4️⃣ **System Control**
```
"Close window"
"Lock screen"
"Volume up"
```

### 5️⃣ **File Operations**
```
"Open Downloads"
"Open Documents"
"Open Desktop"
```

---

## 🔧 Configuration Highlights

Located in `../src/config.py`:

```python
# Your API key (get from aistudio.google.com)
GEMINI_API_KEY = "your_key_here"

# Activation hotkey
HOTKEY = "<cmd>+h"  # Windows+H

# GUI position
OVERLAY_POSITION = "top-right"  # or other positions

# Add custom apps
APP_PATHS = {
    "myapp": "myapp.exe",
}

# Cache frequent commands for instant response
COMMAND_CACHE = {
    "open chrome": {"action": "launch_app", "param": "chrome"},
}
```

---

## 📊 System Architecture

```
Press Windows+H
     ↓
Voice Recognition (Google API)
     ↓
Gemini AI Brain (understands intent)
     ↓
Action Executor (launches/types/searches)
     ↓
GUI Overlay (shows status)
     ↓
Command Complete
```

---

## 💡 Key Features

✨ **Real-time voice recognition** - Speak naturally  
✨ **AI-powered understanding** - Gemini understands intent  
✨ **Fast execution** - <2.5 seconds end-to-end  
✨ **Visual feedback** - GUI shows what's happening  
✨ **Fully customizable** - Change anything in config  
✨ **Background hotkey** - Works while you do other things  
✨ **Command caching** - Instant response for common commands  

---

## 🎮 Example Usage

```
User: (Press Windows+H)
JARVIS: 🎤 LISTENING

User: "Search for best Python IDEs"
JARVIS: 🔄 RECOGNIZING
        🤖 THINKING
        ⚡ EXECUTING
        → Opens Google search
JARVIS: ✓ SUCCESS

User: "Open VS Code"
JARVIS: → Launches VS Code
JARVIS: ✓ SUCCESS

User: "Type hello world"
JARVIS: → Types "hello world" at cursor
JARVIS: ✓ SUCCESS
```

---

## 📝 Command Categories

See [COMMANDS.md](COMMANDS.md) for complete list with examples:

- **Application Launching** - 9+ built-in apps
- **Web Search & Browsing** - Google + any website
- **Text Typing** - Auto-type anything
- **System Control** - Windows, volume, screenshot
- **File Operations** - Open standard folders

---

## ⚙️ Modules

| Module | Purpose | Language |
|--------|---------|----------|
| `main.py` | Entry point & orchestration | Python |
| `voice_recognition.py` | Speech-to-text | Python |
| `gemini_brain.py` | AI understanding | Python |
| `action_executor.py` | Execute actions | Python |
| `hotkey_listener.py` | Detect Windows+H | Python |
| `gui_overlay.py` | Visual feedback | Python/Tkinter |
| `config.py` | Configuration | Python |

---

## 📚 Reading Recommendations

**Time Available** | **Read This** | **Est. Time**
---|---|---
5 min | [README.md](README.md) | 5 min
15 min | README + [COMMANDS.md](COMMANDS.md) | 15 min
30 min | README + COMMANDS + [CAPABILITIES.md](CAPABILITIES.md) | 30 min
1 hour | All docs + [ARCHITECTURE.md](ARCHITECTURE.md) | 1 hour

---

## 🆘 Troubleshooting

**Issue** | **Solution** | **Location**
---|---|---
Hotkey not working | Try Ctrl+Shift+J or modify config | [CAPABILITIES.md](CAPABILITIES.md)
Microphone not found | Install PyAudio | [CAPABILITIES.md](CAPABILITIES.md)
API key error | Check config.py syntax | [README.md](README.md)
Command not recognized | Speak clearly / check cache | [COMMANDS.md](COMMANDS.md)

---

## 🔐 Security Notes

⚠️ **Important**:
- Keep `GEMINI_API_KEY` secret
- Don't commit `config.py` with key
- Microphone records all nearby speech
- Be careful with "Type" for passwords

See [CAPABILITIES.md](CAPABILITIES.md#-security-considerations) for details.

---

## 🚀 Next Steps

1. **Read** → [README.md](README.md) (5 min)
2. **Install** → `pip install -r ../requirements.txt`
3. **Configure** → Add API key to `../src/config.py`
4. **Run** → `python ../src/main.py`
5. **Activate** → Press Windows+H
6. **Command** → Say "Open Chrome" or "Search for Python"

---

## 📞 Quick Reference

```
Activation:     Windows+H or Ctrl+Shift+J
Open App:       "Open [app name]"
Search:         "Search for [query]"
Type:           "Type [text]"
System:         "Close window", "Lock screen"
Files:          "Open Downloads"
```

---

## 📄 All Documentation Files

```
jarvis/docs/
├── INDEX.md                 ← You are here
├── README.md               ← Getting started
├── CAPABILITIES.md         ← Full features
├── COMMANDS.md             ← Command reference
└── ARCHITECTURE.md         ← System design

jarvis/src/
└── config.py               ← Configuration
```

---

## 🎓 Learning Path

```
Beginner:   README → COMMANDS
Intermediate: README → COMMANDS → CAPABILITIES
Advanced:   All docs → Examine src/config.py → Modify code
```

---

## 💬 Quick Info

- **Total Commands**: 30+ built-in + infinite custom
- **Response Time**: <2.5 seconds average
- **Languages Supported**: English (primary)
- **Operating Systems**: Windows (primary), macOS, Linux
- **Python Version**: 3.8+
- **API**: Google Gemini (free tier available)

---

## ✨ What Makes JARVIS Special

1. **Fast** - <2.5 seconds end-to-end
2. **Intelligent** - Gemini AI understands natural language
3. **Flexible** - 5 action categories with custom commands
4. **Easy** - Just press a hotkey and speak
5. **Customizable** - Everything in `config.py`
6. **Extensible** - Architecture supports new actions

---

## 🎯 Use Cases

✅ **Productivity**: Hands-free task automation  
✅ **Research**: Search while typing code  
✅ **Accessibility**: Alternative to mouse/keyboard  
✅ **Workflow**: Speed up repetitive tasks  
✅ **Quick Tasks**: Execute commands instantly  

---

## 📞 Get Help

For specific topics:

- **Commands**: See [COMMANDS.md](COMMANDS.md)
- **Features**: See [CAPABILITIES.md](CAPABILITIES.md)
- **Setup**: See [README.md](README.md)
- **Design**: See [ARCHITECTURE.md](ARCHITECTURE.md)
- **Config**: Edit `../src/config.py` with comments

---

## 🎉 Ready?

You've got everything you need. Pick where to go next:

👉 **New to JARVIS?** → Start with [README.md](README.md)  
👉 **Want command list?** → Read [COMMANDS.md](COMMANDS.md)  
👉 **Curious how it works?** → Read [ARCHITECTURE.md](ARCHITECTURE.md)  
👉 **Ready to use?** → Follow [README.md](README.md) quickstart  

---

Happy commanding! 🎤✨

---

*Last updated: Dec 6, 2025*
