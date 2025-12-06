import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { api } from '@/lib/api';

export default function PullRequestPage() {
  const router = useRouter();
  const { id } = router.query;
  const [pr, setPr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadPullRequest();
    }
  }, [id]);

  const loadPullRequest = async () => {
    try {
      // Simulate PR loading
      setPr({
        prId: id,
        title: 'Security Fix: Resolve authentication bypass',
        sourceBranch: 'fix/auth-bypass-abc123',
        targetBranch: 'main',
        status: 'open',
        createdAt: new Date().toISOString(),
        description: `## Summary
This PR resolves the authentication bypass vulnerability.

## Changes
- Added proper password hashing validation
- Implemented rate limiting for login attempts
- Use secure session tokens

## Security Impact
Closes security vulnerability detected in src/auth.py`,
        filesChanged: [
          {
            path: 'src/auth.py',
            status: 'modified',
            additions: 32,
            deletions: 25
          }
        ],
        checks: [
          { name: 'Unit Tests', status: 'passed' },
          { name: 'Linting', status: 'passed' },
          { name: 'Security Scan', status: 'passed' }
        ]
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pr) return <div>Pull request not found</div>;

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => router.push('/dashboard')}
            className="neo-button bg-yellow text-black mb-6"
          >
            ← Back to Dashboard
          </button>

          {/* PR details */}
          <div className="bg-black border-4 border-white p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-black text-white uppercase">{pr.title}</h1>
              <div className="px-4 py-2 bg-cyan border-2 border-black text-black font-bold text-sm uppercase">
                {pr.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-white font-black text-sm uppercase mb-2">PR ID</h3>
                <p className="text-white font-mono text-sm">{pr.prId}</p>
              </div>
              <div>
                <h3 className="text-white font-black text-sm uppercase mb-2">Branches</h3>
                <p className="text-white font-mono text-sm">
                  {pr.sourceBranch} → {pr.targetBranch}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-black text-sm uppercase mb-2">Description</h3>
              <div className="bg-yellow text-black p-4 border-2 border-white whitespace-pre-wrap text-sm font-mono">
                {pr.description}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-black text-sm uppercase mb-2">Files Changed</h3>
              <div className="space-y-2">
                {pr.filesChanged.map((file, idx) => (
                  <div key={idx} className="bg-black border-2 border-white p-3 flex justify-between items-center">
                    <div>
                      <p className="text-white font-bold text-sm">{file.path}</p>
                      <p className="text-gray-400 text-xs">
                        +{file.additions} -{file.deletions}
                      </p>
                    </div>
                    <div className="text-white font-bold text-sm px-3 py-1 bg-cyan">
                      {file.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-black text-sm uppercase mb-2">Status Checks</h3>
              <div className="space-y-2">
                {pr.checks.map((check, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-black border-2 border-white p-3">
                    <p className="text-white font-bold text-sm">{check.name}</p>
                    <div className={`px-3 py-1 font-bold text-sm ${check.status === 'passed' ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}>
                      {check.status.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
