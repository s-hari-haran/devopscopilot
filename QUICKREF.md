# Quick Reference Guide

## 🚀 Quick Start Commands

### DevOps Copilot

```bash
# Terminal 1 - Backend
cd devops-copilot/backend
npm install
npm run dev

# Terminal 2 - Frontend
cd devops-copilot/frontend
npm install
npm run dev

# Open: http://localhost:3000
```

### JARVIS

```bash
cd jarvis
pip install -r requirements.txt
python src/main.py

# Press: Windows+H
```

---

## 📂 Project Structure at a Glance

| Project | Location | Type | Port | Launch |
|---------|----------|------|------|--------|
| **DevOps Backend** | `devops-copilot/backend/` | Node.js | 3001 | `npm run dev` |
| **DevOps Frontend** | `devops-copilot/frontend/` | Next.js | 3000 | `npm run dev` |
| **JARVIS** | `jarvis/src/` | Python | - | `python main.py` |

---

## 🔑 Configuration Files

### DevOps Copilot Backend
**File**: `devops-copilot/backend/.env`
```env
GEMINI_API_KEY=your_key_here
PORT=3001
```

### JARVIS
**File**: `jarvis/src/config.py`
```python
GEMINI_API_KEY = "your_key_here"
HOTKEY = "<cmd>+h"  # Windows+H
```

---

## 📚 Documentation Locations

| Project | README | Architecture | Setup |
|---------|--------|--------------|-------|
| **DevOps Copilot** | `devops-copilot/docs/README.md` | `devops-copilot/docs/ARCHITECTURE.md` | `devops-copilot/docs/QUICKSTART.md` |
| **JARVIS** | `jarvis/docs/README.md` | `jarvis/docs/JARVIS_ARCHITECTURE.md` | Main `SETUP.md` |
| **Workspace** | `README.md` | - | `SETUP.md` |

---

## ✅ Verify Setup

Check if everything is structured correctly:
```bash
./verify-structure.sh
```

---

## 🐛 Common Issues

### Port Already In Use
```bash
# Kill process on port 3000/3001
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installed
```bash
# DevOps Copilot
cd devops-copilot/backend && npm install
cd ../frontend && npm install

# JARVIS
cd jarvis && pip install -r requirements.txt
```

### Hotkey Not Working (JARVIS)
Edit `jarvis/src/config.py`:
```python
HOTKEY_ALTERNATIVE = "ctrl+shift+j"
```

---

## 🎯 Project Comparison

```
┌────────────────┬──────────────────────┬──────────────────────┐
│ Aspect         │ DevOps Copilot       │ JARVIS               │
├────────────────┼──────────────────────┼──────────────────────┤
│ Type           │ Web Platform         │ Desktop Assistant    │
│ Language       │ JavaScript/Node/React│ Python               │
│ Purpose        │ Code Analysis & Fixes│ Voice Commands       │
│ Frontend       │ Browser (Port 3000)  │ GUI Overlay          │
│ Activation     │ Click buttons        │ Windows+H            │
│ API            │ RESTful (Port 3001)  │ Direct execution     │
│ OS Support     │ Any (web based)      │ Windows primary      │
└────────────────┴──────────────────────┴──────────────────────┘
```

---

## 🔗 File Structure Summary

```
devops-copilot/
├── backend/          # Express server
├── frontend/         # Next.js app
├── docs/            # Documentation
└── verify-setup.js  # Verification

jarvis/
├── src/             # Python source
├── docs/            # Documentation
├── requirements.txt # Dependencies
└── setup.py         # Setup script

extras/             # Miscellaneous files
```

---

## 🚀 Next Steps

1. **Read**: `README.md` (workspace overview)
2. **Setup**: Follow `SETUP.md` for your OS
3. **Choose**: Pick your project
4. **Configure**: Add API keys to `.env` or `config.py`
5. **Launch**: Run with appropriate commands above
6. **Explore**: Check `docs/` in each project for features

---

## 💡 Tips

- Both projects are **independent** - you can run one or both
- Keep API keys in `.env` and `config.py` (they're in `.gitignore`)
- Check project-specific docs in `docs/` folders
- Use `verify-structure.sh` to check setup
- Each project has its own `package.json` or `requirements.txt`

---

Enjoy! 🎉
