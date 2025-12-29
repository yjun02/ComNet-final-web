import React from 'react';
import { TrendingUp, Target, Scale, Zap, Activity, Microscope, ArrowRight, BrainCircuit, LineChart, Sigma, Shuffle } from 'lucide-react';
import { Section, SubSection, Card, InfoBox, List, Table } from '../../components/ui/ChapterCommon';
import { SEO } from '../../components/ui/SEO';
import { InArticleAd } from '../../components/ui/AdSense';
import { InlineMath, BlockMath } from '../../components/ui/MathUtils';
import { InteractiveRegression, GradientDescentVisual, RegularizationVisual } from '../../components/ui/RegressionVisuals';
import { CodeBlock } from '../../components/ui/CodeBlock';

export default function Chapter8() {
  return (
    <>
      <SEO 
        title="Chapter 8: Linear Regression"
        description="머신러닝의 가장 기초가 되는 선형 회귀 모델을 학습합니다. 최소 제곱법(Least Squares), 경사 하강법(Gradient Descent), 그리고 정규화(Regularization)까지 심도 있게 다룹니다."
        keywords="Linear Regression, Gradient Descent, Normal Equation, Ridge, Lasso, MSE, R-squared"
        url="https://sj-wiki.vercel.app/ml/chapter/8"
      />
      
      <div className="space-y-12">
        <header className="border-b border-gray-800 pb-8">
          <div className="flex items-center gap-2 text-blue-500 font-mono text-sm mb-4">
             <span className="px-2 py-1 bg-blue-500/10 rounded">Chapter 8 : Linear Regression</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Chapter 8. 선형 회귀 (Linear Regression)</h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-3xl">
            데이터의 경향성을 가장 잘 설명하는 <strong>'하나의 직선'</strong>을 찾는 과정입니다. <br/>
            가장 단순하지만, 모든 예측 모델의 근간이 되는 강력한 도구이며 통계적 추론의 핵심입니다.
          </p>
        </header>

        <Section id="intro" title="1. 회귀 분석이란?">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card title="지도 학습의 대표 주자" icon={<BrainCircuit />}>
                    <p className="text-sm text-gray-400 mt-2">
                        정답(<InlineMath math="y" />)이 있는 데이터(<InlineMath math="X" />)를 통해 함수 <InlineMath math="f: X \rightarrow Y" />를 학습합니다.
                        출력값이 <strong>연속적인 수치(Continuous)</strong>일 때 이를 '회귀'라고 합니다.
                        <br/><br/>
                        <span className="text-emerald-400 font-bold">예시:</span> 평수 대비 아파트 가격 예측, 공부 시간 대비 시험 점수 예측
                    </p>
                </Card>
                <Card title="모델의 복잡도(Model Complexity)" icon={<Activity />}>
                    <p className="text-sm text-gray-400 mt-2">
                        데이터를 얼마나 복잡한 함수로 표현할 것인가?
                        <br/>
                        <span className="text-blue-400 font-bold">• Underfitting (M=0,1):</span> 모델이 너무 단순해서 데이터의 내재된 구조를 파악하지 못함.
                        <br/>
                        <span className="text-red-400 font-bold">• Overfitting (M=9):</span> 모델이 너무 복잡해서 노이즈(Noise)까지 암기해버림.
                    </p>
                </Card>
            </div>
        </Section>

        <Section id="model" title="2. 선형 회귀 모델과 최적화">
            <p className="text-gray-300 mb-6 text-lg">
                입력 변수들의 <strong>선형 결합(Linear Combination)</strong>으로 타겟 값을 예측합니다. 
                비선형적인 세상에서 "선형"이라는 가정은 강력한 <strong>편향(Inductive Bias)</strong>이지만, 해석이 쉽고 계산이 빠릅니다.
            </p>
            
            <div className="bg-black/40 p-6 rounded-xl border border-gray-800 text-center mb-8">
                <BlockMath math="f(\mathbf{x}) = w_0 + w_1x_1 + \dots + w_dx_d = \mathbf{w}^T\mathbf{x}" />
                <p className="text-sm text-gray-500 mt-4">
                    <InlineMath math="\mathbf{w}" />: 가중치(Weight/Slope), <InlineMath math="w_0" />: 절편(Bias/Offset)
                </p>
            </div>

            <SubSection title="Interactive Learning: 직접 맞춰보기">
                <p className="text-gray-300 mb-4">
                    아래 그래프에 마우스를 클릭해 <strong>데이터(점)를 추가</strong>해보세요. 
                    그리고 <span className="text-blue-400 font-bold">Slope(기울기)</span>와 <span className="text-blue-400 font-bold">Intercept(절편)</span> 슬라이더를 움직여, 
                    점들을 가장 잘 관통하는 직선을 만들어보세요. 
                </p>
                <InteractiveRegression />
            </SubSection>

            <div className="mt-8 bg-gray-900 border border-gray-800 p-6 rounded-lg">
                 <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Target className="text-red-500"/> 목표: 손실 함수(Loss Function) 최소화</h4>
                 <p className="text-gray-400 text-sm mb-4">
                     모델의 예측값과 실제값의 차이를 제곱하여 평균 낸 <strong>MSE (Mean Squared Error)</strong>를 최소화하는 파라미터 <InlineMath math="\mathbf{w}" />를 찾습니다.
                 </p>
                 <BlockMath math="J(\mathbf{w}) = \frac{1}{N} \sum_{i=1}^{N} (y^{(i)} - \mathbf{w}^T\mathbf{x}^{(i)})^2 = \|\mathbf{y} - \mathbf{X}\mathbf{w}\|^2" />
            </div>
        </Section>
        
        <InArticleAd />

        <Section id="probabilistic" title="3. 왜 하필 '제곱 오차'인가? (Probabilistic View)">
             <div className="flex items-start gap-4 mb-6">
                <div className="text-purple-500">
                    <Sigma size={32} />
                </div>
                <div>
                     <h3 className="text-xl font-bold text-white mb-2">최대 우도 추정 (MLE)</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        관측된 데이터에는 <strong>가우시안 노이즈(Gaussian Noise)</strong>가 섞여 있다고 가정해 봅시다.
                        이 확률 모델 <InlineMath math="p(y|\mathbf{x}, \mathbf{w})" />의 우도(Likelihood)를 최대화하는 것은, 수학적으로 <strong>제곱 오차의 합(RSS)을 최소화</strong>하는 것과 동일합니다.
                     </p>
                </div>
             </div>
             <div className="bg-gray-950 p-4 rounded text-center border border-gray-800">
                 <InlineMath math="\text{argmax}_{\mathbf{w}} \prod_{i} \mathcal{N}(y^{(i)} | \mathbf{w}^T\mathbf{x}^{(i)}, \sigma^2) \iff \text{argmin}_{\mathbf{w}} \sum_{i} (y^{(i)} - \hat{y}^{(i)})^2" />
             </div>
        </Section>

        <Section id="solutions" title="4. 최적 해를 찾는 두 가지 방법">
            <p className="text-gray-300 mb-8">수학적으로 완벽한 해를 한 번에 찾거나(해석적), 반복적으로 찾아가거나(수치적) 두 가지 길이 있습니다.</p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <InfoBox title="1. 해석적 방법 (Analytic Solution)">
                    <h5 className="font-bold text-white mb-2">정규 방정식 (Normal Equation)</h5>
                    <p className="text-sm text-gray-400 mb-4">
                        손실 함수를 <InlineMath math="\mathbf{w}" />에 대해 미분하여 0이 되는 지점을 행렬 연산으로 한 번에 계산합니다.
                    </p>
                    <div className="py-2 bg-gray-950 rounded text-center mb-4 border border-gray-800">
                        <InlineMath math="\mathbf{w} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}" />
                    </div>
                    <ul className="text-xs text-gray-500 space-y-1">
                        <li>✅ 한번에 정확한 글로벌 최적해 도출 (Convex)</li>
                        <li>❌ 역행렬 계산 비용이 큼 (<InlineMath math="O(d^3)" />)</li>
                        <li>❌ 데이터가 너무 많으면 메모리 한계</li>
                    </ul>
                </InfoBox>

                <InfoBox title="2. 수치적 방법 (Numerical Method)">
                    <h5 className="font-bold text-white mb-2">경사 하강법 (Gradient Descent)</h5>
                    <p className="text-sm text-gray-400 mb-4">
                        임의의 시작점에서 출발하여, 경사(Gradient)의 반대 방향으로 조금씩 이동하며 최저점을 찾아갑니다.
                    </p>
                    <div className="py-2 bg-gray-950 rounded text-center mb-4 border border-gray-800">
                        <InlineMath math="\mathbf{w} \leftarrow \mathbf{w} - \alpha \nabla J(\mathbf{w})" />
                    </div>
                    <ul className="text-xs text-gray-500 space-y-1">
                        <li>✅ 데이터가 많아도(Big Data) 사용 가능 (Scalable)</li>
                        <li>❌ 적절한 학습률(<InlineMath math="\alpha" />)과 횟수 설정 필요</li>
                        <li>❌ 지역 최적해(Local Minima) 가능성 (비선형의 경우)</li>
                    </ul>
                </InfoBox>
            </div>

            <SubSection title="Visualizing Gradient Descent">
                <GradientDescentVisual />
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                     <Card title="Batch GD" icon="🐢">
                         <p className="text-xs text-gray-400">전체 데이터를 다 써서 기울기 계산. 안정적이지만 느림.</p>
                     </Card>
                     <Card title="Stochastic GD" icon="🐇">
                         <p className="text-xs text-gray-400">데이터 1개만 써서 기울기 계산. 빠르지만 요동침(Noisy).</p>
                     </Card>
                     <Card title="Mini-Batch GD" icon="⚖️">
                         <p className="text-xs text-gray-400">일부 묶음(예: 32개)으로 계산. 속도와 안정성의 균형.</p>
                     </Card>
                </div>
            </SubSection>
        </Section>

        <Section id="basis-function" title="5. 선형성의 한계 극복: 기저 함수 (Basis Functions)">
             <div className="flex items-start gap-4 mb-6">
                 <div className="text-orange-500"><LineChart size={32}/></div>
                 <div>
                     <p className="text-gray-300">
                         선형 모델은 직선밖에 그리지 못합니다. 하지만 세상은 곡선입니다. <br/>
                         입력 데이터 <InlineMath math="x" />를 <strong>비선형 함수 <InlineMath math="\phi(x)" /></strong>로 변환한 뒤 선형 결합하면 곡선을 표현할 수 있습니다.
                     </p>
                 </div>
             </div>
             
             <div className="bg-gray-900 border border-gray-800 rounded p-4 mb-6">
                 <h5 className="text-white font-bold mb-2">Polynomial Regression (다항 회귀)</h5>
                 <p className="text-sm text-gray-400 mb-2">
                     <InlineMath math="x" />를 제곱, 세제곱하여 새로운 특성(Feature)으로 추가합니다.
                 </p>
                 <div className="text-center py-2 text-emerald-400 font-mono text-sm">
                     <InlineMath math="y = w_0 + w_1x + w_2x^2 + \dots + w_Mx^M" />
                 </div>
                 <p className="text-xs text-gray-500 mt-2 text-center">
                     주의: 차수(<InlineMath math="M" />)가 너무 높으면 과적합(Overfitting) 발생!
                 </p>
             </div>
        </Section>

        <Section id="metrics" title="6. 성능 평가 지표 (Metrics)">
            <Table 
                headers={['지표', '수식', '의미 및 특징']}
                rows={[
                    [
                        <span className="font-bold text-white">MSE</span>,
                        <InlineMath math="\frac{1}{N}\sum(y - \hat{y})^2" />,
                        'Mean Squared Error. 미분이 깔끔하여 최적화(학습)용으로 주로 사용됨.'
                    ],
                    [
                        <span className="font-bold text-white">RMSE</span>,
                        <InlineMath math="\sqrt{MSE}" />,
                        'Root MSE. 오차의 단위를 원래 데이터와 동일하게 맞춰 직관적임.'
                    ],
                    [
                        <span className="font-bold text-white">R² Score</span>,
                        <InlineMath math="1 - \frac{RSS}{TSS}" />,
                        '전체 변동성 중 모델이 설명해낸 비율. 1에 가까울수록 설명력이 높음.'
                    ]
                ]}
            />
        </Section>

        <Section id="regularization" title="7. 과적합 방지와 정규화 (Regularization)">
            <div className="flex items-start gap-4 mb-6">
                <div className="text-yellow-500">
                    <Scale size={40} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">모델에 족쇄를 채워라</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        모델이 너무 유연하면 노이즈까지 학습하여 일반화 성능이 떨어집니다(Overfitting).
                        비용 함수에 <strong>가중치(<InlineMath math="\mathbf{w}" />)의 크기</strong>에 대한 페널티를 추가하여, 모델이 복잡해지는 것을 막습니다.
                    </p>
                </div>
            </div>

            <SubSection title="Ridge(L2) vs Lasso(L1)">
                <RegularizationVisual />
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                     <div className="p-4 bg-gray-900 border border-gray-800 rounded">
                         <h4 className="font-bold text-blue-400 mb-2">Ridge Regression (L2)</h4>
                         <BlockMath math="J(\mathbf{w}) = MSE + \lambda \|\mathbf{w}\|_2^2" />
                         <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                             가중치를 0에 가깝게 줄이지만 완전히 0으로 만들지는 않습니다 (Shrinkage). 
                             미분이 가능하고 해가 안정적이라 가장 널리 쓰입니다.
                         </p>
                     </div>
                     <div className="p-4 bg-gray-900 border border-gray-800 rounded">
                         <h4 className="font-bold text-emerald-400 mb-2">Lasso Regression (L1)</h4>
                         <BlockMath math="J(\mathbf{w}) = MSE + \lambda \|\mathbf{w}\|_1" />
                         <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                             일부 가중치를 <strong>정확히 0</strong>으로 만들어버립니다. 
                             자동으로 중요한 변수만 선택(Feature Selection)하는 효과가 있어 희소(Sparse) 모델을 만듭니다.
                         </p>
                     </div>
                </div>
            </SubSection>
        </Section>

        <InArticleAd />
        
        <Section id="python" title="8. Python Implementation">
             <InArticleAd />
             <CodeBlock 
                 language="python" 
                 title="Linear Regression with Sklearn"
                 code={`import numpy as np
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from sklearn.metrics import mean_squared_error, r2_score

# 1. 데이터 준비 
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2.1, 4.2, 6.1, 8.2, 9.9])

# 2. 기본 선형 회귀
model = LinearRegression()
model.fit(X, y)
print(f"R2 Score: {model.score(X, y):.3f}")

# 3. 다항 회귀 (Polynomial Regression) - 2차
poly_model = make_pipeline(PolynomialFeatures(degree=2), LinearRegression())
poly_model.fit(X, y)

# 4. 정규화 모델 (Ridge, Lasso)
ridge = Ridge(alpha=1.0)  # alpha: 규제 강도
lasso = Lasso(alpha=0.1)
ridge.fit(X, y)
lasso.fit(X, y)

print(f"Lasso Coefficients: {lasso.coef_}") 
# Lasso는 일부 계수가 0이 될 수 있음`}
             />
        </Section>
        
        <div className="mt-20 pb-24">
             <InArticleAd />
        </div>
      </div>
    </>
  );
}
