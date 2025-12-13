import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Network, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { SidebarAd } from '../ui/AdSense';

const chapters = [
  { id: '4', title: 'Chapter 4', subtitle: 'Network Layer: Data Plane', icon: Network },
  { id: '5', title: 'Chapter 5', subtitle: 'Network Layer: Control Plane', icon: Share2 },
  { id: '6', title: 'Chapter 6', subtitle: 'Link Layer & LANs', icon: BookOpen },
];

export function Sidebar({ isOpen, onToggle }) {
  return (
    <aside 
      className={cn(
        "hidden md:flex fixed left-0 top-0 h-screen bg-[#1a1a1a] border-r border-gray-800 flex-col z-40 transition-all duration-300 ease-in-out",
        isOpen ? "w-80" : "w-20"
      )}
    >
      <div className={cn("flex items-center border-b border-gray-800 h-[89px]", isOpen ? "px-6 justify-between" : "justify-center p-0")}>
        {isOpen && (
           <div className="overflow-hidden whitespace-nowrap animate-in fade-in slide-in-from-left-4 duration-300">
             <h1 className="text-xl font-bold text-white flex items-center gap-2">
               <span className="text-emerald-500">컴네</span> 위키
             </h1>
             <p className="text-xs text-gray-500 mt-1">컴퓨터 네트워크 기말고사 대비</p>
           </div>
        )}
        
        <button 
          onClick={onToggle}
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
          title={isOpen ? "접기" : "펼치기"}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-shrink-0 py-6 px-3 space-y-2 overflow-y-auto scrollbar-hide">
        {chapters.map((chapter) => (
          <NavLink
            key={chapter.id}
            to={`/chapter/${chapter.id}`}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group min-h-[50px]",
              isActive 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                : "text-gray-400 hover:bg-gray-800 hover:text-gray-200",
              !isOpen && "justify-center px-0"
            )}
            title={!isOpen ? chapter.title : undefined}
          >
            <chapter.icon className="w-5 h-5 shrink-0" />
            {isOpen && (
               <div className="overflow-hidden whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                 <div className="font-medium text-sm">{chapter.title}</div>
                 <div className="text-xs opacity-70 truncate w-48">{chapter.subtitle}</div>
               </div>
            )}
          </NavLink>
        ))}
      </nav>
        
      {/* Ads & Footer - Hide when closed */}
      {isOpen && (
        <div className="flex flex-col flex-1 overflow-hidden animate-in fade-in duration-500 delay-150">
          <div className="flex-1 px-1 py-2 w-full relative">
            <SidebarAd />
          </div>
    
          <div className="p-4 border-t border-gray-800 whitespace-nowrap overflow-hidden">
            <div className="text-xs text-gray-600 text-center">
              © 2025 HGU ComNet
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
