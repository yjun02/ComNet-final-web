import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Network, Share2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { SidebarAd } from '../ui/AdSense';

const chapters = [
  { id: '4', title: 'Chapter 4', subtitle: 'Network Layer: Data Plane', icon: Network },
  { id: '5', title: 'Chapter 5', subtitle: 'Network Layer: Control Plane', icon: Share2 },
  { id: '6', title: 'Chapter 6', subtitle: 'Link Layer & LANs', icon: BookOpen },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-[#1a1a1a] border-r border-gray-800 flex-col z-40">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-emerald-500">CS</span> Network Wiki
        </h1>
        <p className="text-xs text-gray-500 mt-1">Computer Networks</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {chapters.map((chapter) => (
          <NavLink
            key={chapter.id}
            to={`/chapter/${chapter.id}`}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group",
              isActive 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
            )}
          >
            <chapter.icon className="w-5 h-5 shrink-0" />
            <div>
              <div className="font-medium text-sm">{chapter.title}</div>
              <div className="text-xs opacity-70 truncate w-32">{chapter.subtitle}</div>
            </div>
          </NavLink>
        ))}
        
        {/* Google AdSense - Display Banner */}
        <div className="pt-4">
          <SidebarAd />
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-600 text-center">
          © 2025 HGU ComNet
        </div>
      </div>
    </aside>
  );
}
