// Manages test application versions and bug injection
class TestAppSimulator {
  constructor(repoStore) {
    this.repoStore = repoStore;
    this.buggyVersions = {};
  }

  /**
   * Inject a bug into the repository
   */
  injectBug(repoId) {
    const repo = this.repoStore.getRepo(repoId);
    if (!repo) return null;

    // Create a buggy commit on the main branch
    const latestClean = this.repoStore.getLatestCommit(repoId, 'main');
    if (!latestClean) return null;

    const buggyCommit = this.repoStore.createCommit(
      repoId,
      'main',
      [
        {
          path: 'src/auth.py',
          status: 'modified',
          additions: 25,
          deletions: 18
        }
      ],
      'Hotfix: Add auth improvements (contains bug)',
      'buggy'
    );

    this.buggyVersions[repoId] = {
      commitId: buggyCommit.id,
      bugType: 'authentication_bypass',
      severity: 'critical',
      detectedAt: new Date()
    };

    return buggyCommit;
  }

  /**
   * Get current state of the application
   */
  getCurrentState(repoId) {
    const repo = this.repoStore.getRepo(repoId);
    if (!repo) return null;

    const latestCommit = repo.commits[repo.commits.length - 1];

    return {
      repoId,
      currentCommitId: latestCommit.id,
      currentBranch: latestCommit.branch,
      currentType: latestCommit.type,
      hasBug: this.buggyVersions[repoId] ? true : false,
      bugInfo: this.buggyVersions[repoId] || null
    };
  }

  /**
   * Apply fix based on suggestions
   */
  applyFix(repoId, suggestions) {
    const repo = this.repoStore.getRepo(repoId);
    if (!repo) return null;

    // Create fixed commit
    const fixedCommit = this.repoStore.createCommit(
      repoId,
      'main',
      [
        {
          path: 'src/auth.py',
          status: 'modified',
          additions: 32,
          deletions: 25
        }
      ],
      `Fix: Applied security patch - ${suggestions[0]?.substring(0, 50)}...`,
      'fixed'
    );

    // Clear bug record
    delete this.buggyVersions[repoId];

    return fixedCommit;
  }
}

module.exports = TestAppSimulator;
