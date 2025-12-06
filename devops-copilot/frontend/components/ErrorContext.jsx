import React from 'react';

export default function ErrorContext({ errorText }) {
  return (
    <div className="bg-gold border-4 border-black h-full flex flex-col">
      <div className="bg-black px-4 py-2 border-b-4 border-black">
        <h3 className="font-black text-sm uppercase tracking-wider text-yellow">Error Context</h3>
      </div>
      <div className="bg-white p-4 text-xs font-mono overflow-auto flex-1">
        <pre className="whitespace-pre-wrap break-words text-black">{errorText}</pre>
      </div>
    </div>
  );
}
