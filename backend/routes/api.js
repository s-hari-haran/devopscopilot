const express = require('express');
const SimulatedRepoStore = require('../services/SimulatedRepoStore');
const TestAppSimulator = require('../services/TestAppSimulator');
const IncidentService = require('../services/IncidentService');
const GeminiService = require('../services/GeminiService');
const PullRequestService = require('../services/PullRequestService');
const AgentStateService = require('../services/AgentStateService');

const router = express.Router();

// Initialize services
let repoStore;
let testApp;
let incidentService;
let geminiService;
let prService;
let agentStates;

// Middleware to initialize services
router.use((req, res, next) => {
  if (!repoStore) {
    repoStore = new SimulatedRepoStore();
    testApp = new TestAppSimulator(repoStore);
    incidentService = new IncidentService();
    prService = new PullRequestService(repoStore);
    agentStates = new AgentStateService();
    
    // Initialize Gemini with API key from environment
    const apiKey = process.env.GEMINI_API_KEY || 'demo-key';
    try {
      geminiService = new GeminiService(apiKey);
    } catch (error) {
      console.log('Gemini not initialized, will use demo mode');
    }
  }
  next();
});

/**
 * POST /config/connect
 * Connect with Gemini API key
 */
router.post('/config/connect', (req, res) => {
  const { apiKey, repoId } = req.body;

  if (!apiKey || !repoId) {
    return res.status(400).json({ error: 'API key and repoId required' });
  }

  try {
    // Initialize Gemini service with the provided key
    geminiService = new GeminiService(apiKey);
    
    const repo = repoStore.getRepo(repoId);
    if (!repo) {
      return res.status(404).json({ error: 'Repository not found' });
    }

    res.json({
      success: true,
      message: 'Connected successfully',
      repo: {
        repoId: repo.repoId,
        name: repo.name,
        owner: repo.owner,
        defaultBranch: repo.defaultBranch
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /repo/list
 * List all repositories
 */
router.get('/repo/list', (req, res) => {
  try {
    const repos = repoStore.listRepos();
    res.json({ repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /repo/inject-bug
 * Inject a bug into the repository
 */
router.post('/repo/inject-bug', (req, res) => {
  const { repoId } = req.body;

  if (!repoId) {
    return res.status(400).json({ error: 'repoId required' });
  }

  try {
    const buggyCommit = testApp.injectBug(repoId);
    
    if (!buggyCommit) {
      return res.status(404).json({ error: 'Repository not found' });
    }

    // Update memory agent
    agentStates.getAgentStates('');
    agentStates.updateAgentStatus('', 'memory', 'RUNNING');

    res.json({
      success: true,
      commit: buggyCommit,
      message: 'Bug injected successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /repo/scan
 * Scan for buggy commits (triggers monitoring agent)
 */
router.post('/repo/scan', (req, res) => {
  const { repoId } = req.body;

  if (!repoId) {
    return res.status(400).json({ error: 'repoId required' });
  }

  try {
    const repo = repoStore.getRepo(repoId);
    if (!repo) {
      return res.status(404).json({ error: 'Repository not found' });
    }

    // Find buggy commits
    const buggyCommits = repo.commits.filter(c => c.type === 'buggy');

    if (buggyCommits.length === 0) {
      return res.json({
        success: true,
        message: 'No issues found',
        incidents: []
      });
    }

    // Create incidents for buggy commits
    const incidents = buggyCommits.map(commit => {
      const errorContext = `Authentication bypass detected in commit ${commit.id}
      File: src/auth.py
      Issue: Missing password validation
      Severity: CRITICAL`;

      const incident = incidentService.createIncident(
        repoId,
        commit.id,
        'Authentication bypass vulnerability detected',
        errorContext
      );

      agentStates.initializeAgents(incident.incidentId);
      agentStates.updateAgentStatus(incident.incidentId, 'monitoring', 'DONE');

      return incident;
    });

    res.json({
      success: true,
      message: `Found ${incidents.length} incident(s)`,
      incidents
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /repo/analyse
 * Analyze buggy code with Gemini
 */
router.post('/repo/analyse', async (req, res) => {
  const { incidentId } = req.body;

  if (!incidentId) {
    return res.status(400).json({ error: 'incidentId required' });
  }

  try {
    if (!geminiService) {
      return res.status(400).json({ error: 'Gemini API not configured. Please configure API key first.' });
    }

    const incident = incidentService.getIncident(incidentId);
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    const repo = repoStore.getRepo(incident.repoId);
    const commit = repo.commits.find(c => c.id === incident.commitId);

    // Get diff and code snippet
    const codeSnippet = repoStore.getFileContent(incident.repoId, commit.id, 'src/auth.py');
    const diff = {
      files: [{
        path: 'src/auth.py',
        status: 'modified',
        additions: 25,
        deletions: 18
      }]
    };

    // Update analysis agent
    agentStates.updateAgentStatus(incidentId, 'analysis', 'RUNNING');

    // Analyze with Gemini
    const analysis = await geminiService.analyzeCode(diff, incident.errorContext, codeSnippet);

    // Update incident
    incidentService.updateIncidentWithAnalysis(
      incidentId,
      analysis.explanation,
      analysis.suggestions
    );

    agentStates.updateAgentStatus(incidentId, 'analysis', 'DONE');

    res.json({
      success: true,
      analysis,
      incident: incidentService.getIncident(incidentId)
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /repo/autofix
 * Generate fix and create pull request
 */
router.post('/repo/autofix', (req, res) => {
  const { incidentId } = req.body;

  if (!incidentId) {
    return res.status(400).json({ error: 'incidentId required' });
  }

  try {
    const incident = incidentService.getIncident(incidentId);
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    if (!incident.geminiSuggestions || incident.geminiSuggestions.length === 0) {
      return res.status(400).json({ error: 'Must analyze incident first' });
    }

    const repo = repoStore.getRepo(incident.repoId);

    // Create fix branch
    const fixBranchName = `fix/auth-bypass-${incident.incidentId.substring(0, 8)}`;
    repoStore.createBranch(incident.repoId, 'main', fixBranchName);

    // Update auto fixer agent
    agentStates.updateAgentStatus(incidentId, 'autoFixer', 'RUNNING');

    // Apply fix
    const fixedCommit = testApp.applyFix(incident.repoId, incident.geminiSuggestions);

    // Update fixed commit to be on the fix branch
    fixedCommit.branch = fixBranchName;

    // Create pull request
    const pr = prService.createPullRequest(
      incident.repoId,
      fixBranchName,
      'main',
      `Security Fix: Resolve authentication bypass in ${fixBranchName}`,
      `## Summary
This PR resolves the authentication bypass vulnerability.

## Changes
- ${incident.geminiSuggestions[0]}
- Added input validation
- Implemented proper password verification

## Security Impact
Closes security vulnerability detected in src/auth.py`,
      [
        {
          path: 'src/auth.py',
          status: 'modified',
          additions: 32,
          deletions: 25
        }
      ]
    );

    // Update incident
    incidentService.markFixReady(incidentId, pr.prId);

    // Update agents
    agentStates.updateAgentStatus(incidentId, 'autoFixer', 'DONE');
    agentStates.updateAgentStatus(incidentId, 'notification', 'DONE');
    agentStates.updateAgentStatus(incidentId, 'memory', 'DONE');

    res.json({
      success: true,
      pullRequest: pr,
      incident: incidentService.getIncident(incidentId)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /repo/incidents
 * Get all incidents for a repository
 */
router.get('/repo/incidents', (req, res) => {
  const { repoId } = req.query;

  if (!repoId) {
    return res.status(400).json({ error: 'repoId required' });
  }

  try {
    const incidents = incidentService.listIncidents(repoId);
    res.json({ incidents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /repo/pull-requests
 * Get all pull requests for a repository
 */
router.get('/repo/pull-requests', (req, res) => {
  const { repoId } = req.query;

  if (!repoId) {
    return res.status(400).json({ error: 'repoId required' });
  }

  try {
    const prs = prService.listPullRequests(repoId);
    res.json({ pullRequests: prs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /agent-state/:incidentId
 * Get agent states for an incident
 */
router.get('/agent-state/:incidentId', (req, res) => {
  const { incidentId } = req.params;

  try {
    const states = agentStates.getAgentsSummary(incidentId);
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
