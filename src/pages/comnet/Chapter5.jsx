import React from 'react';
import { RoutingAlgorithmComparison } from '../../components/features/RoutingAlgorithmComparison';
import { InArticleAd } from '../../components/ui/AdSense';
import { SEO } from '../../components/ui/SEO';
import { Section, SubSection, Card, InfoBox, Highlight, Concept, Table, List, LayerCard } from '../../components/ui/ChapterCommon';

export default function Chapter5() {
  return (
    <>
      <SEO 
        title="Chapter 5: Network Layer - Control Plane"
        description="네트워크 계층의 제어 평면(Control Plane)을 심층 분석합니다. 라우팅 알고리즘(LS vs DV), OSPF, BGP, SDN, ICMP 등 핵심 주제 완벽 정리."
        keywords="Network Layer, Control Plane, Routing Algorithms, Dijkstra, Bellman-Ford, OSPF, BGP, SDN, ICMP, SNMP"
        url="https://comnet-final-web.vercel.app/chapter/5"
      />
    <div className="space-y-8">
      <header className="border-b border-gray-800 pb-8">
        <div className="flex items-center gap-2 text-emerald-500 font-mono text-sm mb-4">
             <span className="px-2 py-1 bg-emerald-500/10 rounded">Chapter 5 : Network Layer - Control Plane</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-6">Chapter 5. 제어 평면</h1>
        <p className="text-gray-400 text-xl leading-relaxed max-w-3xl">
          패킷의 이동 경로(Route)를 결정하는 네트워크의 <span className="text-white font-semibold">두뇌(Brain)</span> 역할을 하는 Control Plane을 다룹니다.
          전통적인 라우팅 알고리즘(OSPF, BGP)부터 현대적인 SDN 아키텍처까지 학습합니다.
        </p>
      </header>

      <Section id="overview-cp" title="1. 제어 평면(Control Plane) 개요">
        <p className="text-gray-300 mb-6">
           라우팅을 수행하는 방식은 크게 두 가지로 나뉩니다. 누가 계산을 담당하느냐의 차이입니다.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card title="Per-router Control (전통적)" icon="🏛️">
            <Concept title="Distributed Approach">
               모든 라우터가 각각 자신의 라우팅 알고리즘을 수행하고, 이웃 라우터들과 정보를 교환하며 스스로 경로를 계산합니다.
            </Concept>
            <div className="mt-4 text-sm text-gray-400">
               <ul className="list-disc list-inside space-y-1">
                  <li>개별 라우터가 "Brain"을 가짐</li>
                  <li>OSPF, BGP 프로토콜이 여기에 해당</li>
                  <li>장비가 복잡하고 고가임</li>
               </ul>
            </div>
          </Card>

          <Card title="Logically Centralized (SDN)" icon="☁️">
             <Concept title="Centralized Approach">
               멀리 떨어진 <Highlight>중앙 컨트롤러(Remote Controller)</Highlight>가 전체 네트워크 정보를 수집하고 모든 경로를 계산한 뒤, 각 라우터(스위치)에게 명령을 내립니다.
             </Concept>
             <div className="mt-4 text-sm text-gray-400">
               <ul className="list-disc list-inside space-y-1">
                  <li>라우터는 단순한 패킷 전달자("Dumb" device)</li>
                  <li>유연한 관리와 프로그래밍 가능</li>
                  <li>OpenFlow 프로토콜 사용</li>
               </ul>
             </div>
          </Card>
        </div>
      </Section>

      <InArticleAd />

      <Section id="routing-algo" title="2. 라우팅 알고리즘 (Routing Algorithms)">
        <p className="text-gray-300 mb-6">
          목표는 단순합니다. 송신지부터 수신지까지의 <span className="text-emerald-400 font-bold">최소 비용(Least Cost) 경로</span>를 찾아내는 수학적 알고리즘입니다.
        </p>
        
        <RoutingAlgorithmComparison />

        <div className="mt-10 space-y-10">
           <SubSection id="ls-algo" title="심화: Link State (LS) Algorithm">
              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <InfoBox title="Dijkstra's Algorithm">
                       <p className="text-sm mb-3">
                          모든 노드가 전체 네트워크의 지도(Topology)와 링크 비용 정보를 다 알고 시작합니다.
                       </p>
                       <List items={[
                          "Global Knowledge: 모든 노드가 Broadcast를 통해 전체 정보 공유",
                          "Iterative: 반복 계산을 통해 최단 경로 트리 구축",
                          "Complexity: O(N²) 또는 O(N log N)"
                       ]} />
                    </InfoBox>
                 </div>
                 <div className="bg-gray-900 border border-gray-800 p-5 rounded-lg">
                    <h4 className="font-bold text-red-400 mb-2">Oscillation (진동) 문제</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                       링크 비용이 트래픽 양에 따라 변동될 경우 발생합니다. 
                       모든 라우터가 동시에 "어? 저쪽 길이 한가하네?" 하고 경로를 바꾸면, 다시 그쪽으로 트래픽이 몰려 혼잡해지고, 또 다시 경로를 바꾸는 현상이 반복됩니다.
                    </p>
                 </div>
              </div>
           </SubSection>

           <SubSection id="dv-algo" title="심화: Distance Vector (DV) Algorithm">
              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <InfoBox title="Bellman-Ford Equation">
                       <p className="text-sm mb-3">
                          오직 <Highlight>이웃(Neighbor)</Highlight>하고만 정보를 교환합니다.
                          "내 이웃 A까지 가는 비용 + A가 목적지까지 가는 비용" 중 최소값을 선택합니다.
                       </p>
                       <div className="bg-black/50 p-2 rounded text-center font-mono text-sm text-emerald-400 border border-gray-700 my-2">
                          dx(y) = min_v {`{ c(x,v) + dv(y) }`}
                       </div>
                       <p className="text-xs text-gray-500">x: 나, y: 목적지, v: 이웃들</p>
                    </InfoBox>
                 </div>
                 <div className="bg-gray-900 border border-gray-800 p-5 rounded-lg">
                    <h4 className="font-bold text-red-400 mb-2">Count-to-Infinity 문제</h4>
                    <p className="text-sm text-gray-400 leading-relaxed mb-3">
                       "Good news travels fast, bad news travels slow." 
                       링크가 끊어졌다는 나쁜 소식은 아주 천천히 전파됩니다. 루프가 형성되어 비용이 무한대로 증가하는 문제가 발생할 수 있습니다.
                    </p>
                    <div className="bg-emerald-900/20 p-3 rounded border border-emerald-900/30">
                       <strong className="text-emerald-400 text-sm block mb-1">해결책: Poisoned Reverse</strong>
                       <p className="text-xs text-gray-400">
                          "내가 너를 통해 목적지로 간다면, 너한테는 목적지까지 거리가 무한대라고 거짓말하겠다." (그래야 네가 나를 통해 다시 되돌아오지 않을 테니까)
                       </p>
                    </div>
                 </div>
              </div>
           </SubSection>
        </div>
      </Section>

      <InArticleAd />

      <Section id="as-routing" title="3. 인터넷의 계층적 라우팅 (AS)">
        <InfoBox title="자율 시스템 (Autonomous System)">
           <p className="mb-2">
              인터넷은 전 세계 수십억 개의 라우터를 하나의 테이블로 관리할 수 없습니다. 
              그래서 <Highlight>AS</Highlight>라는 단위로 네트워크를 쪼개서 관리합니다.
              (예: SKT, KT, Google, 학교 네트워크 등이 하나의 AS입니다.)
           </p>
        </InfoBox>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
           <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <span className="text-emerald-400">🏠</span> Intra-AS Routing
              </h3>
              <p className="text-gray-400 text-sm">AS <strong>내부</strong> 라우팅. 성능(Performance)이 최우선입니다.</p>
              
              <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
                 <div className="mb-4">
                    <strong className="text-white text-lg">OSPF</strong>
                    <div className="text-xs text-gray-500">Open Shortest Path First</div>
                 </div>
                 <List items={[
                    "Link State (Dijkstra) 알고리즘 사용",
                    "계층적 구조 (Hierarchy) 지원: Backbone Area와 Local Area로 구분하여 확장성 확보",
                    "보안 기능 내장",
                    "모든 링크 비용(메트릭)을 직접 설정 가능"
                 ]} />
              </div>
           </div>

           <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <span className="text-blue-400">🌐</span> Inter-AS Routing
              </h3>
              <p className="text-gray-400 text-sm">AS <strong>사이(외부)</strong> 라우팅. 정책(Policy)이 최우선입니다.</p>

              <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
                 <div className="mb-4">
                    <strong className="text-white text-lg">BGP</strong>
                    <div className="text-xs text-gray-500">Border Gateway Protocol</div>
                 </div>
                 <p className="text-sm text-gray-300 mb-3">인터넷을 하나로 묶는 거대한 접착제입니다.</p>
                 <List items={[
                    "Path Vector 프로토콜 (DV의 확장)",
                    "eBGP: 이웃 AS로부터 경로 정보 획득",
                    "iBGP: 얻은 정보를 AS 내부 라우터들에게 전파",
                    "정책 기반: '경쟁사 네트워크는 통과하지 않겠다' 등의 정치적/경제적 결정 가능"
                 ]} />
              </div>
           </div>
        </div>
      </Section>

      <InArticleAd />

      <Section id="sdn-control" title="4. SDN Control Plane">
         <p className="text-gray-300 mb-6">
            네트워크 장비를 화이트박스화하고, 소프트웨어로 중앙에서 제어하는 혁신적인 아키텍처입니다.
         </p>
         
         <div className="grid md:grid-cols-3 gap-4">
            <LayerCard title="Data Plane Switches" icon="🔌">
               하드웨어 스위치들.<br/>
               OpenFlow 프로토콜을 통해 컨트롤러의 명령(Flow Table)을 받아 단순히 패킷을 전달하기만 합니다.
            </LayerCard>
            <LayerCard title="SDN Controller" icon="🧠">
               네트워크의 OS.<br/>
               전체 네트워크 상태(Topology, Link State)를 관리하고, 북쪽(앱)과 남쪽(스위치)을 연결하는 중계자입니다.
            </LayerCard>
            <LayerCard title="Network Applications" icon="📱">
               뇌 위의 생각들.<br/>
               라우팅, 방화벽, 로드 밸런싱 등의 실제 로직이 소프트웨어 앱 형태로 돌아갑니다.
            </LayerCard>
         </div>
      </Section>

      <Section id="protocols" title="5. 기타 프로토콜 (ICMP & SNMP)">
         <div className="grid md:grid-cols-2 gap-6">
            <InfoBox title="ICMP: 인터넷 제어 메시지 프로토콜">
               <p className="text-sm text-gray-400 mb-2">
                  IP 패킷 전송 중 에러가 발생하면 이를 알리기 위해 사용됩니다. (Network Layer의 디버깅 툴)
               </p>
               <List items={[
                  "Error Reporting: 'Destination Unreachable', 'TTL Expired'",
                  "Echo Request/Reply: Ping 프로그램에서 사용",
                  "IP 패킷의 페이로드 부분에 실려 전송됨"
               ]} />
            </InfoBox>
            <InfoBox title="SNMP: 네트워크 관리 프로토콜">
               <p className="text-sm text-gray-400 mb-2">
                  관리자가 원격으로 장비들의 상태를 모니터링하고 설정하기 위한 표준입니다.
               </p>
               <List items={[
                  "Request/Response 모드 + Trap(알림) 모드",
                  "MIB (Management Information Base): 관리할 객체들의 데이터베이스"
               ]} />
            </InfoBox>
         </div>
      </Section>
      
      <div className="mt-20 pb-[150px]">
         <InArticleAd />
      </div>
    </div>
    </>
  );
}
