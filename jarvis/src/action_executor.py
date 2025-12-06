"""
Action Executor Module
Executes actions based on Gemini AI decisions
"""

import subprocess
import webbrowser
import os
import platform
from config import APP_PATHS, DEBUG_MODE

class ActionExecutor:
    def __init__(self):
        self.system = platform.system()
        print(f"✓ Action Executor initialized (OS: {self.system})")
    
    def execute(self, action_dict):
        """
        Execute an action based on AI decision
        
        Args:
            action_dict: {"action": "type", "param": "value", "confidence": 0.9}
            
        Returns:
            bool: True if successful, False otherwise
        """
        action = action_dict.get("action")
        param = action_dict.get("param")
        confidence = action_dict.get("confidence", 0.0)
        
        if DEBUG_MODE:
            print(f"⚡ Executing: {action} with param: {param} (confidence: {confidence:.2f})")
        
        # Low confidence warning
        if confidence < 0.7:
            print(f"⚠️  Low confidence ({confidence:.2f}), attempting anyway...")
        
        try:
            if action == "launch_app":
                return self.launch_app(param)
            elif action == "type_text":
                return self.type_text(param)
            elif action == "web_search":
                return self.web_search(param)
            elif action == "open_website":
                return self.open_website(param)
            elif action == "system_control":
                return self.system_control(param)
            elif action == "file_operation":
                return self.file_operation(param)
            else:
                print(f"❌ Unknown action: {action}")
                return False
                
        except Exception as e:
            print(f"❌ Execution error: {e}")
            return False
    
    def launch_app(self, app_name):
        """Launch an application"""
        if DEBUG_MODE:
            print(f"🚀 Launching app: {app_name}")
        
        # Get app path from config or use as-is
        app_cmd = APP_PATHS.get(app_name.lower(), app_name)
        
        try:
            if self.system == "Windows":
                # Try different methods for Windows
                try:
                    os.startfile(app_cmd)
                except:
                    subprocess.Popen(app_cmd, shell=True)
            elif self.system == "Darwin":  # macOS
                subprocess.Popen(["open", "-a", app_cmd])
            else:  # Linux
                subprocess.Popen([app_cmd])
            
            print(f"✓ Launched: {app_name}")
            return True
            
        except Exception as e:
            print(f"❌ Failed to launch {app_name}: {e}")
            return False
    
    def type_text(self, text):
        """Type text on screen (requires pyautogui)"""
        try:
            import pyautogui
            if DEBUG_MODE:
                print(f"⌨️  Typing: {text}")
            
            # Small delay to let user position cursor if needed
            import time
            time.sleep(0.5)
            
            # Type the text
            pyautogui.write(text, interval=0.01)
            
            print(f"✓ Typed: {text}")
            return True
            
        except ImportError:
            print("❌ pyautogui not installed. Install with: pip install pyautogui")
            return False
        except Exception as e:
            print(f"❌ Typing error: {e}")
            return False
    
    def web_search(self, query):
        """Perform web search"""
        if DEBUG_MODE:
            print(f"🔍 Searching for: {query}")
        
        try:
            search_url = f"https://www.google.com/search?q={query.replace(' ', '+')}"
            webbrowser.open(search_url)
            print(f"✓ Opened search: {query}")
            return True
        except Exception as e:
            print(f"❌ Search error: {e}")
            return False
    
    def open_website(self, site):
        """Open a website"""
        if DEBUG_MODE:
            print(f"🌐 Opening website: {site}")
        
        try:
            # Add https:// if not present
            if not site.startswith(('http://', 'https://')):
                # Handle common sites
                site_map = {
                    'youtube': 'youtube.com',
                    'gmail': 'mail.google.com',
                    'github': 'github.com',
                    'twitter': 'twitter.com',
                    'facebook': 'facebook.com',
                }
                site = site_map.get(site.lower(), site)
                site = f"https://{site}"
            
            webbrowser.open(site)
            print(f"✓ Opened: {site}")
            return True
        except Exception as e:
            print(f"❌ Website error: {e}")
            return False
    
    def system_control(self, command):
        """Execute system control commands"""
        if DEBUG_MODE:
            print(f"🖥️  System command: {command}")
        
        try:
            import pyautogui
            
            cmd = command.lower()
            
            if cmd == "close_window":
                pyautogui.hotkey('alt', 'f4')
            elif cmd == "minimize_all":
                pyautogui.hotkey('win', 'd')
            elif cmd == "lock":
                if self.system == "Windows":
                    subprocess.run(['rundll32', 'user32.dll,LockWorkStation'])
                elif self.system == "Darwin":
                    subprocess.run(['pmset', 'displaysleepnow'])
            elif cmd == "screenshot":
                pyautogui.hotkey('win', 'shift', 's')  # Windows Snip tool
            elif cmd in ["volume_up", "volume_down", "mute"]:
                key = {"volume_up": "volumeup", "volume_down": "volumedown", "mute": "volumemute"}[cmd]
                pyautogui.press(key)
            else:
                print(f"❌ Unknown system command: {command}")
                return False
            
            print(f"✓ Executed: {command}")
            return True
            
        except ImportError:
            print("❌ pyautogui not installed")
            return False
        except Exception as e:
            print(f"❌ System control error: {e}")
            return False
    
    def file_operation(self, operation):
        """Perform file operations"""
        if DEBUG_MODE:
            print(f"📁 File operation: {operation}")
        
        try:
            op = operation.lower()
            
            # Get user home directory
            home = os.path.expanduser("~")
            
            paths = {
                "open_downloads": os.path.join(home, "Downloads"),
                "open_documents": os.path.join(home, "Documents"),
                "open_desktop": os.path.join(home, "Desktop"),
            }
            
            if op in paths:
                path = paths[op]
                if self.system == "Windows":
                    os.startfile(path)
                elif self.system == "Darwin":
                    subprocess.Popen(["open", path])
                else:
                    subprocess.Popen(["xdg-open", path])
                
                print(f"✓ Opened: {path}")
                return True
            else:
                print(f"❌ Unknown file operation: {operation}")
                return False
                
        except Exception as e:
            print(f"❌ File operation error: {e}")
            return False

# Test function
def test():
    """Test the action executor"""
    print("=" * 60)
    print("Action Executor Test")
    print("=" * 60)
    
    executor = ActionExecutor()
    
    # Test launching an app
    print("\n1. Testing app launch (Calculator)...")
    result = executor.execute({"action": "launch_app", "param": "calculator", "confidence": 1.0})
    print(f"Result: {'✓ Success' if result else '❌ Failed'}")
    
    # Test web search
    print("\n2. Testing web search...")
    result = executor.execute({"action": "web_search", "param": "python tutorials", "confidence": 1.0})
    print(f"Result: {'✓ Success' if result else '❌ Failed'}")

if __name__ == "__main__":
    test()
