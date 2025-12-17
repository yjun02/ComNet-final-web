import React, { useState, useEffect } from 'react';
import { MousePointer2, RefreshCw, Sliders } from 'lucide-react';
import { InlineMath, BlockMath } from './MathUtils';

export function SigmoidVisual() {
  const [z, setZ] = useState(0); // Input value z
  
  // Sigmoid function
  const sigmoid = (x) => 1 / (1 + Math.exp(-x));
  
  // Coordinate transform
  const width = 300;
  const height = 200;
  const padding = 20;
  
  const toSvgX = (val) => ((val + 6) / 12) * (width - 2 * padding) + padding; // Range -6 to 6
  const toSvgY = (val) => height - padding - val * (height - 2 * padding); // Range 0 to 1

  // Generate curve points
  const points = [];
  for (let x = -6; x <= 6; x += 0.1) {
    points.push(`${toSvgX(x)},${toSvgY(sigmoid(x))}`);
  }

  const p = sigmoid(z);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1 w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48 md:h-64 bg-gray-950 rounded border border-gray-800">
           {/* Grid */}
           <line x1={padding} y1={toSvgY(0)} x2={width-padding} y2={toSvgY(0)} stroke="#333" strokeDasharray="4 4" />
           <line x1={padding} y1={toSvgY(0.5)} x2={width-padding} y2={toSvgY(0.5)} stroke="#333" strokeDasharray="4 4" />
           <line x1={padding} y1={toSvgY(1)} x2={width-padding} y2={toSvgY(1)} stroke="#333" strokeDasharray="4 4" />
           <line x1={toSvgX(0)} y1={height-padding} x2={toSvgX(0)} y2={padding} stroke="#333" />
           
           {/* Curve */}
           <polyline points={points.join(' ')} fill="none" stroke="#3b82f6" strokeWidth="3" />
           
           {/* Current Point */}
           <line 
             x1={toSvgX(z)} y1={height-padding} 
             x2={toSvgX(z)} y2={toSvgY(p)} 
             stroke="#f472b6" strokeWidth="1" strokeDasharray="4 2" 
           />
           <line 
             x1={padding} y1={toSvgY(p)} 
             x2={toSvgX(z)} y2={toSvgY(p)} 
             stroke="#f472b6" strokeWidth="1" strokeDasharray="4 2" 
           />
           <circle cx={toSvgX(z)} cy={toSvgY(p)} r="6" fill="#ec4899" />
           
           {/* Labels */}
           <text x={toSvgX(0) + 5} y={padding + 10} className="fill-gray-500 text-xs">P(y=1) = 1.0</text>
           <text x={toSvgX(0) + 5} y={toSvgY(0.5) - 5} className="fill-gray-500 text-xs">0.5</text>
        </svg>
      </div>

      <div className="md:w-64 space-y-6">
        <div>
           <h4 className="text-white font-bold mb-2">Sigmoid Function</h4>
           <div className="text-emerald-400 text-lg text-center bg-black/40 p-2 rounded border border-gray-800 mb-4">
               <InlineMath math="\sigma(z) = \frac{1}{1 + e^{-z}}" />
           </div>
        </div>

        <div>
           <div className="flex justify-between text-sm text-gray-400 mb-2">
               <span>Input z: <strong className="text-white">{z.toFixed(1)}</strong></span>
           </div>
           <input 
             type="range" min="-6" max="6" step="0.1" 
             value={z} 
             onChange={(e) => setZ(parseFloat(e.target.value))}
             className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
           />
        </div>

        <div className="bg-gray-800 p-4 rounded text-center">
            <div className="text-gray-400 text-xs mb-1">Probability P(y=1)</div>
            <div className={`text-3xl font-bold font-mono ${p > 0.5 ? 'text-blue-400' : 'text-gray-500'}`}>
                {p.toFixed(3)}
            </div>
            <div className="text-xs text-gray-500 mt-2">
                {p > 0.5 ? 'Class 1' : 'Class 0'} (Decision at 0.5)
            </div>
        </div>
      </div>
    </div>
  );
}

