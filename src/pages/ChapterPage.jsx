import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { FragmentationCalculator } from '../components/features/FragmentationCalculator';
import { CRCCalculator } from '../components/features/CRCCalculator';
import { DayInLifeAnimation } from '../components/features/DayInLifeAnimation';
import { InArticleAd } from '../components/ui/AdSense';

export function ChapterPage() {
  const { id } = useParams();

  if (id === '4') {
    return <Chapter4Content />;
  } else if (id === '5') {
    return <Chapter5Content />;
  } else if (id === '6') {
    return <Chapter6Content />;
  }
  
  return <Navigate to="/chapter/4" />;
}

// Chapter 4: Network Layer - Data Plane
function Chapter4Content() {
  return (
    <div className="space-y-8 pb-20">
      <header className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-2">Chapter 4</h1>
        <p className="text-xl text-gray-400">Network Layer: Data Plane</p>
      </header>

      <Section id="overview" title="개요 (Overview)">
        <SubSection id="data-vs-control" title="데이터 평면 vs 제어 평면">
          <ul className="space-y-3 text-gray-300">
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">•</span>
              <div>
                <strong className="text-emerald-400">Data Plane (데이터 평면):</strong> 로컬, 포트별 기능. 
                입력 포트에 도착한 데이터그램을 적절한 출력 포트로 이동시키는 <Highlight>Forwarding(포워딩)</Highlight>을 담당.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">•</span>
              <div>
                <strong className="text-emerald-400">Control Plane (제어 평면):</strong> 네트워크 전체의 로직. 
                데이터그램이 출발지부터 목적지까지 갈 경로를 결정하는 <Highlight>Routing(라우팅)</Highlight>을 담당.
                <ul className="ml-6 mt-2 space-y-1 text-sm text-gray-400">
                  <li>→ 전통적 방식: 각 라우터 내부의 라우팅 알고리즘이 상호작용</li>
                  <li>→ SDN 방식: 중앙 집중형 컨트롤러가 각 라우터의 Flow Table을 원격으로 제어</li>
                </ul>
              </div>
            </li>
          </ul>
        </SubSection>

        <SubSection id="service-model" title="서비스 모델">
          <p className="text-gray-300">
            인터넷(IP)은 <Highlight>"Best-effort"</Highlight> 서비스 모델을 따름. 
            대역폭 보장, 손실 없음, 순서 보장, 타이밍 보장 등을 제공하지 않음.
          </p>
        </SubSection>
      </Section>

      <InArticleAd />

      <Section id="router-structure" title="라우터 내부 구조">
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="입력 포트" icon="📥">
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• 물리 계층: 비트 단위 수신</li>
              <li>• 링크 계층: 프레임 해제 (Ethernet 등)</li>
              <li>• 분산 스위칭: <Highlight>LPM</Highlight>을 통해 출력 포트 결정</li>
            </ul>
          </Card>

          <Card title="스위칭 패브릭" icon="🔄">
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Memory: CPU가 직접 복사 (느림)</li>
              <li>• Bus: 공유 버스 이용 (충돌 가능)</li>
              <li>• Crossbar: 여러 경로 동시 연결 (가장 빠름)</li>
            </ul>
          </Card>

          <Card title="출력 포트" icon="📤">
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• 버퍼링: 스위칭 속도 &gt; 출력 속도</li>
              <li>• Scheduling: FIFO, Priority, RR, WFQ</li>
            </ul>
          </Card>
        </div>
      </Section>

      <InArticleAd />

      <Section id="ip-protocol" title="IP: Internet Protocol">
        <SubSection id="fragmentation" title="IP Fragmentation (단편화)">
          <InfoBox>
            <p className="mb-3"><strong>이유:</strong> 링크마다 보낼 수 있는 최대 크기인 <Highlight>MTU</Highlight>가 다르기 때문</p>
            <p className="font-semibold mb-2">핵심 원리:</p>
            <ol className="space-y-1 text-sm">
              <li>1. 헤더(20B)를 제외한 순수 데이터(Payload)를 쪼갬</li>
              <li>2. 각 조각은 새로운 20B 헤더를 가짐</li>
              <li>3. Offset: 8바이트 단위로 측정</li>
              <li>4. MF (More Fragments): 마지막 조각만 0, 나머지는 1</li>
            </ol>
          </InfoBox>
          
          <FragmentationCalculator />
        </SubSection>

        <SubSection id="dhcp" title="DHCP (Dynamic Host Configuration Protocol)">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <p className="mb-4 text-gray-300">호스트가 서버로부터 IP 주소를 동적으로 할당받는 4단계 프로세스:</p>
            <div className="flex items-center justify-between gap-4 text-center">
              <Step num="1" label="Discover" color="blue" />
              <Arrow />
              <Step num="2" label="Offer" color="emerald" />
              <Arrow />
              <Step num="3" label="Request" color="blue" />
              <Arrow />
              <Step num="4" label="ACK" color="emerald" />
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">DORA 프로세스</p>
          </div>
        </SubSection>

        <SubSection id="nat-ipv6" title="NAT & IPv6">
          <div className="grid md:grid-cols-2 gap-6">
            <InfoBox title="NAT (Network Address Translation)">
              <ul className="space-y-2 text-sm">
                <li>• 사설 IP: 외부 인터넷에서는 보이지 않음</li>
                <li>• NAT Table: (사설 IP, 포트) ↔ (공인 IP, 신규 포트) 매핑</li>
                <li>• 장점: 공인 IP 절약, 보안성 강화</li>
              </ul>
            </InfoBox>

            <InfoBox title="IPv6">
              <ul className="space-y-2 text-sm">
                <li>• 주소 길이: <Highlight>128비트</Highlight></li>
                <li>• 고정 40B 헤더</li>
                <li>• Fragmentation 금지</li>
                <li>• Tunneling: IPv4 네트워크 통과 시 캡슐화</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>
      </Section>
    </div>
  );
}

