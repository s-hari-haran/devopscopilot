import React from 'react';

export default function InfoStrip({ repoName, branch, incidentCount, systemOK }) {
  return (
    <div className="bg-black border-b-4 border-black px-6 py-3 flex items-center">
      <div className="flex gap-4 flex-1">
        {/* Repo Info */}
        <div className="flex-1 bg-cyan border-4 border-black py-3 px-6">
          <div className="text-black font-black text-sm uppercase tracking-wider">REPO: {repoName}</div>
        </div>

        {/* Branch Info */}
        <div className="flex-1 bg-cyan border-4 border-black py-3 px-6">
          <div className="text-black font-black text-sm uppercase tracking-wider">BRANCH: {branch}</div>
        </div>

        {/* Incidents Info */}
        <div className="flex-1 bg-cyan border-4 border-black py-3 px-6 flex items-center justify-between">
          <div className="text-black font-black text-sm uppercase tracking-wider">INCIDENTS: {incidentCount}</div>
          {incidentCount > 0 && <span className="text-xl">⚠️</span>}
        </div>
      </div>

      {/* Status Lights */}
      <div className="ml-8 flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${systemOK ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-white font-black text-sm uppercase tracking-wide">{systemOK ? 'SYSTEM OK' : 'SYSTEM ERROR'}</span>
      </div>
    </div>
  );
}
