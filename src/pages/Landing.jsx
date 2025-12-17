import React from 'react';
import { Link } from 'react-router-dom';
import { Network, BrainCircuit, ArrowRight, Construction, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export function Landing() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px]" />
         <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[100px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 text-center max-w-4xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 mb-4 tracking-tight">
            슬기로운 전전위키
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            한동대학교 슬기로운전전생활의 시험기간 도피처 with antigravity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 w-full px-4 md:px-0">
          <SubjectCard 
            to="/comnet/intro"
            title="Computer Network"
            subtitle="컴퓨터 네트워크"
            description={<>인터넷의 원리부터 계층별 프로토콜까지.<br/>네트워크의 핵심을 심도 있게 탐구합니다.</>}
            icon={Network}
            color="emerald"
            delay={0.1}
          />
          <SubjectCard 
            to="/ml/intro"
            title="Machine Learning"
            subtitle="머신러닝 & AI"
            description={<>데이터 패턴 분석과 예측 모델링.<br/>인공지능의 기초가 되는 머신러닝 알고리즘을 학습합니다.</>}
            icon={BrainCircuit}
            color="blue"
            delay={0.2}
          />
          <SubjectCard 
            to="/preparing"
            title="Coming Soon"
            subtitle="추후 공개 예정"
            description={<>새로운 과목이 곧 추가될 예정입니다.<br/>기대해 주세요!</>}
            icon={Construction}
            color="amber"
            delay={0.3}
          />
          <SubjectCard 
            to="/preparing"
            title="Coming Soon"
            subtitle="추후 공개 예정"
            description={<>새로운 과목이 곧 추가될 예정입니다.<br/>기대해 주세요!</>}
            icon={GraduationCap}
            color="purple"
            delay={0.4}
          />
        </div>
      </div>
      
      <div className="absolute bottom-8 text-gray-600 text-sm font-light">
        © 2025 HGU 슬기로운전전생활, All rights reserved.
      </div>
    </div>
  );
}

function SubjectCard({ to, title, subtitle, description, icon: Icon, color, delay }) {
  const colorMap = {
      emerald: {
          base: 'bg-emerald-500',
          shadow: 'group-hover:shadow-emerald-500/20',
          border: 'group-hover:border-emerald-500/30',
          text: 'text-emerald-400',
      },
      blue: {
          base: 'bg-blue-500',
          shadow: 'group-hover:shadow-blue-500/20',
          border: 'group-hover:border-blue-500/30',
          text: 'text-blue-400',
      },
      amber: {
          base: 'bg-amber-500',
          shadow: 'group-hover:shadow-amber-500/20',
          border: 'group-hover:border-amber-500/30',
          text: 'text-amber-400',
      },
      purple: {
          base: 'bg-purple-500',
          shadow: 'group-hover:shadow-purple-500/20',
          border: 'group-hover:border-purple-500/30',
          text: 'text-purple-400',
      }
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <Link to={to} className="block group h-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={`relative z-10 hover:z-0 h-full bg-[#1a1a1a] border border-gray-800 p-8 rounded-2xl transition-all duration-300 ${theme.border} hover:border-gray-700 hover:-translate-y-1 shadow-2xl ${theme.shadow} flex flex-col`}
      >
        <div className="flex items-start gap-4 mb-4">
            <div className={`w-12 h-12 rounded-xl ${theme.base}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                <Icon className={`w-6 h-6 ${theme.text}`} />
            </div>
            <div className="text-left">
                <h2 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                    {title}
                </h2>
                <h3 className={`text-sm font-medium ${theme.text} font-mono`}>
                    {subtitle}
                </h3>
            </div>
        </div>
        
        <p className="text-gray-400 leading-relaxed mb-6 text-left text-sm flex-1">
          {description}
        </p>

        <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-white transition-colors gap-2 mt-auto">
          학습하기 <ArrowRight className="w-4 h-4" />
        </div>
      </motion.div>
    </Link>
  );
}
