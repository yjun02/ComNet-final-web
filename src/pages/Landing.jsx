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
            to="/about"
            title="Our Story"
            subtitle="소개 및 비전"
            description={<>슬기로운 전전위키의 제작 배경과<br/>우리가 꿈꾸는 교육의 지향점을 소개합니다.</>}
            icon={GraduationCap}
            color="purple"
            delay={0.3}
          />
        </div>
      </div>
      
      {/* Instagram Floating Button */}
      <a 
        href="https://www.instagram.com/wise._.info/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5, type: "spring" }}
          className="flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-5 py-3 rounded-full shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 hover:scale-110"
        >
          <svg 
            role="img" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 fill-white"
          >
            <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>
          </svg>
          <span className="text-white font-semibold text-sm hidden sm:block">Instagram</span>
        </motion.div>
      </a>
      
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