// Chapter 5: Network Layer - Control Plane
function Chapter5Content() {
  return (
    <div className="space-y-8 pb-20">
      <header className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-2">Chapter 5</h1>
        <p className="text-xl text-gray-400">Network Layer: Control Plane</p>
      </header>

      <Section id="routing-algorithms" title="라우팅 알고리즘">
        <p className="text-gray-300 mb-6">
          목적: 송신지부터 목적지까지 <Highlight>최소 비용(Least Cost)</Highlight> 경로를 찾는 것
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <AlgorithmCard 
            title="Link State (LS)" 
            algorithm="Dijkstra's Algorithm"
            complexity="O(n²) 또는 O(n log n)"
          >
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• 모든 라우터가 네트워크 전체 토폴로지 인지</li>
              <li>• Global knowledge 기반</li>
              <li>• Link State Broadcast로 정보 전파</li>
            </ul>
          </AlgorithmCard>

          <AlgorithmCard 
            title="Distance Vector (DV)" 
            algorithm="Bellman-Ford Equation"
            complexity="Iterative, Distributed"
          >
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• 인접한 이웃과만 정보 교환</li>
              <li>• Count-to-infinity 문제 발생 가능</li>
              <li>• Poisoned Reverse로 해결</li>
            </ul>
          </AlgorithmCard>
        </div>
      </Section>

      <InArticleAd />

      <Section id="as-routing" title="Autonomous Systems (AS) 간 라우팅">
        <SubSection id="intra-as" title="Intra-AS Routing (내부)">
          <InfoBox title="OSPF (Open Shortest Path First)">
            <ul className="space-y-2 text-sm">
              <li>• LS 알고리즘(Dijkstra) 기반</li>
              <li>• 계층 구조(Area) 지원</li>
              <li>• 인증(Authentication) 사용</li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection id="inter-as" title="Inter-AS Routing (외부)">
          <div className="bg-gradient-to-r from-blue-950 to-emerald-950 border border-blue-900 rounded-lg p-6">
            <h4 className="text-xl font-bold text-white mb-3">BGP (Border Gateway Protocol)</h4>
            <p className="text-gray-300 mb-4">인터넷을 하나로 묶는 '접착제' 역할</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-blue-400">eBGP:</strong>
                <p className="text-gray-400">인접한 AS 간 도달 가능성 정보 교환</p>
              </div>
              <div>
                <strong className="text-emerald-400">iBGP:</strong>
                <p className="text-gray-400">AS 내부 라우터들에게 외부 정보 전파</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              💡 Policy-based Routing: 비용보다는 비즈니스 관계나 정책에 따라 경로 결정
            </p>
          </div>
        </SubSection>
      </Section>

      <InArticleAd />

      <Section id="sdn" title="SDN 제어 평면">
        <div className="space-y-4">
          <p className="text-gray-300">제어 로직을 하드웨어와 분리하여 소프트웨어로 구현</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <LayerCard title="Communication Layer" icon="🔌">
              OpenFlow 등의 프로토콜로 스위치와 통신
            </LayerCard>
            <LayerCard title="State Management" icon="📊">
              네트워크 토폴로지, 플로우 통계 관리
            </LayerCard>
            <LayerCard title="Application Layer" icon="⚙️">
              라우팅, 방화벽, 로드 밸런싱 앱 실행
            </LayerCard>
          </div>
        </div>
      </Section>
    </div>
  );
}

