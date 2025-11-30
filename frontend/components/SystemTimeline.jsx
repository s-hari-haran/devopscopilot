import React from 'react';

export default function SystemTimeline() {
  return (
    <div className="bg-black border-4 border-white h-full w-full flex items-center justify-center p-6 relative">
      <div className="absolute top-2 left-2 text-white text-xs font-black uppercase tracking-wider">
        SYSTEM TIMELINE
      </div>
      <div className="w-full h-full flex items-center justify-center mt-4">
        <svg width="100%" height="80%" viewBox="0 0 200 80" preserveAspectRatio="xMidYMid meet">
          {/* Wave pattern */}
          <path
            d="M 10 40 Q 50 20, 100 40 T 190 40"
            stroke="white"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
