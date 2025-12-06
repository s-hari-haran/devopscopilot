"""
Hotkey Listener Module
Detects Windows+H (or configured hotkey) to activate Jarvis
"""

from pynput import keyboard
from pynput.keyboard import Key, KeyCode
from config import DEBUG_MODE
import threading

class HotkeyListener:
    def __init__(self, callback):
        """
        Initialize hotkey listener
        
        Args:
            callback: Function to call when hotkey is pressed
        """
        self.callback = callback
        self.current_keys = set()
        self.listener = None
        self.is_running = False
        
        # Define hotkeys (Windows+H or Ctrl+Shift+J)
        self.hotkey_combinations = [
            {Key.cmd, KeyCode.from_char('h')},  # Windows+H
            {Key.ctrl, Key.shift, KeyCode.from_char('j')},  # Ctrl+Shift+J (alternative)
        ]
        
        print("✓ Hotkey Listener initialized")
        if DEBUG_MODE:
            print("  Hotkeys: Windows+H or Ctrl+Shift+J")
    
    def on_press(self, key):
        """Handle key press"""
        try:
            # Normalize the key
            if hasattr(key, 'char') and key.char:
                key = KeyCode.from_char(key.char.lower())
            
            self.current_keys.add(key)
            
            # Check if any hotkey combination is pressed
            for combo in self.hotkey_combinations:
                if combo.issubset(self.current_keys):
                    if DEBUG_MODE:
                        print("🔥 Hotkey detected!")
                    self.callback()
                    
        except Exception as e:
            if DEBUG_MODE:
                print(f"Key press error: {e}")
    
    def on_release(self, key):
        """Handle key release"""
        try:
            # Normalize the key
            if hasattr(key, 'char') and key.char:
                key = KeyCode.from_char(key.char.lower())
            
            if key in self.current_keys:
                self.current_keys.remove(key)
                
        except Exception as e:
            if DEBUG_MODE:
                print(f"Key release error: {e}")
    
    def start(self):
        """Start listening for hotkeys"""
        if self.is_running:
            if DEBUG_MODE:
                print("⚠️  Hotkey listener already running")
            return
        
        self.is_running = True
        self.listener = keyboard.Listener(
            on_press=self.on_press,
            on_release=self.on_release
        )
        self.listener.start()
        print("✓ Hotkey listener started (Press Windows+H or Ctrl+Shift+J)")
    
    def stop(self):
        """Stop listening for hotkeys"""
        if self.listener:
            self.listener.stop()
            self.is_running = False
            print("✓ Hotkey listener stopped")
    
    def is_active(self):
        """Check if listener is running"""
        return self.is_running

# Test function
def test():
    """Test the hotkey listener"""
    print("=" * 60)
    print("Hotkey Listener Test")
    print("=" * 60)
    print("\nPress Windows+H or Ctrl+Shift+J to trigger")
    print("Press Ctrl+C to exit\n")
    
    def on_hotkey():
        print("🔥 HOTKEY ACTIVATED!")
    
    listener = HotkeyListener(on_hotkey)
    listener.start()
    
    try:
        # Keep running
        import time
        while True:
            time.sleep(0.1)
    except KeyboardInterrupt:
        print("\n\nStopping...")
        listener.stop()

if __name__ == "__main__":
    test()
