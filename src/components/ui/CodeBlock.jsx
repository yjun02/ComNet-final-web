import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CodeBlock({ language, code, title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
        <span className="text-xs font-mono text-gray-400">{title || language}</span>
        <button 
          onClick={handleCopy}
          className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
        <pre><code className="text-gray-300 whitespace-pre">{code}</code></pre>
      </div>
    </div>
  );
}
