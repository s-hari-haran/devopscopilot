import React from 'react';

export default function AgentCard({ title, status, statusIndicator, backgroundColor, icon, metrics }) {
  const bgColor = backgroundColor === 'yellow' ? 'bg-yellow' : backgroundColor === 'cyan' ? 'bg-cyan' : 'bg-pink';
  const textColor = backgroundColor === 'yellow' || backgroundColor === 'cyan' ? 'text-black' : 'text-white';

  return (
    <div className={`${bgColor} border-4 border-black p-4 h-40 flex flex-col justify-between`}>
      {/* Top section with icon */}
      <div className="flex items-start">
        <div className="text-3xl w-12 h-12 flex items-center justify-center">{icon}</div>
      </div>

      {/* Title and status */}
      <div>
        <h3 className={`${textColor} font-black text-lg uppercase tracking-wide`}>{title}</h3>
        <p className={`${textColor} text-sm font-bold uppercase mt-1`}>{status}</p>
        {metrics && <p className={`${textColor} text-xs font-bold mt-1`}>{metrics}</p>}
      </div>

      {/* Status indicator at bottom right with padding */}
      <div className="flex justify-end pr-1 pb-1">
        {statusIndicator === 'running' && (
          <div className="running-bars scale-150">
            <div className="running-bar"></div>
            <div className="running-bar"></div>
            <div className="running-bar"></div>
          </div>
        )}
        {statusIndicator === 'idle' && (
          <div className="idle-dots scale-150">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        {statusIndicator === 'done' && (
          <div className="done-indicator scale-150"></div>
        )}
      </div>
    </div>
  );
}
