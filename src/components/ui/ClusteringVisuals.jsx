import React, { useState } from 'react';
import { InlineMath, BlockMath } from './MathUtils';

export function KMeansVisual() {
  return (
    <div className="w-full h-64 bg-gray-900 border border-gray-800 rounded-lg relative overflow-hidden flex items-center justify-center">
      <svg viewBox="0 0 400 300" className="w-full h-full">
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" strokeWidth="0.5"/>
          </pattern>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Cluster 1 (Red) */}
        <g fill="rgba(239, 68, 68, 0.4)">
          <circle cx="100" cy="100" r="4" />
          <circle cx="90" cy="110" r="4" />
          <circle cx="110" cy="90" r="4" />
          <circle cx="80" cy="100" r="4" />
          <circle cx="120" cy="110" r="4" />
          <circle cx="100" cy="80" r="4" />
        </g>
        {/* Centroid 1 */}
        <path d="M 95 95 L 105 105 M 105 95 L 95 105" stroke="#ef4444" strokeWidth="3" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>

        {/* Cluster 2 (Blue) */}
        <g fill="rgba(59, 130, 246, 0.4)">
          <circle cx="250" cy="200" r="4" />
          <circle cx="260" cy="190" r="4" />
          <circle cx="240" cy="210" r="4" />
          <circle cx="270" cy="200" r="4" />
          <circle cx="250" cy="220" r="4" />
          <circle cx="230" cy="190" r="4" />
        </g>
         {/* Centroid 2 */}
         <path d="M 245 195 L 255 205 M 255 195 L 245 205" stroke="#3b82f6" strokeWidth="3" />
         <circle cx="250" cy="200" r="40" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>

        {/* Cluster 3 (Emerald) */}
        <g fill="rgba(16, 185, 129, 0.4)">
          <circle cx="300" cy="80" r="4" />
          <circle cx="310" cy="70" r="4" />
          <circle cx="290" cy="90" r="4" />
          <circle cx="320" cy="80" r="4" />
          <circle cx="300" cy="60" r="4" />
        </g>
         {/* Centroid 3 */}
         <path d="M 295 75 L 305 85 M 305 75 L 295 85" stroke="#10b981" strokeWidth="3" />
         <circle cx="300" cy="80" r="35" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
        
        {/* Arrows indicating movement (Conceptual) */}
        <path d="M 120 120 L 130 130" stroke="#555" strokeWidth="1" markerEnd="url(#arrowhead)"/>
      </svg>
      <div className="absolute bottom-2 right-4 text-xs text-gray-400">
        <span className="text-red-400 font-bold">X</span> Centroids minimize variance
      </div>
    </div>
  );
}

export function DendrogramVisual() {
  return (
    <div className="w-full h-64 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center p-4">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        <g stroke="#9ca3af" strokeWidth="2" fill="none">
          {/* Level 1 (Bottom leaves) */}
          <line x1="50" y1="180" x2="50" y2="150" />
          <line x1="100" y1="180" x2="100" y2="150" />
          
          <line x1="200" y1="180" x2="200" y2="120" />
          
          <line x1="300" y1="180" x2="300" y2="150" />
          <line x1="350" y1="180" x2="350" y2="150" />

          {/* Level 2 (Connections) */}
          {/* A & B */}
          <path d="M 50 150 L 50 100 L 100 100 L 100 150" />
          
          {/* D & E */}
          <path d="M 300 150 L 300 90 L 350 90 L 350 150" />

          {/* Level 3 */}
          {/* (AB) & C */}
          <path d="M 75 100 L 75 60 L 200 60 L 200 120" />

          {/* Level 4 (Root) */}
          {/* (ABC) & (DE) */}
          <path d="M 137.5 60 L 137.5 20 L 325 20 L 325 90" />
        </g>
        
        {/* Labels */}
        <g className="text-xs fill-gray-400" textAnchor="middle">
          <text x="50" y="195">A</text>
          <text x="100" y="195">B</text>
          <text x="200" y="195">C</text>
          <text x="300" y="195">D</text>
          <text x="350" y="195">E</text>
        </g>
        
        {/* Cut Line */}
        <line x1="0" y1="50" x2="400" y2="50" stroke="#ef4444" strokeWidth="1" strokeDasharray="5 5" />
        <text x="10" y="45" className="fill-red-400 text-xs">Different Cut = Different K</text>
      </svg>
    </div>
  );
}

