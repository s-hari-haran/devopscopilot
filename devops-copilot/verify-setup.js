#!/usr/bin/env node

/**
 * DevOps Copilot - Setup Verification Script
 * Run this to verify your installation is correct
 */

const fs = require('fs');
const path = require('path');

const checks = [
  {
    name: 'Backend package.json',
    path: 'backend/package.json',
    type: 'file'
  },
  {
    name: 'Backend server.js',
    path: 'backend/server.js',
    type: 'file'
  },
  {
    name: 'Backend services',
    path: 'backend/services',
    type: 'dir',
    files: [
      'SimulatedRepoStore.js',
      'TestAppSimulator.js',
      'IncidentService.js',
      'GeminiService.js',
      'PullRequestService.js',
      'AgentStateService.js'
    ]
  },
  {
    name: 'Backend routes',
    path: 'backend/routes',
    type: 'dir',
    files: ['api.js']
  },
  {
    name: 'Frontend package.json',
    path: 'frontend/package.json',
    type: 'file'
  },
  {
    name: 'Frontend pages',
    path: 'frontend/pages',
    type: 'dir',
    files: [
      '_app.jsx',
      'index.jsx',
      'config.jsx',
      'dashboard.jsx',
      'incident',
      'pull-request'
    ]
  },
  {
    name: 'Frontend components',
    path: 'frontend/components',
    type: 'dir',
    files: [
      'Header.jsx',
      'InfoStrip.jsx',
      'AgentCard.jsx',
      'SystemTimeline.jsx',
      'ActionPanel.jsx',
      'CommitPanel.jsx',
      'ErrorContext.jsx'
    ]
  },
  {
    name: 'Frontend configuration',
    path: 'frontend',
    type: 'dir',
    files: [
      'next.config.js',
      'tailwind.config.js',
      'postcss.config.js',
      'tsconfig.json'
    ]
  },
  {
    name: 'Root documentation',
    path: '.',
    type: 'dir',
    files: [
      'README.md',
      'QUICKSTART.md'
    ]
  }
];

console.log('\n╔══════════════════════════════════════════════════════╗');
console.log('║  DevOps Copilot - Setup Verification                ║');
console.log('╚══════════════════════════════════════════════════════╝\n');

let passed = 0;
let failed = 0;

checks.forEach(check => {
  const fullPath = path.join(__dirname, check.path);
  
  try {
    const stat = fs.statSync(fullPath);
    
    if (check.type === 'file' && !stat.isFile()) {
      console.log(`❌ ${check.name}: Not a file`);
      failed++;
      return;
    }
    
    if (check.type === 'dir' && !stat.isDirectory()) {
      console.log(`❌ ${check.name}: Not a directory`);
      failed++;
      return;
    }
    
    // Check for required files in directory
    if (check.files) {
      const missing = check.files.filter(file => {
        const filePath = path.join(fullPath, file);
        try {
          fs.statSync(filePath);
          return false;
        } catch {
          return true;
        }
      });
      
      if (missing.length > 0) {
        console.log(`⚠️  ${check.name}: Missing ${missing.join(', ')}`);
        failed++;
        return;
      }
    }
    
    console.log(`✅ ${check.name}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${check.name}: ${error.message}`);
    failed++;
  }
});

console.log(`\n${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('🎉 Setup verification passed! Your installation is ready.\n');
  console.log('Next steps:');
  console.log('  1. Terminal 1: cd backend && npm install && npm run dev');
  console.log('  2. Terminal 2: cd frontend && npm install && npm run dev');
  console.log('  3. Open http://localhost:3000 in your browser\n');
  process.exit(0);
} else {
  console.log('❌ Setup verification failed. Please check the errors above.\n');
  process.exit(1);
}
