# DevOps Copilot Platform

A production-grade full-stack DevOps automation platform with AI-powered incident detection, analysis, and automated fixing using the Gemini API.

## 🏗️ Architecture

```
devopscopilot/
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── package.json              # Backend dependencies
│   ├── .env.example              # Environment configuration template
│   ├── routes/
│   │   └── api.js               # REST API endpoints
│   └── services/
│       ├── SimulatedRepoStore.js      # Git repository abstraction layer
│       ├── TestAppSimulator.js   # Application state & bug injection
│       ├── IncidentService.js    # Incident lifecycle management
│       ├── GeminiService.js      # Gemini API integration
│       ├── PullRequestService.js # Pull request management
│       └── AgentStateService.js  # Agent workflow orchestration
├── frontend/
│   ├── pages/
│   │   ├── _app.jsx             # Next.js app wrapper
│   │   ├── index.jsx            # Home page (redirects to config)
│   │   ├── config.jsx           # Configuration page
│   │   ├── dashboard.jsx        # Main dashboard
│   │   ├── incident/[id].jsx    # Incident details page
│   │   └── pull-request/[id].jsx # PR viewer page
│   ├── components/
│   │   ├── Header.jsx           # Dashboard header
│   │   ├── InfoStrip.jsx        # Repo/branch/incident info
│   │   ├── AgentCard.jsx        # Agent status card
│   │   ├── SystemTimeline.jsx   # System timeline graph
│   │   ├── ActionPanel.jsx      # Action buttons panel
│   │   ├── CommitPanel.jsx      # Commit info display
│   │   └── ErrorContext.jsx     # Error context box
│   ├── lib/
│   │   └── api.js              # API client utilities
│   ├── styles/
│   │   └── globals.css         # Global styles & animations
│   ├── package.json            # Frontend dependencies
│   ├── next.config.js          # Next.js configuration
│   ├── tailwind.config.js      # Tailwind CSS config
│   ├── postcss.config.js       # PostCSS config
│   └── tsconfig.json           # TypeScript config
└── README.md                    # This file
```

## 🎨 UI Design

