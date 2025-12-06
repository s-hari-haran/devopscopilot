"""
JARVIS Configuration
Contains API keys and system settings
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# API Keys - Load from environment variables
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set. Create .env file from .env.example")

# Voice Recognition Settings
VOICE_LANGUAGE = "en-US"
VOICE_TIMEOUT = 5  # seconds to wait for speech
VOICE_PHRASE_LIMIT = 10  # max seconds for a single phrase

# Gemini AI Settings
GEMINI_MODEL = "gemini-pro"
GEMINI_TEMPERATURE = 0.3  # Lower = more focused/deterministic
GEMINI_MAX_TOKENS = 500

# Hotkey Settings
HOTKEY = "<cmd>+h"  # Windows+H (use <cmd> for Windows key)
HOTKEY_ALTERNATIVE = "ctrl+shift+j"  # Alternative if Windows+H doesn't work

# GUI Settings
OVERLAY_POSITION = "top-right"  # top-right, top-left, bottom-right, bottom-left, center
OVERLAY_WIDTH = 300
OVERLAY_HEIGHT = 80
OVERLAY_OPACITY = 0.9

# Typing Settings
TYPING_SPEED = 0.01  # seconds between keystrokes (0.01 = very fast)
TYPING_MODE = "instant"  # instant, fast, medium, slow

# Performance Settings
CACHE_COMMANDS = True
PRELOAD_AI = True
ASYNC_MODE = True

# Audio Feedback
FEEDBACK_SOUND = True
VOICE_FEEDBACK = False  # Text-to-speech (optional, slower)

# Logging
LOG_COMMANDS = True
LOG_FILE = "jarvis.log"
DEBUG_MODE = True

# System Settings
AUTO_START = False  # Start with Windows (implement later)
MINIMIZE_TO_TRAY = True

# Application Paths (Windows default paths)
APP_PATHS = {
    "edge": "msedge",
    "chrome": "chrome",
    "firefox": "firefox",
    "notepad": "notepad",
    "calculator": "calc",
    "vscode": "code",
    "explorer": "explorer",
    "cmd": "cmd",
    "powershell": "powershell",
}

# Command Cache (for instant responses)
COMMAND_CACHE = {
    "open edge": {"action": "launch_app", "param": "edge"},
    "open chrome": {"action": "launch_app", "param": "chrome"},
    "open notepad": {"action": "launch_app", "param": "notepad"},
    "open calculator": {"action": "launch_app", "param": "calculator"},
    "close window": {"action": "system_control", "param": "close_window"},
    "minimize all": {"action": "system_control", "param": "minimize_all"},
}
