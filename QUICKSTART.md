# Quick Start Guide

Get the DevOps Copilot platform running in 5 minutes.

## Installation

### Step 1: Backend Setup

```powershell
cd backend
npm install
```

### Step 2: Frontend Setup

```powershell
cd frontend
npm install
```

## Running the Platform

### Terminal 1: Start Backend

```powershell
cd backend
npm run dev
```

Output should show:
```
DevOps Copilot Backend running on http://localhost:3001
API available at http://localhost:3001/api
```

### Terminal 2: Start Frontend

```powershell
cd frontend
npm run dev
```

Output should show:
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

## First Time Usage

1. Open `http://localhost:3000` in your browser
2. You'll be redirected to the config page
3. **Optional**: Enter your Gemini API key, or leave empty for demo mode
4. Click "Connect & Continue"
5. You're now on the **Dashboard**!

## Dashboard Controls

| Button | Action | Result |
|--------|--------|--------|
| 🐛 Inject Bug | Simulate a security bug | Creates buggy commit, Memory Agent activates |
| 🔍 Scan for Issues | Detect problems | Monitoring Agent scans, creates Incident |
| ⚙️ Run Analysis | Analyze with AI | Analysis Agent uses Gemini API, provides fixes |
| 🔧 Auto Fix & Create PR | Generate fix | Auto Fixer creates PR with automated fix |

## Typical Workflow

```
1. Click "Inject Bug"
   └─ Buggy commit appears in Memory Agent

2. Click "Scan for Issues"
   └─ Incident count increases, Monitoring Agent shows DONE

3. Click "Run Analysis"
   └─ Analysis Agent processes, Gemini provides insights

4. Click "Auto Fix & Create PR"
   └─ Auto Fixer generates PR, all agents complete
```

## API Testing

Test backend endpoints directly:

```bash
# Check health
curl http://localhost:3001/health

# List repos
curl http://localhost:3001/api/repo/list

# Inject bug
curl -X POST http://localhost:3001/api/repo/inject-bug ^
  -H "Content-Type: application/json" ^
  -d "{\"repoId\":\"repo-unicorn\"}"

# Scan
curl -X POST http://localhost:3001/api/repo/scan ^
  -H "Content-Type: application/json" ^
  -d "{\"repoId\":\"repo-unicorn\"}"
```

## Configuration

### Environment Variables (Backend)

Create `backend/.env`:
```
GEMINI_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
```

### Demo Mode

Leave `GEMINI_API_KEY` empty to use mock AI responses.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to backend" | Check backend is running on port 3001 |
| "API key invalid" | Verify Gemini API key in `.env` |
| "Port already in use" | Change PORT in `.env` or kill process |
| "Module not found" | Run `npm install` in both directories |

## What's Included

✅ Full Node.js + Express backend
✅ Next.js + Tailwind frontend
✅ Neo-Brutalism UI matching design exactly
✅ Gemini API integration
✅ 5-Agent orchestration system
✅ Git-style repository management
✅ Incident detection & tracking
✅ Automated PR generation
✅ Real-time agent state updates
✅ Complete documentation

## Next Steps

1. **Explore Dashboard**: Try each button and watch agents update
2. **View Incidents**: Click incident ID to see details
3. **Check PRs**: Click PR ID to view generated pull requests
4. **Configure API Key**: Add real Gemini key for production analysis

## Support

See `README.md` for:
- Complete API documentation
- Architecture details
- Data models
- Deployment guide
- Security considerations

---

**Ready?** Start the servers and navigate to `http://localhost:3000`
