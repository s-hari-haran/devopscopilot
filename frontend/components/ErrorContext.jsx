import React from 'react';

export default function ErrorContext({ errorText }) {
  return (
    <div className="border-4 border-yellow bg-black p-4">
      <div className="text-yellow font-black text-sm uppercase mb-2">ERROR CONTEXT</div>
      <div className="border-2 border-white bg-white text-black p-3 text-xs font-mono overflow-hidden h-20">
        <div className="whitespace-pre-wrap break-words text-black">
          {errorText}
        </div>
      </div>
    </div>
  );
}
