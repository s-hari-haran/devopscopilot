"""
JARVIS - Your Personal AI Assistant
Main application entry point
"""

import time
import sys
from voice_recognition import VoiceRecognizer
from gemini_brain import GeminiBrain
from action_executor import ActionExecutor
from hotkey_listener import HotkeyListener
from gui_overlay import JarvisOverlay
from config import DEBUG_MODE
import threading

class Jarvis:
    def __init__(self):
        print("=" * 60)
        print("JARVIS - Personal AI Assistant")
        print("=" * 60)
        print()
        
        # Initialize components
        print("Initializing components...")
        self.voice = VoiceRecognizer()
        self.brain = GeminiBrain()
        self.executor = ActionExecutor()
        self.overlay = JarvisOverlay()
        
        self.is_processing = False
        self.should_exit = False
        
        print()
        print("=" * 60)
        print("✓ JARVIS is ready!")
        print("=" * 60)
        print()
        print("Press Windows+H or Ctrl+Shift+J to activate")
        print("Press Ctrl+C to exit")
        print()
    
    def on_hotkey_pressed(self):
        """Handle hotkey activation"""
        if self.is_processing:
            if DEBUG_MODE:
                print("⚠️  Already processing a command...")
            return
        
        # Process command in separate thread to not block hotkey listener
        threading.Thread(target=self.process_command, daemon=True).start()
    
    def process_command(self):
        """Process a voice command (full pipeline)"""
        self.is_processing = True
        start_time = time.time()
        
        try:
            # Step 1: Show listening overlay
            self.overlay.update_status("listening")
            
            # Step 2: Listen for voice
            text = self.voice.listen(callback=lambda status: self.overlay.update_status(status))
            
            if not text:
                self.overlay.update_status("error", auto_hide_delay=2)
                print("❌ No speech detected\n")
                return
            
            print(f"\n🎤 You said: '{text}'")
            
            # Step 3: AI understanding
            self.overlay.update_status("thinking")
            action_dict = self.brain.understand_command(text)
            
            if action_dict["action"] == "unknown":
                self.overlay.update_status("error", auto_hide_delay=2)
                print(f"❓ Could not understand: {action_dict['param']}\n")
                return
            
            # Step 4: Execute action
            self.overlay.update_status("executing")
            success = self.executor.execute(action_dict)
            
            # Step 5: Show result
            if success:
                self.overlay.update_status("success", auto_hide_delay=1.5)
                elapsed = time.time() - start_time
                print(f"✓ Command completed in {elapsed:.2f}s\n")
            else:
                self.overlay.update_status("error", auto_hide_delay=2)
                print("❌ Command failed\n")
        
        except Exception as e:
            self.overlay.update_status("error", auto_hide_delay=2)
            print(f"❌ Error: {e}\n")
        
        finally:
            self.is_processing = False
    
    def run(self):
        """Run Jarvis (blocking)"""
        # Start hotkey listener
        hotkey = HotkeyListener(self.on_hotkey_pressed)
        hotkey.start()
        
        try:
            # Keep running
            while not self.should_exit:
                time.sleep(0.1)
        
        except KeyboardInterrupt:
            print("\n\nShutting down JARVIS...")
        
        finally:
            hotkey.stop()
            self.overlay.destroy()
            print("✓ JARVIS stopped")
    
    def test_components(self):
        """Test all components without hotkey"""
        print("\n" + "=" * 60)
        print("Component Test Mode")
        print("=" * 60 + "\n")
        
        test_commands = [
            "open calculator",
            "search for python tutorials",
        ]
        
        for cmd in test_commands:
            print(f"\nTesting command: '{cmd}'")
            print("-" * 40)
            
            # Simulate processing
            action_dict = self.brain.understand_command(cmd)
            print(f"AI Understanding: {action_dict}")
            
            success = self.executor.execute(action_dict)
            print(f"Execution: {'✓ Success' if success else '❌ Failed'}")
            
            time.sleep(2)
        
        print("\n✓ Component test complete\n")

# Main entry point
def main():
    """Main function"""
    jarvis = Jarvis()
    
    # Check if test mode
    if len(sys.argv) > 1 and sys.argv[1] == "--test":
        jarvis.test_components()
    else:
        jarvis.run()

if __name__ == "__main__":
    main()