// Chapter 6: Link Layer & LANs
function Chapter6Content() {
  return (
    <div className="space-y-8 pb-20">
      <header className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-2">Chapter 6</h1>
        <p className="text-xl text-gray-400">Link Layer & LANs</p>
      </header>

      <Section id="link-layer-role" title="링크 계층의 역할">
        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard title="Framing" icon="📦">
            데이터그램을 프레임으로 캡슐화
          </ServiceCard>
          <ServiceCard title="Link Access" icon="🔑">
            MAC 주소를 사용해 매체 접속 제어
          </ServiceCard>
          <ServiceCard title="Error Detection" icon="🛡️">
            비트 에러 탐지 및 폐기 (또는 정정)
          </ServiceCard>
        </div>
      </Section>

      <InArticleAd />

      <Section id="error-detection" title="에러 탐지 및 정정">
        <SubSection id="crc" title="CRC (Cyclic Redundancy Check)">
          <InfoBox>
            <p className="mb-3">
              데이터(D)를 생성 다항식(G)으로 나누었을 때 나머지가 0이 되도록 비트를 추가하여 전송
            </p>
            <p className="text-sm text-gray-400">
              강력한 에러 검출 능력으로 Ethernet, WiFi 등에서 널리 사용
            </p>
          </InfoBox>
          
          <CRCCalculator />
        </SubSection>
      </Section>

      <InArticleAd />

      <Section id="mac-protocols" title="다중 접속 프로토콜">
        <p className="text-gray-300 mb-6">
          단일 공유 링크(Broadcast channel)를 여러 노드가 사용할 때 충돌을 방지하거나 조율하는 규약
        </p>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h4 className="text-xl font-bold text-white mb-4">CSMA/CD</h4>
          <p className="text-sm text-gray-400 mb-4">Carrier Sense Multiple Access with Collision Detection</p>
          
          <div className="space-y-3">
            <ProcessStep num="1" title="Sense">
              전송 전 회선이 비었는지 확인
            </ProcessStep>
            <ProcessStep num="2" title="Collision Detection">
              전송 중 충돌이 감지되면 즉시 데이터 전송을 멈춤
            </ProcessStep>
            <ProcessStep num="3" title="Binary Exponential Backoff">
              재전송 대기 시간을 지수적으로 늘려감 (2^n)
            </ProcessStep>
          </div>

          <div className="mt-6 p-4 bg-gray-950 rounded border border-gray-700">
            <p className="text-sm text-gray-400">
              💡 <strong className="text-emerald-400">CSMA/CA:</strong> 무선(WiFi)에서는 충돌 감지가 어려워 충돌 회피(Avoidance)를 사용
            </p>
          </div>
        </div>
      </Section>

      <Section id="ethernet-switches" title="Ethernet & Switches">
        <div className="grid md:grid-cols-2 gap-6">
          <InfoBox title="MAC Address">
            <ul className="space-y-2 text-sm">
              <li>• 48비트 고정 주소 (예: 1A:2B:3C:4D:5E:6F)</li>
              <li>• <Highlight>ARP</Highlight>: IP 주소를 MAC 주소로 변환</li>
            </ul>
          </InfoBox>

          <InfoBox title="Switch">
            <ul className="space-y-2 text-sm">
              <li>• Link-layer Device (L2)</li>
              <li>• Self-learning: MAC 테이블 자동 구축</li>
              <li>• Filtering & Forwarding</li>
            </ul>
          </InfoBox>
        </div>
      </Section>

      <Section id="simulation" title="종합 시뮬레이션">
        <h3 className="text-2xl font-bold text-white mb-4">A Day in the Life of a Web Request</h3>
        <p className="text-gray-300 mb-6">
          사용자가 www.google.com을 입력했을 때, 패킷이 내 노트북에서 출발하여 구글 서버까지 도달하는 과정
        </p>
        
        <DayInLifeAnimation />
      </Section>
    </div>
  );
}

// Reusable Components
function Section({ title, id, children }) {
  return (
    <section id={id} className="space-y-4 scroll-mt-20">
      <h2 className="text-3xl font-bold text-white border-l-4 border-emerald-500 pl-4">{title}</h2>
      {children}
    </section>
  );
}

function SubSection({ title, id, children }) {
  return (
    <div id={id} className="space-y-3 scroll-mt-20">
      <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
      {children}
    </div>
  );
}

function Card({ title, icon, children }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-emerald-500/50 transition-colors">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-bold text-white mb-3">{title}</h4>
      {children}
    </div>
  );
}

function InfoBox({ title, children }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
      {title && <h4 className="font-bold text-white mb-3">{title}</h4>}
      <div className="text-gray-300">{children}</div>
    </div>
  );
}

function Highlight({ children }) {
  return <span className="text-emerald-400 font-semibold">{children}</span>;
}

function Step({ num, label, color }) {
  const colors = {
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-600'
  };
  return (
    <div className="flex-1">
      <div className={`${colors[color]} text-white rounded-lg p-4`}>
        <div className="text-2xl font-bold mb-1">{num}</div>
        <div className="text-sm">{label}</div>
      </div>
    </div>
  );
}

function Arrow() {
  return <div className="text-2xl text-gray-600">→</div>;
}

function AlgorithmCard({ title, algorithm, complexity, children }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="text-sm text-emerald-400 mb-1">{algorithm}</div>
      <div className="text-xs text-gray-500 mb-4">{complexity}</div>
      {children}
    </div>
  );
}

function LayerCard({ title, icon, children }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="font-semibold text-white mb-2 text-sm">{title}</h4>
      <p className="text-xs text-gray-400">{children}</p>
    </div>
  );
}

function ServiceCard({ title, icon, children }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 text-center hover:border-blue-500/50 transition-colors">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-bold text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-400">{children}</p>
    </div>
  );
}

function ProcessStep({ num, title, children }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
        {num}
      </div>
      <div className="flex-1">
        <h5 className="font-semibold text-white mb-1">{title}</h5>
        <p className="text-sm text-gray-400">{children}</p>
      </div>
    </div>
  );
}