export function LinearBoundaryVisual() {
    const [slope, setSlope] = useState(-1.2);
    const [intercept, setIntercept] = useState(12);
    const [data, setData] = useState({ c0: [], c1: [] });
    
    // Generate Random Data
    const generateData = () => {
        const c0 = [];
        const c1 = [];
        // Class 0: Bottom Left roughly centered at (3.5, 3.5) with spread
        for(let i=0; i<30; i++) {
            c0.push({ 
                x: 3.5 + (Math.random() * 4 - 2) + (Math.random() - 0.5), 
                y: 3.5 + (Math.random() * 4 - 2) + (Math.random() - 0.5) 
            });
        }
        // Class 1: Top Right roughly centered at (7.5, 7.5) with spread
        for(let i=0; i<30; i++) {
            c1.push({ 
                x: 7.5 + (Math.random() * 4 - 2) + (Math.random() - 0.5), 
                y: 7.5 + (Math.random() * 4 - 2) + (Math.random() - 0.5) 
            });
        }
        setData({ c0, c1 });
    };

    useEffect(() => {
        generateData();
    }, []);
    
    const toSvg = (val) => val * 20;
    
    // Calculate Accuracy based on current boundary
    // Line: y = slope * x + intercept
    // Class 1 (Blue) should be ABOVE line: y > mx + c
    // Class 0 (Red) should be BELOW line: y <= mx + c
    const calculateAccuracy = () => {
        if(data.c0.length === 0) return 0;
        let correct = 0;
        
        data.c0.forEach(p => { if (p.y <= slope * p.x + intercept) correct++; });
        data.c1.forEach(p => { if (p.y > slope * p.x + intercept) correct++; });
        
        return ((correct / (data.c0.length + data.c1.length)) * 100);
    };
    
    const acc = calculateAccuracy();

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row gap-8">
            <div className="flex-1 min-h-[300px] relative bg-gray-950 rounded border border-gray-800 overflow-hidden cursor-crosshair group">
                <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-black/60 backdrop-blur rounded text-xs text-gray-400 border border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-red-400">● Class 0</span> vs <span className="text-blue-400">● Class 1</span>
                </div>
                <svg viewBox="0 0 200 200" className="w-full h-full"> 
                    <defs>
                        <pattern id="grid-dynamic" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#222" strokeWidth="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-dynamic)" />
                    
                    {/* Boundary Line */}
                    <line 
                        x1={0} y1={200 - toSvg(intercept)} 
                        x2={200} y2={200 - toSvg(slope * 10 + intercept)} 
                        stroke="#facc15" strokeWidth="3" 
                        strokeLinecap="round"
                        className="transition-all duration-75 ease-linear shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                    />

                    {/* Data Points */}
                    {data.c0.map((p, i) => (
                        <circle 
                            key={`c0-${i}`} 
                            cx={toSvg(p.x)} cy={200 - toSvg(p.y)} 
                            r={p.y <= slope * p.x + intercept ? 4 : 5} 
                            fill={p.y <= slope * p.x + intercept ? "#ef4444" : "#ef4444"} 
                            stroke={p.y <= slope * p.x + intercept ? "none" : "#fff"}
                            strokeWidth="2"
                            opacity="0.8" 
                            className="transition-all duration-500" 
                        />
                    ))}
                     {data.c1.map((p, i) => (
                        <circle 
                            key={`c1-${i}`} 
                            cx={toSvg(p.x)} cy={200 - toSvg(p.y)} 
                            r={p.y > slope * p.x + intercept ? 4 : 5} 
                            fill={p.y > slope * p.x + intercept ? "#3b82f6" : "#3b82f6"} 
                            stroke={p.y > slope * p.x + intercept ? "none" : "#fff"}
                            strokeWidth="2"
                            opacity="0.8" 
                            className="transition-all duration-500" 
                        />
                    ))}
                </svg>
            </div>
            
            <div className="md:w-72 space-y-8 flex flex-col justify-center">
                <div className="bg-gray-800 p-5 rounded-xl text-center shadow-lg border border-gray-700">
                    <div className="text-gray-400 text-xs mb-2 uppercase tracking-wider font-bold">Current Parameters</div>
                    <div className="flex justify-around items-center">
                         <div>
                             <div className="text-xs text-gray-500 mb-1">Slope (w)</div>
                             <div className="text-xl font-mono font-bold text-white">{slope.toFixed(2)}</div>
                         </div>
                         <div className="w-px h-8 bg-gray-700"></div>
                         <div>
                             <div className="text-xs text-gray-500 mb-1">Intercept (b)</div>
                             <div className="text-xl font-mono font-bold text-white">{intercept.toFixed(1)}</div>
                         </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                         <div className="flex justify-between text-xs text-gray-400 mb-2 font-bold">
                             <span>Rotate Boundary (Slope)</span>
                         </div>
                         <input 
                            type="range" min="-3" max="1" step="0.05" 
                            value={slope} onChange={e => setSlope(parseFloat(e.target.value))} 
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 hover:accent-yellow-400" 
                        />
                    </div>
                    <div>
                         <div className="flex justify-between text-xs text-gray-400 mb-2 font-bold">
                             <span>Shift Boundary (Intercept)</span>
                         </div>
                         <input 
                            type="range" min="0" max="20" step="0.1" 
                            value={intercept} onChange={e => setIntercept(parseFloat(e.target.value))} 
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 hover:accent-yellow-400" 
                        />
                    </div>
                </div>
                
                <div className="flex items-center gap-4 bg-gray-900/50 p-2 rounded-lg border border-gray-800">
                    <div className="flex-1 text-center">
                        <div className="text-gray-500 text-[10px] uppercase mb-1">Accuracy</div>
                        <div className={`text-3xl font-mono font-bold ${acc >= 95 ? 'text-emerald-400' : acc >= 80 ? 'text-blue-400' : 'text-red-400'}`}>
                            {acc.toFixed(0)}%
                        </div>
                    </div>
                    <button 
                        onClick={generateData}
                        className="p-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-all shadow-lg hover:shadow-blue-500/30 active:scale-95"
                        title="Generate New Data"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>
                
                 <p className="text-[10px] text-gray-500 text-center">
                    * 흰 테두리가 있는 점은 <strong>오분류(Misclassified)</strong>된 데이터입니다.
                </p>
            </div>
        </div>
    );
}

