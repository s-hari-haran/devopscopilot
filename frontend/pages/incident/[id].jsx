import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { api } from '@/lib/api';

export default function IncidentPage() {
  const router = useRouter();
  const { id } = router.query;
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadIncident();
    }
  }, [id]);

  const loadIncident = async () => {
    try {
      // In a real implementation, we'd have a specific endpoint for this
      // For now, we'll simulate it
      setIncident({
        incidentId: id,
        repoId: 'repo-unicorn',
        status: 'ANALYSED',
        summary: 'Authentication bypass vulnerability detected',
        errorContext: 'Missing password validation in src/auth.py',
        geminiExplanation: 'The authentication function bypasses password verification',
        geminiSuggestions: [
          'Add proper password hashing validation',
          'Implement rate limiting for login attempts',
          'Use secure session tokens'
        ],
        timeline: [
          { timestamp: new Date().toISOString(), status: 'DETECTED', message: 'Incident detected' },
          { timestamp: new Date().toISOString(), status: 'ANALYSED', message: 'Analysis complete' }
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
  if (!incident) return <div>Incident not found</div>;

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

          {/* Incident details */}
          <div className="bg-black border-4 border-white p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-white font-black text-sm uppercase mb-2">Incident ID</h3>
                <p className="text-white font-mono text-sm">{incident.incidentId}</p>
              </div>
              <div>
                <h3 className="text-white font-black text-sm uppercase mb-2">Status</h3>
                <p className="text-white font-bold text-sm">{incident.status}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-black text-sm uppercase mb-2">Summary</h3>
              <p className="text-white text-sm">{incident.summary}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-black text-sm uppercase mb-2">Error Context</h3>
              <div className="bg-yellow border-2 border-white text-black p-4 font-mono text-xs whitespace-pre-wrap">
                {incident.errorContext}
              </div>
            </div>

            {incident.geminiExplanation && (
              <div className="mb-6">
                <h3 className="text-white font-black text-sm uppercase mb-2">Analysis</h3>
                <p className="text-white text-sm">{incident.geminiExplanation}</p>
              </div>
            )}

            {incident.geminiSuggestions && incident.geminiSuggestions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-black text-sm uppercase mb-2">Suggested Fixes</h3>
                <ul className="text-white text-sm space-y-2">
                  {incident.geminiSuggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold">{idx + 1}.</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
