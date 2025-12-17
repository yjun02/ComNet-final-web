import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TOC } from './TOC';

export function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#0d0d0d] text-gray-300 font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className="flex-1 min-w-0 transition-all duration-300 ease-in-out">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
          {children}
        </div>
      </main>

      <TOC />
    </div>
  );
}
