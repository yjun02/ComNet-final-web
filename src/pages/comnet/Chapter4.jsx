import React from 'react';
import { FragmentationCalculator } from '../../components/features/FragmentationCalculator';
import { SchedulingVisualizer } from '../../components/features/SchedulingVisualizer';
import { InArticleAd } from '../../components/ui/AdSense';
import { SEO } from '../../components/ui/SEO';
import { Section, SubSection, Card, InfoBox, Highlight, Concept, Table, List, ProcessStep } from '../../components/ui/ChapterCommon';

export default function Chapter4() {
  return (
    <>
      <SEO 
        title="Chapter 4: Network Layer - Data Plane"
        description="네트워크 계층의 데이터 평면에 대해 학습합니다. Forwarding vs Routing, 라우터 내부 구조, 패킷 스케줄링, DHCP, NAT, IPv6, SDN 등 핵심 개념 완벽 정리."
        keywords="Network Layer, Data Plane, Forwarding, Routing, Router Architecture, HOL Blocking, Scheduling, DHCP, NAT, IPv6, SDN"
        url="https://sj-wiki.vercel.app/comnet/chapter/4"
      />
    <div className="space-y-8">
      <header className="border-b border-gray-800 pb-8">
        <div className="flex items-center gap-2 text-emerald-500 font-mono text-sm mb-4">
             <span className="px-2 py-1 bg-emerald-500/10 rounded">Chapter 4 : Network Layer - Data Plane</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-6">Chapter 4. 데이터 평면</h1>
        <p className="text-gray-400 text-xl leading-relaxed max-w-3xl">
          데이터를 출발지에서 목적지까지 안전하게 전달하는 네트워크 계층의 핵심 역할을 학습합니다. 
          그 중에서도 실제 패킷을 라우터 내부에서 이동시키는 <span className="text-white font-semibold">Data Plane (데이터 평면)</span>을 집중적으로 다룹니다.
        </p>
      </header>

      <Section id="forwarding-vs-routing" title="1. Forwarding vs. Routing">
        <p className="text-gray-300 mb-6 leading-relaxed">
          네트워크 계층의 임무는 단순합니다. <span className="text-white font-bold">"데이터를 Source에서 Destination까지 보내는 것"</span>입니다.
          이 거대한 임무는 두 가지 핵심 역할로 나뉩니다.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 transition-colors hover:border-blue-500/30">
            <div className="text-blue-400 text-lg font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">🧠</span> Routing (라우팅)
            </div>
            <div className="text-xs font-mono text-gray-500 mb-4 bg-gray-950 p-1 rounded inline-block">Control Plane (제어 평면)</div>
            
            <Concept title="정의 (Definition)">
              패킷이 출발지에서 목적지까지 갈 <Highlight color="blue">전체 경로(Route)</Highlight>를 결정하는 네트워크 전반의 논리입니다.
            </Concept>
            
            <div className="mt-4 space-y-3">
               <div>
                  <strong className="text-white text-sm block mb-1">비유 (Analogy)</strong>
                  <p className="text-sm text-gray-400">여행 출발 전 지도를 보고 서울에서 부산까지의 최적 경로를 계획하는 것.</p>
               </div>
               <div>
                  <strong className="text-white text-sm block mb-1">수행 주체</strong>
                  <p className="text-sm text-gray-400">라우팅 프로세서 + 라우팅 알고리즘 (OSPF, BGP 등)</p>
               </div>
               <div>
                  <strong className="text-white text-sm block mb-1">결과물</strong>
                  <p className="text-sm text-gray-400">Forwarding Table 생성</p>
               </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 transition-colors hover:border-emerald-500/30">
            <div className="text-emerald-400 text-lg font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">🏃</span> Forwarding (포워딩)
            </div>
            <div className="text-xs font-mono text-gray-500 mb-4 bg-gray-950 p-1 rounded inline-block">Data Plane (데이터 평면)</div>
            
            <Concept title="정의 (Definition)">
               라우터의 입력 링크로 들어온 패킷을 Forwarding Table을 참조하여 적절한 <Highlight>출력 링크로 이동</Highlight>시키는 지역적 동작입니다.
            </Concept>

            <div className="mt-4 space-y-3">
               <div>
                  <strong className="text-white text-sm block mb-1">비유 (Analogy)</strong>
                  <p className="text-sm text-gray-400">운전 중 교차로에서 "우회전하세요"라는 내비게이션 지시에 따라 핸들을 꺾는 것.</p>
               </div>
               <div>
                  <strong className="text-white text-sm block mb-1">수행 주체</strong>
                  <p className="text-sm text-gray-400">라우터 내부 하드웨어 (Input Port, Switching Fabric)</p>
               </div>
               <div>
                  <strong className="text-white text-sm block mb-1">특징</strong>
                  <p className="text-sm text-gray-400">나노초(ns) 단위의 매우 빠른 처리 속도</p>
               </div>
            </div>
          </div>
        </div>
      </Section>

      <InArticleAd />

      <Section id="router-structure" title="2. 라우터 내부 구조">
        <p className="text-gray-300 mb-6">
           라우터는 패킷을 고속으로 처리하는 <span className="text-emerald-400">공장</span>과 같습니다. 
           수신한 패킷을 버퍼에 담고, 목적지를 확인하고, 내부 고속도로를 태워 내보냅니다.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card title="1. 입력 포트 (Input)" icon="📥">
            <div className="space-y-4">
               <div>
                  <strong className="text-emerald-400 text-sm">Lookup (조회)</strong>
                  <p className="text-sm text-gray-400 mt-1">
                     가장 중요한 기능입니다. 
                     도착한 패킷의 헤더(Destination IP)를 보고 Forwarding Table에서 <strong>출력 포트</strong>를 찾습니다.
                  </p>
               </div>
               <div>
                  <strong className="text-red-400 text-sm">Queueing</strong>
                  <p className="text-sm text-gray-400 mt-1">
                     패킷 도착 속도가 처리 속도보다 빠르면 버퍼에 쌓입니다. 여기서 <strong>HOL Blocking</strong>이 발생할 수 있습니다.
                  </p>
               </div>
            </div>
          </Card>

          <Card title="2. 스위칭 패브릭" icon="🔄">
             <p className="text-sm text-gray-400 mb-4">
                입력 포트와 출력 포트를 연결하는 라우터 내부의 <strong>고속도로</strong>입니다.
             </p>
             <List items={[
                <span><strong className="text-white">Memory:</strong> CPU가 직접 복사 (느림)</span>,
                <span><strong className="text-white">Bus:</strong> 공용 버스 사용 (대역폭 제한)</span>,
                <span><strong className="text-white">Crossbar:</strong> 그물망 구조 (병렬 처리, 가장 빠름)</span>
             ]} />
          </Card>

          <Card title="3. 출력 포트 (Output)" icon="📤">
             <div className="space-y-4">
               <div>
                  <strong className="text-emerald-400 text-sm">Buffering</strong>
                  <p className="text-sm text-gray-400 mt-1">
                     스위칭 패브릭에서 넘어오는 속도가 링크 전송 속도보다 빠르면 큐(Queue)에 쌓입니다.
                     <br/><span className="text-red-400 text-xs">※ 패킷 손실(Packet Loss)의 주 원인!</span>
                  </p>
               </div>
               <div>
                  <strong className="text-blue-400 text-sm">Scheduling</strong>
                  <p className="text-sm text-gray-400 mt-1">
                     쌓여있는 패킷 중 무엇을 먼저 내보낼지 결정합니다. (FIFO, Priority, WFQ 등)
                  </p>
               </div>
            </div>
          </Card>
        </div>

        <SubSection id="lpm" title="심화: Longest Prefix Matching (LPM)">
          <InfoBox title="어떤 규칙을 따라야 할까?">
            <p className="mb-4 text-sm leading-relaxed">
               라우팅 테이블에는 수많은 IP 대역 정보가 있습니다. 
               하나의 목적지 주소가 여러 항목과 동시에 일치할 수 있는데, 이때는 <strong>가장 길게(구체적으로) 일치하는 항목</strong>을 선택합니다.
               더 구체적인 경로가 더 정확하기 때문입니다.
            </p>
            <div className="bg-black/50 p-4 rounded font-mono text-sm space-y-2 border border-gray-700">
               <div className="text-gray-500">// Example Destination: 11001000 00010111 00010110 10100011</div>
               <div className="group hover:bg-white/5 p-1 rounded">
                  <span className="text-red-400">Entry 1:</span> 11001000 00010111 00010****** <span className="text-gray-500">(21-bit match)</span>
               </div>
               <div className="group hover:bg-white/5 p-1 rounded">
                  <span className="text-emerald-400">Entry 2:</span> 11001000 00010111 00010110*** <span className="text-emerald-500 font-bold">👈 (24-bit match, Winner!)</span>
               </div>
            </div>
          </InfoBox>
        </SubSection>

        <SubSection id="hol-blocking" title="심화: HOL Blocking">
           <Concept title="Head-of-the-Line Blocking">
              입력 버퍼의 맨 앞(Head)에 있는 패킷이 차단되면, 그 뒤에 있는 패킷들은 목적지 출력 포트가 비어있음에도 불구하고 나가지 못하고 갇히는 현상입니다.
           </Concept>
        </SubSection>

        <SubSection id="scheduling" title="패킷 스케줄링 (Scheduling Algorithms)">
          <p className="text-gray-300 mb-6">
            출력 버퍼가 가득 찼을 때, 혹은 쌓여있는 패킷들 중 무엇을 먼저 처리할지 결정하는 정책입니다.
          </p>
          
          <div className="mb-6">
             <SchedulingVisualizer />
          </div>
          
          <Table 
             headers={["정책 (Policy)", "설명 (Description)", "특징 (Features)"]}
             rows={[
                [
                   <strong className="text-white">FCFS (FIFO)</strong>, 
                   "도착한 순서대로 처리합니다 (First Come First Serve).", 
                   "가장 단순하지만, 실시간 트래픽 지연 문제 발생 가능."
                ],
                [
                   <strong className="text-white">Priority</strong>, 
                   "패킷을 중요도별 클래스로 나누고, 높은 클래스를 무조건 먼저 처리합니다.", 
                   "VoIP나 게임 트래픽 보호에 유리하지만, 낮은 클래스는 기아(Starvation) 상태 빠질 수 있음."
                ],
                [
                   <strong className="text-white">Round Robin</strong>, 
                   "클래스별로 번갈아가며 기회를 줍니다.", 
                   "공정성(Fairness) 보장. 기아 상태 방지."
                ],
                [
                   <strong className="text-white">WFQ</strong>, 
                   "가중치(Weight)를 두어 라운드 로빈을 돌립니다.", 
                   "중요한 트래픽에 더 많은 대역폭 할당 가능 (예: 50%, 30%, 20%)."
                ]
             ]}
          />
        </SubSection>
      </Section>

      <InArticleAd />

      <Section id="ip-protocol" title="3. IP Protocol & Addressing">
        <Concept title="Best Effort Service (최선 노력)">
           IP 프로토콜은 패킷 전송을 100% 보장하지 않습니다. 순서가 뒤바뀔 수도, 중간에 사라질 수도 있습니다.
           이러한 <span className="text-emerald-400">"단순함"</span>이 인터넷을 전 세계로 확장시킬 수 있었던 비결입니다.
           (복잡한 신뢰성 보장은 상위 계층인 TCP가 담당합니다.)
        </Concept>

        <SubSection id="fragmentation" title="IP Fragmentation (단편화)">
          <div className="grid md:grid-cols-2 gap-6 items-center">
             <div className="space-y-4">
                <InfoBox title="왜 패킷을 쪼갤까요?">
                   <p className="text-sm mb-2">
                     네트워크 링크마다 한 번에 보낼 수 있는 최대 크기, 즉 <Highlight>MTU (Maximum Transmission Unit)</Highlight>가 다릅니다.
                     큰 도로에서 좁은 골목길로 들어갈 때 짐을 나눠서 옮겨야 하는 것과 같습니다.
                   </p>
                   <List items={[
                      "MTU보다 큰 IP 데이터그램은 여러 조각(Fragment)으로 나뉩니다.",
                      "재조립(Reassembly)은 최종 목적지 호스트에서만 이루어집니다.",
                      "offset 필드를 사용하여 순서를 맞춥니다."
                   ]} />
                </InfoBox>
             </div>
             <div>
                <FragmentationCalculator />
             </div>
          </div>
        </SubSection>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-6">
                <SubSection id="dhcp" title="DHCP: 자동 IP 할당">
                    <p className="text-gray-300 text-sm mb-4">
                       "Plug-and-play". 네트워크에 접속하자마자 서버로부터 IP 주소, 서브넷 마스크, 게이트웨이, DNS 정보를 자동으로 받아옵니다.
                    </p>
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                       <h4 className="font-bold text-white mb-4">DORA 4단계 프로세스</h4>
                       <div className="space-y-4 text-sm">
                          <ProcessStep num="1" title="Discover">
                             클라이언트(나)가 <span className="text-blue-400">Broadcast</span>로 "IP 주소 줄 사람?" 외칩니다.
                          </ProcessStep>
                          <ProcessStep num="2" title="Offer">
                             DHCP 서버가 "이 IP(192.168.1.10) 어때?" 하고 제안합니다.
                          </ProcessStep>
                          <ProcessStep num="3" title="Request">
                             클라이언트가 "좋아요, 그 주소 쓸게요!" 하고 요청합니다.
                          </ProcessStep>
                          <ProcessStep num="4" title="ACK">
                             서버가 최종 승인합니다. 이제 사용 가능!
                          </ProcessStep>
                       </div>
                    </div>
                </SubSection>
            </div>

            <div className="space-y-6">
                 <SubSection id="nat" title="NAT (Network Address Translation)">
                    <InfoBox title="사설 IP와 공인 IP">
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                            IPv4 주소 부족 문제를 해결한 일등 공신입니다. 
                            집에서는 <Highlight>사설 IP (192.168.x.x)</Highlight>를 마음껏 쓰고, 
                            인터넷으로 나갈 때만 공유기(NAT 라우터)의 <Highlight color="blue">공인 IP</Highlight> 하나를 빌려 씁니다.
                        </p>
                        <List items={[
                           <span><strong>Translation Table:</strong> (사설IP, 포트) ↔ (공인IP, 새 포트) 매핑 관리</span>,
                           <span><strong>보안:</strong> 외부에서 내부 PC로 직접 접근 불가능</span>,
                           <span><strong>단점:</strong> P2P 연결 등에서 복잡성 증가 (Layer violation)</span>
                        ]} />
                    </InfoBox>
                </SubSection>

                 <SubSection id="ipv6" title="IPv6: 차세대 프로토콜">
                    <Card title="IPv6 Highlights" icon="🚀">
                        <p className="text-xs text-gray-400 mb-4">32비트 IPv4의 한계를 넘어서는 128비트 주소 체계</p>
                        <List items={[
                           <span className="text-white">주소 공간 확장 (128-bit)</span>,
                           <span><strong>Header 간소화:</strong> 40byte 고정 헤더로 처리 속도 향상</span>,
                           <span><strong>No Fragmentation:</strong> 중간 라우터 부하 제거</span>,
                           <span><strong>No Checksum:</strong> 속도 향상 (상위 계층에 위임)</span>
                        ]} />
                    </Card>
                </SubSection>
            </div>
        </div>
      </Section>

      <InArticleAd />

      <Section id="sdn" title="4. Generalized Forwarding (SDN)">
        <p className="text-gray-300 mb-6">
           전통적인 라우터는 오직 '목적지 IP'만 보고 포워딩했습니다. 
           하지만 <span className="text-emerald-400">SDN (Software Defined Networking)</span>은 다릅니다.
        </p>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Match + Action</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    OpenFlow 프로토콜의 핵심입니다. 단순히 IP만 보는 게 아니라, 
                    <strong>여러 헤더 필드</strong>를 조합하여 <strong>다양한 동작</strong>을 수행합니다.
                    이로 인해 라우터 하나가 방화벽이 되기도 하고, 로드 밸런서가 되기도 합니다.
                </p>
                <div className="space-y-2 text-sm bg-black/40 p-4 rounded-lg border border-gray-700">
                    <div className="flex gap-2">
                       <span className="text-emerald-400 font-bold min-w-[60px]">Match:</span>
                       <span className="text-gray-300">Src/Dst IP, MAC Address, TCP/UDP Port, VLAN ID...</span>
                    </div>
                    <div className="flex gap-2">
                       <span className="text-blue-400 font-bold min-w-[60px]">Action:</span>
                       <span className="text-gray-300">Forward, Drop, Modify Field, Encapsulate...</span>
                    </div>
                </div>
             </div>
             
             <div className="flex-1 flex justify-center">
                <div className="bg-black/50 p-6 rounded-lg text-center border border-gray-700 max-w-sm">
                   <div className="text-4xl mb-4">🤖</div>
                   <div className="text-white font-bold mb-2">Flow Table</div>
                   <div className="text-xs text-gray-500">
                      컨트롤러로부터 "이런 패킷이 오면 이렇게 해라" 하는 규칙(Rule)들을 다운로드 받아 저장하는 곳
                   </div>
                </div>
             </div>
          </div>
        </div>
      </Section>
      
      <div className="mt-20 pb-[150px]">
         <InArticleAd />
      </div>
    </div>
    </>
  );
}
