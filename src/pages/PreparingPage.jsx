import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import { motion } from 'framer-motion';

export function PreparingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-amber-500/10 rounded-full blur-[100px]" />
         <div className="absolute bottom-[20%] left-[20%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 bg-[#1a1a1a] border border-gray-800 p-12 rounded-2xl max-w-lg w-full text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-10 h-10 text-gray-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">준비 중입니다</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
            이 과목은 아직 콘텐츠가 준비되지 않았습니다.<br/>
            추후 더 유익한 내용으로 찾아뵙겠습니다.
        </p>

        <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
        >
            <ArrowLeft size={18} /> 메인으로 돌아가기
        </button>
      </motion.div>
    </div>
  );
}
