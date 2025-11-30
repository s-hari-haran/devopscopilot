const crypto = require('crypto');

// Manages incidents detected and fixed by the platform
class IncidentService {
  constructor() {
    this.incidents = {};
  }

  /**
   * Create a new incident
   */
  createIncident(repoId, commitId, summary, errorContext) {
    const incidentId = this.generateIncidentId();
    
    const incident = {
      incidentId,
      repoId,
      commitId,
      status: 'DETECTED',
      summary,
      errorContext,
      geminiExplanation: null,
      geminiSuggestions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      timeline: [
        { timestamp: new Date(), status: 'DETECTED', message: 'Incident detected' }
      ]
    };

    this.incidents[incidentId] = incident;
    return incident;
  }

  /**
   * Get incident by ID
   */
  getIncident(incidentId) {
    return this.incidents[incidentId] || null;
  }

  /**
   * Update incident with analysis
   */
  updateIncidentWithAnalysis(incidentId, explanation, suggestions) {
    const incident = this.getIncident(incidentId);
    if (!incident) return null;

    incident.status = 'ANALYSED';
    incident.geminiExplanation = explanation;
    incident.geminiSuggestions = suggestions;
    incident.updatedAt = new Date();
    incident.timeline.push({
      timestamp: new Date(),
      status: 'ANALYSED',
      message: 'Analysis complete'
    });

    return incident;
  }

  /**
   * Mark incident as fix ready
   */
  markFixReady(incidentId, prId) {
    const incident = this.getIncident(incidentId);
    if (!incident) return null;

    incident.status = 'FIX_READY';
    incident.prId = prId;
    incident.updatedAt = new Date();
    incident.timeline.push({
      timestamp: new Date(),
      status: 'FIX_READY',
      message: `PR created: ${prId}`
    });

    return incident;
  }

  /**
   * Mark incident as resolved
   */
  markResolved(incidentId) {
    const incident = this.getIncident(incidentId);
    if (!incident) return null;

    incident.status = 'RESOLVED';
    incident.updatedAt = new Date();
    incident.timeline.push({
      timestamp: new Date(),
      status: 'RESOLVED',
      message: 'Incident resolved'
    });

    return incident;
  }

  /**
   * List all incidents for a repo
   */
  listIncidents(repoId) {
    return Object.values(this.incidents).filter(i => i.repoId === repoId);
  }

  generateIncidentId() {
    return `INC-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  }
}

module.exports = IncidentService;
