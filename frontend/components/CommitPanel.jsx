import React from 'react';

export default function CommitPanel({ commitId, commitMessage, diff }) {
  return (
    <div className="bg-black border-t-4 border-black py-4 px-6 flex justify-between items-center">
      <div className="flex-1">
        <div className="text-white font-bold text-sm">LATEST COMMIT ID: {commitId}</div>
        <div className="text-white font-bold text-sm mt-1">COMMIT MESSAGE: {commitMessage}</div>
      </div>
      
      <div className="flex items-center gap-3 text-white font-bold text-sm">
        {diff && diff.files && diff.files.map((file, idx) => (
          <div key={idx} className="flex items-center gap-1">
            {file.status === 'added' && (
              <>
                <span>+</span>
                <span>{file.path.split('/').pop()}</span>
              </>
            )}
            {file.status === 'deleted' && (
              <>
                <span>−</span>
                <span>{file.path.split('/').pop()}</span>
              </>
            )}
            {file.status === 'modified' && (
              <>
                <span>~</span>
                <span>{file.path.split('/').pop()}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
