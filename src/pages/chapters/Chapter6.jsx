import React from 'react';
import { EthernetFrameBuilder } from '../../components/features/EthernetFrameBuilder';
import { CRCCalculator } from '../../components/features/CRCCalculator';
import { DayInLifeAnimation } from '../../components/features/DayInLifeAnimation';
import { InArticleAd } from '../../components/ui/AdSense';
import { SEO } from '../../components/ui/SEO';
import { Section, SubSection, Card, InfoBox, Highlight, ProcessStep, ServiceCard, Concept, List, Table } from '../../components/ui/ChapterCommon';

export default function Chapter6() {
  return (
    <>
      <SEO 
        title="Chapter 6: Link Layer & LANs"
        description="링크 계층과 LAN의 원리를 탐구합니다. MAC 주소, ARP, Ethernet 프레임 구조, Switch 동작 원리, CSMA/CD 등 핵심 개념 완벽 정리."
        keywords="Link Layer, LAN, Ethernet, MAC Address, ARP, Switch, CSMA/CD, CRC, Error Detection, Collision"
        url="https://comnet-final-web.vercel.app/chapter/6"
      />
    <div className="space-y-8">
      <header className="border-b border-gray-800 pb-6">
        <div className="text-purple-500 font-mono text-sm mb-2">Link Layer & LANs</div>
        <h1 className="text-4xl font-bold text-white mb-4">Chapter 6. 링크 계층</h1>
        <p className="text-gray-400 text-lg leading-relaxed">
           직접 물리적으로 연결된 <span className="text-white font-semibold">노드(Node)</span>와 <span className="text-white font-semibold">이웃 노드</span> 간의 데이터 전송을 책임집니다.
           우리가 흔히 쓰는 Ethernet, WiFi, Bluetooth가 바로 이 계층의 기술들입니다.
        </p>
      </header>

      <Section id="link-layer-role" title="1. 링크 계층의 역할과 서비스">
        <p className="text-gray-300 mb-6">
            네트워크 계층의 데이터그램을 <span className="text-emerald-400">프레임(Frame)</span>이라는 단위로 캡슐화하여 인접한 노드로 전달합니다.
            마치 여행객(Datagram)을 비행기, 기차, 버스(Link Layer Frames) 등 구간별 교통수단에 태워 보내는 것과 같습니다.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
             <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">🕹️ 주요 서비스 (Services)</h4>
             <div className="space-y-4">
                <div>
                   <strong className="text-gray-200 text-sm block mb-1">Framing (프레이밍)</strong>
                   <p className="text-xs text-gray-400">데이터그램 앞뒤에 헤더(Header)와 트레일러(Trailer)를 붙여 '프레임'을 만듭니다. 여기에 'MAC 주소'가 들어갑니다.</p>
                </div>
                <div>
                   <strong className="text-gray-200 text-sm block mb-1">Link Access (링크 접속 제어)</strong>
                   <p className="text-xs text-gray-400">여러 사람이 동시에 말하면 시끄러워서 안 들리듯, 공유 매체(Shared Medium)에 누가 데이터를 보낼지 교통정리를 합니다 (MAC 프로토콜).</p>
                </div>
                <div>
                   <strong className="text-gray-200 text-sm block mb-1">Reliable Delivery (신뢰적 전송)</strong>
                   <p className="text-xs text-gray-400">유선(Ethernet)과 같이 에러율이 낮은 곳에서는 잘 안 쓰지만, 무선(Wireless)에서는 필수입니다.</p>
                </div>
                <div>
                   <strong className="text-gray-200 text-sm block mb-1">Error Detection/Correction (오류 감지)</strong>
                   <p className="text-xs text-gray-400">신호 감쇄나 노이즈로 0이 1로 바뀐 비트 오류를 찾아냅니다.</p>
                </div>
             </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
             <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">📍 구현 위치</h4>
             <div className="flex flex-col h-full justify-center text-center">
                <div className="text-3xl mb-4">🖥️ ↔️ 🔌</div>
                <Concept title="NIC (Network Interface Card)">
                   링크 계층의 대부분은 <Highlight>하드웨어 칩셋(Controller)</Highlight>에 구현되어 있습니다.
                   일부분(Link Layer 상위)은 OS 소프트웨어 드라이버로 동작하며, 하드웨어와 소프트웨어의 만남의 장소입니다.
                </Concept>
             </div>
          </div>
        </div>

        <SubSection id="error-detection" title="심화: 에러 감지 (Error Detection)">
           <p className="text-gray-300 text-sm mb-4">
              수신 측이 받은 프레임이 깨졌는지 어떻게 알 수 있을까요? 
              <br/>대표적으로 <strong>Parity Check</strong>, <strong>Checksum</strong>, 그리고 가장 강력한 <Highlight>CRC</Highlight>가 있습니다.
           </p>
           <div className="grid md:grid-cols-2 gap-6">
               <InfoBox title="CRC (Cyclic Redundancy Check)">
                  <p className="text-sm mb-2">
                     이더넷과 WiFi에서 사용하는 방식입니다. 데이터를 다항식으로 보고, 미리 약속된 생성 다항식(Generator Polynomial)으로 나눈 <span className="text-emerald-400">나머지</span>를 뒤에 붙여 보냅니다.
                  </p>
                  <List items={[
                     "비트 연산(XOR) 기반이라 하드웨어 구현이 쉬움",
                     "매우 높은 확률로 오류 검출 가능"
                  ]} />
               </InfoBox>
               <CRCCalculator />
           </div>
        </SubSection>
      </Section>

      <InArticleAd />

      <Section id="mac-protocols" title="2. 다중 접속 프로토콜 (Multiple Access Protocols)">
        <p className="text-gray-300 mb-6">
          파티장에서 여러 사람이 동시에 이야기하면 아무 말도 안 들리는 것처럼, 
          하나의 채널(공유 매체)을 여러 노드가 동시에 쓰려고 하면 <span className="text-red-400 font-bold">충돌(Collision)</span>이 발생합니다.
          이를 해결하기 위한 3가지 접근법이 있습니다.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
           <Card title="1. Channel Partitioning" icon="🍰">
              <p className="text-sm text-gray-400 mb-2">채널을 아예 쪼개서 나눠줍니다.</p>
              <List items={[
                 "TDMA: 시간을 쪼개서 턴을 줌",
                 "FDMA: 주파수를 쪼개서 채널 할당",
                 "충돌 없음. 공평함. 하지만 사용 안 해도 자원이 예약되어 낭비 발생."
              ]} />
           </Card>
           <Card title="2. Random Access" icon="🎲">
              <p className="text-sm text-gray-400 mb-2">일단 보내고, 충돌하면 알아서 해결합니다.</p>
              <List items={[
                 "Aloha, CSMA, CSMA/CD (Ethernet)",
                 "데이터가 있을 때 즉시 전송 가능",
                 "충돌 발생 시 불가피한 지연 발생"
              ]} />
           </Card>
           <Card title="3. Taking Turns" icon="👑">
              <p className="text-sm text-gray-400 mb-2">왕(Master)이 지정해주거나 토큰을 돌립니다.</p>
              <List items={[
                 "Polling, Token Passing",
                 "충돌은 없지만, 오버헤드가 큼 (토큰 기다려야 함)"
              ]} />
           </Card>
        </div>

        <SubSection id="csma-cd" title="심화: CSMA/CD (Ethernet)">
           <Concept title="Carrier Sense Multiple Access with Collision Detection">
              눈치 보며 말하다가, 겹치면 멈추고 기다렸다가 다시 말하는 방식입니다.
           </Concept>
           
           <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mt-4">
             <div className="space-y-6">
               <ProcessStep num="1" title="Carrier Sense (눈치 보기)">
                 "누가 쓰고 있나?" 채널이 유휴(Idle) 상태인지 확인합니다. 조용하면 패킷 전송을 시작합니다. 누군가 쓰고 있으면(Busy) 기다립니다.
               </ProcessStep>
               <ProcessStep num="2" title="Collision Detection (충돌 감지)">
                 "말하는 중에도 듣습니다." 전송 중에 다른 신호가 섞여 들어오는지 감시합니다. 만약 충돌이 감지되면 즉시 전송을 중단하고 <strong>Jam Signal</strong>을 보내 다른 노드들에게도 알립니다.
               </ProcessStep>
               <ProcessStep num="3" title="Exponential Backoff (눈치껏 재전송)">
                 바로 다시 보내지 않고 잠시 기다립니다(Wait). 
                 <br/><span className="text-emerald-400 text-sm">
                    n번째 충돌 시: {`{0, 1, 2, ..., 2^n - 1}`} 사이의 랜덤한 시간 단위만큼 대기.
                 </span>
                 <br/>충돌이 반복될수록 대기 시간 범위를 기하급수적으로(2배씩) 늘려 확률을 낮춥니다.
               </ProcessStep>
             </div>
           </div>
        </SubSection>
      </Section>

      <InArticleAd />

      <Section id="ethernet-frame" title="3. Ethernet 및 프레임 구조">
        <p className="text-gray-300 mb-4">
          유선 LAN 시장을 평정한 지배자, 이더넷(Ethernet)의 데이터 전송 단위입니다.
        </p>
        
        <div className="mb-6">
           <EthernetFrameBuilder />
        </div>
        
        <div className="space-y-4">
           <SubSection id="mac-address" title="MAC 주소 (Physical Address)">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                 <div className="text-center md:text-left">
                    <div className="text-emerald-400 font-mono text-2xl mb-1 font-bold">1A-2F-BB-76-09-AD</div>
                    <div className="text-xs text-gray-500">48-bit (6 Bytes), 전 세계 고유 식별자</div>
                 </div>
                 <div className="text-sm text-gray-400 text-center md:text-right">
                    주민등록번호처럼 변경 불가 (Burned-in ROM).<br/>
                    Flat 구조 (이사가도 번호 안 바뀜)
                 </div>
              </div>
           </SubSection>

           <SubSection id="arp" title="ARP (Address Resolution Protocol)">
              <InfoBox title="IP는 아는데, MAC은 몰라요!">
                 <p className="mb-3 text-sm leading-relaxed">
                    같은 네트워크 안에서 데이터를 보내려면 <Highlight>반드시 상대방의 MAC 주소</Highlight>를 알아야 합니다. 
                    IP 주소만 알고 있을 때, MAC 주소를 알아내는 과정입니다.
                 </p>
                 <ol className="list-decimal list-inside text-sm text-gray-400 space-y-2 bg-black/40 p-4 rounded-lg">
                    <li>
                       <strong className="text-white">ARP Query (Broadcast):</strong> 
                       <span className="text-gray-500 ml-2">"IP 192.168.1.10 쓰는 분? MAC 주소 좀 알려주세요!" (FF-FF-FF-FF-FF-FF 로 전송)</span>
                    </li>
                    <li>
                       <strong className="text-white">ARP Response (Unicast):</strong> 
                       <span className="text-gray-500 ml-2">"접니다! 제 MAC은 1A:2F... 입니다." (질문자에게 직접 응답)</span>
                    </li>
                    <li>
                       <strong className="text-white">Update Table:</strong> 
                       <span className="text-gray-500 ml-2">이 정보를 ARP Table에 저장합니다. (TTL이 지나면 삭제됨)</span>
                    </li>
                 </ol>
              </InfoBox>
           </SubSection>
        </div>
      </Section>

      <InArticleAd />

      <Section id="switches" title="4. Switch (스위치)">
         <p className="text-gray-300 mb-6">
            허브(Hub)와 달리 스위치는 똑똑합니다. 패킷을 무조건 모든 포트로 뿌리지 않고, 
            <Highlight>목적지가 있는 포트로만</Highlight> 선별적으로 전달(Forwarding)하거나 걸러냅니다(Filtering).
         </p>

         <div className="grid md:grid-cols-2 gap-6 h-auto items-stretch">
            <InfoBox title="Self-learning (자가 학습)">
               <p className="text-sm text-gray-400 mb-3">
                  관리자가 일일이 설정할 필요 없이, 스위치가 스스로 스위칭 테이블을 만듭니다.
               </p>
               <ul className="text-xs text-gray-500 space-y-2 list-disc list-inside">
                  <li>
                     <strong className="text-gray-300">Frame 도착:</strong> 포트 1번으로 A가 보낸 프레임이 들어옴.
                     <br/><span className="text-emerald-500">→ "아, A는 1번에 있구나!" 기록 (A, Port 1, TTL)</span>
                  </li>
                  <li>
                     <strong className="text-gray-300">Forwarding:</strong> B에게 보내는 프레임 도착. 테이블 확인.
                     <br/>- B가 테이블에 있으면? <span className="text-emerald-400">해당 포트로 전송.</span>
                     <br/>- B가 없으면? <span className="text-blue-400">모든 포트로 플러딩(Flooding).</span>
                  </li>
               </ul>
            </InfoBox>

            <Card title="Switch vs Router" icon="🆚">
               <Table 
                  headers={["구분", "Switch (L2)", "Router (L3)"]}
                  rows={[
                     ["주소", "MAC Address", "IP Address"],
                     ["역할", "로컬 네트워크 내부 연결", "서로 다른 네트워크 연결"],
                     ["지능", "Self-learning", "Routing Algorithm"],
                     ["설정", "Plug & Play", "IP 설정 필요"]
                  ]}
               />
            </Card>
         </div>
      </Section>

      <Section id="simulation" title="종합 시뮬레이션">
        <h3 className="text-2xl font-bold text-white mb-4">A Day in the Life of a Web Request</h3>
        <p className="text-gray-300 mb-6 font-light">
          노트북을 켜고 www.google.com 에 접속할 때, DHCP부터 ARP, DNS, TCP, HTTP에 이르기까지 
          지금까지 배운 모든 프로토콜이 어떻게 협력하는지 확인해보세요.
        </p>
        <DayInLifeAnimation />
      </Section>
      
      <div className="mt-20 pb-[150px]">
         <InArticleAd />
      </div>
    </div>
    </>
  );
}