export function LDAVisual() {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 relative overflow-hidden">
             <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                 {/* Bad Projection */}
                 <div className="text-center group">
                     <div className="w-48 h-48 relative border border-gray-800 bg-gray-950 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                         {/* Axis */}
                         <div className="absolute w-full h-0.5 bg-gray-600 rotate-0"></div>
                         {/* Projected points (Mixed) */}
                         <div className="absolute w-full flex justify-center gap-1 items-center z-10">
                              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                              <div className="w-3 h-3 rounded-full bg-blue-500/50"></div>
                              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                              <div className="w-3 h-3 rounded-full bg-blue-500/50"></div>
                         </div>
                         <div className="absolute bottom-4 text-xs text-gray-500">Bad Projection</div>
                     </div>
                     <p className="text-sm text-gray-400">데이터가 겹침 (Overlap)</p>
                 </div>

                 <div className="hidden md:block text-gray-600"><RefreshCw size={24} /></div>

                 {/* Good Projection (LDA) */}
                 <div className="text-center group">
                     <div className="w-48 h-48 relative border border-emerald-900/50 bg-emerald-900/10 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                         {/* Axis (Diagonal) */}
                         <div className="absolute w-full h-0.5 bg-emerald-500 -rotate-45"></div>
                         {/* Projected points (Separated) */}
                         <div className="absolute w-full h-full flex items-center justify-center">
                              {/* Class 0 */}
                              <div className="absolute transform -translate-x-8 -translate-y-8 flex gap-1">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              </div>
                              {/* Class 1 */}
                              <div className="absolute transform translate-x-8 translate-y-8 flex gap-1">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                              </div>
                         </div>
                         <div className="absolute bottom-4 text-xs text-emerald-400 font-bold">LDA Projection</div>
                     </div>
                     <p className="text-sm text-gray-400">명확한 분리 (Separation)</p>
                 </div>
             </div>
             
             <div className="mt-8 bg-black/40 p-4 rounded text-center border border-gray-800">
                  <h5 className="text-white font-bold mb-2">Fisher's Criterion</h5>
                  <div className="flex justify-center gap-4 text-sm">
                      <div className="text-emerald-400">
                          <span className="block text-xs text-gray-500">Maximize</span>
                          Between-class Variance
                      </div>
                      <div className="text-gray-600">vs</div>
                      <div className="text-red-400">
                           <span className="block text-xs text-gray-500">Minimize</span>
                           Within-class Variance
                      </div>
                  </div>
             </div>
        </div>
    );
}