export function LinkageVisual() {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <h5 className="text-gray-300 text-sm mb-4 font-bold text-center">Distance Measures (Linkage)</h5>
            <div className="flex justify-around gap-2">
                {/* Single Link */}
                <div className="flex-1 flex flex-col items-center">
                    <svg viewBox="0 0 100 80" className="w-24 h-24 mb-2">
                        <g fill="#4ade80" opacity="0.3"><circle cx="25" cy="40" r="20"/><circle cx="75" cy="40" r="20"/></g>
                        <circle cx="35" cy="40" r="2" fill="white"/> <circle cx="65" cy="40" r="2" fill="white"/>
                        <line x1="35" y1="40" x2="65" y2="40" stroke="#facc15" strokeWidth="2" strokeDasharray="2 2" />
                    </svg>
                    <span className="text-xs text-yellow-400 font-bold">Single (Min)</span>
                </div>
                {/* Complete Link */}
                <div className="flex-1 flex flex-col items-center">
                    <svg viewBox="0 0 100 80" className="w-24 h-24 mb-2">
                         <g fill="#4ade80" opacity="0.3"><circle cx="25" cy="40" r="20"/><circle cx="75" cy="40" r="20"/></g>
                         <circle cx="10" cy="40" r="2" fill="white"/> <circle cx="90" cy="40" r="2" fill="white"/>
                         <line x1="10" y1="40" x2="90" y2="40" stroke="#facc15" strokeWidth="2" strokeDasharray="2 2" />
                    </svg>
                    <span className="text-xs text-yellow-400 font-bold">Complete (Max)</span>
                </div>
                 {/* Average Link */}
                 <div className="flex-1 flex flex-col items-center">
                    <svg viewBox="0 0 100 80" className="w-24 h-24 mb-2">
                         <g fill="#4ade80" opacity="0.3"><circle cx="25" cy="40" r="20"/><circle cx="75" cy="40" r="20"/></g>
                         <circle cx="25" cy="40" r="2" fill="white"/> <circle cx="75" cy="40" r="2" fill="white"/>
                         <line x1="25" y1="40" x2="75" y2="40" stroke="#facc15" strokeWidth="2" strokeDasharray="2 2" />
                    </svg>
                    <span className="text-xs text-yellow-400 font-bold">Centroid dist.</span>
                </div>
            </div>
        </div>
    );
}

