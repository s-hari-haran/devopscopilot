import React from 'react';

export default function InfoStrip({ repoName, branch, incidentCount, systemOK }) {
  return (
    <div className="bg-black border-b-4 border-black px-6 py-4 flex gap-0 items-center">
      {/* Repo Info */}
      <div className="flex-1 bg-cyan border-4 border-black py-3 px-4">
        <div className="text-black font-bold text-sm">REPO: {repoName}</div>
      </div>

      {/* Branch Info */}
      <div className="flex-1 bg-cyan border-4 border-black border-l-0 py-3 px-4">
        <div className="text-black font-bold text-sm">BRANCH: {branch}</div>
      </div>

      {/* Incidents Info */}
      <div className="flex-1 bg-cyan border-4 border-black border-l-0 py-3 px-4 flex items-center justify-between">
        <div className="text-black font-bold text-sm">INCIDENTS: {incidentCount}</div>
        <div className="w-5 h-5 bg-yellow border-2 border-black flex items-center justify-center">
          <span className="text-black font-bold text-xs">!</span>
        </div>
      </div>

      {/* Status Lights */}
      <div className="ml-4 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded-full ${systemOK ? 'bg-green-500' : 'bg-red-500'} border-2 border-black`}></div>
          <span className="text-white font-bold text-xs uppercase">System {systemOK ? 'OK' : 'Error'}</span>
        </div>
      </div>
    </div>
  );
}
