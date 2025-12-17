import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { InlineMath } from './MathUtils';
import { motion } from 'framer-motion';

// --- Neural Network Feed Foward Visual ---
export function NeuralNetworkFeedForward() {
  const [step, setStep] = useState(0); // 0: input, 1: hidden sum, 2: hidden act, 3: output sum, 4: output act
  const [inputs, setInputs] = useState([0.5, 0.8]);
  
  // Weights (Simplified)
  const w1 = [[0.5, -0.2], [0.1, 0.8]]; // 2x2
  const w2 = [0.6, -0.4]; // 2x1 to output
  
  // Calculations
  const h1_raw = inputs[0] * w1[0][0] + inputs[1] * w1[1][0]; // x1*w11 + x2*w21
  const h2_raw = inputs[0] * w1[0][1] + inputs[1] * w1[1][1]; // x1*w12 + x2*w22
  
  const sigmoid = x => 1 / (1 + Math.exp(-x));
  const h1 = sigmoid(h1_raw);
  const h2 = sigmoid(h2_raw);
  
  const o_raw = h1 * w2[0] + h2 * w2[1];
  const output = sigmoid(o_raw);

  const reset = () => {
    setStep(0);
    setInputs([Math.random().toFixed(1), Math.random().toFixed(1)]);
  };

  useEffect(() => {
    if(step > 0 && step < 4) {
        const timer = setTimeout(() => setStep(step + 1), 1000);
        return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row gap-8 items-center min-h-[400px]">
        <div className="flex-1 w-full h-80 relative">
             <svg viewBox="0 0 400 300" className="w-full h-full">
                 {/* Layers Labels */}
                 <text x="50" y="30" fill="gray" textAnchor="middle" fontSize="12">Input</text>
                 <text x="200" y="30" fill="gray" textAnchor="middle" fontSize="12">Hidden</text>
                 <text x="350" y="30" fill="gray" textAnchor="middle" fontSize="12">Output</text>
                 
                 {/* Links Input -> Hidden */}
                 <line x1="50" y1="100" x2="200" y2="100" stroke={step >= 1 ? "#3b82f6" : "#333"} strokeWidth={step >= 1 ? 2 : 1} strokeDasharray={step === 1 ? "5 5" : ""} className={step === 1 ? "animate-pulse" : ""} />
                 <line x1="50" y1="100" x2="200" y2="200" stroke={step >= 1 ? "#3b82f6" : "#333"} strokeWidth={step >= 1 ? 2 : 1} />
                 <line x1="50" y1="200" x2="200" y2="100" stroke={step >= 1 ? "#3b82f6" : "#333"} strokeWidth={step >= 1 ? 2 : 1} />
                 <line x1="50" y1="200" x2="200" y2="200" stroke={step >= 1 ? "#3b82f6" : "#333"} strokeWidth={step >= 1 ? 2 : 1} />

                 {/* Links Hidden -> Output */}
                 <line x1="200" y1="100" x2="350" y2="150" stroke={step >= 3 ? "#10b981" : "#333"} strokeWidth={step >= 3 ? 2 : 1} />
                 <line x1="200" y1="200" x2="350" y2="150" stroke={step >= 3 ? "#10b981" : "#333"} strokeWidth={step >= 3 ? 2 : 1} />

                 {/* Nodes - Input */}
                 <circle cx="50" cy="100" r="20" fill="#1e3a8a" stroke="white" />
                 <text x="50" y="105" fill="white" fontSize="10" textAnchor="middle">x1</text>
                 <text x="50" y="135" fill="#93c5fd" fontSize="10" textAnchor="middle">{inputs[0]}</text>
                 
                 <circle cx="50" cy="200" r="20" fill="#1e3a8a" stroke="white" />
                 <text x="50" y="205" fill="white" fontSize="10" textAnchor="middle">x2</text>
                 <text x="50" y="235" fill="#93c5fd" fontSize="10" textAnchor="middle">{inputs[1]}</text>

                 {/* Nodes - Hidden */}
                 <circle cx="200" cy="100" r="25" fill="#1f2937" stroke={step >= 2 ? "#3b82f6" : "#555"} strokeWidth={2} />
                 <text x="200" y="105" fill={step >= 2 ? "white" : "gray"} fontSize="10" textAnchor="middle">
                    {step < 2 ? "Σ" : `σ(${h1.toFixed(2)})`}
                 </text>

                 <circle cx="200" cy="200" r="25" fill="#1f2937" stroke={step >= 2 ? "#3b82f6" : "#555"} strokeWidth={2} />
                 <text x="200" y="205" fill={step >= 2 ? "white" : "gray"} fontSize="10" textAnchor="middle">
                    {step < 2 ? "Σ" : `σ(${h2.toFixed(2)})`}
                 </text>

                 {/* Nodes - Output */}
                 <circle cx="350" cy="150" r="25" fill="#1f2937" stroke={step >= 4 ? "#10b981" : "#555"} strokeWidth={2} />
                 <text x="350" y="155" fill={step >= 4 ? "white" : "gray"} fontSize="10" textAnchor="middle">
                    {step < 4 ? "Σ" : `${output.toFixed(2)}`}
                 </text>
             </svg>
        </div>

        <div className="md:w-64 space-y-4">
             <div className="p-4 bg-gray-800 rounded-lg">
                 <h4 className="text-white font-bold mb-2">Process Step: {step}</h4>
                 <div className="text-gray-400 text-sm h-24">
                     {step === 0 && "1. 입력값(x)이 네트워크에 들어옵니다."}
                     {step === 1 && "2. 가중합(Weighted Sum)을 계산합니다. Wx + b"}
                     {step === 2 && "3. 활성화 함수(Sigmoid)를 통과하여 비선형성을 추가합니다."}
                     {step === 3 && "4. 은닉층의 값이 출력층으로 전달됩니다."}
                     {step === 4 && "5. 최종 결과가 출력됩니다. (Prediction)"}
                 </div>
             </div>
             
             <div className="flex gap-2">
                 <button 
                    onClick={() => setStep(step < 4 ? step + 1 : 4)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded p-2 flex items-center justify-center gap-2"
                    disabled={step === 4}
                 >
                     Next <ArrowRight size={16} />
                 </button>
                 <button 
                    onClick={reset}
                    className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
                    title="Inputs Randomize & Reset"
                 >
                     <RefreshCw size={16} />
                 </button>
             </div>
        </div>
    </div>
  );
}

// --- Activation Function Comparison Visual ---
export function ActivationMap() {
    const [active, setActive] = useState('ReLU');
    
    // Functions
    const funcs = {
        'ReLU': { f: x => Math.max(0, x), label: 'max(0, x)', range: '[0, ∞)' },
        'Sigmoid': { f: x => 1/(1+Math.exp(-x)), label: '1 / (1+e⁻ˣ)', range: '(0, 1)'},
        'Tanh': { f: x => Math.tanh(x), label: 'tanh(x)', range: '(-1, 1)'},
        'Leaky ReLU': { f: x => x > 0 ? x : 0.1 * x, label: 'max(0.1x, x)', range: '(-∞, ∞)'}
    };

    const toSvg = (x, y) => {
        // x: -4 to 4 -> 0 to 200
        // y: -1.5 to 2.5 (Range 4) -> 200 to 0. 
        // Zero Y is at 1.5 from bottom. 1.5/4 * 200 = 75px from bottom = 125px from top.
        const sx = (x + 4) * (200 / 8);
        const sy = 200 - (y + 1.5) * (200 / 4);
        
        return { x: sx, y: sy };
    };

    // Generate path data
    // We use a fixed number of points for smooth interpolation
    let pathD = "M ";
    for(let i = -4; i <= 4; i+=0.1) {
        const {x, y} = toSvg(i, funcs[active].f(i));
        pathD += `${x.toFixed(1)},${y.toFixed(1)} L `;
    }
    pathD = pathD.slice(0, -3); // remove last " L "

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl flex flex-col items-center overflow-hidden w-full max-w-sm">
            {/* Header / Tabs */}
            <div className="flex w-full border-b border-gray-800">
                 {Object.keys(funcs).map(name => (
                     <button
                        key={name}
                        onClick={() => setActive(name)}
                        className={`flex-1 py-3 text-xs font-bold transition-all ${
                            active === name 
                            ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500' 
                            : 'bg-gray-900 text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                        }`}
                     >
                         {name}
                     </button>
                 ))}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col items-center w-full">
                <svg viewBox="0 0 200 200" className="w-64 h-64 bg-gray-950 border border-gray-800 rounded mb-4 overflow-hidden">
                     {/* Grid / Axes */}
                     <line x1="0" y1="125" x2="200" y2="125" stroke="#333" strokeWidth="1" /> {/* X Axis */}
                     <line x1="100" y1="0" x2="100" y2="200" stroke="#333" strokeWidth="1" /> {/* Y Axis */}
                     
                     {/* Animated Curve */}
                     <motion.path 
                        d={pathD}
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={false}
                        animate={{ d: pathD }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                     />
                     
                     <circle cx="100" cy="125" r="3" fill="white" /> {/* Origin */}
                </svg>
                
                <div className="text-center h-20">
                    <div className="text-white text-lg font-mono mb-1">{funcs[active].label}</div>
                    <div className="text-gray-500 text-sm">Range: {funcs[active].range}</div>
                    {active === 'ReLU' && <p className="text-xs text-blue-400 mt-2 animate-in fade-in">Dying ReLU problem: x{'<'}0 gradient is 0</p>}
                    {active === 'Sigmoid' && <p className="text-xs text-orange-400 mt-2 animate-in fade-in">Vanishing Gradient: x{'>>'}0 slope is 0</p>}
                    {active === 'Leaky ReLU' && <p className="text-xs text-emerald-400 mt-2 animate-in fade-in">Solves Dying ReLU: small gradient for x{'<'}0</p>}
                </div>
            </div>
        </div>
    );
}

// --- Convolution Visual ---
export function ConvolutionStep() {
    // A simple 5x5 image
    const image = [
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,1,0,1,0],
        [0,1,1,1,0],
        [0,0,0,0,0]
    ];
    // 3x3 Kernel (Edge Detection like)
    const kernel = [
        [-1, -1, -1],
        [-1,  8, -1],
        [-1, -1, -1]
    ];
    
    // Output 3x3
    const outputGrid = Array(3).fill().map(() => Array(3).fill(0));
    
    // Compute full output for display
    for(let y=0; y<3; y++) {
        for(let x=0; x<3; x++) {
             let sum = 0;
             for(let ky=0; ky<3; ky++) {
                 for(let kx=0; kx<3; kx++) {
                     sum += image[y+ky][x+kx] * kernel[ky][kx];
                 }
             }
             outputGrid[y][x] = sum;
        }
    }

    const [pos, setPos] = useState({x: 0, y: 0});

    useEffect(() => {
        const interval = setInterval(() => {
            setPos(p => {
                const nx = p.x + 1;
                if(nx > 2) {
                    if(p.y >= 2) return {x:0, y:0};
                    return {x:0, y: p.y+1};
                }
                return {x: nx, y: p.y};
            });
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid md:grid-cols-3 gap-8 items-center justify-items-center bg-gray-900 border border-gray-800 rounded-xl p-6">
             {/* Input Image */}
             <div className="flex flex-col items-center">
                 <h5 className="text-gray-400 text-xs mb-2">Input (5x5)</h5>
                 <div className="grid grid-cols-5 gap-1 p-1 bg-gray-950 border border-gray-800 relative">
                     {/* The Sliding Window */}
                     <div 
                        className="absolute border-2 border-yellow-400 transition-all duration-300"
                        style={{
                            width: 'calc(60% + 4px)', height: 'calc(60% + 4px)', // 3 units out of 5
                            left: `calc(${pos.x * 20}% - 2px)`, top: `calc(${pos.y * 20}% - 2px)`
                        }}
                     ></div>

                     {image.map((row, r) => row.map((val, c) => (
                         <div key={`${r}-${c}`} className={`w-6 h-6 flex items-center justify-center text-[8px] ${val ? 'bg-white text-black' : 'bg-gray-900 text-gray-700'}`}>
                             {val}
                         </div>
                     )))}
                 </div>
             </div>

             {/* Operator */}
             <div className="flex flex-col items-center gap-2">
                 <div className="text-xs text-gray-400 mb-1">Kernel (3x3)</div>
                 <div className="grid grid-cols-3 gap-1 bg-gray-800 p-1 rounded">
                     {kernel.map((row, r) => row.map((val, c) => (
                         <div key={`k-${r}-${c}`} className="w-5 h-5 flex items-center justify-center text-[8px] bg-gray-700 text-yellow-400 font-bold">
                             {val}
                         </div>
                     )))}
                 </div>
                 <div className="text-2xl text-gray-600 mt-2">➜</div>
             </div>

             {/* Output Feature Map */}
             <div className="flex flex-col items-center">
                 <h5 className="text-gray-400 text-xs mb-2">Feature Map (3x3)</h5>
                 <div className="grid grid-cols-3 gap-1 p-1 bg-gray-950 border border-gray-800">
                     {outputGrid.map((row, r) => row.map((val, c) => (
                         <div 
                            key={`o-${r}-${c}`} 
                            className={`w-8 h-8 flex items-center justify-center text-xs transition-colors duration-300 ${
                                (r === pos.y && c === pos.x) ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400' : 'bg-gray-900 text-gray-500'
                            }`}
                         >
                             {val}
                         </div>
                     )))}
                 </div>
             </div>
        </div>
    );
}
