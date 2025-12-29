import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TOC } from './TOC';

export function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  
  const isCoursePage = location.pathname.startsWith('/ml') || location.pathname.startsWith('/comnet');

  return (
    <div className="flex min-h-screen bg-[#0d0d0d] text-gray-300 font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      {isCoursePage && (
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      )}
      
      <main className="flex-1 min-w-0 transition-all duration-300 ease-in-out">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
          {children}

          <footer className="mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
             <div className="flex gap-6">
                <a href="/" className="hover:text-white transition-colors">Home</a>
                <a href="/about" className="hover:text-white transition-colors">About</a>
                <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="https://www.instagram.com/wise._.info/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
             </div>
             <div>
                © 2025 슬기로운 전전위키. All rights reserved.
             </div>
          </footer>
        </div>
      </main>

      {isCoursePage && <TOC />}
    </div>
  );
}