export function DistanceMetricsVisual() {
    const [active, setActive] = useState('Euclidean');

    const metrics = [
        { id: 'Euclidean', label: 'Euclidean', desc: '직선 거리. 가장 일반적인 거리 척도.', formula: 'd = \\sqrt{\\sum (x_i - y_i)^2}' },
        { id: 'Cosine', label: 'Cosine', desc: '두 벡터 사이의 각도 코사인 값. 방향성 중시.', formula: '\\cos \\theta = \\frac{A \\cdot B}{\\|A\\| \\|B\\|}' },
        { id: 'Manhattan', label: 'Manhattan', desc: '격자 거리 (L1). 도시 블록 이동 거리 합.', formula: 'd = \\sum |x_i - y_i|' },
        { id: 'Mahalanobis', label: 'Mahalanobis', desc: '데이터의 분산/공분산을 고려한 거리. 이상치 탐지에 유용.', formula: 'd = \\sqrt{(x-y)^T S^{-1} (x-y)}' },
        { id: 'Hamming', label: 'Hamming', desc: '길이가 같은 두 문자열에서 다른 문자의 개수.', formula: '\\text{Different Bits Count}' },
        { id: 'Haversine', label: 'Haversine', desc: '구면(지구) 위의 두 지점 사이의 최단 거리.', formula: '\\text{Great-circle distance}' },
        { id: 'Chebyshev', label: 'Chebyshev', desc: '체스판 킹의 이동 거리. 좌표 차이의 최댓값.', formula: 'd = \\max(|x_i - y_i|)' },
        { id: 'Jaccard', label: 'Jaccard', desc: '집합 간의 유사도. 교집합 / 합집합.', formula: 'J = \\frac{|A \\cap B|}{|A \\cup B|}' },
    ];

    const activeMetric = metrics.find(m => m.id === active);

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row min-h-[400px]">
            {/* Sidebar (Buttons) */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto border-b md:border-b-0 md:border-r border-gray-800 md:w-48 shrink-0 scrollbar-hide bg-gray-950/50">
                {metrics.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => setActive(m.id)}
                        className={`px-4 py-3 text-sm text-left whitespace-nowrap md:whitespace-normal transition-all duration-200 ${
                            active === m.id 
                            ? 'bg-blue-600/20 text-blue-400 border-b-2 md:border-b-0 md:border-l-2 border-blue-500 font-bold pl-5' 
                            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                        }`}
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            {/* Content Visualization */}
            <div className="flex-1 p-6 flex flex-col items-center justify-center bg-gray-900/50">
                <div className="flex flex-col xl:flex-row gap-8 items-center justify-center w-full max-w-4xl">
                    {/* Visual */}
                    <div className="w-64 h-64 shrink-0 bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-center relative shadow-inner">
                        <svg viewBox="0 0 200 200" className="w-full h-full p-4">
                            <defs>
                                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                    <path d="M0,0 L0,6 L6,3 z" fill="#60a5fa" />
                                </marker>
                            </defs>
                            
                            {/* Common Points */}
                            {active !== 'Jaccard' && active !== 'Hamming' && active !== 'Haversine' && (
                                <>
                                    <line x1="20" y1="180" x2="180" y2="180" stroke="#333" strokeWidth="1" />
                                    <line x1="20" y1="180" x2="20" y2="20" stroke="#333" strokeWidth="1" />
                                </>
                            )}
                            
                            {active === 'Euclidean' && (
                                <>
                                    <circle cx="50" cy="150" r="4" fill="#60a5fa" />
                                    <circle cx="150" cy="50" r="4" fill="#f472b6" />
                                    <line x1="50" y1="150" x2="150" y2="50" stroke="#4ade80" strokeWidth="2" strokeDasharray="4 2" />
                                    <text x="100" y="90" fill="#4ade80" fontSize="12" textAnchor="middle">Direct Path</text>
                                </>
                            )}

                            {active === 'Cosine' && (
                                <>
                                    <line x1="20" y1="180" x2="160" y2="150" stroke="#60a5fa" strokeWidth="3" markerEnd="url(#arrow)" />
                                    <line x1="20" y1="180" x2="120" y2="60" stroke="#f472b6" strokeWidth="3" markerEnd="url(#arrow)" />
                                    <path d="M 60 172 A 40 40 0 0 0 50 144" fill="none" stroke="#facc15" strokeWidth="2" />
                                    <text x="75" y="150" fill="#facc15" fontSize="14">θ</text>
                                </>
                            )}

                            {active === 'Manhattan' && (
                                <>
                                    <circle cx="50" cy="150" r="4" fill="#60a5fa" />
                                    <circle cx="150" cy="50" r="4" fill="#f472b6" />
                                    {/* Grid path */}
                                    <path d="M 50 150 L 150 150 L 150 50" fill="none" stroke="#4ade80" strokeWidth="2" />
                                    <path d="M 50 150 L 50 50 L 150 50" fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.3" strokeDasharray="4 4" />
                                    <text x="100" y="165" fill="#4ade80" fontSize="12" textAnchor="middle">|x1-x2|</text>
                                    <text x="160" y="100" fill="#4ade80" fontSize="12" writingMode="tb">|y1-y2|</text>
                                </>
                            )}

                            {active === 'Mahalanobis' && (
                                <>
                                     <ellipse cx="100" cy="100" rx="60" ry="30" fill="rgba(96, 165, 250, 0.1)" stroke="#60a5fa" strokeWidth="1" transform="rotate(-30 100 100)" />
                                     <ellipse cx="100" cy="100" rx="30" ry="15" fill="rgba(96, 165, 250, 0.2)" stroke="#60a5fa" strokeWidth="1" transform="rotate(-30 100 100)" />
                                     <circle cx="100" cy="100" r="3" fill="white" />
                                     <text x="100" y="190" fill="gray" fontSize="10" textAnchor="middle">Mean</text>
                                     <circle cx="140" cy="65" r="4" fill="#f472b6" />
                                     <line x1="100" y1="100" x2="140" y2="65" stroke="#f472b6" strokeWidth="2" strokeDasharray="2 2" />
                                </>
                            )}

                            {active === 'Hamming' && (
                                <g className="font-mono text-xl" textAnchor="middle">
                                    <text x="100" y="60" fill="gray">1011<tspan fill="#f472b6" fontWeight="bold">0</tspan>1</text>
                                    <text x="100" y="90" fill="gray">1011<tspan fill="#4ade80" fontWeight="bold">1</tspan>1</text>
                                    <text x="100" y="140" fontSize="12" fill="white">Diff = 1</text>
                                    <rect x="130" y="45" width="20" height="50" fill="none" stroke="#facc15" strokeWidth="2" rx="4" />
                                </g>
                            )}

                            {active === 'Haversine' && (
                                <>
                                    <circle cx="100" cy="100" r="80" fill="url(#globeGrad)" stroke="#333" strokeWidth="1" />
                                    <defs>
                                        <radialGradient id="globeGrad" cx="0.5" cy="0.5" r="0.5">
                                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2"/>
                                            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.5"/>
                                        </radialGradient>
                                    </defs>
                                    <path d="M 60 100 Q 100 60 140 100" fill="none" stroke="#facc15" strokeWidth="2" />
                                    <circle cx="60" cy="100" r="4" fill="#60a5fa" />
                                    <circle cx="140" cy="100" r="4" fill="#f472b6" />
                                    <text x="100" y="70" fill="#facc15" fontSize="10" textAnchor="middle">Curve Path</text>
                                </>
                            )}

                            { active === 'Chebyshev' && (
                                <>
                                    <circle cx="50" cy="150" r="4" fill="#60a5fa" />
                                    <circle cx="150" cy="50" r="4" fill="#f472b6" />
                                    <rect x="50" y="50" width="100" height="100" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" />
                                    <line x1="50" y1="150" x2="150" y2="150" stroke="#333" strokeWidth="2" />
                                    <line x1="50" y1="150" x2="50" y2="50" stroke="#f472b6" strokeWidth="2" />
                                    <text x="100" y="170" fill="gray" fontSize="10">dx = 100</text>
                                    <text x="20" y="100" fill="#f472b6" fontSize="10">dy = 100</text>
                                    <text x="100" y="40" fill="#white" fontSize="12" textAnchor="middle">Max(dx, dy)</text>
                                </>
                            )}

                            { active === 'Jaccard' && (
                                <>
                                     <circle cx="80" cy="100" r="50" fill="rgba(96, 165, 250, 0.5)" stroke="#60a5fa" />
                                     <circle cx="120" cy="100" r="50" fill="rgba(244, 114, 182, 0.5)" stroke="#f472b6" />
                                     <path d="M 120 100 A 50 50 0 0 0 80 100 A 50 50 0 0 0 120 100" fill="#7c3aed" opacity="0.8" />
                                     <text x="100" y="105" fill="white" fontSize="10" textAnchor="middle">Intersection</text>
                                     <text x="40" y="100" fill="white" fontSize="12">A</text>
                                     <text x="160" y="100" fill="white" fontSize="12">B</text>
                                </>
                            )}

                        </svg>
                    </div>

                    {/* Description */}
                    <div className="flex-1 space-y-4 min-w-[300px]">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            {activeMetric.label} Distance
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            {activeMetric.desc}
                        </p>
                        <div className="bg-black/40 p-4 rounded-lg border border-gray-800 backdrop-blur-sm">
                            <span className="text-xs text-gray-500 font-mono mb-2 block">Mathematical Formula</span>
                            <div className="text-emerald-400 text-lg flex items-center justify-center h-16">
                                <InlineMath math={activeMetric.formula} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
