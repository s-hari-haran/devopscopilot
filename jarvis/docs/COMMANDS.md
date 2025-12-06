# 🗣️ JARVIS - Command Reference

Quick reference for all JARVIS voice commands. Just press **Windows+H** and speak!

---

## 📋 All Commands by Category

### 🎮 **LAUNCH APPLICATIONS**

```
"Open Edge browser"           → Launches Microsoft Edge
"Open Chrome"                 → Launches Google Chrome  
"Open Firefox"                → Launches Firefox
"Open Notepad"                → Opens Notepad
"Open Calculator"             → Opens Windows Calculator
"Open VS Code"                → Opens Visual Studio Code
"Open Explorer"               → Opens File Explorer
"Open Command Prompt"         → Opens CMD
"Open PowerShell"             → Opens PowerShell
```

**How to add more apps**:
Edit `config.py` and add to `APP_PATHS`:
```python
APP_PATHS = {
    "your_app": "executable_name",
    ...
}
```

---

### 🌐 **WEB SEARCH & BROWSING**

```
"Search for [query]"          → Google search
"Search Python tutorials"     → Opens search results
"Go to YouTube"               → Opens YouTube
"Open Gmail"                  → Opens Gmail
"Open GitHub"                 → Opens GitHub
"Open Twitter"                → Opens Twitter/X
"Go to [website].com"         → Opens any website
"Look up weather"             → Searches weather
"Find pizza near me"          → Searches location-based
```

**How it works**:
- Recognizes "search for" or "go to"
- Converts to Google search or website URL
- Opens in default browser

---

### ⌨️ **TEXT TYPING**

```
"Type hello world"            → Types "hello world"
"Type [any text]"             → Types the exact text
"Type an email to John"       → Types email content
"Type 123 Main Street"        → Types address
```

**Important**:
⚠️ Make sure cursor is positioned where you want text  
⚠️ Don't use for passwords in public  
⚠️ Typing takes ~1 second per 20 characters  

---

### 🖥️ **SYSTEM CONTROL**

```
"Close window"                → Closes current window (Alt+F4)
"Minimize all"                → Minimizes all windows (Win+D)
"Lock screen"                 → Locks Windows
"Lock computer"               → Locks Windows
"Screenshot"                  → Opens Snip tool (Win+Shift+S)
"Take screenshot"             → Opens Snip tool
"Volume up"                   → Increases volume
"Volume down"                 → Decreases volume
"Mute"                        → Toggles mute
```

**Keyboard shortcuts executed**:
- Close: `Alt+F4`
- Minimize: `Win+D`
- Screenshot: `Win+Shift+S`

---

### 📁 **FILE & FOLDER OPERATIONS**

```
"Open Downloads folder"       → Opens Downloads directory
"Open Downloads"              → Opens Downloads directory
"Open Documents"              → Opens Documents folder
"Open Desktop"                → Opens Desktop folder
"Open my files"               → Opens Documents
"Open document folder"        → Opens Documents
```

**Supported folders**:
- Downloads
- Documents  
- Desktop

---

## 🎯 **Advanced Examples**

### **Search Queries**
```
"Search for best Python IDEs"
"Search machine learning tutorial"
"Search how to make pasta"
"Look up Python documentation"
"Find Python tutorials"
```

### **Website Commands**
```
"Go to github.com"
"Open mail.google.com"
"Go to stack overflow"
"Visit dev.to"
"Open medium.com"
```

### **Typing Examples**
```
"Type Dear John,"
"Type I would like to schedule a meeting"
"Type import numpy as np"
"Type 192.168.1.1"
```

### **System Commands**
```
"Close this window"
"Hide all windows"
"Lock my computer"
"Take a screenshot"
"Turn up volume"
"Mute audio"
```

---

## 🔧 **Command Processing**

### **How JARVIS Understands Commands**

1. **Listen** → Captures your voice (~1 second)
2. **Transcribe** → Converts speech to text (Google API)
3. **Analyze** → Gemini AI understands intent
4. **Match** → Identifies action type and parameter
5. **Execute** → Performs the action
6. **Feedback** → Shows result on screen

### **Confidence Scoring**

Each command has a confidence level (0.0-1.0):

```
"Open Edge"           → Confidence: 0.98 (very clear)
"Search for pizza"    → Confidence: 0.95 (clear)
"Type some text"      → Confidence: 0.90 (clear enough)
"Um... open thingy"   → Confidence: 0.60 (unclear - might fail)
"Blah blah blah"      → Confidence: 0.10 (not recognized)
```

If confidence < 0.7, JARVIS shows warning but tries anyway.

---

## ⚡ **Fast Commands (Cached)**

These commands have instant response (0.1s) because they're cached:

```
"Open edge"
"Open chrome"
"Open notepad"
"Open calculator"
"Close window"
"Minimize all"
```

Add your own in `config.py`:
```python
COMMAND_CACHE = {
    "your command": {"action": "...", "param": "..."},
}
```

---

## 🎤 **Voice Tips**

### **Good Voice Practices**
✅ Speak clearly and naturally  
✅ Use normal conversation tone  
✅ Pause between commands  
✅ Face the microphone  
✅ Minimize background noise  

### **Avoid These**
❌ Mumbling or fast speech  
❌ Background noise (TV, music)  
❌ Incomplete sentences  
❌ Long rambling commands  
❌ Whispering  

