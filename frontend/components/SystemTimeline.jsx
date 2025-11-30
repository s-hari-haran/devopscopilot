import React from 'react';

export default function SystemTimeline() {
  return (
    <div className="bg-black border-4 border-white h-40 flex items-center justify-center p-4">
      <div className="w-full h-24 flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
          {/* Timeline axis */}
          <line x1="10" y1="50" x2="190" y2="50" stroke="white" strokeWidth="1" />
          
          {/* Wave pattern */}
          <path
            d="M 10 50 Q 30 20, 50 50 T 90 50 T 130 50 T 170 50 T 200 50"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Data points */}
          <circle cx="50" cy="50" r="3" fill="white" />
          <circle cx="90" cy="50" r="3" fill="white" />
          <circle cx="130" cy="50" r="3" fill="white" />
          <circle cx="170" cy="50" r="3" fill="white" />

          {/* Axis markers */}
          <line x1="10" y1="45" x2="10" y2="55" stroke="white" strokeWidth="1" />
          <line x1="190" y1="45" x2="190" y2="55" stroke="white" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute text-white font-bold text-xs uppercase tracking-wider">
        System Timeline
      </div>
    </div>
  );
}
