#!/usr/bin/env python3
"""
JARVIS Installation & Setup Script
"""

import subprocess
import sys
import os

def print_header(text):
    print("\n" + "=" * 60)
    print(text)
    print("=" * 60 + "\n")

def install_requirements():
    """Install Python dependencies"""
    print_header("Installing Dependencies")
    
    try:
        print("Installing Python packages...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("\n✓ Dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Failed to install dependencies: {e}")
        return False

def test_microphone():
    """Test if microphone is working"""
    print_header("Testing Microphone")
    
    try:
        import speech_recognition as sr
        r = sr.Recognizer()
        with sr.Microphone() as source:
            print("✓ Microphone detected!")
            return True
    except Exception as e:
        print(f"❌ Microphone test failed: {e}")
        print("\nOn Windows, install PyAudio with:")
        print("  pip install pipwin")
        print("  pipwin install pyaudio")
        return False

def test_gemini_api():
    """Test Gemini API connection"""
    print_header("Testing Gemini API")
    
    try:
        from config import GEMINI_API_KEY
        import google.generativeai as genai
        
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content("Say 'hello'")
        
        print("✓ Gemini API working!")
        print(f"  Response: {response.text[:50]}...")
        return True
    except Exception as e:
        print(f"❌ Gemini API test failed: {e}")
        print("\nCheck your API key in config.py")
        return False

def main():
    """Main setup function"""
    print_header("JARVIS Setup & Installation")
    
    # Check Python version
    if sys.version_info < (3, 10):
        print("❌ Python 3.10+ required")
        print(f"Current version: {sys.version}")
        return
    
    print(f"✓ Python version: {sys.version.split()[0]}")
    
    # Install dependencies
    if not install_requirements():
        print("\n⚠️  Installation incomplete. Please fix errors and try again.")
        return
    
    # Test components
    mic_ok = test_microphone()
    api_ok = test_gemini_api()
    
    # Final status
    print_header("Setup Complete")
    
    if mic_ok and api_ok:
        print("✓ All systems ready!")
        print("\nTo start JARVIS:")
        print("  python main.py")
        print("\nTo test components:")
        print("  python main.py --test")
        print("\nActivate with: Windows+H or Ctrl+Shift+J")
    else:
        print("⚠️  Some components need attention:")
        if not mic_ok:
            print("  - Fix microphone issues")
        if not api_ok:
            print("  - Fix Gemini API configuration")

if __name__ == "__main__":
    main()