### **Examples of Clear Commands**
```
GOOD:  "Search for Python tutorials"
BAD:   "Um... find uh... Python... stuff"

GOOD:  "Open VS Code"
BAD:   "Open that... code... editor thing"

GOOD:  "Close window"
BAD:   "Close... uhh... the... window"
```

---

## 🚫 **Commands That DON'T Work**

JARVIS currently **cannot**:
- Send emails
- Schedule meetings
- Check weather (only search for it)
- Control other apps specifically
- Execute custom scripts
- Play music
- Understand context from previous commands
- Handle multi-step operations

**However**, you can:
- Search for weather: "Search weather in New York"
- Open music apps: "Open Spotify"
- Type email content then send: "Type email body" → manually send

---

## 🔄 **Real-World Workflows**

### **Productivity Session**
```
1. "Open VS Code" → Launches editor
2. "Search for Python async tutorial" → Opens docs
3. "Open Chrome" → Opens browser
4. "Go to GitHub" → Opens GitHub
5. "Type my commit message" → Auto-types commit
```

### **Writing Session**
```
1. "Open Notepad" → Opens editor
2. "Type title here" → Types title
3. "Search for writing prompts" → Opens search
4. "Open Documents" → Opens folder
```

### **System Management**
```
1. "Screenshot" → Takes screenshot
2. "Volume down" → Reduces volume
3. "Lock screen" → Locks computer
```

---

## 🎮 **Keyboard Shortcuts**

These are what JARVIS executes for system commands:

| Command | Shortcut | Action |
|---------|----------|--------|
| Close window | Alt+F4 | Closes active window |
| Minimize all | Win+D | Shows desktop |
| Screenshot | Win+Shift+S | Opens Snip tool |
| Lock | Custom | Locks screen (Windows) |
| Volume Up | Keyboard | Increases volume |
| Volume Down | Keyboard | Decreases volume |
| Mute | Keyboard | Toggles mute |

---

## 🎯 **Troubleshooting Commands**

If a command doesn't work:

1. **Speak it differently**:
   ```
   Try:  "Open Google Chrome"
   Or:   "Launch Chrome"
   Or:   "Start Chrome"
   ```

2. **Check exact wording**:
   ```
   Try:  "Search for Python"
   Or:   "Google Python"
   Or:   "Look up Python"
   ```

3. **Ensure prerequisites**:
   - Microphone working: Test separately
   - API key valid: Check config.py
   - Hotkey working: Press Windows+H manually
   - App exists: Check if actually installed

---

## 📱 **Command Format Reference**

### **Format: [Verb] [Object] [Details]**

```
"OPEN" + "Chrome" = Opens Chrome
"SEARCH" + "for Python" = Searches Python
"TYPE" + "hello" = Types hello
"CLOSE" + "window" = Closes window
"OPEN" + "Downloads" = Opens folder
```

### **Common Verbs**
- OPEN/LAUNCH/START
- SEARCH/GOOGLE/LOOK UP
- TYPE/WRITE
- CLOSE/QUIT
- GO TO/VISIT/BROWSE
- MINIMIZE/HIDE
- LOCK/LOCK UP

### **Common Objects**
- App names: Chrome, Edge, Notepad, VS Code, etc.
- Search terms: "for Python", "best IDEs", etc.
- Text: Any text to type
- System actions: Window, screen, volume, etc.

---

## 🎓 **Learning Path**

**Start with these 5 commands**:
1. "Open Chrome" - Most basic
2. "Search for Python" - Most useful
3. "Close window" - Most practical
4. "Type hello" - Text input
5. "Open Downloads" - File access

**Then try advanced**:
6. Custom website URLs
7. Longer search queries
8. Typing longer content
9. System control combinations
10. Custom app launching

---

## 💾 **Creating Custom Commands**

Edit `src/config.py` to add:

### **New App**
```python
APP_PATHS = {
    "myapp": "myapp.exe",  # Add this
    ...
}
```

### **New Cached Command**
```python
COMMAND_CACHE = {
    "open my app": {"action": "launch_app", "param": "myapp"},  # Add this
    ...
}
```

---

## ✨ **Pro Tips**

1. **Speed up**: Use cached commands from COMMAND_CACHE
2. **Accuracy**: Speak clearly for better recognition
3. **Efficiency**: Combine related tasks (search + open)
4. **Customization**: Add apps and commands to config
5. **Debugging**: Use DEBUG_MODE for details
6. **Positioning**: Change OVERLAY_POSITION for where to show status
7. **Hotkey**: Change hotkey if Windows+H conflicts

---

## 🎙️ **Quick Reference Card**

```
╔════════════════════════════════════════════════════════════╗
║ JARVIS - Voice Command Quick Reference                    ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║ ACTIVATION:     Press Windows+H or Ctrl+Shift+J          ║
║                                                            ║
║ APPS:           "Open [app name]"                        ║
║                 "Open Chrome" "Open VS Code"             ║
║                                                            ║
║ SEARCH:         "Search for [query]"                     ║
║                 "Search Python tutorials"                ║
║                                                            ║
║ WEBSITES:       "Go to [site]"                           ║
║                 "Go to YouTube"                          ║
║                                                            ║
║ TYPE:           "Type [text]"                            ║
║                 "Type hello world"                       ║
║                                                            ║
║ SYSTEM:         "Close window" "Minimize all"            ║
║                 "Lock screen" "Screenshot"               ║
║                 "Volume up" "Mute"                       ║
║                                                            ║
║ FILES:          "Open [folder name]"                     ║
║                 "Open Downloads" "Open Documents"        ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

Start talking! 🎤✨

Use natural language — JARVIS will understand.
