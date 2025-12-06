// Service to manage agent states and transitions
class AgentStateService {
  constructor() {
    this.agentStates = {};
  }

  /**
   * Initialize agent states for an incident
   */
  initializeAgents(incidentId) {
    this.agentStates[incidentId] = {
      incidentId,
      monitoring: {
        name: 'Monitoring Agent',
        status: 'IDLE',
        lastActivity: new Date(),
        icon: 'shield'
      },
      analysis: {
        name: 'Analysis Agent',
        status: 'IDLE',
        lastActivity: new Date(),
        icon: 'search'
      },
      autoFixer: {
        name: 'Auto Fixer Agent',
        status: 'IDLE',
        lastActivity: new Date(),
        icon: 'wrench'
      },
      notification: {
        name: 'Notification Agent',
        status: 'IDLE',
        lastActivity: new Date(),
        icon: 'bell'
      },
      memory: {
        name: 'Memory Agent',
        status: 'IDLE',
        lastActivity: new Date(),
        icon: 'brain',
        metrics: { usage: 0, peak: 0 }
      }
    };

    return this.agentStates[incidentId];
  }

  /**
   * Update agent status
   */
  updateAgentStatus(incidentId, agentName, status) {
    if (!this.agentStates[incidentId]) {
      this.initializeAgents(incidentId);
    }

    const agent = this.agentStates[incidentId][agentName];
    if (agent) {
      agent.status = status;
      agent.lastActivity = new Date();
    }

    return this.agentStates[incidentId];
  }

  /**
   * Get agent states for an incident
   */
  getAgentStates(incidentId) {
    return this.agentStates[incidentId] || this.initializeAgents(incidentId);
  }

  /**
   * Get all agents status summary
   */
  getAgentsSummary(incidentId) {
    const agents = this.getAgentStates(incidentId);
    
    return {
      incidentId,
      agents: Object.entries(agents).reduce((acc, [key, agent]) => {
        if (key !== 'incidentId') {
          acc.push({
            name: agent.name,
            key,
            status: agent.status,
            icon: agent.icon,
            lastActivity: agent.lastActivity
          });
        }
        return acc;
      }, []),
      overallStatus: this.calculateOverallStatus(agents)
    };
  }

  /**
   * Calculate overall system status
   */
  calculateOverallStatus(agents) {
    const statuses = Object.values(agents)
      .filter(a => a.status !== undefined)
      .map(a => a.status);

    if (statuses.includes('ERROR')) return 'ERROR';
    if (statuses.includes('RUNNING')) return 'RUNNING';
    if (statuses.every(s => s === 'DONE')) return 'DONE';
    return 'IDLE';
  }

  /**
   * Execute a workflow sequence
   */
  async executeWorkflow(incidentId, workflow) {
    const steps = this.getWorkflowSteps(workflow);

    for (const step of steps) {
      this.updateAgentStatus(incidentId, step.agent, 'RUNNING');
      await this.sleep(step.duration || 1000);
      this.updateAgentStatus(incidentId, step.agent, 'DONE');
    }

    return this.getAgentStates(incidentId);
  }

  /**
   * Get workflow steps based on workflow type
   */
  getWorkflowSteps(workflowType) {
    const workflows = {
      scan: [
        { agent: 'monitoring', duration: 1500 }
      ],
      analyse: [
        { agent: 'analysis', duration: 2000 }
      ],
      autofix: [
        { agent: 'autoFixer', duration: 2500 },
        { agent: 'notification', duration: 1000 },
        { agent: 'memory', duration: 500 }
      ]
    };

    return workflows[workflowType] || [];
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = AgentStateService;
