const crypto = require('crypto');

// Simulate a Git repository with branches, commits, and files
class SimulatedRepoStore {
  constructor() {
    this.repos = this.initializeRepos();
  }

  initializeRepos() {
    return [
      {
        repoId: 'repo-unicorn',
        name: 'project-unicorn',
        owner: 'devops-team',
        defaultBranch: 'main',
        description: 'Core microservices platform',
        createdAt: new Date('2024-01-15'),
        branches: [
          { name: 'main', isDefault: true, commitId: 'fc94782a' },
          { name: 'develop', isDefault: false, commitId: 'a7b2c1f9' }
        ],
        commits: [
          {
            id: 'fc94782a',
            branch: 'main',
            message: 'Implemented user authentication',
            timestamp: new Date('2024-11-28T14:30:00Z'),
            author: 'Alice Johnson',
            filesChanged: [
              { path: 'src/auth.py', status: 'modified', additions: 45, deletions: 12 },
              { path: 'src/old_login.py', status: 'deleted', additions: 0, deletions: 28 }
            ],
            type: 'clean',
            parentCommitId: '2c8d5e3b'
          },
          {
            id: '2c8d5e3b',
            branch: 'main',
            message: 'Initial commit with core setup',
            timestamp: new Date('2024-11-20T09:00:00Z'),
            author: 'Bob Smith',
            filesChanged: [
              { path: 'src/main.py', status: 'added', additions: 156, deletions: 0 },
              { path: 'src/config.py', status: 'added', additions: 78, deletions: 0 }
            ],
            type: 'clean',
            parentCommitId: null
          },
          {
            id: 'a7b2c1f9',
            branch: 'develop',
            message: 'WIP: new feature development',
            timestamp: new Date('2024-11-27T16:45:00Z'),
            author: 'Charlie Dev',
            filesChanged: [
              { path: 'src/feature.py', status: 'added', additions: 200, deletions: 0 }
            ],
            type: 'clean',
            parentCommitId: 'fc94782a'
          }
        ],
        files: {
          'src/auth.py': {
            clean: `def authenticate_user(username, password):
    """Authenticate user credentials"""
    if not username or not password:
        raise ValueError("Missing credentials")
    
    user = find_user(username)
    if not user:
        raise AuthError("User not found")
    
    if not verify_password(password, user.password_hash):
        raise AuthError("Invalid password")
    
    return create_session(user)

def verify_password(password, hash):
    import bcrypt
    return bcrypt.checkpw(password.encode(), hash)

def create_session(user):
    import jwt
    token = jwt.encode({'user_id': user.id}, 'secret')
    return {'token': token, 'user': user.to_dict()}`,
            buggy: `def authenticate_user(username, password):
    """Authenticate user credentials"""
    # BUG: Missing validation
    user = find_user(username)
    if not user:
        raise AuthError("User not found")
    # BUG: Always returns true without checking password
    return create_session(user)

def verify_password(password, hash):
    import bcrypt
    # BUG: Missing bcrypt check
    return True

def create_session(user):
    import jwt
    # BUG: Hardcoded secret
    token = jwt.encode({'user_id': user.id}, 'hardcoded_secret_key')
    return {'token': token, 'user': user.to_dict()}`,
            fixed: `def authenticate_user(username, password):
    """Authenticate user credentials with proper validation"""
    if not username or not password:
        raise ValueError("Credentials required")
    
    user = find_user(username)
    if not user:
        raise AuthError("Invalid credentials")
    
    if not verify_password(password, user.password_hash):
        raise AuthError("Invalid credentials")
    
    return create_session(user)

def verify_password(password, hash):
    import bcrypt
    return bcrypt.checkpw(password.encode(), hash.encode())

def create_session(user):
    import jwt
    import os
    secret = os.environ.get('JWT_SECRET', '')
    if not secret:
        raise ValueError("JWT_SECRET not configured")
    token = jwt.encode({'user_id': user.id, 'exp': time.time() + 3600}, secret)
    return {'token': token, 'user': user.to_dict()}`
          },
          'src/old_login.py': {
            clean: `# Legacy login handler - DEPRECATED
def old_login_handler(request):
    pass`,
            buggy: null,
            fixed: null
          },
          'src/main.py': {
            clean: `from flask import Flask
app = Flask(__name__)

@app.route('/health')
def health():
    return {'status': 'ok'}`,
            buggy: null,
            fixed: null
          },
          'src/config.py': {
            clean: `import os
DATABASE_URL = os.environ.get('DATABASE_URL')
DEBUG = os.environ.get('DEBUG', 'false').lower() == 'true'`,
            buggy: null,
            fixed: null
          }
        },
        pullRequests: [],
        incidents: []
      }
    ];
  }

