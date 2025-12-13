import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { ArrowRight, CheckCircle, Globe, Laptop, Server, Share2 } from 'lucide-react';

const steps = [
  { id: 1, title: "DHCP", desc: "Get IP Address", icon: Laptop },
  { id: 2, title: "ARP", desc: "Find Router MAC", icon: Share2 },
  { id: 3, title: "DNS", desc: "Resolve URL to IP", icon: Globe },
  { id: 4, title: "TCP Handshake", desc: "Establish Connection", icon: ArrowRight },
  { id: 5, title: "HTTP Request", desc: "GET /index.html", icon: Server },
];

export function DayInLifeAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(prev => prev + 1);
  };
  
  const reset = () => setCurrentStep(0);

  return (
    <Card className="my-8 border-l-4 border-l-purple-400 bg-navy-light/50">
      <h3 className="text-xl font-bold text-slate-100 mb-6">Simulation: A Day in the Life of a Web Request</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 relative">
         {/* Progress Line */}
         <div className="absolute top-1/2 left-0 w-full h-1 bg-navy-lighter -z-10 md:block hidden" />
         
         {steps.map((step, idx) => {
           const isActive = idx < currentStep;
           const isCurrent = idx === currentStep;
           
           return (
             <motion.div 
               key={step.id}
               initial={{ opacity: 0.5, scale: 0.9 }}
               animate={{ 
                 opacity: isActive || isCurrent ? 1 : 0.4, 
                 scale: isCurrent ? 1.1 : 1,
                 color: isActive ? '#38bdf8' : isCurrent ? '#f472b6' : '#64748b'
               }}
               className="flex flex-col items-center bg-navy p-4 rounded-lg border border-slate-800 z-10 w-32 relative"
             >
               <step.icon className="w-8 h-8 mb-2" />
               <div className="font-bold text-sm text-center">{step.title}</div>
               <div className="text-[10px] text-center">{step.desc}</div>
               {isActive && <CheckCircle className="w-4 h-4 text-green-400 absolute top-2 right-2" />}
             </motion.div>
           );
         })}
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={reset}
          className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
        >
          Reset
        </button>
        <button 
          onClick={nextStep}
          disabled={currentStep >= steps.length}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
        >
          {currentStep >= steps.length ? 'Complete!' : 'Next Step'}
        </button>
      </div>
    </Card>
  );
}
