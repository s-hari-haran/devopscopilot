"""
GUI Overlay Module
Shows visual feedback for Jarvis status
"""

import tkinter as tk
from tkinter import ttk
from config import OVERLAY_POSITION, OVERLAY_WIDTH, OVERLAY_HEIGHT, OVERLAY_OPACITY
import threading

class JarvisOverlay:
    def __init__(self):
        self.root = None
        self.label = None
        self.is_visible = False
        self.current_status = ""
        
        # Status emojis
        self.status_icons = {
            "listening": "🎤",
            "recognizing": "🔄",
            "thinking": "🤖",
            "executing": "⚡",
            "success": "✓",
            "error": "❌",
        }
        
        print("✓ GUI Overlay initialized")
    
    def _create_window(self):
        """Create the overlay window"""
        self.root = tk.Tk()
        self.root.withdraw()  # Hide initially
        
        # Window properties
        self.root.title("JARVIS")
        self.root.attributes('-topmost', True)  # Always on top
        self.root.attributes('-alpha', OVERLAY_OPACITY)
        self.root.overrideredirect(True)  # No window decorations
        
        # Set size
        self.root.geometry(f"{OVERLAY_WIDTH}x{OVERLAY_HEIGHT}")
        
        # Position window
        self._position_window()
        
        # Create frame with styling
        frame = tk.Frame(
            self.root,
            bg='#1e1e1e',
            highlightbackground='#0078d4',
            highlightthickness=2
        )
        frame.pack(fill=tk.BOTH, expand=True, padx=2, pady=2)
        
        # Create label
        self.label = tk.Label(
            frame,
            text="JARVIS",
            font=('Segoe UI', 14, 'bold'),
            bg='#1e1e1e',
            fg='#ffffff',
            pady=20
        )
        self.label.pack(fill=tk.BOTH, expand=True)
        
        # Bind click to close
        self.label.bind('<Button-1>', lambda e: self.hide())
    
    def _position_window(self):
        """Position window based on config"""
        screen_width = self.root.winfo_screenwidth()
        screen_height = self.root.winfo_screenheight()
        
        positions = {
            "top-right": (screen_width - OVERLAY_WIDTH - 20, 20),
            "top-left": (20, 20),
            "bottom-right": (screen_width - OVERLAY_WIDTH - 20, screen_height - OVERLAY_HEIGHT - 60),
            "bottom-left": (20, screen_height - OVERLAY_HEIGHT - 60),
            "center": (screen_width // 2 - OVERLAY_WIDTH // 2, screen_height // 2 - OVERLAY_HEIGHT // 2),
        }
        
        x, y = positions.get(OVERLAY_POSITION, positions["top-right"])
        self.root.geometry(f"+{x}+{y}")
    
    def show(self, status="active"):
        """Show the overlay with given status"""
        if not self.root:
            self._create_window()
        
        self.current_status = status
        icon = self.status_icons.get(status, "⚡")
        text = f"{icon}  {status.upper()}"
        
        if self.label:
            self.label.config(text=text)
        
        self.root.deiconify()
        self.is_visible = True
        self.root.update()
    
    def hide(self):
        """Hide the overlay"""
        if self.root and self.is_visible:
            self.root.withdraw()
            self.is_visible = False
    
    def update_status(self, status, auto_hide_delay=None):
        """
        Update overlay status
        
        Args:
            status: Status string (listening, thinking, executing, etc.)
            auto_hide_delay: Seconds to wait before auto-hiding (None = don't hide)
        """
        self.show(status)
        
        if auto_hide_delay:
            def auto_hide():
                import time
                time.sleep(auto_hide_delay)
                self.hide()
            
            threading.Thread(target=auto_hide, daemon=True).start()
    
    def run(self):
        """Run the GUI main loop (blocking)"""
        if self.root:
            self.root.mainloop()
    
    def destroy(self):
        """Destroy the overlay"""
        if self.root:
            self.root.destroy()
            self.root = None

# Test function
def test():
    """Test the GUI overlay"""
    print("=" * 60)
    print("GUI Overlay Test")
    print("=" * 60)
    
    overlay = JarvisOverlay()
    
    import time
    
    print("\nShowing different statuses...")
    
    statuses = ["listening", "thinking", "executing", "success"]
    for status in statuses:
        print(f"Status: {status}")
        overlay.update_status(status, auto_hide_delay=2)
        time.sleep(2.5)
    
    print("\nTest complete!")
    overlay.destroy()

if __name__ == "__main__":
    test()
