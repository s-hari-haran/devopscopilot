import React from 'react';

export default function AgentCard({ title, status, statusIndicator, backgroundColor, icon, metrics }) {
  const bgColor = backgroundColor === 'yellow' ? 'bg-yellow' : backgroundColor === 'cyan' ? 'bg-cyan' : 'bg-pink';
  const textColor = backgroundColor === 'yellow' || backgroundColor === 'cyan' ? 'text-black' : 'text-white';

  return (
    <div className={`${bgColor} border-4 border-black p-4 h-40 flex flex-col justify-between`}>
      {/* Top section with icon and title */}
      <div>
        <div className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center mb-2">
          <span className="text-black font-bold">{icon}</span>
        </div>
        <h3 className={`${textColor} font-black text-lg uppercase tracking-wide`}>{title}</h3>
        <p className={`${textColor} text-sm font-bold mt-1`}>{status}</p>
      </div>

      {/* Status indicator at bottom right */}
      <div className="flex justify-end">
        {statusIndicator === 'running' && (
          <div className="running-bars">
            <div className="running-bar"></div>
            <div className="running-bar"></div>
            <div className="running-bar"></div>
          </div>
        )}
        {statusIndicator === 'idle' && (
          <div className="idle-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        {statusIndicator === 'done' && (
          <div className="done-indicator"></div>
        )}
      </div>

      {/* Metrics if available */}
      {metrics && (
        <div className={`${textColor} text-xs font-bold mt-2`}>
          {metrics}
        </div>
      )}
    </div>
  );
}
