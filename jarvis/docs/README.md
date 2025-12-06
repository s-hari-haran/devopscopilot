# JARVIS - Personal AI Assistant

Your voice-controlled AI assistant for Windows. Speak naturally, and Jarvis executes your commands.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd jarvis
pip install -r requirements.txt
```

**Note:** On Windows, you may need to install PyAudio manually:
```bash
pip install pipwin
pipwin install pyaudio
```

### 2. Configure API Key
Copy `.env.example` to `.env` and add your Gemini API key:
```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey)

### 3. Run Jarvis
```bash
python src/main.py
```

### 3. Activate Jarvis
Press **Windows+H** or **Ctrl+Shift+J** and start speaking!

---

## 💬 Example Commands

### Launch Applications
- "Open Edge browser"
- "Open Chrome"
- "Open Calculator"
- "Open Notepad"
- "Open VS Code"

### Web & Search
- "Search for Python tutorials"
- "Go to YouTube"
- "Open Gmail"

### System Control
- "Close window"
- "Minimize all"
- "Volume up"
- "Screenshot"

### Type Text
- "Type hello world"
- "Type an email to John"

### File Operations
- "Open Downloads folder"
- "Open Documents"

---

## 🧪 Test Mode

Test components without hotkey:
```bash
python main.py --test
```

Test individual modules:
```bash
python voice_recognition.py  # Test microphone
python gemini_brain.py       # Test AI understanding
python action_executor.py    # Test action execution
python hotkey_listener.py    # Test hotkey detection
python gui_overlay.py        # Test GUI
```

---

## ⚙️ Configuration

Edit `config.py` to customize:
- API keys
- Hotkey combination
- Voice language
- GUI position
- Typing speed
- And more...

---

## 📊 Performance

**Target Latency:** < 2.5 seconds (voice → action complete)

- Hotkey activation: < 100ms
- Speech recognition: < 1s
- AI understanding: < 1s
- Action execution: < 500ms

---

## 🔧 Troubleshooting

### Microphone not working
```bash
python voice_recognition.py
```
Check if microphone is detected and working.

### Hotkey not responding
Try the alternative: **Ctrl+Shift+J**

### Gemini API errors
- Check API key in `config.py`
- Verify internet connection
- Check API quota at https://makersuite.google.com

### PyAudio installation fails
```bash
# Windows
pip install pipwin
pipwin install pyaudio

# Linux
sudo apt-get install portaudio19-dev python3-pyaudio

# macOS
brew install portaudio
pip install pyaudio
```

---

## 🎯 System Requirements

- **OS:** Windows 10/11 (primary), macOS, Linux
- **Python:** 3.10+
- **Microphone:** Required
- **Internet:** Required for Gemini AI

---

## 📝 Project Structure

```
jarvis/
├── main.py              # Main application
├── config.py            # Configuration & API keys
├── voice_recognition.py # Speech-to-text
├── gemini_brain.py      # AI command understanding
├── action_executor.py   # Action execution
├── hotkey_listener.py   # Hotkey detection
├── gui_overlay.py       # Visual feedback
└── requirements.txt     # Dependencies
```

---

## 🚀 Advanced Usage

### Background Service
Run Jarvis in the background:
```bash
pythonw main.py  # Windows (no console)
nohup python main.py &  # Linux/macOS
```

### Custom Commands
Add custom commands to `config.py`:
```python
COMMAND_CACHE = {
    "my custom command": {"action": "launch_app", "param": "myapp"},
}
```

---

## 🤝 Contributing

Found a bug or have a feature request? Open an issue!

---

## 📄 License

MIT License - Feel free to use and modify!

---

## 🎉 Enjoy JARVIS!

Press **Windows+H** and say:
> "Open Edge browser"

Watch the magic happen! ⚡
