"""
Gemini AI Brain Module
Uses Google Gemini to understand commands and decide actions
"""

import google.generativeai as genai
from config import GEMINI_API_KEY, GEMINI_MODEL, GEMINI_TEMPERATURE, COMMAND_CACHE, DEBUG_MODE
import json
import re

class GeminiBrain:
    def __init__(self):
        # Configure Gemini API
        genai.configure(api_key=GEMINI_API_KEY)
        
        # Initialize model
        self.model = genai.GenerativeModel(
            model_name=GEMINI_MODEL,
            generation_config={
                "temperature": GEMINI_TEMPERATURE,
                "top_p": 0.95,
                "top_k": 40,
                "max_output_tokens": 500,
            }
        )
        
        # System prompt for command understanding
        self.system_prompt = """You are JARVIS, a voice assistant that converts natural language commands into structured actions.

Given a user voice command, respond with ONLY a JSON object in this exact format:
{
    "action": "action_type",
    "param": "parameter",
    "confidence": 0.95
}

Action types:
- "launch_app": Open an application (param: app name like "edge", "chrome", "notepad", "vscode", "calculator")
- "type_text": Type text on screen (param: the exact text to type)
- "web_search": Search on Google (param: search query)
- "open_website": Open specific website (param: URL or site name)
- "system_control": System action (param: "close_window", "minimize_all", "lock", "volume_up", "volume_down", "mute", "screenshot")
- "file_operation": File/folder operation (param: "open_downloads", "open_documents", "open_desktop")
- "unknown": Cannot determine action (param: reason)

Examples:
User: "open edge browser"
Response: {"action": "launch_app", "param": "edge", "confidence": 0.98}

User: "search for pizza near me"
Response: {"action": "web_search", "param": "pizza near me", "confidence": 0.95}

User: "type hello world"
Response: {"action": "type_text", "param": "hello world", "confidence": 0.99}

User: "close this window"
Response: {"action": "system_control", "param": "close_window", "confidence": 0.97}

User: "go to youtube"
Response: {"action": "open_website", "param": "youtube.com", "confidence": 0.96}

User: "open downloads folder"
Response: {"action": "file_operation", "param": "open_downloads", "confidence": 0.98}

Respond with ONLY the JSON object, no other text."""
        
        print("✓ Gemini AI Brain initialized")
    
    def understand_command(self, text):
        """
        Understand voice command and return action
        
        Args:
            text: Voice command text
            
        Returns:
            dict: {"action": "action_type", "param": "parameter", "confidence": float}
        """
        if not text:
            return {"action": "unknown", "param": "no input", "confidence": 0.0}
        
        # Check cache first for instant response
        if text in COMMAND_CACHE:
            if DEBUG_MODE:
                print(f"⚡ Cache hit: '{text}'")
            cached = COMMAND_CACHE[text]
            cached["confidence"] = 1.0
            return cached
        
        try:
            if DEBUG_MODE:
                print(f"🤖 AI analyzing: '{text}'")
            
            # Send to Gemini
            prompt = f"{self.system_prompt}\n\nUser: \"{text}\""
            response = self.model.generate_content(prompt)
            
            # Extract JSON from response
            response_text = response.text.strip()
            
            if DEBUG_MODE:
                print(f"AI Response: {response_text}")
            
            # Parse JSON
            # Remove markdown code blocks if present
            response_text = re.sub(r'```json\n?', '', response_text)
            response_text = re.sub(r'```\n?', '', response_text)
            
            result = json.loads(response_text)
            
            # Validate result
            if "action" not in result or "param" not in result:
                raise ValueError("Invalid response format")
            
            if "confidence" not in result:
                result["confidence"] = 0.8
            
            if DEBUG_MODE:
                print(f"✓ Understood: {result}")
            
            return result
            
        except json.JSONDecodeError as e:
            print(f"❌ JSON parse error: {e}")
            print(f"Response was: {response_text}")
            return {"action": "unknown", "param": "parse error", "confidence": 0.0}
            
        except Exception as e:
            print(f"❌ AI error: {e}")
            return {"action": "unknown", "param": str(e), "confidence": 0.0}
    
    def get_smart_response(self, text):
        """
        Get a conversational response (for advanced features)
        
        Args:
            text: User input
            
        Returns:
            str: AI response
        """
        try:
            response = self.model.generate_content(f"User says: {text}\nRespond briefly and helpfully.")
            return response.text.strip()
        except Exception as e:
            print(f"❌ AI response error: {e}")
            return "I'm having trouble understanding that."

# Test function
def test():
    """Test the Gemini brain"""
    print("=" * 60)
    print("Gemini AI Brain Test")
    print("=" * 60)
    
    brain = GeminiBrain()
    
    test_commands = [
        "open edge browser",
        "search for python tutorials",
        "type hello world",
        "close this window",
        "open calculator",
        "go to youtube",
        "open downloads folder",
    ]
    
    for cmd in test_commands:
        print(f"\nCommand: '{cmd}'")
        result = brain.understand_command(cmd)
        print(f"→ Action: {result['action']}")
        print(f"→ Param: {result['param']}")
        print(f"→ Confidence: {result['confidence']:.2f}")

if __name__ == "__main__":
    test()
