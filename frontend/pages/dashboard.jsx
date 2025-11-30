import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import InfoStrip from '@/components/InfoStrip';
import AgentCard from '@/components/AgentCard';
import SystemTimeline from '@/components/SystemTimeline';
import ActionPanel from '@/components/ActionPanel';
import CommitPanel from '@/components/CommitPanel';
import ErrorContext from '@/components/ErrorContext';
import { api } from '@/lib/api';

export default function Dashboard() {
  const [repo, setRepo] = useState(null);
  const [repoId, setRepoId] = useState('repo-unicorn');
  const [incidents, setIncidents] = useState([]);
  const [agentStates, setAgentStates] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastCommit, setLastCommit] = useState(null);
  const [diff, setDiff] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const repos = await api.get('/repo/list');
      const repo = repos.repos.find(r => r.repoId === repoId) || repos.repos[0];
      setRepo(repo);

      const incidents = await api.get(`/repo/incidents?repoId=${repo.repoId}`);
      setIncidents(incidents.incidents || []);

      if (incidents.incidents && incidents.incidents.length > 0) {
        const firstIncident = incidents.incidents[0];
        const states = await api.get(`/agent-state/${firstIncident.incidentId}`);
        setAgentStates(states);
      }

      // Load latest commit
      const repoData = repos.repos.find(r => r.repoId === repoId);
      if (repoData) {
        setLastCommit({
          id: 'fc94782a',
          message: 'Implemented user authentication'
        });
        setDiff({
          files: [
            { path: 'src/auth.py', status: 'modified' },
            { path: 'src/old_login.py', status: 'deleted' }
          ]
        });
      }
    } catch (error) {
      console.error('Load error:', error);
      setErrorMessage(error.message);
    }
  };

  const handleInjectBug = async () => {
    setLoading(true);
    try {
      await api.post('/repo/inject-bug', { repoId });
      await loadDashboard();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async () => {
    setLoading(true);
    try {
      const result = await api.post('/repo/scan', { repoId });
      if (result.incidents.length > 0) {
        const firstIncident = result.incidents[0];
        const states = await api.get(`/agent-state/${firstIncident.incidentId}`);
        setAgentStates(states);
      }
      await loadDashboard();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!incidents.length) return;
    setLoading(true);
    try {
      const incident = incidents[0];
      await api.post('/repo/analyse', { incidentId: incident.incidentId });
      const states = await api.get(`/agent-state/${incident.incidentId}`);
      setAgentStates(states);
      await loadDashboard();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoFix = async () => {
    if (!incidents.length) return;
    setLoading(true);
    try {
      const incident = incidents[0];
      await api.post('/repo/autofix', { incidentId: incident.incidentId });
      const states = await api.get(`/agent-state/${incident.incidentId}`);
      setAgentStates(states);
      await loadDashboard();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAgentState = (agentKey) => {
    if (agentStates.agents) {
      return agentStates.agents.find(a => a.key === agentKey) || { status: 'IDLE', icon: '' };
    }
    return { status: 'IDLE', icon: '' };
  };

  const getStatusIndicator = (status) => {
    if (status === 'RUNNING') return 'running';
    if (status === 'DONE') return 'done';
    return 'idle';
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <InfoStrip
        repoName={repo?.name || 'project-unicorn'}
        branch={repo?.defaultBranch || 'main'}
        incidentCount={incidents.length}
        systemOK={!errorMessage}
      />

      <div className="flex gap-0">
        {/* Main content area */}
        <div className="flex-1">
          {/* Agent cards grid - 3x2 layout */}
          <div className="p-6 grid grid-cols-3 gap-4 bg-black">
            {/* Top row */}
            <AgentCard
              title="Monitoring Agent"
              status={getAgentState('monitoring').status}
              statusIndicator={getStatusIndicator(getAgentState('monitoring').status)}
              backgroundColor="yellow"
              icon="🛡️"
            />
            <AgentCard
              title="Analysis Agent"
              status={getAgentState('analysis').status}
              statusIndicator={getStatusIndicator(getAgentState('analysis').status)}
              backgroundColor="yellow"
              icon="🔍"
            />
            <div className="bg-black border-4 border-white h-40 flex items-center justify-center">
              <SystemTimeline />
            </div>

            {/* Bottom row */}
            <AgentCard
              title="Auto Fixer Agent"
              status={getAgentState('autoFixer').status}
              statusIndicator={getStatusIndicator(getAgentState('autoFixer').status)}
              backgroundColor="pink"
              icon="🔧"
            />
            <AgentCard
              title="Notification Agent"
              status={getAgentState('notification').status}
              statusIndicator={getStatusIndicator(getAgentState('notification').status)}
              backgroundColor="pink"
              icon="🔔"
            />
            <AgentCard
              title="Memory Agent"
              status={getAgentState('memory').status}
              statusIndicator={getStatusIndicator(getAgentState('memory').status)}
              backgroundColor="cyan"
              icon="🧠"
              metrics="128MB / 512MB"
            />
          </div>
        </div>

        {/* Right sidebar with action buttons */}
        <div className="w-72 bg-black border-l-4 border-black p-6 flex flex-col items-center">
          <ActionPanel
            onInjectBug={handleInjectBug}
            onScan={handleScan}
            onAnalyze={handleAnalyze}
            onAutoFix={handleAutoFix}
            loading={loading}
          />
        </div>
      </div>

      {/* Bottom panels */}
      <div className="flex gap-0">
        {/* Commit panel on left */}
        <div className="flex-1 bg-black border-t-4 border-black">
          <CommitPanel
            commitId={lastCommit?.id || 'fc94782a'}
            commitMessage={lastCommit?.message || 'Implemented user authentication'}
            diff={diff}
          />
        </div>

        {/* Error context on right */}
        <div className="w-72 bg-black border-t-4 border-black border-l-4 border-black p-6">
          <ErrorContext
            errorText={errorMessage || 'DB connection failed'}
          />
        </div>
      </div>
    </div>
  );
}
