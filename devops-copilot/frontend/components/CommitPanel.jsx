import React from 'react';

export default function CommitPanel({ commitId, commitMessage, diff }) {
  return (
    <div className="bg-black border-t-4 border-black py-6 px-6">
      <div className="mb-4 space-y-2">
        <p className="text-base font-black uppercase tracking-wide text-white">
          Latest Commit ID: <span className="text-cyan font-mono ml-2">{commitId}</span>
        </p>
        <p className="text-base font-black uppercase tracking-wide text-white">
          Commit Message: <span className="text-white font-bold ml-2">{commitMessage}</span>
        </p>
      </div>
      
      {diff && diff.files && (
        <div className="flex gap-2 flex-wrap mt-4">
          {diff.files.map((file, idx) => (
            <div key={idx} className="px-3 py-1 bg-black border-2 border-white">
              <span className={`text-xs font-mono font-bold ${
                file.status === 'deleted' ? 'text-red-400' : 
                file.status === 'added' ? 'text-green-400' : 
                'text-cyan'
              }`}>
                {file.status === 'deleted' ? '~ ' : file.status === 'added' ? '+ ' : '~ '}
                {file.path}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
