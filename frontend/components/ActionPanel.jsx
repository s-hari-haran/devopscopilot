import React from 'react';

export default function ActionPanel({ onInjectBug, onScan, onAnalyze, onAutoFix, loading }) {
  const buttonClass = (color) => `
    neo-button w-full mb-3
    ${color === 'yellow' ? 'bg-yellow text-black hover:bg-yellow' : ''}
    ${color === 'cyan' ? 'bg-cyan text-black hover:bg-cyan' : ''}
    ${color === 'pink' ? 'bg-pink text-white hover:bg-pink' : ''}
    ${color === 'gold' ? 'bg-gold text-black hover:bg-gold' : ''}
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <div className="w-full max-w-xs flex flex-col gap-0">
      <button
        onClick={onInjectBug}
        disabled={loading}
        className={buttonClass('yellow')}
      >
        🐛 Inject Bug
      </button>
      <button
        onClick={onScan}
        disabled={loading}
        className={buttonClass('cyan')}
      >
        🔍 Scan for Issues
      </button>
      <button
        onClick={onAnalyze}
        disabled={loading}
        className={buttonClass('pink')}
      >
        ⚙️ Run Analysis
      </button>
      <button
        onClick={onAutoFix}
        disabled={loading}
        className={buttonClass('gold')}
      >
        🔧 Auto Fix & Create PR
      </button>
    </div>
  );
}
