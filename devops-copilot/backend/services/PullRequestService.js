const crypto = require('crypto');

// Service to create and manage pull requests
class PullRequestService {
  constructor(repoStore) {
    this.repoStore = repoStore;
  }

  /**
   * Create a pull request from fix branch to main
   */
  createPullRequest(repoId, sourceBranch, targetBranch, title, description, filesChanged) {
    const repo = this.repoStore.getRepo(repoId);
    if (!repo) return null;

    const prId = this.generatePRId();

    const pr = {
      prId,
      repoId,
      sourceBranch,
      targetBranch,
      title,
      description,
      filesChanged,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      commits: [],
      reviews: [],
      checks: [
        { name: 'Unit Tests', status: 'passed' },
        { name: 'Linting', status: 'passed' },
        { name: 'Security Scan', status: 'passed' }
      ]
    };

    this.repoStore.addPullRequest(repoId, pr);
    return pr;
  }

  /**
   * Get pull request by ID
   */
  getPullRequest(repoId, prId) {
    return this.repoStore.getPullRequest(repoId, prId);
  }

  /**
   * Merge a pull request
   */
  mergePullRequest(repoId, prId) {
    const pr = this.getPullRequest(repoId, prId);
    if (!pr) return null;

    pr.status = 'merged';
    pr.mergedAt = new Date();

    return pr;
  }

  /**
   * List pull requests for a repository
   */
  listPullRequests(repoId) {
    return this.repoStore.listPullRequests(repoId);
  }

  generatePRId() {
    return `PR-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
  }
}

module.exports = PullRequestService;
