import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

const chapterTOC = {
  '/chapter/4': [
    { id: 'overview', title: '개요 (Overview)', level: 2 },
    { id: 'data-vs-control', title: '데이터 평면 vs 제어 평면', level: 3 },
    { id: 'service-model', title: '서비스 모델', level: 3 },
    { id: 'router-structure', title: '라우터 내부 구조', level: 2 },
    { id: 'ip-protocol', title: 'IP: Internet Protocol', level: 2 },
    { id: 'fragmentation', title: 'IP Fragmentation', level: 3 },
    { id: 'dhcp', title: 'DHCP', level: 3 },
    { id: 'nat-ipv6', title: 'NAT & IPv6', level: 3 },
  ],
  '/chapter/5': [
    { id: 'routing-algorithms', title: '라우팅 알고리즘', level: 2 },
    { id: 'as-routing', title: 'AS 간 라우팅', level: 2 },
    { id: 'intra-as', title: 'Intra-AS Routing', level: 3 },
    { id: 'inter-as', title: 'Inter-AS Routing', level: 3 },
    { id: 'sdn', title: 'SDN 제어 평면', level: 2 },
  ],
  '/chapter/6': [
    { id: 'link-layer-role', title: '링크 계층의 역할', level: 2 },
    { id: 'error-detection', title: '에러 탐지 및 정정', level: 2 },
    { id: 'crc', title: 'CRC', level: 3 },
    { id: 'mac-protocols', title: '다중 접속 프로토콜', level: 2 },
    { id: 'ethernet-switches', title: 'Ethernet & Switches', level: 2 },
    { id: 'simulation', title: '종합 시뮬레이션', level: 2 },
  ],
};

export function TOC() {
  const location = useLocation();
  const [activeId, setActiveId] = useState('');
  const headings = chapterTOC[location.pathname] || [];

  useEffect(() => {
    // Reset active on route change
    setActiveId('');

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Find the current section based on scroll position
      const sections = headings.map(h => {
        const element = document.getElementById(h.id);
        return {
          id: h.id,
          top: element ? element.offsetTop : 0
        };
      }).filter(s => s.top > 0);

      const current = sections
        .reverse()
        .find(section => scrollPosition >= section.top);

      if (current) {
        setActiveId(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, headings]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for any fixed headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block sticky top-0 h-screen w-64 p-6 overflow-y-auto z-30 shrink-0">
      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
        On This Page
      </h4>
      <ul className="space-y-2 text-sm border-l border-gray-800">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(
             "transition-colors",
             heading.level === 3 && "pl-4",
             heading.level === 2 && "pl-2"
          )}>
            <a 
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={cn(
                "block py-1 hover:text-emerald-400 transition-colors cursor-pointer",
                activeId === heading.id 
                  ? "text-emerald-400 border-l-2 border-emerald-400 -ml-[1px] pl-3" 
                  : "text-gray-500"
              )}
            >
              {heading.text || heading.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
