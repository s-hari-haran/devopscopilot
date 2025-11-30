# System Architecture Diagram

## Complete DevOps Copilot Platform Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEVOPS COPILOT PLATFORM                             │
│                         Production-Grade Full Stack                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────┬──────────────────────────────────────┐
│          FRONTEND (Next.js)           │       BACKEND (Node.js/Express)      │
├──────────────────────────────────────┼──────────────────────────────────────┤
│                                      │                                       │
│  Browser (http://localhost:3000)     │  Server (http://localhost:3001)      │
│           ▼                          │           ▼                          │
│  ┌─────────────────────────────────┐ │  ┌─────────────────────────────────┐ │
│  │      Pages (React/Next.js)      │ │  │    API Routes (Express.js)      │ │
│  │                                 │ │  │                                 │ │
│  │  • /config                      │ │  │  POST /config/connect           │ │
│  │  • /dashboard                   │ │  │  GET  /repo/list                │ │
│  │  • /incident/[id]               │ │  │  POST /repo/inject-bug          │ │
│  │  • /pull-request/[id]           │ │  │  POST /repo/scan                │ │
│  │  • / (redirects to /config)     │ │  │  POST /repo/analyse             │ │
│  └──────────┬──────────────────────┘ │  │  POST /repo/autofix             │ │
│             │                        │  │  GET  /repo/incidents           │ │
│             │                        │  │  GET  /repo/pull-requests       │ │
│  ┌──────────▼──────────────────────┐ │  │  GET  /agent-state/:incidentId  │ │
│  │     Components (React)           │ │  └──────────┬──────────────────────┘ │
│  │                                 │ │             │                       │
│  │  • Header                       │ │  ┌──────────▼──────────────────────┐ │
│  │  • InfoStrip                    │ │  │    Service Layer                │ │
│  │  • AgentCard                    │ │  │                                 │ │
│  │  • SystemTimeline               │ │  │  • SimulatedRepoStore               │ │
│  │  • ActionPanel                  │ │  │    ├─ Repos                    │ │
│  │  • CommitPanel                  │ │  │    ├─ Branches                 │ │
│  │  • ErrorContext                 │ │  │    ├─ Commits                  │ │
│  │                                 │ │  │    ├─ Files (clean/buggy/fixed)│ │
│  │                                 │ │  │    ├─ Diffs                    │ │
│  │                                 │ │  │    └─ PRs                      │ │
│  └──────────┬──────────────────────┘ │  │                                 │ │
│             │                        │  │  • TestAppSimulator             │ │
│  ┌──────────▼──────────────────────┐ │  │    ├─ Inject bug               │ │
│  │     Utilities                    │ │  │    ├─ Get state                │ │
│  │                                 │ │  │    └─ Apply fix                │ │
│  │  • api.js (GET/POST helpers)    │ │  │                                 │ │
│  │                                 │ │  │  • IncidentService             │ │
│  └──────────┬──────────────────────┘ │  │    ├─ Create incident          │ │
│             │                        │  │    ├─ Update with analysis      │ │
│  ┌──────────▼──────────────────────┐ │  │    ├─ Mark fix ready           │ │
│  │     Styling                      │ │  │    └─ Mark resolved            │ │
│  │                                 │ │  │                                 │ │
│  │  • globals.css                  │ │  │  • GeminiService               │ │
│  │    ├─ Neo-brutalism utilities   │ │  │    ├─ Build prompt             │ │
│  │    ├─ Animations (pulse, bars)  │ │  │    └─ Call Gemini API          │ │
│  │    └─ Colors (yellow/cyan/pink) │ │  │                                 │ │
│  │                                 │ │  │  • PullRequestService          │ │
│  │  • tailwind.config.js           │ │  │    ├─ Create PR                │ │
│  │  • postcss.config.js            │ │  │    ├─ Get PR details           │ │
│  │                                 │ │  │    └─ Merge PR                 │ │
│  └─────────────────────────────────┘ │  │                                 │ │
│                                      │  │  • AgentStateService            │ │
│                                      │  │    ├─ Initialize agents        │ │
│                                      │  │    ├─ Update agent status      │ │
│                                      │  │    ├─ Execute workflows        │ │
│                                      │  │    └─ 5-Agent system           │ │
│                                      │  │       ├─ Monitoring            │ │
│                                      │  │       ├─ Analysis              │ │
│                                      │  │       ├─ Auto Fixer            │ │
│                                      │  │       ├─ Notification          │ │
│                                      │  │       └─ Memory                │ │
│                                      │  └─────────────────────────────────┘ │
│                                      │                                       │
└──────────────────────────────────────┴──────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                        DATA LAYER & EXTERNAL APIs                             │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  In-Memory Store               Gemini API              GitHub/Git (Simulated)│
│  ┌──────────────────┐          ┌──────────────────┐    ┌──────────────────┐ │
│  │  SimulatedRepoStore   │          │  Gemini API      │    │  Repository      │ │
│  │                  │          │  (Optional key)  │    │  Data Model      │ │
│  │  • Repos         │          │                  │    │                  │ │
│  │  • Branches      │◄────────►│ Code Analysis    │    │ • Repos          │ │
│  │  • Commits       │          │ + Suggestions    │    │ • Branches       │ │
│  │  • Files         │          │                  │    │ • Commits        │ │
│  │  • PRs           │          └──────────────────┘    │ • Files          │ │
│  │  • Incidents     │                                  │ • Pull Requests  │ │
│  │                  │                                  │ • Incidents      │ │
│  └──────────────────┘                                  │                  │ │
│                                                        └──────────────────┘ │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                          WORKFLOW STATE MACHINE                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  User Action          Backend Processing            Agent States             │
│  ────────────────────────────────────────────────────────────────────────   │
│                                                                               │
│  1. Inject Bug                                                               │
│     └─► POST /repo/inject-bug                                               │
│         ├─ Create buggy commit                      Memory: IDLE → DONE      │
│         └─ Record in TestAppSimulator                                        │
│                                                                               │
│  2. Scan Issues                                                              │
│     └─► POST /repo/scan                                                     │
│         ├─ Detect buggy commits               Monitoring: IDLE → RUNNING    │
│         ├─ Create Incident (DETECTED)         Monitoring: RUNNING → DONE    │
│         └─ Initialize agent states                                          │
│                                                                               │
│  3. Run Analysis                                                             │
│     └─► POST /repo/analyse                                                  │
│         ├─ Get diff + error context                Analysis: IDLE → RUNNING │
│         ├─ Call Gemini API                                                  │
│         ├─ Update Incident (ANALYSED)         Analysis: RUNNING → DONE      │
│         └─ Store suggestions                                                │
│                                                                               │
│  4. Auto Fix & Create PR                                                    │
│     └─► POST /repo/autofix                                                  │
│         ├─ Create fix branch                   AutoFixer: IDLE → RUNNING    │
│         ├─ Apply fixes                         Notif: IDLE → RUNNING        │
│         ├─ Create PR                           Memory: IDLE → RUNNING       │
│         ├─ Update Incident (FIX_READY)        All: RUNNING → DONE          │
│         └─ Return PR details                                                │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                       INCIDENT LIFECYCLE STATE MACHINE                       │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  DETECTED ─────► ANALYSED ─────► FIX_READY ─────► RESOLVED                  │
│       │              │                │               │                      │
│       │              │                │               │                      │
│    Timeline:      Gemini:          PR Create:        Completion:            │
│    - Bug found    - Analysis        - Branch made     - Merged/Closed        │
│    - Incident     - Suggestions     - PR opened       - Issue resolved       │
│      created      - Severity        - Checks pass     - Status updated       │
│    - Agents init  - Impact          - Linked to PR    - Archived             │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                      COMMUNICATION FLOW SEQUENCE                             │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Frontend (React)              Backend (Express)         External API        │
│      │                              │                         │              │
│      │ 1. User clicks button        │                         │              │
│      ├─────────────────────────────►│                         │              │
│      │    HTTP POST /api/route      │                         │              │
│      │    { params }                │                         │              │
│      │                              │ 2. Process request      │              │
│      │                              ├─ Call services          │              │
│      │                              │ ├─ Update state         │              │
│      │                              │                         │              │
│      │                              │ 3. Call Gemini (opt)    │              │
│      │                              ├────────────────────────►│              │
│      │                              │    Code Analysis        │              │
│      │                              │◄────────────────────────┤              │
│      │                              │    { suggestions }       │              │
│      │                              │                         │              │
│      │ 4. Response with data        │                         │              │
│      │◄─────────────────────────────┤                         │              │
│      │    HTTP 200 OK               │                         │              │
│      │    { success, data }         │                         │              │
│      │                              │                         │              │
│      │ 5. Update UI components      │                         │              │
│      ├─ Agent states               │                         │              │
│      ├─ Incident info              │                         │              │
│      ├─ PR details                 │                         │              │
│      └─ Error messages             │                         │              │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                         DEPLOYMENT ARCHITECTURE                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Development                    Production                                   │
│  ─────────────                  ──────────                                   │
│                                                                               │
│  localhost:3000                 your-domain.com                              │
│      │                                │                                      │
│      ├─ Frontend (Next.js)            ├─ Frontend (Next.js)                  │
│      │  ├─ Port 3000                  │  ├─ Port 3000 (or 80/443)            │
│      │  └─ Hot reload                 │  └─ Optimized build                  │
│      │                                │                                      │
│      ├─ Backend (Express)             ├─ Backend (Express)                   │
│      │  ├─ Port 3001                  │  ├─ Port 3001 (or 5000)              │
│      │  └─ Debug logging              │  ├─ Environment variables            │
│      │                                │  └─ PM2/systemd management           │
│      │                                │                                      │
│      └─ Gemini API                    └─ Gemini API (same)                   │
│         └─ Optional key                  └─ Production key                   │
│                                                                               │
│  Stack:                         Stack:                                       │
│  • Node.js 18+                  • Node.js 18+ (LTS)                          │
│  • npm packages                 • npm production deps only                    │
│  • In-memory storage            • In-memory storage or DB                    │
│                                 • Reverse proxy (nginx/Apache)               │
│                                 • SSL/TLS certificates                       │
│                                 • Monitoring/logging                         │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Request Flow Example: Complete Workflow

```
Timeline of Full "Inject Bug → Scan → Analyze → Fix" Workflow:

T=0ms:  User clicks "Inject Bug"
        └─ Frontend: POST /api/repo/inject-bug
           
T=50ms: Backend: TestAppSimulator.injectBug()
        └─ Creates buggy commit on main
        └─ Updates Memory Agent: IDLE → RUNNING
        
T=100ms: Response returns to frontend
         └─ Incident count: 0 → 1
         └─ Memory Agent: RUNNING → DONE
         
T=2000ms: User clicks "Scan for Issues"
          └─ Frontend: POST /api/repo/scan
          
T=2050ms: Backend: Detects buggy commits
          └─ Creates incident with status DETECTED
          └─ Updates Monitoring Agent: IDLE → RUNNING
          
T=2500ms: Response with incidents
          └─ Monitoring Agent: RUNNING → DONE
          └─ Frontend displays incident
          
T=4000ms: User clicks "Run Analysis"
          └─ Frontend: POST /api/repo/analyse
          
T=4050ms: Backend: Prepares code diff
          └─ Analysis Agent: IDLE → RUNNING
          └─ Calls Gemini API with diff + error context
          
T=6000ms: Gemini responds with analysis
          └─ Backend updates incident with analysis
          └─ Incident status: DETECTED → ANALYSED
          
T=6050ms: Response with analysis
          └─ Analysis Agent: RUNNING → DONE
          └─ Frontend displays Gemini suggestions
          
T=8000ms: User clicks "Auto Fix & Create PR"
          └─ Frontend: POST /api/repo/autofix
          
T=8050ms: Backend: Creates fix branch
          └─ Auto Fixer Agent: IDLE → RUNNING
          └─ Notification Agent: IDLE → RUNNING
          └─ Memory Agent: IDLE → RUNNING
          
T=8500ms: Applies fixes to code
          └─ Creates PR with automated changes
          └─ Updates incident: ANALYSED → FIX_READY
          
T=9050ms: Response with PR details
          └─ All agents: RUNNING → DONE
          └─ Frontend displays PR
          └─ Dashboard shows complete workflow
```

## Data Flow: Service Dependencies

```
Request Input
    │
    ▼
┌─────────────────────┐
│  Express Router     │  Parse request
│  (/api/route)       │  Validate input
└──────┬──────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Route Handler                      │  Orchestrate services
│  (api.js endpoint)                  │  Compose response
└──────┬──────────────────────────────┘
       │
       ├──────────────────────┬──────────────────────┬──────────────┐
       │                      │                      │              │
       ▼                      ▼                      ▼              ▼
┌───────────────┐  ┌──────────────────┐  ┌─────────────────┐  ┌──────────┐
│ SimulatedRepoStore │  │ IncidentService  │  │ GeminiService   │  │ Agent    │
│               │  │                  │  │                 │  │ States   │
│ • Get repo    │  │ • Create         │  │ • Build prompt  │  │          │
│ • Get commit  │  │ • Update status  │  │ • Call API      │  │ • Init   │
│ • Create PR   │  │ • Get timeline   │  │ • Parse result  │  │ • Update │
│ • Get diff    │  │                  │  │                 │  │ • Query  │
└──────┬────────┘  └────────┬─────────┘  └────────┬────────┘  └────┬─────┘
       │                    │                     │               │
       ├────────────────────┼─────────────────────┼───────────────┤
       │                    │                     │               │
       │         (All services update in-memory data store)        │
       │                                                           │
       ▼                                                           ▼
  Response Object ◄─────── JSON Serialization ◄──── Compose Output
       │
       │
       ▼
  HTTP Response to Frontend
```

This complete architecture enables:
- **Real-time updates** across all components
- **Multi-agent orchestration** with state tracking
- **AI-powered analysis** via Gemini API
- **Production-grade reliability** with error handling
- **Scalable design** for future enhancements
