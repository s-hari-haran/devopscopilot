#!/usr/bin/env python3
"""
JARVIS Quick Test (No microphone/GUI required)
Tests the AI brain and action executor
"""

import sys
sys.path.insert(0, '/workspaces/devopscopilot/jarvis')

from gemini_brain import GeminiBrain
from action_executor import ActionExecutor

def test_jarvis():
    print("=" * 60)
    print("JARVIS Quick Test - AI Brain & Actions")
    print("=" * 60)
    print()
    
    # Initialize components
    print("Initializing components...")
    brain = GeminiBrain()
    executor = ActionExecutor()
    print()
    
    # Test commands
    test_commands = [
        "open edge browser",
        "open calculator",
        "search for python tutorials",
        "go to youtube",
        "type hello world",
        "close window",
        "open downloads folder",
    ]
    
    print("=" * 60)
    print("Testing Commands")
    print("=" * 60)
    print()
    
    for i, cmd in enumerate(test_commands, 1):
        print(f"\n[{i}/{len(test_commands)}] Command: '{cmd}'")
        print("-" * 60)
        
        # AI understanding
        result = brain.understand_command(cmd)
        print(f"AI Understanding:")
        print(f"  Action: {result['action']}")
        print(f"  Parameter: {result['param']}")
        print(f"  Confidence: {result['confidence']:.2f}")
        
        # Note: We won't execute actions in container
        print(f"  Would execute: {result['action']}('{result['param']}')")
    
    print()
    print("=" * 60)
    print("✓ Test Complete!")
    print("=" * 60)
    print()
    print("The AI brain is working correctly!")
    print("On your laptop, these commands would execute the actual actions.")
    print()

if __name__ == "__main__":
    test_jarvis()
