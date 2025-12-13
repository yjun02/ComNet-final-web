import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TOC } from './TOC';

export function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-300 font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main 
        className={`ml-0 xl:mr-64 min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'md:ml-80' : 'md:ml-20'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
          {children}
        </div>
      </main>

      <TOC />
    </div>
  );
}
