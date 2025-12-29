import React from 'react';
import { Book, User, Calendar, Percent, AlertCircle } from 'lucide-react';
import { Section, SubSection, Card, InfoBox, Table } from '../../components/ui/ChapterCommon';
import { SEO } from '../../components/ui/SEO';

export default function ComNetIntro() {
  return (
    <>
      <SEO 
        title="Computer Network: Course Overview"
        description="컴퓨터 네트워크 과목 소개, 강의 계획, 평가 기준 및 참조 자료."
        keywords="Computer Network, Syllabus, Yunmin Go, Grading Policy, Kurose"
        url="https://sj-wiki.vercel.app/comnet/intro"
      />
      
      <div className="space-y-12">
        <header className="border-b border-gray-800 pb-8">
          <div className="flex items-center gap-2 text-emerald-500 font-mono text-sm mb-4">
             <span className="px-2 py-1 bg-emerald-500/10 rounded">Course Overview</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Introduction</h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-3xl">
            컴퓨터 네트워크의 계층적 구조와 핵심 프로토콜(TCP/IP)을 깊이 있게 이해하고, 
            소켓 프로그래밍을 통해 실제 네트워크 애플리케이션을 구현하는 능력을 기릅니다.
          </p>
        </header>

        <Section id="instructor" title="Instructor Info">
            <div className="flex flex-col md:flex-row gap-6">
                <Card title="Professor" icon={<User className="text-emerald-400"/>}>
                    <div className="space-y-2 text-gray-300">
                        <strong className="text-white text-lg block">Yunmin Go (고윤민)</strong>
                        <p>Office: NTH 306</p>
                        <p>Tel: 054-260-1384</p>
                        <p>Email: yunmin@handong.ac.kr</p>
                    </div>
                </Card>
                <Card title="Office Hours" icon={<Calendar className="text-emerald-400"/>}>
                    <div className="space-y-2 text-gray-300">
                        <p><strong className="text-white">Time:</strong> Tue/Fri 14:30 ~ 15:45</p>
                        <p className="text-sm text-gray-400 mt-4">* Please make an appointment via email if you need to meet outside of office hours.</p>
                        <p className="text-xs text-red-400 mt-1">(Don’t send email to handong.edu)</p>
                    </div>
                </Card>
            </div>
        </Section>

        <Section id="objectives" title="Course Objectives">
             <InfoBox title="Learning Goals">
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Understand the <strong>layered architecture</strong> of computer networks.</li>
                    <li>Master <strong>TCP/IP protocols</strong> and implement server/client programs via <strong>socket programming</strong>.</li>
                    <li>Analyze network performance using tools like <strong>Wireshark</strong>.</li>
                    <li>Cover key protocols: HTTP, DNS, TCP, UDP, IP, ICMP, ARP, etc.</li>
                </ul>
             </InfoBox>
        </Section>

        <Section id="resources" title="Textbook & References">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <Book className="w-8 h-8 text-emerald-400 mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Main Textbook</h3>
                    <p className="text-gray-300">
                        Computer Networking: A Top-Down Approach, 8th Edition
                        <br/><span className="text-sm text-gray-500">by James F. Kurose and Keith W. Ross</span>
                    </p>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <Book className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">References</h3>
                    <p className="text-gray-300">
                        TCP/IP 소켓프로그래밍
                        <br/><span className="text-sm text-gray-500">by 윤성우</span>
                    </p>
                </div>
            </div>
        </Section>

        <Section id="grading" title="Grading Policy">
            <p className="text-gray-400 mb-6">
                성적 평가는 아래 기준에 따라 진행됩니다. 중간/기말 고사 모두 0점일 경우 F 학점이 부여됩니다.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#111] p-4 rounded-lg border border-gray-800 text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">50%</div>
                    <div className="text-sm text-gray-400">Midterm (25% x 2)</div>
                </div>
                <div className="bg-[#111] p-4 rounded-lg border border-gray-800 text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">25%</div>
                    <div className="text-sm text-gray-400">Final Exam</div>
                </div>
                <div className="bg-[#111] p-4 rounded-lg border border-gray-800 text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">20%</div>
                    <div className="text-sm text-gray-400">Assignments</div>
                </div>
                <div className="bg-[#111] p-4 rounded-lg border border-gray-800 text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">5%</div>
                    <div className="text-sm text-gray-400">Attendance</div>
                </div>
            </div>

            <InfoBox title="⚠️ Important Policies">
                <ul className="space-y-4 text-sm text-gray-300">
                    <li className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <span><strong>Attendance:</strong> 0.5 point penalty per absence. More than 1/4 absence results in F grade.</span>
                    </li>
                    <li className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <span><strong>Late Submission:</strong> -1 point per day late. Accepted up to 3 days late.</span>
                    </li>
                    <li className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <span><strong>Honor Code:</strong> Cheating or using AI tools (ChatGPT, Copilot) for assignments/tests results in 0 score.</span>
                    </li>
                </ul>
            </InfoBox>
        </Section>
      </div>
    </>
  );
}
