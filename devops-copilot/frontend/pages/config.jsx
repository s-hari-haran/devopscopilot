import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { api } from '@/lib/api';

export default function ConfigPage() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');
  const [repoId, setRepoId] = useState('repo-unicorn');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [repos, setRepos] = useState([]);

  React.useEffect(() => {
    loadRepos();
  }, []);

  const loadRepos = async () => {
    try {
      console.log('Fetching repos from:', api.get);
      const result = await api.get('/repo/list');
      console.log('Repos loaded:', result);
      setRepos(result.repos || []);
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error loading repos:', err);
      // Set default repos as fallback - don't show error if fallback works
      setRepos([
        { repoId: 'repo-unicorn', name: 'project-unicorn', owner: 'devops-team' }
      ]);
    }
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await api.post('/config/connect', {
        apiKey: apiKey || 'demo-key',
        repoId
      });

      if (result.success) {
        localStorage.setItem('geminiApiKey', apiKey);
        localStorage.setItem('selectedRepoId', repoId);
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Connection error:', err);
      // Allow proceeding anyway since we have fallback data
      localStorage.setItem('geminiApiKey', apiKey || 'demo-key');
      localStorage.setItem('selectedRepoId', repoId);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md bg-black border-4 border-black p-8">
          <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-6">
            Configure Platform
          </h2>

          <form onSubmit={handleConnect} className="space-y-4">
            {/* Gemini API Key */}
            <div>
              <label className="block text-white font-bold text-sm uppercase mb-2">
                Gemini API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                className="w-full px-4 py-3 border-2 border-black bg-white text-black font-bold text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">
                Leave empty to use demo mode
              </p>
            </div>

            {/* Repository Selection */}
            <div>
              <label className="block text-white font-bold text-sm uppercase mb-2">
                Select Repository
              </label>
              <select
                value={repoId}
                onChange={(e) => setRepoId(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black bg-white text-black font-bold text-sm"
              >
                {repos.map((repo) => (
                  <option key={repo.repoId} value={repo.repoId}>
                    {repo.name} ({repo.owner})
                  </option>
                ))}
              </select>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-600 border-2 border-black text-white p-3 font-bold text-sm">
                ERROR: {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="neo-button w-full bg-yellow text-black uppercase font-black tracking-widest disabled:opacity-50"
            >
              {loading ? 'Connecting...' : 'Connect & Continue'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-yellow border-2 border-black text-black text-xs font-bold">
            <strong>Demo Mode:</strong> API key is optional. System will use demo Gemini responses.
          </div>
        </div>
      </div>
    </div>
  );
}
