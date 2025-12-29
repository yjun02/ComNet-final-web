import React, { useMemo } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { BookOpen, Network, Share2, ChevronLeft, ChevronRight, BrainCircuit, TrendingUp, GitMerge, FileDigit, ArrowLeft } from 'lucide-react';
import { cn } from '../../utils/cn';
import { SidebarAd } from '../ui/AdSense';

// ComNet Chapters (Hardcoded)
const comnetChapters = [
  { id: 'intro', title: 'Introduction', subtitle: 'Course Overview', icon: BookOpen },
  { id: '4', title: 'Chapter 4', subtitle: 'Network Layer: Data Plane', icon: Network },
  { id: '5', title: 'Chapter 5', subtitle: 'Network Layer: Control Plane', icon: Share2 },
  { id: '6', title: 'Chapter 6', subtitle: 'Link Layer & LANs', icon: GitMerge }, // Swapped icon for variety
];

// ML Chapters (Hardcoded)
const mlChapters = [
  { id: 'intro', title: 'Introduction', subtitle: 'Course Overview', icon: BookOpen },
  { id: '7', title: 'Chapter 7', subtitle: '클러스터링 (Clustering)', icon: BrainCircuit },
  { id: '8', title: 'Chapter 8', subtitle: '선형 회귀 (Linear Regression)', icon: TrendingUp },
  { id: '9', title: 'Chapter 9', subtitle: '선형 분류 (Linear Classification)', icon: GitMerge },
  { id: '10', title: 'Chapter 10', subtitle: '신경망 (Neural Network)', icon: FileDigit },
];


export function Sidebar({ isOpen, onToggle }) {
  const location = useLocation();
  
  // Normalize pathname for consistent checks
  const normalizedPath = location.pathname.endsWith('/') && location.pathname.length > 1
    ? location.pathname.slice(0, -1)
    : location.pathname;

  const isMl = normalizedPath.startsWith('/ml');
  const isComnet = normalizedPath.startsWith('/comnet');
  
  // 현재 모드에 따른 챕터 목록 선택
  const currentChapters = isMl ? mlChapters : (isComnet ? comnetChapters : []);
  const basePath = isMl ? '/ml' : (isComnet ? '/comnet' : '');
  const title = '슬기로운 전전위키';
  
  let subtitle = '';
  if (isMl) subtitle = '머신러닝 핵심 요약';
  else if (isComnet) subtitle = '컴퓨터 네트워크 기말고사 대비';
  else subtitle = '슬기로운 전전생활';

  const titleColor = isMl ? 'text-blue-500' : (isComnet ? 'text-emerald-500' : 'text-purple-500');

  return (
    <aside 
      className={cn(
        "hidden md:flex sticky top-0 h-screen bg-[#1a1a1a] border-r border-gray-800 flex-col z-40 transition-all duration-300 ease-in-out shrink-0",
        isOpen ? "w-80" : "w-20"
      )}
    >
      <div className={cn("flex items-center border-b border-gray-800 h-[89px]", isOpen ? "px-6 justify-between" : "justify-center p-0")}>
        {isOpen && (
           <div className="overflow-hidden whitespace-nowrap">
             <Link to="/" className="text-xl font-bold text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
               <span className={titleColor}>{title.split(' ')[0]}</span> {title.split(' ')[1]}
             </Link>
             <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
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
      <nav className="flex-shrink-0 py-6 px-3 space-y-2 overflow-y-auto scrollbar-hide flex-1">
        {/* Back to Home Button (Only on Sidebar top) */}
        {!isOpen && (
           <Link to="/" className="flex items-center justify-center p-3 text-gray-400 hover:text-white mb-4 rounded-lg hover:bg-gray-800" title="메인으로">
              <ArrowLeft size={20} />
           </Link>
        )}
        {isOpen && (
            <Link to="/" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:text-white mb-4 transition-colors">
                <ArrowLeft size={16} /> 과목 선택으로 돌아가기
            </Link>
        )}

        {currentChapters.length === 0 && isOpen && (
            <div className="text-gray-500 text-sm px-4 py-2">
                등록된 챕터가 없습니다.
            </div>
        )}

        {currentChapters.map((chapter) => (
          <NavLink
            key={chapter.id}
            to={chapter.id === 'intro' ? `${basePath}/intro` : `${basePath}/chapter/${chapter.id}`}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group min-h-[50px]",
              isActive 
                ? `bg-opacity-10 text-opacity-100 ${isMl ? 'bg-blue-500 text-white border-blue-500/20' : 'bg-emerald-500 text-white border-emerald-500/20'} border` 
                : "text-gray-400 hover:bg-gray-800 hover:text-gray-200",
              !isOpen && "justify-center px-0"
            )}
            title={!isOpen ? chapter.title : undefined}
          >
            <chapter.icon className="w-5 h-5 shrink-0" />
            {isOpen && (
               <div className="overflow-hidden whitespace-nowrap">
                 <div className="font-medium text-sm">{chapter.title}</div>
                 <div className="text-xs opacity-70 truncate w-48">{chapter.subtitle}</div>
               </div>
            )}
          </NavLink>
        ))}
      </nav>
        
      {/* Ads & Footer - Hide when closed */}
      {isOpen && (
        <div className="flex flex-col overflow-hidden shrink-0">
          <div className="px-1 py-2 w-full relative">
            <SidebarAd />
          </div>
    
          <div className="p-4 border-t border-gray-800 whitespace-nowrap overflow-hidden">
            <div className="text-xs text-gray-600 text-center">
              © 2025 HGU 슬기로운전전생활, All rights reserved.
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
