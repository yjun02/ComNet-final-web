import React from 'react';
import { Mail, Github, Instagram, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">About 슬기로운 전전위키</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            한동대학교 전기전자컴퓨터공학부 학생들의 효율적인 시험 대비를 위해 만들어진 인터랙티브 학습 플랫폼입니다.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Info className="text-emerald-400 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">우리의 미션</h2>
            <p className="text-gray-400 leading-relaxed">
              복잡한 전공 지식을 시각화하고, 인터랙티브한 도구를 제공하여 단순 암기가 아닌 원리 중심의 학습을 지원합니다. 
              시험 기간의 막막함을 해결하고, 지식 공유의 가치를 실현하고자 합니다.
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl space-y-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Mail className="text-blue-400 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">피드백 및 문의</h2>
            <p className="text-gray-400 leading-relaxed">
              콘텐츠 오류 제보나 개선 제안은 언제나 환영합니다. 인스타그램 DM이나 아래 링크를 통해 개발팀에 연락하실 수 있습니다.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/wise._.info/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://github.com/yjun02" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={24} />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-emerald-500/5 to-blue-500/5 border border-gray-800 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Open Initiative</h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto leading-relaxed">
            슬기로운 전전위키는 한동대 전전 학부생들의 '슬기로운 전전생활'을 위하여 개발되었습니다. 
            더 많은 학생들이 양질의 학습 자료에 쉽게 접근할 수 있도록 지속적으로 업데이트될 예정입니다.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
