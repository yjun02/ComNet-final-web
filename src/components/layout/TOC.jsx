import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

const chapterTOC = {
  // Computer Network Chapters
  '/comnet/chapter/4': [
    { id: 'forwarding-vs-routing', title: 'Forwarding vs. Routing', level: 2 },
    { id: 'router-structure', title: '라우터 내부 구조', level: 2 },
    { id: 'lpm', title: '심화: LPM', level: 3 },
    { id: 'hol-blocking', title: '심화: HOL Blocking', level: 3 },
    { id: 'scheduling', title: '패킷 스케줄링', level: 3 },
    { id: 'ip-protocol', title: 'IP Protocol & Addressing', level: 2 },
    { id: 'fragmentation', title: 'IP Fragmentation', level: 3 },
    { id: 'dhcp', title: 'DHCP: 자동 IP 할당', level: 3 },
    { id: 'nat', title: 'NAT', level: 3 },
    { id: 'ipv6', title: 'IPv6', level: 3 },
    { id: 'sdn', title: 'Generalized Forwarding (SDN)', level: 2 },
  ],
  '/comnet/chapter/5': [
    { id: 'overview-cp', title: '제어 평면 개요', level: 2 },
    { id: 'routing-algo', title: '라우팅 알고리즘', level: 2 },
    { id: 'ls-algo', title: '심화: Link State', level: 3 },
    { id: 'dv-algo', title: '심화: Distance Vector', level: 3 },
    { id: 'as-routing', title: '인터넷 라우팅 (BGP)', level: 2 },
    { id: 'sdn-control', title: 'SDN 제어 평면', level: 2 },
    { id: 'protocols', title: 'ICMP & SNMP', level: 2 },
  ],
  '/comnet/chapter/6': [
    { id: 'link-layer-role', title: '링크 계층의 역할', level: 2 },
    { id: 'error-detection', title: '심화: 에러 감지', level: 3 },
    { id: 'mac-protocols', title: '다중 접속 프로토콜', level: 2 },
    { id: 'csma-cd', title: '심화: CSMA/CD', level: 3 },
    { id: 'ethernet-frame', title: 'Ethernet 프레임', level: 2 },
    { id: 'mac-address', title: 'MAC 주소', level: 3 },
    { id: 'arp', title: 'ARP', level: 3 },
    { id: 'switches', title: '스위치 (Switch)', level: 2 },
    { id: 'simulation', title: '종합 시뮬레이션', level: 2 },
  ],
  // Machine Learning Chapters
  '/ml/chapter/7': [
    { id: 'intro', title: '비지도 학습과 탐색', level: 2 },
    { id: 'hierarchical', title: '계층적 클러스터링', level: 2 },
    { id: 'kmeans', title: 'K-Means 클러스터링', level: 2 },
    { id: 'practical', title: '실전적 이슈 (Elbow)', level: 2 },
    { id: 'distances', title: '거리 측정 방식', level: 2 },
    { id: 'extensions', title: '확장 및 대안', level: 2 },
  ],
  '/ml/chapter/8': [
    { id: 'intro', title: '회귀 분석이란?', level: 2 },
    { id: 'model', title: '선형 회귀 모델', level: 2 },
    { id: 'probabilistic', title: '제곱 오차의 의미', level: 2 },
    { id: 'solutions', title: '최적 해 탐색', level: 2 },
    { id: 'basis-function', title: '기저 함수 (Basis)', level: 2 },
    { id: 'metrics', title: '성능 평가 지표', level: 2 },
    { id: 'regularization', title: '과적합과 정규화', level: 2 },
  ],
  '/ml/chapter/9': [
    { id: 'intro', title: '분류(Classification)', level: 2 },
    { id: 'models', title: '생성 vs 판별 모델', level: 2 },
    { id: 'lda', title: 'LDA', level: 2 },
    { id: 'logistic', title: '로지스틱 회귀', level: 2 },
    { id: 'multiclass', title: '다중 클래스 분류', level: 2 },
  ],
  '/ml/chapter/10': [
    { id: 'history', title: '퍼셉트론과 역사', level: 2 },
    { id: 'mlp', title: '다층 퍼셉트론 (MLP)', level: 2 },
    { id: 'activation', title: '활성화 함수', level: 2 },
    { id: 'learning', title: '학습과 역전파', level: 2 },
    { id: 'optimization', title: '최적화와 규제', level: 2 },
    { id: 'cnn', title: 'CNN (이미지 처리)', level: 2 },
  ],
};

export function TOC() {
  const location = useLocation();
  const [activeId, setActiveId] = useState('');
  
  // Normalize pathname: remove trailing slash for consistent matching
  const normalizedPath = location.pathname.endsWith('/') && location.pathname.length > 1
    ? location.pathname.slice(0, -1)
    : location.pathname;

  const headings = chapterTOC[normalizedPath] || [];

  const isMl = normalizedPath.startsWith('/ml');
  const activeColor = isMl ? "text-blue-400" : "text-emerald-400";
  const borderColor = isMl ? "border-blue-400" : "border-emerald-400";
  const hoverColor = isMl ? "hover:text-blue-400" : "hover:text-emerald-400";

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
                "block py-1 transition-colors cursor-pointer",
                hoverColor,
                activeId === heading.id 
                  ? `${activeColor} border-l-2 ${borderColor} -ml-[1px] pl-3` 
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
