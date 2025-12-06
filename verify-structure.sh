#!/bin/bash

# DevOps Copilot & JARVIS Project Verification Script
# Verifies that both projects are properly structured and ready to run

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  DevOps Copilot & JARVIS - Project Structure Verification     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

passed=0
failed=0

# Function to check file/directory
check_path() {
  local path=$1
  local name=$2
  local type=$3  # "file" or "dir"
  
  if [ "$type" = "file" ] && [ -f "$path" ]; then
    echo -e "${GREEN}✓${NC} $name"
    ((passed++))
  elif [ "$type" = "dir" ] && [ -d "$path" ]; then
    echo -e "${GREEN}✓${NC} $name"
    ((passed++))
  else
    echo -e "${RED}✗${NC} $name (missing)"
    ((failed++))
  fi
}

echo "📦 DevOps Copilot Structure:"
echo "────────────────────────────────────────────────────────────────"
check_path "devops-copilot" "Directory: devops-copilot/" "dir"
check_path "devops-copilot/backend" "Backend directory" "dir"
check_path "devops-copilot/backend/server.js" "Backend entry point" "file"
check_path "devops-copilot/backend/routes/api.js" "API routes" "file"
check_path "devops-copilot/backend/services" "Backend services" "dir"
check_path "devops-copilot/frontend" "Frontend directory" "dir"
check_path "devops-copilot/frontend/pages" "Frontend pages" "dir"
check_path "devops-copilot/frontend/components" "Frontend components" "dir"
check_path "devops-copilot/docs" "Documentation directory" "dir"
check_path "devops-copilot/docs/README.md" "DevOps README" "file"
check_path "devops-copilot/docs/ARCHITECTURE.md" "DevOps Architecture" "file"
check_path "devops-copilot/verify-setup.js" "Verification script" "file"

echo ""
echo "🤖 JARVIS Structure:"
echo "────────────────────────────────────────────────────────────────"
check_path "jarvis" "Directory: jarvis/" "dir"
check_path "jarvis/src" "Source directory" "dir"
check_path "jarvis/src/main.py" "Main entry point" "file"
check_path "jarvis/src/config.py" "Configuration file" "file"
check_path "jarvis/src/voice_recognition.py" "Voice recognition" "file"
check_path "jarvis/src/gemini_brain.py" "AI brain" "file"
check_path "jarvis/src/action_executor.py" "Action executor" "file"
check_path "jarvis/src/hotkey_listener.py" "Hotkey listener" "file"
check_path "jarvis/src/gui_overlay.py" "GUI overlay" "file"
check_path "jarvis/docs" "Documentation directory" "dir"
check_path "jarvis/docs/README.md" "JARVIS README" "file"
check_path "jarvis/docs/JARVIS_ARCHITECTURE.md" "JARVIS Architecture" "file"
check_path "jarvis/requirements.txt" "Python dependencies" "file"
check_path "jarvis/setup.py" "Setup script" "file"

echo ""
echo "📋 Root Documentation:"
echo "────────────────────────────────────────────────────────────────"
check_path "README.md" "Main workspace README" "file"
check_path "SETUP.md" "Setup guide" "file"
check_path ".gitignore" "Git ignore file" "file"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "Results: ${GREEN}${passed} passed${NC}, ${RED}${failed} failed${NC}"
echo "════════════════════════════════════════════════════════════════"
echo ""

if [ $failed -eq 0 ]; then
  echo -e "${GREEN}✓ Project structure is correct!${NC}"
  echo ""
  echo "Next steps:"
  echo "  1. Read the main README.md for project overview"
  echo "  2. Follow SETUP.md for detailed installation instructions"
  echo "  3. Choose your project:"
  echo "     - DevOps Copilot: cd devops-copilot"
  echo "     - JARVIS: cd jarvis"
  echo ""
  echo "Happy coding! 🚀"
  exit 0
else
  echo -e "${RED}✗ Some files are missing. Check the errors above.${NC}"
  exit 1
fi
