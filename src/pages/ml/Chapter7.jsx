import React from 'react';
import { BrainCircuit, Target, Share2, Ruler, Network, GitGraph, Layers, ArrowDownUp, Calculator, BarChart3, Microscope } from 'lucide-react';
import { Section, SubSection, Card, InfoBox, Highlight, List, Table, Concept, ProcessStep } from '../../components/ui/ChapterCommon';
import { SEO } from '../../components/ui/SEO';
import { InArticleAd } from '../../components/ui/AdSense';
import { InlineMath, BlockMath } from '../../components/ui/MathUtils';
import { KMeansVisual, DendrogramVisual, LinkageVisual, DistanceMetricsVisual } from '../../components/ui/ClusteringVisuals';
import { CodeBlock } from '../../components/ui/CodeBlock';

export default function Chapter7() {
  return (
    <>
      <SEO 
        title="Chapter 7: Clustering"
        description="비지도 학습의 핵심인 계층적 클러스터링과 K-Means를 심도 있게 다룹니다. 수학적 최적화 목표(SSE), 덴드로그램, 링크 방식을 상세히 학습합니다."
        keywords="Clustering, Hierarchical, K-Means, SSE, Silhouette Score, Dendrogram, Linkage, Unsupervised Learning"
        url="https://sj-wiki.vercel.app/ml/chapter/7"
      />
      
      <div className="space-y-12">
        <header className="border-b border-gray-800 pb-8">
          <div className="flex items-center gap-2 text-blue-500 font-mono text-sm mb-4">
             <span className="px-2 py-1 bg-blue-500/10 rounded">Chapter 7 : Clustering</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Chapter 7. 클러스터링 (Clustering)</h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-3xl">
            타겟 값 <InlineMath math="y" />가 없는 상황에서 데이터 <InlineMath math="D = \{x_1, \dots, x_N\}" />의 내부 구조를 파악하는 여정입니다.
            <br />
            유사한 것끼리 묶는 <strong>군집화</strong>와 데이터의 분포를 찾는 <strong>밀도 추정</strong>을 탐구합니다.
          </p>
        </header>

        <Section id="intro" title="1. 비지도 학습과 데이터 탐색">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card title="비지도 학습의 두 가지 축" icon={<BrainCircuit />}>
                    <ul className="space-y-4 text-sm text-gray-400 mt-2">
                        <li>
                            <strong className="text-white block mb-1">1. 밀도 추정 (Density Estimation)</strong>
                            데이터가 추출되었을 모집단의 확률 모델 <InlineMath math="P(x)" />를 구축합니다.
                        </li>
                        <li>
                            <strong className="text-white block mb-1">2. 클러스터링 (Clustering)</strong>
                            유사한 예제들을 하나의 그룹으로 묶어 내재된 패턴을 발견합니다.
                        </li>
                    </ul>
                </Card>
                <Card title="EDA: 탐색적 데이터 분석" icon={<Microscope />}>
                    <p className="text-sm text-gray-400 mb-4">
                        데이터를 받으면 가장 먼저 통계치(평균, 표준편차 등)를 확인해야 합니다.
                    </p>
                    <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                        <span className="text-emerald-400 font-bold block mb-2">Beyond Formal Modeling</span>
                        데이터가 무엇을 말하는지 그래프나 클러스터링을 통해 시각적으로 파악해야 합니다. 수치만으로는 알 수 없는 패턴(예: Anscombe's Quartet)을 발견할 수 있습니다.
                    </div>
                </Card>
            </div>
        </Section>

        <InArticleAd />

        <Section id="hierarchical" title="2. 계층적 클러스터링 (Connectivity-based)">
            <p className="text-gray-300 mb-6 text-lg">
                데이터 간의 연결 관계를 기반으로 계층적인 구조를 만듭니다. 이를 <strong>덴드로그램(Dendrogram)</strong>이라는 트리 형태로 표현할 수 있습니다.
            </p>
            
            <div className="mb-8">
                <DendrogramVisual />
            </div>

            <SubSection title="2.1 접근 방식: 어떻게 묶을 것인가?">
                <div className="grid md:grid-cols-2 gap-6 mb-6 mt-4">
                    <InfoBox title="Agglomerative (병합형, Bottom-up)">
                        <p>각 데이터를 개별 클러스터로 시작하여, 가장 가까운 것끼리 <strong>점차 합쳐 나가는</strong> 방식입니다.</p>
                        <p className="text-xs text-gray-500 mt-2">*이 강의의 핵심 초점입니다.</p>
                    </InfoBox>
                    <InfoBox title="Divisive (분할형, Top-down)">
                        <p>모든 데이터를 하나의 큰 클러스터로 보고, 이를 <strong>점차 쪼개 나가는</strong> 방식입니다.</p>
                    </InfoBox>
                </div>
            </SubSection>

            <SubSection title="2.2 클러스터 대푯값과 거리 측정 (Representation & Linkage)">
                <div className="mb-6">
                    <h4 className="font-bold text-white mb-2">Q. 여러 점이 모인 '클러스터'를 하나의 점으로 어떻게 표현할까?</h4>
                    <ul className="list-disc list-inside text-gray-400 ml-2 space-y-1">
                        <li><strong>Centroid (중심점):</strong> 클러스터 멤버들의 산술 평균값 (물리적 무게중심).</li>
                        <li><strong>Medoid (중간점):</strong> 데이터 중 가장 중심에 위치한 '실제' 데이터 포인트.</li>
                    </ul>
                </div>

                <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-800">
                    <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <Ruler className="text-blue-400" /> Linkage Methods: 클러스터 간 거리 측정
                    </h4>
                    
                    <div className="mb-6">
                        <LinkageVisual />
                    </div>

                    <p className="text-sm text-gray-400 mb-4">두 클러스터 <InlineMath math="C_1" />과 <InlineMath math="C_2" /> 사이의 거리를 재는 방법에 따라 결과 모양이 달라집니다.</p>
                    
                    <Table 
                        headers={['연결 방식', '수학적 정의', '특징 및 결과']}
                        rows={[
                            [
                                <span className="text-white font-bold">Single Link<br/>(단일 연결)</span>, 
                                <InlineMath math="d(C_1, C_2) = \min_{x \in C_1, y \in C_2} \|x - y\|" />, 
                                'Chain 효과: 점들이 길게 늘어지는 경향. 최소 신장 트리(MST)와 유사.'
                            ],
                            [
                                <span className="text-white font-bold">Complete Link<br/>(완전 연결)</span>, 
                                <InlineMath math="d(C_1, C_2) = \max_{x \in C_1, y \in C_2} \|x - y\|" />, 
                                'Compactness: 지름이 작은 원형의 조밀한 클러스터 형성.'
                            ],
                            [
                                <span className="text-white font-bold">Average Link<br/>(평균 연결)</span>, 
                                <InlineMath math="d(C_1, C_2) = \frac{1}{|C_1||C_2|} \sum_{x \in C_1} \sum_{y \in C_2} \|x - y\|" />, 
                                '절충안: Single과 Complete의 중간 성격. 비교적 안정적.'
                            ]
                        ]}
                    />
                </div>
            </SubSection>

            <div className="mt-8 bg-red-900/10 border border-red-900/30 p-4 rounded-lg">
                <h4 className="text-red-400 font-bold mb-2">⚠️ 계층적 클러스터링의 한계</h4>
                <p className="text-gray-300 text-sm">
                    매 단계마다 모든 클러스터 쌍의 거리를 계산해야 하므로 계산 복잡도가 <strong><InlineMath math="O(N^3)" /></strong>에 달합니다. 
                    데이터가 많을 경우(Large Scale) 사용하기 어렵습니다. 그래서 우리는 <strong>K-Means</strong>가 필요합니다.
                </p>
            </div>
        </Section>

        <InArticleAd />

        <Section id="kmeans" title="3. K-Means Clustering (Centroid-based)">
            <div className="flex items-start gap-4 mb-8">
                 <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 hidden md:block">
                     <Target size={32} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-white mb-2">효율적인 대안</h3>
                    <p className="text-gray-300 leading-relaxed">
                        복잡도가 높은 계층적 방법 대신, <strong>반복적(Iterative)인 최적화</strong>를 통해 데이터를 <InlineMath math="k" />개의 클러스터로 묶습니다. 
                        (<InlineMath math="k \ll N" />)
                    </p>
                 </div>
             </div>
            
            <SubSection title="K-Means 시각화">
                 <div className="mb-6">
                     <KMeansVisual />
                 </div>
            </SubSection>

            <SubSection title="3.1 최적화 목표 (Objective Function)">
                <p className="text-gray-400 mb-4">
                    단순히 점을 찍는 게 아닙니다. K-Means는 <strong>클러스터 내부 편차(Within-cluster deviations)인 SSE를 최소화</strong>하는 문제를 푸는 것입니다.
                </p>
                <div className="bg-black/40 p-6 rounded-xl text-center border border-gray-800 mb-6">
                    <BlockMath math="\text{argmin}_S \sum_{i=1}^{k} \sum_{\mathbf{x} \in S_i} \|\mathbf{x} - \mathbf{m}_i\|^2" />
                    <div className="text-sm text-gray-500 mt-4 text-left px-4 border-t border-gray-800 pt-4">
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                             <li>• <InlineMath math="S_i" />: <InlineMath math="i" />번째 클러스터</li>
                             <li>• <InlineMath math="\mathbf{m}_i" />: <InlineMath math="i" />번째 클러스터의 중심(Centroid)</li>
                             <li>• 식의 의미: 중심점과 데이터 간 거리 제곱의 합(SSE) 최소화</li>
                        </ul>
                    </div>
                </div>
            </SubSection>

            <SubSection title="3.2 알고리즘 프로세스">
                 <div className="relative border-l-2 border-gray-800 pl-8 space-y-8 my-8 ml-4">
                     {[
                         { 
                             title: "Initialization", 
                             desc: "K개의 초기 중심점을 무작위로 선택합니다.",
                             icon: "🎲"
                         },
                         { 
                             title: "Assignment Step", 
                             desc: "각 데이터를 가장 가까운 중심점(Centroid)에 할당합니다.",
                             icon: "📍"
                         },
                         { 
                             title: "Update Step", 
                             desc: "할당된 데이터들의 '평균(Mean)' 위치로 중심점을 이동시킵니다.",
                             icon: "🔄"
                         },
                         { 
                             title: "Convergence", 
                             desc: "중심점이 더 이상 변하지 않을 때까지 위 과정을 반복합니다.",
                             icon: "🏁"
                         }
                     ].map((step, idx) => (
                         <div key={idx} className="relative">
                             <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-gray-800 border-4 border-[#0d0d0d] flex items-center justify-center text-[10px] text-gray-500"></div>
                             <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                <span className="text-lg">{step.icon}</span> {step.title}
                             </h4>
                             <p className="text-gray-400 text-sm">{step.desc}</p>
                         </div>
                     ))}
                 </div>
                 
                 <div className="bg-blue-900/10 border border-blue-900/30 p-4 rounded-lg mb-8">
                     <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2"><Calculator size={18}/> 왜 '평균'으로 이동하나요?</h4>
                     <p className="text-gray-300 text-sm mb-2">
                         손실 함수(SSE)를 중심점 <InlineMath math="\mathbf{m}_i" />에 대해 편미분하여 0이 되는 지점을 찾으면, 수학적으로 <strong>산술 평균</strong>이 유도되기 때문입니다.
                     </p>
                     <div className="text-center py-2">
                        <InlineMath math="\frac{\partial SSE}{\partial \mathbf{m}} = 0 \implies \mathbf{m}_i = \frac{1}{|S_i|} \sum_{\mathbf{x} \in S_i} \mathbf{x}" />
                     </div>
                 </div>
            </SubSection>

            <SubSection title="3.3 장점과 단점">
                <div className="grid md:grid-cols-2 gap-6">
                    <Card title="장점 (Pros)" icon="👍">
                        <ul className="list-disc list-inside text-gray-400 text-sm space-y-2">
                            <li>이해와 구현이 쉽고 직관적입니다.</li>
                            <li>계산 속도가 빠릅니다 (<InlineMath math="O(N)" />).</li>
                            <li>항상 수렴(Convergence)이 보장됩니다.</li>
                        </ul>
                    </Card>
                    <Card title="단점 (Cons)" icon="👎">
                        <ul className="list-disc list-inside text-gray-400 text-sm space-y-2">
                            <li>전역 최적해(Global Optimum)가 아닌 <strong>지역 최적해(Local Optimum)</strong>에 빠질 수 있습니다.</li>
                            <li>초기값 설정에 민감합니다.</li>
                            <li>이상치(Outlier)에 민감합니다.</li>
                            <li>원형이 아닌 기하학적 형태의 클러스터는 잘 찾지 못합니다.</li>
                        </ul>
                    </Card>
                </div>
            </SubSection>
        </Section>

        <Section id="practical" title="4. 실전적 이슈와 해결 (Practical Issues)">
            <SubSection title="4.1 데이터 정규화 (Normalization)">
                <p className="text-gray-400 mb-4">
                    유클리드 거리는 단위(Scale)에 민감합니다. 예를 들어 '연봉'과 '나이'를 그대로 쓰면 연봉이 결과를 지배합니다.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
                        <h5 className="text-white font-bold mb-2">Standardization (Z-score)</h5>
                        <p className="text-xs text-gray-500 mb-4">평균을 0, 표준편차를 1로 변환</p>
                        <div className="text-center"><InlineMath math="x_{new} = \frac{x - \mu}{\sigma}" /></div>
                    </div>
                    <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
                        <h5 className="text-white font-bold mb-2">Min-Max Scaling</h5>
                        <p className="text-xs text-gray-500 mb-4">데이터를 0과 1 사이로 변환</p>
                        <div className="text-center"><InlineMath math="x_{new} = \frac{x - \min(x)}{\max(x) - \min(x)}" /></div>
                    </div>
                </div>
            </SubSection>

            <SubSection title="4.2 최적의 K 선택: Elbow Method">
                <p className="text-gray-300 text-sm mb-4">
                    K가 커질수록 오차(SSE)는 줄어들지만, 무작정 늘릴 순 없습니다.
                    SSE 그래프가 팔꿈치처럼 <strong>급격히 꺾이는 지점(Elbow Point)</strong>을 찾습니다.
                </p>
            </SubSection>

            <SubSection title="4.3 클러스터 평가: 실루엣 계수 (Silhouette Coefficient)">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                   <div className="mb-4 text-center">
                        <BlockMath math="sc_n = \frac{b_n - a_n}{\max(a_n, b_n)}" />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm mt-6">
                        <div>
                            <span className="block font-bold text-emerald-400 text-lg mb-1">Near +1</span>
                            <span className="text-gray-400">매우 우수<br/>(응집도↑ 분리도↑)</span>
                        </div>
                        <div>
                            <span className="block font-bold text-gray-400 text-lg mb-1">Near 0</span>
                            <span className="text-gray-500">모호함<br/>(경계선 위치)</span>
                        </div>
                        <div>
                            <span className="block font-bold text-red-400 text-lg mb-1">Near -1</span>
                            <span className="text-gray-500">잘못됨<br/>(다른 군집에 할당됨)</span>
                        </div>
                   </div>
                   <p className="text-xs text-center text-gray-500 mt-4">
                       <InlineMath math="a_n" />: 내 그룹 평균 거리(작을수록 좋음), <InlineMath math="b_n" />: 가장 가까운 남의 그룹 평균 거리(클수록 좋음)
                   </p>
                </div>
            </SubSection>
        </Section>

        <Section id="distances" title="5. 다양한 거리 측정 방식 (Distance Measures)">
            <p className="text-gray-300 mb-6">
                클러스터링의 품질은 결국 "거리를 어떻게 정의하느냐"에 달려 있습니다. 각기 다른 상황에 적합한 거리 척도들을 직접 확인해 보세요.
            </p>
            <DistanceMetricsVisual />
        </Section>

        <Section id="extensions" title="6. 확장 및 대안 (Extensions)">
            <List items={[
                <span><strong>초기값 문제 해결 (k-Means++):</strong> 초기 중심점을 서로 멀리 떨어지도록 확률적으로 선택하여 지역 최적해 문제를 완화합니다.</span>,
                <span><strong>이상치 대응 (k-Medoids):</strong> 평균 대신 중앙값(Medoid)을 사용하여 이상치(Outlier)에 강건하게 만듭니다.</span>,
                <span><strong>확률적 할당 (GMM):</strong> 데이터를 특정 클러스터에 100% 할당하는 대신, 확률적으로(Soft) 할당합니다.</span>
            ]} />
        </Section>
        
        <Section id="python-code" title="7. Python Implementation">
             <CodeBlock 
                 language="python" 
                 title="Silhouette Score Example"
                 code={`from sklearn.metrics import silhouette_score

# X: 데이터, labels: 예측한 클러스터 라벨
score = silhouette_score(X, kmeans.labels_)
print(f"Silhouette Score: {score:.3f}")`}
             />
        </Section>

        <div className="mt-20 pb-24">
             <InArticleAd />
        </div>
      </div>
    </>
  );
}
