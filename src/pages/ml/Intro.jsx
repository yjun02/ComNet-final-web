import React from 'react';
import { Book, User, Calendar, Percent, AlertCircle } from 'lucide-react';
import { Section, SubSection, Card, InfoBox, Table } from '../../components/ui/ChapterCommon';
import { SEO } from '../../components/ui/SEO';

export default function MlIntro() {
  return (
    <>
      <SEO 
        title="Machine Learning: Course Overview"
        description="머신러닝 과목 소개, 강의 계획, 평가 기준 및 참조 자료."
        keywords="Machine Learning, Syllabus, Charmgil Hong, Grading Policy, Probabilistic ML"
        url="https://comnet-final-web.vercel.app/ml/intro"
      />
      
      <div className="space-y-12">
        <header className="border-b border-gray-800 pb-8">
          <div className="flex items-center gap-2 text-blue-500 font-mono text-sm mb-4">
             <span className="px-2 py-1 bg-blue-500/10 rounded">Course Overview</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Introduction</h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-3xl">
            데이터 패턴 분석과 예측 모델링의 기초가 되는 다양한 머신러닝 알고리즘(Clustering, Regression, Classification, Neural Networks 등)을 학습하고 구현합니다.
          </p>
        </header>

        <Section id="instructor" title="Instructor Info">
            <div className="flex flex-col md:flex-row gap-6">
                <Card title="Professor" icon={<User className="text-blue-400"/>}>
                    <div className="space-y-2 text-gray-300">
                        <strong className="text-white text-lg block">Charmgil Hong (홍참길)</strong>
                        <p>Office: NTH 201</p>
                        <p>Email: charmgil@handong.edu</p>
                        <p className="text-xs text-blue-400 mt-2">TA: Yunseong Choe (최윤성)</p>
                    </div>
                </Card>
                <Card title="Office Hours" icon={<Calendar className="text-blue-400"/>}>
                    <div className="space-y-2 text-gray-300">
                        <p>By appointment only.</p>
                        <a href="https://calendly.com/charmgil/sched" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline block mt-2">
                            Schedule Appointment →
                        </a>
                    </div>
                </Card>
            </div>
        </Section>

        <Section id="objectives" title="Course Objectives">
             <InfoBox title="Learning Goals">
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Understand basic concepts and algorithms of <strong>Machine Learning</strong>.</li>
                    <li>Build simple AI systems using ML algorithms.</li>
                    <li>Cover topics: Density estimation, Bayesian decision theory, Clustering, Classification, Regression, Deep Learning, etc.</li>
                </ul>
             </InfoBox>
             
             <div className="mt-6 bg-blue-900/10 p-4 rounded-lg border border-blue-900/30">
                <h4 className="text-blue-400 font-bold mb-2">Flipped Learning Approach</h4>
                <p className="text-sm text-gray-300">
                    매주 제공되는 1.5~2시간 분량의 학습 자료(비디오 등)를 미리 학습하고, 오프라인 수업에서는 토론과 Review, Q&A를 진행합니다.
                </p>
             </div>
        </Section>

        <Section id="resources" title="Textbook & References">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <Book className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Main Textbook</h3>
                    <p className="text-gray-300">
                        Probabilistic Machine Learning: An Introduction
                        <br/><span className="text-sm text-gray-500">by Kevin P. Murphy (MIT Press, 2022)</span>
                    </p>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <Book className="w-8 h-8 text-indigo-400 mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Optional</h3>
                    <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                        <li>Pattern Recognition and Machine Learning (Bishop)</li>
                        <li>Deep Learning (Goodfellow et al.)</li>
                        <li>The Elements of Statistical Learning (Hastie et al.)</li>
                    </ul>
                </div>
            </div>
        </Section>

        <Section id="grading" title="Grading Policy">
            <p className="text-gray-400 mb-6">
                성적 평가는 아래 기준에 따라 진행됩니다.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-[#111] p-4 rounded-lg border border-gray-800 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">20%</div>
                    <div className="text-xs text-gray-400">Midterm</div>
                </div>
                <div className="bg-[#111] p-4 rounded-lg border border-gray-800 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">30%</div>
                    <div className="text-xs text-gray-400">Final Exam</div>
                </div>
                <div className="bg-[#111] p-4 rounded-lg border border-gray-800 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">33%</div>
                    <div className="text-xs text-gray-400">Homework</div>
                </div>
                <div className="bg-[#111] p-4 rounded-lg border border-gray-800 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">10%</div>
                    <div className="text-xs text-gray-400">Quizzes</div>
                </div>
                <div className="bg-[#111] p-4 rounded-lg border border-gray-800 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">7%</div>
                    <div className="text-xs text-gray-400">Participation</div>
                </div>
            </div>

            <InfoBox title="⚠️ Important Policies">
                <ul className="space-y-4 text-sm text-gray-300">
                    <li className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <span><strong>Programming:</strong> Python will be used for HW. No dedicated Python session provided.</span>
                    </li>
                    <li className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <span><strong>Late Submission:</strong> Accepted within 24 hours with -20% penalty. Rejected after 24 hours.</span>
                    </li>
                    <li className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <span><strong>English Only:</strong> All HW, quizzes, exams, and class Q&A (for score) must be in English.</span>
                    </li>
                </ul>
            </InfoBox>
        </Section>
      </div>
    </>
  );
}