  listRepos() {
    return this.repos.map(r => ({
      repoId: r.repoId,
      name: r.name,
      owner: r.owner,
      description: r.description,
      defaultBranch: r.defaultBranch
    }));
  }

  getRepo(repoId) {
    return this.repos.find(r => r.repoId === repoId);
  }

  listBranches(repoId) {
    const repo = this.getRepo(repoId);
    if (!repo) return [];
    return repo.branches;
  }

  getLatestCommit(repoId, branch = 'main') {
    const repo = this.getRepo(repoId);
    if (!repo) return null;
    return repo.commits.find(c => c.branch === branch && c.type !== 'buggy') || null;
  }

  createBranch(repoId, baseBranch, newBranchName) {
    const repo = this.getRepo(repoId);
    if (!repo) return null;
    
    const baseCommit = repo.branches.find(b => b.name === baseBranch);
    if (!baseCommit) return null;

    const newBranch = {
      name: newBranchName,
      isDefault: false,
      commitId: baseCommit.commitId
    };

    repo.branches.push(newBranch);
    return newBranch;
  }

  createCommit(repoId, branch, filesChanged, message, type = 'clean') {
    const repo = this.getRepo(repoId);
    if (!repo) return null;

    const branchObj = repo.branches.find(b => b.name === branch);
    if (!branchObj) return null;

    const commit = {
      id: this.generateSHA(),
      branch,
      message,
      timestamp: new Date(),
      author: 'DevOps Copilot',
      filesChanged,
      type,
      parentCommitId: branchObj.commitId
    };

    repo.commits.push(commit);
    branchObj.commitId = commit.id;

    return commit;
  }

  getFileContent(repoId, commitId, path) {
    const repo = this.getRepo(repoId);
    if (!repo || !repo.files[path]) return null;

    const commit = repo.commits.find(c => c.id === commitId);
    if (!commit) return null;

    const fileVersions = repo.files[path];
    if (commit.type === 'buggy') return fileVersions.buggy;
    if (commit.type === 'fixed') return fileVersions.fixed;
    return fileVersions.clean;
  }

  getDiffBetweenCommits(repoId, commitIdA, commitIdB) {
    const repo = this.getRepo(repoId);
    if (!repo) return null;

    const commitA = repo.commits.find(c => c.id === commitIdA);
    const commitB = repo.commits.find(c => c.id === commitIdB);

    if (!commitA || !commitB) return null;

    const diff = {
      fromCommit: commitA.id.substring(0, 7),
      toCommit: commitB.id.substring(0, 7),
      files: []
    };

    // Collect all files changed in both commits
    const allFiles = new Set();
    commitA.filesChanged.forEach(f => allFiles.add(f.path));
    commitB.filesChanged.forEach(f => allFiles.add(f.path));

    allFiles.forEach(path => {
      const fileA = commitA.filesChanged.find(f => f.path === path);
      const fileB = commitB.filesChanged.find(f => f.path === path);

      let status = 'modified';
      if (!fileA) status = 'added';
      if (!fileB) status = 'deleted';

      diff.files.push({
        path,
        status,
        additions: fileB?.additions || 0,
        deletions: fileA?.deletions || 0
      });
    });

    return diff;
  }

  listPullRequests(repoId) {
    const repo = this.getRepo(repoId);
    if (!repo) return [];
    return repo.pullRequests;
  }

  getPullRequest(repoId, prId) {
    const repo = this.getRepo(repoId);
    if (!repo) return null;
    return repo.pullRequests.find(pr => pr.prId === prId);
  }

  addPullRequest(repoId, pr) {
    const repo = this.getRepo(repoId);
    if (!repo) return null;
    repo.pullRequests.push(pr);
    return pr;
  }

  addIncident(repoId, incident) {
    const repo = this.getRepo(repoId);
    if (!repo) return null;
    repo.incidents.push(incident);
    return incident;
  }

  getIncidents(repoId) {
    const repo = this.getRepo(repoId);
    if (!repo) return [];
    return repo.incidents;
  }

  generateSHA() {
    const hash = crypto.randomBytes(20).toString('hex');
    return hash.substring(0, 8);
  }
}

module.exports = SimulatedRepoStore;
