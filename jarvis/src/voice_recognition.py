"""
Voice Recognition Module
Handles speech-to-text conversion using Google Speech Recognition
"""

import speech_recognition as sr
from config import VOICE_LANGUAGE, VOICE_TIMEOUT, VOICE_PHRASE_LIMIT, DEBUG_MODE
import threading
import queue

class VoiceRecognizer:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()
        
        # Optimize for speed
        self.recognizer.energy_threshold = 4000  # Adjust for ambient noise
        self.recognizer.dynamic_energy_threshold = True
        self.recognizer.pause_threshold = 0.8  # Faster response
        
        # Calibrate microphone on init
        self._calibrate_microphone()
        
        print("✓ Voice Recognition initialized")
    
    def _calibrate_microphone(self):
        """Calibrate microphone for ambient noise"""
        try:
            with self.microphone as source:
                if DEBUG_MODE:
                    print("🎤 Calibrating microphone for ambient noise...")
                self.recognizer.adjust_for_ambient_noise(source, duration=0.5)
                if DEBUG_MODE:
                    print("✓ Microphone calibrated")
        except Exception as e:
            print(f"⚠️  Microphone calibration warning: {e}")
    
    def listen(self, callback=None):
        """
        Listen for voice input and return transcribed text
        
        Args:
            callback: Optional callback function to call when listening starts
            
        Returns:
            str: Transcribed text, or None if error/timeout
        """
        try:
            with self.microphone as source:
                if callback:
                    callback("listening")
                
                if DEBUG_MODE:
                    print("🎤 Listening...")
                
                # Listen for audio
                audio = self.recognizer.listen(
                    source, 
                    timeout=VOICE_TIMEOUT,
                    phrase_time_limit=VOICE_PHRASE_LIMIT
                )
                
                if callback:
                    callback("recognizing")
                
                if DEBUG_MODE:
                    print("🔄 Recognizing speech...")
                
                # Convert speech to text
                text = self.recognizer.recognize_google(audio, language=VOICE_LANGUAGE)
                
                if DEBUG_MODE:
                    print(f"✓ Recognized: '{text}'")
                
                return text.lower()  # Return lowercase for easier processing
                
        except sr.WaitTimeoutError:
            if DEBUG_MODE:
                print("⏱️  Timeout: No speech detected")
            return None
            
        except sr.UnknownValueError:
            if DEBUG_MODE:
                print("❓ Could not understand audio")
            return None
            
        except sr.RequestError as e:
            print(f"❌ Speech recognition error: {e}")
            return None
            
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
            return None
    
    def listen_async(self, callback):
        """
        Listen asynchronously in a separate thread
        
        Args:
            callback: Function to call with result (text or None)
        """
        def _listen_thread():
            text = self.listen()
            callback(text)
        
        thread = threading.Thread(target=_listen_thread, daemon=True)
        thread.start()
    
    def test_microphone(self):
        """Test if microphone is working"""
        try:
            with self.microphone as source:
                print("🎤 Testing microphone... Say something!")
                audio = self.recognizer.listen(source, timeout=3, phrase_time_limit=5)
                text = self.recognizer.recognize_google(audio, language=VOICE_LANGUAGE)
                print(f"✓ Microphone test successful! You said: '{text}'")
                return True
        except Exception as e:
            print(f"❌ Microphone test failed: {e}")
            return False

# Quick test function
def test():
    """Test the voice recognition system"""
    print("=" * 60)
    print("Voice Recognition Test")
    print("=" * 60)
    
    vr = VoiceRecognizer()
    
    print("\nSay something (e.g., 'open edge browser')...")
    text = vr.listen()
    
    if text:
        print(f"\n✓ Success! Recognized: '{text}'")
    else:
        print("\n❌ No speech recognized")

if __name__ == "__main__":
    test()
