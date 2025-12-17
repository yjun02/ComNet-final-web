import React from 'react';
import { GitMerge, Target, Layers, Network, Scale, MousePointer2, Shuffle, Split, Divide, Sigma } from 'lucide-react';
import { Section, SubSection, Card, InfoBox, List, Table } from '../../components/ui/ChapterCommon';
import { SEO } from '../../components/ui/SEO';
import { InArticleAd } from '../../components/ui/AdSense';
import { InlineMath, BlockMath } from '../../components/ui/MathUtils';
import { SigmoidVisual, LinearBoundaryVisual, LDAVisual } from '../../components/ui/ClassificationVisuals';
import { CodeBlock } from '../../components/ui/CodeBlock';

export default function Chapter9() {
  return (
    <>
      <SEO 
        title="Chapter 9: Linear Classification"
        description="이진 분류와 다중 클래스 분류를 위한 선형 모델들을 학습합니다. LDA의 투영 개념부터 로지스틱 회귀의 확률적 접근(MLE)까지 다룹니다."
        keywords="Linear Classification, Logistic Regression, LDA, Sigmoid, Cross Entropy, Decision Boundary, Softmax"
        url="https://comnet-final-web.vercel.app/ml/chapter/linear_classification"
      />
      
      <div className="space-y-12">
        <header className="border-b border-gray-800 pb-8">
          <div className="flex items-center gap-2 text-blue-500 font-mono text-sm mb-4">
             <span className="px-2 py-1 bg-blue-500/10 rounded">Chapter 9 : Linear Classification</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Chapter 9. 선형 분류 (Linear Classification)</h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-3xl">
            데이터를 적절한 <strong>범주(Class)</strong>로 나누는 기술입니다. <br/>
            직선 하나로 O와 X를 가를 수 있을까요? 확률과 기하학을 오가는 분류의 세계로 떠나봅시다.
          </p>
        </header>

        <Section id="intro" title="1. 분류(Classification)란?">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card title="이산적인 결과 예측" icon={<Split />}>
                    <p className="text-sm text-gray-400 mt-2">
                         회귀(Regression)가 연속적인 숫자를 맞추는 것이라면, 분류는 <strong>정해진 라벨(0 또는 1, 고양이 또는 개)</strong>을 맞추는 것입니다.
                    </p>
                    <div className="mt-4 bg-gray-900 p-2 rounded text-center text-xs text-emerald-400">
                        <InlineMath math="y \in \{0, 1\}" /> or <InlineMath math="y \in \{C_1, \dots, C_K\}" />
                    </div>
                </Card>
                <Card title="결정 경계 (Decision Boundary)" icon={<Network />}>
                    <p className="text-sm text-gray-400 mt-2">
                        공간 상에서 클래스를 나누는 경계선입니다. 선형 분류기에서는 이 경계가 <strong>직선(Line)</strong>이나 <strong>평면(Hyperplane)</strong>으로 나타납니다.
                    </p>
                </Card>
            </div>

            <SubSection title="Interactive Boundary: 직접 선을 그어보세요">
                <LinearBoundaryVisual />
            </SubSection>
        </Section>

        <Section id="models" title="2. 생성 모델 vs 판별 모델">
             <p className="text-gray-300 mb-6">
                 같은 분류 문제를 풀더라도 접근 방식에 따라 크게 두 가지로 나뉩니다.
             </p>
             <div className="grid md:grid-cols-2 gap-6">
                 <InfoBox title="Generative Model (생성 모델)">
                     <h5 className="text-white font-bold mb-2">LDA (Linear Discriminant Analysis)</h5>
                     <p className="text-sm text-gray-400">
                         데이터가 <strong>어떻게 생성되었는지(분포)</strong>를 먼저 배웁니다. (<InlineMath math="P(x|y)" />)
                         그 후 베이즈 정리를 이용해 클래스를 추론합니다.
                     </p>
                     <ul className="text-xs text-gray-500 mt-2 list-disc list-inside">
                         <li>데이터 분포에 대한 가정(정규분포 등)이 필요함</li>
                         <li>이상치(Outlier)에 민감할 수 있음</li>
                     </ul>
                 </InfoBox>
                 <InfoBox title="Discriminative Model (판별 모델)">
                     <h5 className="text-white font-bold mb-2">Logistic Regression</h5>
                     <p className="text-sm text-gray-400">
                         데이터를 <strong>어떻게 나눌지(경계)</strong>를 바로 배웁니다. (<InlineMath math="P(y|x)" />)
                         클래스 간의 차이 자체에 집중합니다.
                     </p>
                     <ul className="text-xs text-gray-500 mt-2 list-disc list-inside">
                         <li>가정이 적어 유연함</li>
                         <li>데이터가 많을수록 성능이 좋음</li>
                     </ul>
                 </InfoBox>
             </div>
        </Section>

        <InArticleAd />

        <Section id="lda" title="3. LDA (Linear Discriminant Analysis)">
            <p className="text-gray-300 mb-6">
                데이터를 가장 잘 구분할 수 있는 <strong>어떤 축(Projection Axis)</strong>을 찾는 것이 목표입니다.
            </p>
            
            <div className="bg-black/40 p-6 rounded-xl border border-gray-800 text-center mb-8">
                 <BlockMath math="J(\mathbf{w}) = \frac{\mathbf{w}^T \mathbf{S}_B \mathbf{w}}{\mathbf{w}^T \mathbf{S}_W \mathbf{w}} \quad (\text{Fisher's Criterion})" />
                 <p className="text-sm text-gray-500 mt-4">
                     분자(<InlineMath math="\mathbf{S}_B" />): 클래스 간 거리는 멀게, <br className="md:hidden"/>
                     분모(<InlineMath math="\mathbf{S}_W" />): 클래스 내 분산은 작게.
                 </p>
            </div>

            <SubSection title="Visualizing LDA Projection">
                <LDAVisual />
            </SubSection>
        </Section>

        <Section id="logistic" title="4. 로지스틱 회귀 (Logistic Regression)">
             <div className="flex items-start gap-4 mb-6">
                 <div className="text-emerald-500"><Sigma size={32}/></div>
                 <div>
                     <h3 className="text-xl font-bold text-white mb-2">확률로의 맵핑: 시그모이드</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                         선형 회귀의 결과값(<InlineMath math="\mathbf{w}^T\mathbf{x}" />)은 범위가 무한대입니다. 
                         이를 <strong>0과 1 사이의 확률값</strong>으로 변환하기 위해 시그모이드 함수를 통과시킵니다.
                     </p>
                 </div>
             </div>

             <SubSection title="Sigmoid Function Interactive">
                 <SigmoidVisual />
             </SubSection>

             <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-900 border border-gray-800 rounded">
                      <h4 className="font-bold text-white mb-2">Log-Likelihood (로그 우도)</h4>
                      <p className="text-xs text-gray-400 mb-2">
                          모델이 정답을 맞출 확률을 최대화합니다.
                      </p>
                      <div className="text-center py-2"><InlineMath math="\sum_{i} \log P(y^{(i)} | \mathbf{x}^{(i)})" /></div>
                  </div>
                  <div className="p-4 bg-gray-900 border border-gray-800 rounded">
                      <h4 className="font-bold text-white mb-2">Binary Cross-Entropy Loss</h4>
                      <p className="text-xs text-gray-400 mb-2">
                          딥러닝에서 쓰이는 손실 함수와 수학적으로 동일합니다. (우도에 - 붙임)
                      </p>
                      <div className="text-center py-2"><InlineMath math="J(\mathbf{w}) = - \frac{1}{N} \text{LL}" /></div>
                  </div>
             </div>
        </Section>
        
        <Section id="multiclass" title="5. 다중 클래스 분류 (Multi-Class)">
            <p className="text-gray-300 mb-6">
                0과 1 말고 더 많은 클래스가 있다면 어떻게 할까요? (예: 개, 고양이, 새)
            </p>
            <Table 
                headers={['전략', '설명', '필요한 분류기 수(K=클래스수)']}
                rows={[
                    [
                        <span className="font-bold text-white">OvR (One-vs-Rest)</span>,
                        '나머지 전부와 나 하나를 싸움 붙임. 가장 점수가 높은 클래스 선택.',
                        <span className="font-mono text-emerald-400">K개</span>
                    ],
                    [
                        <span className="font-bold text-white">OvO (One-vs-One)</span>,
                        '리그전. 모든 클래스 쌍끼리 맞붙어 투표로 결정.',
                        <span className="font-mono text-emerald-400">K(K-1)/2개</span>
                    ],
                    [
                        <span className="font-bold text-white">Softmax (Multinomial)</span>,
                        '여러 클래스의 확률을 한 번에 계산 (시그모이드의 확장).',
                        <span className="font-mono text-emerald-400">1개 (Vector Output)</span>
                    ]
                ]}
            />
        </Section>

        <InArticleAd />

        <Section id="python" title="6. Python Implementation">
             <InArticleAd />
             <CodeBlock 
                 language="python" 
                 title="Logistic Regression & LDA"
                 code={`import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.datasets import make_classification

# 1. 데이터 생성
X, y = make_classification(n_samples=100, n_features=2, n_redundant=0, 
                           n_informative=2, random_state=1, n_clusters_per_class=1)

# 2. 로지스틱 회귀 학습
log_reg = LogisticRegression()
log_reg.fit(X, y)

# 3. LDA 학습
lda = LinearDiscriminantAnalysis()
lda.fit(X, y)

# 4. 결과 비교
print(f"Logistic Acc: {log_reg.score(X, y):.3f}")
print(f"LDA Acc: {lda.score(X, y):.3f}")

# 5. 확률 예측 (Logistic)
prob = log_reg.predict_proba([[0.5, 0.5]])
print(f"Probability Class 1: {prob[0][1]:.3f}")`}
             />
        </Section>
        
        <div className="mt-20 pb-24">
             <InArticleAd />
        </div>
      </div>
    </>
  );
}
