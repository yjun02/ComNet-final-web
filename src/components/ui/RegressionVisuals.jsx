import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Play, Pause, Plus, Trash2, Calculator } from 'lucide-react';
import { InlineMath } from './MathUtils';

export function InteractiveRegression() {
  const [points, setPoints] = useState([
    { x: 20, y: 30 }, { x: 40, y: 50 }, { x: 60, y: 40 }, 
    { x: 80, y: 70 }, { x: 100, y: 60 }, { x: 120, y: 90 }
  ]);
  const [w, setW] = useState(0.5);
  const [b, setB] = useState(20);
  const [isAuto, setIsAuto] = useState(false);

  // SVG 좌표계 변환 (0~200)
  const toSvgX = (x) => x + 20;
  const toSvgY = (y) => 200 - y - 20;
  
  // 역변환 (클릭 좌표 -> 데이터 좌표)
  const fromSvgX = (sx) => sx - 20;
  const fromSvgY = (sy) => 200 - sy - 20;

  const handleSvgClick = (e) => {
    const svg = e.target.closest('svg');
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 범위 제한
    const px = Math.max(0, Math.min(200, fromSvgX(x * (240/rect.width)))); // viewBox width 240
    const py = Math.max(0, Math.min(200, fromSvgY(y * (240/rect.height))));

    setPoints([...points, { x: px, y: py }]);
    setIsAuto(false);
  };

  // MSE 계산
  const calculateMSE = () => {
    if (points.length === 0) return 0;
    const sum = points.reduce((acc, p) => acc + Math.pow((p.x * w + b) - p.y, 2), 0);
    return sum / points.length;
  };

  // 해석적 해 (Normal Equation) - 간단한 1차원 버전
  const solveExact = () => {
    if (points.length < 2) return;
    
    const n = points.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    
    points.forEach(p => {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumXX += p.x * p.x;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    setW(slope);
    setB(intercept);
    setIsAuto(true);
  };

  const mse = calculateMSE();

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-1 relative">
        <div className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-1 rounded text-xs text-gray-400">
           Click to add points
        </div>
        <svg 
            viewBox="0 0 240 240" 
            className="w-full h-64 bg-gray-950 border border-gray-800 rounded cursor-crosshair"
            onClick={handleSvgClick}
        >
            {/* Grid */}
            <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#222" strokeWidth="1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Axes */}
            <line x1="20" y1="220" x2="220" y2="220" stroke="#666" strokeWidth="2" />
            <line x1="20" y1="220" x2="20" y2="20" stroke="#666" strokeWidth="2" />

            {/* Regression Line */}
            <line 
                x1={toSvgX(0)} 
                y1={toSvgY(b)} 
                x2={toSvgX(200)} 
                y2={toSvgY(200 * w + b)} 
                stroke={isAuto ? "#10b981" : "#f472b6"} 
                strokeWidth="3" 
                strokeDasharray={isAuto ? "" : "4 2"}
            />

            {/* Residuals (Error lines) */}
            {points.map((p, i) => {
                const predY = p.x * w + b;
                return (
                    <line 
                        key={`res-${i}`}
                        x1={toSvgX(p.x)}
                        y1={toSvgY(p.y)}
                        x2={toSvgX(p.x)}
                        y2={toSvgY(predY)}
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="1"
                    />
                );
            })}

            {/* Points */}
            {points.map((p, i) => (
                <circle 
                    key={i} 
                    cx={toSvgX(p.x)} 
                    cy={toSvgY(p.y)} 
                    r="4" 
                    fill="#60a5fa" 
                    className="hover:r-6 transition-all"
                />
            ))}
        </svg>
      </div>

      <div className="md:w-64 space-y-6">
          <div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Calculator size={18} /> Model Controls
              </h4>
              
              <div className="space-y-4">
                  <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Slope (w): {w.toFixed(2)}</span>
                      </div>
                      <input 
                          type="range" min="-2" max="2" step="0.01" 
                          value={w} 
                          onChange={(e) => { setW(parseFloat(e.target.value)); setIsAuto(false); }}
                          className="w-full accent-blue-500 bg-gray-700 h-2 rounded cursor-pointer"
                      />
                  </div>
                  <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Intercept (b): {b.toFixed(0)}</span>
                      </div>
                      <input 
                          type="range" min="-50" max="250" step="1" 
                          value={b} 
                          onChange={(e) => { setB(parseFloat(e.target.value)); setIsAuto(false); }}
                          className="w-full accent-blue-500 bg-gray-700 h-2 rounded cursor-pointer"
                      />
                  </div>
              </div>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg text-center">
              <div className="text-gray-400 text-xs mb-1">Mean Squared Error (MSE)</div>
              <div className={`text-2xl font-mono font-bold ${mse < 100 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {mse.toFixed(1)}
              </div>
          </div>

          <div className="flex gap-2">
              <button 
                onClick={solveExact}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded text-sm font-bold transition-colors flex items-center justify-center gap-2"
              >
                  Auto Fit <RefreshCw size={14} />
              </button>
              <button 
                onClick={() => { setPoints([]); setW(0.5); setB(20); }}
                className="bg-red-900/50 hover:bg-red-900/80 text-red-200 p-2 rounded transition-colors"
                title="Clear Points"
              >
                  <Trash2 size={18} />
              </button>
          </div>
      </div>
    </div>
  );
}

export function GradientDescentVisual() {
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    
    // y = x^2 (Parabola)
    const curvePoints = [];
    for(let x = -10; x <= 10; x += 0.5) {
        curvePoints.push(`${(x + 10) * 15},${250 - (x*x + 10) * 4}`); // Scale and shift
    }
    const pathData = `M ${curvePoints.join(' L ')}`;

    // Fake gradient descent path
    const wHistory = [-9, -7, -5.5, -4.2, -3.1, -2.2, -1.5, -0.9, -0.4, -0.1, 0];
    const currentW = wHistory[Math.min(step, wHistory.length - 1)];
    
    // Map W to SVG coords
    const getCx = (val) => (val + 10) * 15;
    const getCy = (val) => 250 - (val*val + 10) * 4;

    useEffect(() => {
        let interval;
        if (isPlaying && step < wHistory.length - 1) {
            interval = setInterval(() => {
                setStep(s => s + 1);
            }, 500);
        } else if (step >= wHistory.length - 1) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, step]);

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/2 h-64 relative">
                <svg viewBox="0 0 300 250" className="w-full h-full">
                    {/* Curve */}
                    <path d={pathData} fill="none" stroke="#4b5563" strokeWidth="2" />
                    
                    {/* Gradient Arrow */}
                    {step < wHistory.length - 1 && (
                         <line 
                            x1={getCx(currentW)} 
                            y1={getCy(currentW)} 
                            x2={getCx(wHistory[step+1])} 
                            y2={getCy(wHistory[step+1])} 
                            stroke="#facc15" 
                            strokeWidth="2" 
                            markerEnd="url(#arrow)"
                         />
                    )}
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#facc15" />
                        </marker>
                    </defs>

                    {/* Ball */}
                    <circle 
                        cx={getCx(currentW)} 
                        cy={getCy(currentW)} 
                        r="8" 
                        fill="#ef4444" 
                        className="transition-all duration-500 ease-in-out"
                    />
                    
                    {/* Tangent Line (Visual) */}
                    <line 
                        x1={getCx(currentW) - 30} 
                        y1={getCy(currentW) + 30 * (2*currentW) * (4/15)} 
                        x2={getCx(currentW) + 30} 
                        y2={getCy(currentW) - 30 * (2*currentW) * (4/15)} 
                        stroke="rgba(255,255,255,0.3)" 
                        strokeWidth="1"
                    />
                </svg>
            </div>
            
            <div className="flex-1 space-y-4 text-left">
                <h4 className="text-xl font-bold text-white">Gradient Descent Step-by-Step</h4>
                <p className="text-gray-400 text-sm">
                    공이 경사(Gradient)를 타고 내려오듯, 손실 함수의 미분값을 이용해 최소 지점(Global Minimum)을 찾아갑니다.
                </p>
                
                <div className="bg-black/40 p-3 rounded border border-gray-800 font-mono text-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Step:</span>
                        <span className="text-white">{step} / {wHistory.length-1}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Gradient (Slope):</span>
                        <span className={currentW > 0 ? "text-red-400" : "text-blue-400"}>
                            {(2 * currentW).toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Parameter W:</span>
                        <span className="text-emerald-400">{currentW.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2 text-sm font-bold"
                        disabled={step >= wHistory.length - 1}
                    >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        {isPlaying ? 'Pause' : 'Start Descent'}
                    </button>
                    <button 
                        onClick={() => { setStep(0); setIsPlaying(false); }}
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
                    >
                        <RefreshCw size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export function RegularizationVisual() {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* L1 Lasso */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center">
                <h5 className="text-white font-bold mb-4">Lasso (L1) - Diamond</h5>
                <svg viewBox="0 0 200 200" className="w-48 h-48">
                    {/* Contour Lines (Loss Function) */}
                    <ellipse cx="130" cy="70" rx="30" ry="20" fill="none" stroke="#333" strokeWidth="1" transform="rotate(45 130 70)"/>
                    <ellipse cx="130" cy="70" rx="50" ry="35" fill="none" stroke="#333" strokeWidth="1" transform="rotate(45 130 70)"/>
                    <ellipse cx="130" cy="70" rx="70" ry="50" fill="none" stroke="#333" strokeWidth="1" transform="rotate(45 130 70)"/>
                    
                    {/* Constraint Area (Diamond) */}
                    <path d="M 100 60 L 140 100 L 100 140 L 60 100 Z" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" />
                    
                    {/* Axes */}
                    <line x1="100" y1="20" x2="100" y2="180" stroke="#666" />
                    <line x1="20" y1="100" x2="180" y2="100" stroke="#666" />

                    {/* Intersection Point (Corner) */}
                    <circle cx="100" cy="60" r="4" fill="#ef4444" />
                    <text x="110" y="55" className="text-[10px] fill-red-400">Intersection at Axis</text>
                    <text x="110" y="65" className="text-[10px] fill-gray-400">(Sparsity)</text>
                </svg>
                <p className="text-xs text-center text-gray-400 mt-4">
                    마름모 꼴의 모서리(축)에서 만날 확률 높음 <br/>
                    → <strong>일부 가중치가 0이 됨 (Feature Selection)</strong>
                </p>
            </div>

            {/* L2 Ridge */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center">
                 <h5 className="text-white font-bold mb-4">Ridge (L2) - Circle</h5>
                 <svg viewBox="0 0 200 200" className="w-48 h-48">
                    {/* Contour Lines (Loss Function) */}
                    <ellipse cx="130" cy="70" rx="30" ry="20" fill="none" stroke="#333" strokeWidth="1" transform="rotate(45 130 70)"/>
                    <ellipse cx="130" cy="70" rx="50" ry="35" fill="none" stroke="#333" strokeWidth="1" transform="rotate(45 130 70)"/>
                    <ellipse cx="130" cy="70" rx="70" ry="50" fill="none" stroke="#333" strokeWidth="1" transform="rotate(45 130 70)"/>
                    
                    {/* Constraint Area (Circle) */}
                    <circle cx="100" cy="100" r="40" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
                    
                    {/* Axes */}
                    <line x1="100" y1="20" x2="100" y2="180" stroke="#666" />
                    <line x1="20" y1="100" x2="180" y2="100" stroke="#666" />

                    {/* Intersection Point (Start) */}
                    <circle cx="120" cy="72" r="4" fill="#ef4444" />
                    <text x="125" y="70" className="text-[10px] fill-red-400">Intersection</text>
                    <text x="125" y="80" className="text-[10px] fill-gray-400">(Non-zero)</text>
                </svg>
                <p className="text-xs text-center text-gray-400 mt-4">
                    원형이라 축 위가 아닌 곳에서 접할 확률 높음 <br/>
                    → <strong>가중치가 0에 가깝지만 0은 아님</strong>
                </p>
            </div>
        </div>
    );
}