The frontend implements **Neo-Brutalism** design with:
- **Thick black borders (4px)** on all components
- **Bold colors**: Yellow (#FFFF00), Cyan (#00D4FF), Pink (#FF006E), Gold (#FFD60A)
- **Flat design** with no gradients
- **Typography hierarchy** with bold, uppercase text
- **Animated indicators**:
  - 3 bouncing dots for IDLE state
  - 3 animated bars for RUNNING state
  - Single square for DONE state

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│       DEVOPS COPILOT DASHBOARD (Header)                 │
├─────────────────────────────────────────────────────────┤
│ REPO: project-unicorn │ BRANCH: main │ INCIDENTS: 1 ⚠️   │
├────────────────────────────────┬────────────────────────┤
│ Agent Cards (3x2 grid)          │ Action Panel           │
│ ┌──────┬──────┬──────┐          │ ┌──────────────┐       │
│ │ Mon. │ Ana. │Timeline         │ │ Inject Bug   │       │
│ ├──────┼──────┼──────┤          │ ├──────────────┤       │
│ │ Auto │ Notif│Memory           │ │ Scan Issues  │       │
│ └──────┴──────┴──────┘          │ ├──────────────┤       │
│                                 │ │ Run Analysis │       │
│                                 │ ├──────────────┤       │
│                                 │ │ Auto Fix PR  │       │
│                                 │ └──────────────┘       │
├────────────────────────────────┴────────────────────────┤
│ COMMIT: fc94782a | MSG: Implemented auth | + src/auth   │
├────────────────────────────────┬────────────────────────┤
│                                │ ERROR CONTEXT          │
│                                │ ┌────────────────────┐ │
│                                │ │ DB connection fail │ │
│                                │ └────────────────────┘ │
└────────────────────────────────┴────────────────────────┘
```

## 🔧 Backend Services

### SimulatedRepoStore
Simulates a complete Git provider:
- `listRepos()` - List all repositories
- `getRepo(repoId)` - Fetch repository details
- `listBranches(repoId)` - List branches
- `getLatestCommit(repoId, branch)` - Get latest commit
- `createBranch(repoId, baseBranch, newBranchName)` - Create branch
- `createCommit(repoId, branch, filesChanged, message, type)` - Create commit
- `getFileContent(repoId, commitId, path)` - Get file content
- `getDiffBetweenCommits(repoId, commitA, commitB)` - Calculate diff
- `listPullRequests(repoId)` - List PRs
- `getPullRequest(repoId, prId)` - Get PR details

### TestAppSimulator
Manages application versions:
- `injectBug(repoId)` - Create buggy commit
- `getCurrentState(repoId)` - Get app state
- `applyFix(repoId, suggestions)` - Apply fixes

### IncidentService
Incident lifecycle management:
- `createIncident()` - Create new incident
- `getIncident(incidentId)` - Fetch incident
- `updateIncidentWithAnalysis()` - Update with Gemini analysis
- `markFixReady()` - Mark as ready for PR
- `markResolved()` - Mark as resolved
- `listIncidents(repoId)` - List all incidents

### GeminiService
AI-powered code analysis:
- Connects to Gemini API
- Analyzes code diffs and error contexts
- Generates structured recommendations
- Parses and normalizes responses

### PullRequestService
Pull request management:
- `createPullRequest()` - Create PR with fix
- `getPullRequest()` - Fetch PR
- `mergePullRequest()` - Merge PR
- `listPullRequests()` - List all PRs

### AgentStateService
Multi-agent workflow orchestration:
- Manages 5 agents: Monitoring, Analysis, Auto Fixer, Notification, Memory
- Tracks states: IDLE, RUNNING, DONE, ERROR
- Executes workflows with state transitions
- Provides real-time updates to frontend

## 🚀 REST API Endpoints

All endpoints are prefixed with `/api/`:

### Configuration
```
POST /config/connect
Body: { apiKey: string, repoId: string }
Response: { success: true, repo: {...} }
```

### Repository Operations
```
GET /repo/list
Response: { repos: [{repoId, name, owner, ...}] }

POST /repo/inject-bug
Body: { repoId: string }
Response: { success: true, commit: {...} }

POST /repo/scan
Body: { repoId: string }
Response: { success: true, incidents: [...] }

POST /repo/analyse
Body: { incidentId: string }
Response: { success: true, analysis: {...}, incident: {...} }

POST /repo/autofix
Body: { incidentId: string }
Response: { success: true, pullRequest: {...}, incident: {...} }

GET /repo/incidents?repoId=<id>
Response: { incidents: [...] }

GET /repo/pull-requests?repoId=<id>
Response: { pullRequests: [...] }
```

### Agent States
```
GET /agent-state/:incidentId
Response: { incidentId, agents: [...], overallStatus: string }
```

## 📊 Data Models

### Repository
```javascript
{
  repoId: string,
  name: string,
  owner: string,
  defaultBranch: string,
  branches: [{ name, isDefault, commitId }],
  commits: [...],
  files: { [path]: { clean, buggy, fixed } },
  pullRequests: [...],
  incidents: [...]
}
```

### Commit
```javascript
{
  id: string (SHA),
  branch: string,
  message: string,
  timestamp: Date,
  author: string,
  filesChanged: [{path, status, additions, deletions}],
  type: 'clean' | 'buggy' | 'fixed',
  parentCommitId: string
}
```

### Incident
```javascript
{
  incidentId: string,
  repoId: string,
  commitId: string,
  status: 'DETECTED' | 'ANALYSED' | 'FIX_READY' | 'RESOLVED',
  summary: string,
  errorContext: string,
  geminiExplanation: string,
  geminiSuggestions: string[],
  timestamp: Date,
  timeline: [{ timestamp, status, message }]
}
```

### Pull Request
```javascript
{
  prId: string,
  repoId: string,
  sourceBranch: string,
  targetBranch: string,
  title: string,
  description: string,
  filesChanged: [...],
  status: 'open' | 'merged' | 'closed',
  createdAt: Date,
  checks: [{ name, status }]
}
```

## 🔄 Workflow Examples

### Complete Bug Detection & Fix Workflow

1. **Inject Bug** (POST `/repo/inject-bug`)
   - Creates buggy commit on main branch
   - Triggers Memory Agent (RUNNING → DONE)

2. **Scan for Issues** (POST `/repo/scan`)
   - Monitoring Agent (RUNNING → DONE)
   - Detects buggy commit
   - Creates incident with status DETECTED
   - Returns incident details

3. **Analyze with Gemini** (POST `/repo/analyse`)
   - Analysis Agent (RUNNING → DONE)
   - Sends diff + error context to Gemini API
   - Receives explanation + suggestions
   - Updates incident to ANALYSED

4. **Auto Fix & Create PR** (POST `/repo/autofix`)
   - Auto Fixer Agent (RUNNING → DONE)
   - Notification Agent (RUNNING → DONE)
   - Memory Agent (RUNNING → DONE)
   - Applies fixes to src/auth.py
   - Creates fix branch
   - Creates pull request
   - Updates incident to FIX_READY

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Gemini API key (optional - demo mode available)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your Gemini API key (optional)
# GEMINI_API_KEY=your_key_here
# PORT=3001

# Start backend server
npm run dev
# or for production
npm start
```

Backend runs on `http://localhost:3001`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create next.config.js (already included)

# Start development server
npm run dev
# or build for production
npm run build
npm start
```

Frontend runs on `http://localhost:3000`

## 🔑 Configuration

### Gemini API Key Setup

1. Navigate to `http://localhost:3000`
2. You'll be redirected to `/config`
3. Enter your Gemini API key (optional - demo mode available)
4. Select repository: `project-unicorn`
5. Click "Connect & Continue"
6. You'll be redirected to the dashboard

**Demo Mode**: Leave API key empty to use mock Gemini responses with pre-defined analysis.

## 🎯 Using the Platform

### Dashboard Features

1. **Agent Cards**
   - Monitor 5 agents in real-time
   - Watch status transitions (IDLE → RUNNING → DONE)
   - View performance metrics (Memory Agent)

2. **Action Panel** (Right Sidebar)
   - **Inject Bug**: Simulate production incident
   - **Scan for Issues**: Detect buggy commits
   - **Run Analysis**: Analyze with Gemini
   - **Auto Fix & Create PR**: Generate fixes and create PR

3. **System Timeline**
   - Visual representation of system activity
   - Graphs incident detection patterns

4. **Commit Info Panel**
   - Latest commit SHA
   - Commit message
   - File changes (added, modified, deleted)

5. **Error Context**
   - Current system errors or last detected issue
   - Real-time error log display

### Example Workflow

```
1. Click "Inject Bug"
   → Memory Agent activates
   → Buggy commit created

2. Click "Scan for Issues"
   → Monitoring Agent runs
   → Incident detected
   → Incident count increments

3. Click "Run Analysis"
   → Analysis Agent runs
   → Gemini analyzes diff
   → Suggestions displayed

4. Click "Auto Fix & Create PR"
   → Auto Fixer Agent runs
   → Fix branch created
   → PR generated automatically
   → All agents complete
   → Incident marked as FIX_READY
```

## 📝 Incident Details

Click on incident ID in dashboard to view:
- Full incident timeline
- Error context details
- Gemini's AI analysis
- Suggested code fixes
- Security impact assessment

## 🔀 Pull Request Viewer

Click on PR ID to view:
- PR title and description
- Source and target branches
- Files changed with diff stats
- Status checks (Unit Tests, Linting, Security)
- Merge status

## 🧪 Testing

### Test the Complete Workflow

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev

# Terminal 3: (Optional) Monitor API calls
curl http://localhost:3001/health
```

### Example API Calls

```bash
# List repositories
curl http://localhost:3001/api/repo/list

# Inject bug
curl -X POST http://localhost:3001/api/repo/inject-bug \
  -H "Content-Type: application/json" \
  -d '{"repoId":"repo-unicorn"}'

# Scan for issues
curl -X POST http://localhost:3001/api/repo/scan \
  -H "Content-Type: application/json" \
  -d '{"repoId":"repo-unicorn"}'

# Get incidents
curl http://localhost:3001/api/repo/incidents?repoId=repo-unicorn
```

## 🔐 Security Notes

- API keys are stored in `.env` (not in version control)
- Demo mode available without API key
- All routes accept JSON payloads
- CORS enabled for frontend-backend communication
- Production deployment requires proper authentication

## 📦 Dependencies

### Backend
- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment configuration
- **@google/generative-ai** - Gemini API client

### Frontend
- **react** - UI library
- **next** - React framework
- **axios** - HTTP client
- **tailwindcss** - CSS utility framework

## 🚀 Production Deployment

### Backend (Node.js)
```bash
# Set environment variables
export GEMINI_API_KEY=your_production_key
export NODE_ENV=production
export PORT=3001

# Install and start
npm install
npm start
```

### Frontend (Next.js)
```bash
# Build and start
npm install
npm run build
npm start
```

## 📞 Troubleshooting

### "Cannot GET /api/repo/list"
- Ensure backend is running on port 3001
- Check `API_BASE` in `frontend/lib/api.js`

### Gemini API errors
- Verify API key is correct
- Check API key has proper permissions
- Try demo mode (leave key empty)

### CORS errors
- Backend CORS middleware is enabled
- Ensure frontend is running on port 3000

### Agent states not updating
- Check backend logs for errors
- Verify incident was created successfully
- Refresh dashboard

## 📄 License

MIT

## 👥 Support

For issues or questions about the DevOps Copilot platform, review the code comments and API documentation in this README.

---

**DevOps Copilot** - Intelligent incident detection and automated remediation platform powered by AI.
