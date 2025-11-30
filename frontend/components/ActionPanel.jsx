import React from 'react';

export default function ActionPanel({ onInjectBug, onScan, onAnalyze, onAutoFix, loading }) {
  return (
    <div className="w-full flex flex-col gap-7">
      <button
        onClick={onInjectBug}
        disabled={loading}
        className="neo-button bg-yellow text-black uppercase font-black tracking-widest disabled:opacity-50 flex items-center justify-start gap-3 px-8 py-3"
      >
        <span className="text-xl">🔬</span> Inject Bug
      </button>
      <button
        onClick={onScan}
        disabled={loading}
        className="neo-button bg-cyan text-black uppercase font-black tracking-widest disabled:opacity-50 flex items-center justify-start gap-3 px-8 py-3"
      >
        <span className="text-xl">🔍</span> Scan for Issues
      </button>
      <button
        onClick={onAnalyze}
        disabled={loading}
        className="neo-button bg-pink text-black uppercase font-black tracking-widest disabled:opacity-50 flex items-center justify-start gap-3 px-8 py-3"
      >
        <span className="text-xl">⚙️</span> Run Analysis
      </button>
      <button
        onClick={onAutoFix}
        disabled={loading}
        className="neo-button bg-gold text-black uppercase font-black tracking-widest disabled:opacity-50 flex items-center justify-start gap-3 px-8 py-3"
      >
        <span className="text-xl">🔧</span> Auto Fix & Create PR
      </button>
    </div>
  );
}
