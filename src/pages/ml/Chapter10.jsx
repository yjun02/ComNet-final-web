import React from 'react';
import { Network, Cpu, BrainCircuit, Activity, Layers, Repeat, Box, GitBranch, Zap, Target, TrendingDown, Shield } from 'lucide-react';
import { Section, SubSection, Card, InfoBox, List, Table } from '../../components/ui/ChapterCommon';
import { SEO } from '../../components/ui/SEO';
import { InArticleAd } from '../../components/ui/AdSense';
import { InlineMath, BlockMath } from '../../components/ui/MathUtils';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { NeuralNetworkFeedForward, ActivationMap, ConvolutionStep } from '../../components/ui/NeuralNetworkVisuals';

export default function Chapter10() {
  return (
    <>
      <SEO 
        title="Chapter 10: Neural Networks & CNN"
        description="인공신경망(MLP)의 구조부터 CNN, 역전파, 최적화 기법까지 딥러닝의 필수 이론을 완벽하게 정리합니다."
        keywords="Ordinary Least Squares, Cross Entropy, Backpropagation, CNN, Pooling, Dropout, SGD, Adam"
        url="https://sj-wiki.vercel.app/ml/chapter/10"
      />
      
      <div className="space-y-12">
        <header className="border-b border-gray-800 pb-8">
          <div className="flex items-center gap-2 text-blue-500 font-mono text-sm mb-4">
             <span className="px-2 py-1 bg-blue-500/10 rounded">Chapter 10 : Neural Networks</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Chapter 10. 신경망과 딥러닝 (Deep Learning)</h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-3xl">
            단순한 퍼셉트론에서 시작해 오늘날의 AI 혁명을 이끈 <strong>Deep Neural Networks</strong>의 모든 것을 파헤칩니다. <br/>
            구조(Structure), 학습(Learning), 그리고 추론(Inference)의 3박자를 시각적으로 익혀보세요.
          </p>
        </header>

        <Section id="history" title="1. 퍼셉트론의 좌절과 부활">
             <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card title="XOR 문제 (The AI Winter)" icon={<GitBranch />}>
                    <p className="text-sm text-gray-400 mt-2">
                        1969년, Minsky와 Papert는 단일 퍼셉트론이 <strong>XOR(배타적 논리합)</strong>과 같은 단순한 비선형 문제조차 풀 수 없음을 증명했습니다. 이로 인해 첫 번째 AI 겨울이 찾아왔습니다.
                    </p>
                </Card>
                <Card title="해결: 다층 구조 (Multi-Layer)" icon={<Layers />}>
                    <p className="text-sm text-gray-400 mt-2">
                        여러 층(Hidden Layers)을 쌓고 그 사이에 <strong>비선형 활성화 함수</strong>를 넣음으로써, 신경망은 마침내 복잡한 경계를 그려낼 수 있게 되었습니다.
                    </p>
                </Card>
            </div>
        </Section>

        <Section id="mlp" title="2. 다층 퍼셉트론 (MLP) 구조">
            <p className="text-gray-300 mb-6">
                입력층에서 출력층으로 데이터가 물 흐르듯 전파되는 <strong>Feed-Forward</strong> 과정입니다.
            </p>

            <SubSection title="Architecture Visualization">
                <NeuralNetworkFeedForward />
            </SubSection>

            <div className="mt-8">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2"><BrainCircuit /> Universal Approximation Theorem</h4>
                <p className="text-gray-400 text-sm mb-4">
                    "은닉층이 하나라도 있고 뉴런이 충분히 많다면, 어떤 연속 함수든 근사할 수 있다." <br/>
                    이 정리는 신경망의 강력한 표현력을 수학적으로 보장해줍니다.
                </p>
            </div>
        </Section>
        
        <InArticleAd />

        <Section id="activation" title="3. 활성화 함수 (Activation Functions)">
            <div className="flex items-start gap-4 mb-6">
                <div className="text-purple-500"><Activity size={32}/></div>
                <div>
                     <h3 className="text-xl font-bold text-white mb-2">왜 비선형이 필요한가?</h3>
                     <p className="text-gray-300 text-sm leading-relaxed">
                         선형 함수끼리의 합성은 결국 선형 함수(<InlineMath math="W_2(W_1x) = W'x" />)입니다. 
                         딥러닝이 깊어(Deep)지려면 각 층마다 비선형성을 주입하는 <strong>활성화 함수</strong>가 필수적입니다.
                     </p>
                </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 md:items-center">
                <div className="flex-[4] flex flex-col items-center">
                    <h4 className="text-gray-400 text-xs mb-4 text-center">Interactive Graph (Click to switch)</h4>
                    <ActivationMap />
                </div>
                <div className="flex-[6] space-y-4">
                    <Table 
                        headers={['Function', 'Formula', 'Range & Derivative', 'Pros & Cons']}
                        rows={[
                            [
                                <span className="font-bold text-white">Sigmoid</span>,
                                <span className="font-mono text-xs text-emerald-400">1/(1+e^-x)</span>,
                                <div className="text-xs text-gray-400">
                                    <div>Range: (0, 1)</div>
                                    <div>f' max: 0.25</div>
                                </div>,
                                <div className="text-xs text-gray-500">
                                    <span className="text-red-400">Vanishing Gradient</span> 발생. 출력 중심이 0이 아님(Not zero-centered). 이진 분류 출력층에 적합.
                                </div>
                            ],
                            [
                                <span className="font-bold text-white">Tanh</span>,
                                <span className="font-mono text-xs text-emerald-400">tanh(x)</span>,
                                <div className="text-xs text-gray-400">
                                    <div>Range: (-1, 1)</div>
                                    <div>f' max: 1.0</div>
                                </div>,
                                <div className="text-xs text-gray-500">
                                    Sigmoid보다 학습 수렴이 빠름(Zero-centered). 여전히 기울기 소실 문제 존재.
                                </div>
                            ],
                            [
                                <span className="font-bold text-white">ReLU</span>,
                                <span className="font-mono text-xs text-emerald-400">max(0, x)</span>,
                                <div className="text-xs text-gray-400">
                                    <div>Range: [0, ∞)</div>
                                    <div>f': 0 or 1</div>
                                </div>,
                                <div className="text-xs text-gray-500">
                                    <span className="text-emerald-400">De-facto Standard.</span> 연산 매우 빠름. <span className="text-blue-400">Dying ReLU</span>(음수 뉴런 사망) 주의.
                                </div>
                            ]
                        ]}
                    />
                </div>
            </div>
        </Section>

        <Section id="learning" title="4. 학습: 손실 함수와 역전파">
            <SubSection title="4.1 손실 함수 (Loss Function)">
                <p className="text-gray-400 text-sm mb-4">
                    모델의 예측(<InlineMath math="\hat{y}" />)이 정답(<InlineMath math="y" />)과 얼마나 틀렸는지 측정합니다. 문제 유형에 따라 다른 함수를 씁니다.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    <InfoBox title="Regression: Mean Squared Error">
                        <BlockMath math="MSE = \frac{1}{N}\sum (y - \hat{y})^2" />
                        <p className="text-xs text-gray-500 mt-2">큰 오차에 민감하게 반응합니다.</p>
                    </InfoBox>
                    <InfoBox title="Classification: Cross-Entropy">
                        <BlockMath math="CE = -\sum y \log(\hat{y})" />
                        <p className="text-xs text-gray-500 mt-2">확률 분포 간의 차이를 측정합니다. (Information Theory)</p>
                    </InfoBox>
                </div>
            </SubSection>

            <SubSection title="4.2 역전파 (Backpropagation)">
                <p className="text-gray-300 mb-6">
                    출력 오차를 입력 방향으로 되돌리며 각 가중치의 책임(Gradient)을 묻는 과정입니다. 
                    핵심은 <strong>연쇄 법칙(Chain Rule)</strong>입니다.
                </p>
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg text-center overflow-x-auto">
                     <BlockMath math="\frac{\partial \mathcal{L}}{\partial w_1} = \frac{\partial \mathcal{L}}{\partial y} \cdot \frac{\partial y}{\partial h} \cdot \frac{\partial h}{\partial z} \cdot \frac{\partial z}{\partial w_1}" />
                     <p className="text-sm text-emerald-400 mt-4 font-mono">
                         Global Gradient = Gradient(Loss) × Gradient(Activation) × ... × Local Gradient
                     </p>
                </div>
            </SubSection>
        </Section>

        <Section id="optimization" title="5. 최적화와 규제 (Optimization & Regularization)">
            <p className="text-gray-300 mb-4">
                단순한 SGD(확률적 경사 하강법)만으로는 깊은 신경망을 학습시키기 어렵습니다.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                 <div className="space-y-4">
                     <h4 className="text-white font-bold flex items-center gap-2"><Zap size={20} className="text-yellow-400"/> Advanced Optimizers</h4>
                     <ul className="space-y-3 text-sm text-gray-400">
                         <li><strong className="text-white">Momentum:</strong> 관성을 이용해 진동을 줄이고 빠르게 하강.</li>
                         <li><strong className="text-white">RMSProp:</strong> 가파른 곳은 조금만, 완만한 곳은 많이 이동.</li>
                         <li><strong className="text-white">Adam:</strong> Momentum + RMSProp. 가장 많이 쓰이는 만능 옵티마이저.</li>
                     </ul>
                 </div>
                 <div className="space-y-4">
                     <h4 className="text-white font-bold flex items-center gap-2"><Shield size={20} className="text-blue-400"/> Regularization</h4>
                     <ul className="space-y-3 text-sm text-gray-400">
                         <li><strong className="text-white">Dropout:</strong> 학습 시 뉴런 일부를 랜덤하게 꺼서 과적합(Overfitting) 방지.</li>
                         <li><strong className="text-white">Batch Normalization:</strong> 각 층의 입력을 정규화하여 학습 속도와 안정성 비약적 향상.</li>
                     </ul>
                 </div>
            </div>
        </Section>

        <InArticleAd />

        <Section id="cnn" title="6. CNN (Convolutional Neural Network)">
            <div className="flex items-start gap-4 mb-6">
                 <div className="text-pink-500"><Layers size={36} /></div>
                 <div>
                     <h3 className="text-xl font-bold text-white mb-2">이미지 처리의 혁명</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        완전 연결층(FC Layer)은 이미지의 픽셀 위치 정보(공간적 지역성)를 무시합니다.
                        CNN은 <strong>합성곱(Convolution)</strong>을 통해 주변 픽셀과의 관계를 보존하며 특징을 추출합니다.
                     </p>
                 </div>
            </div>

            <SubSection title="Visualizing Convolution">
                <ConvolutionStep />
            </SubSection>

            <div className="mt-8 grid md:grid-cols-2 gap-8">
                <div>
                     <h4 className="text-white font-bold mb-3">주요 하이퍼파라미터</h4>
                     <List items={[
                         "Kernel Size (필터 크기): 보통 3x3이나 5x5 사용",
                         "Stride (보폭): 필터가 이동하는 간격. 클수록 출력 크기가 줄어듬.",
                         "Padding (패딩): 외곽 정보를 보존하기 위해 테두리에 0을 채워넣음.",
                         "Channel (채널): RGB는 3채널. 층을 지날수록 채널 수(특징 개수)는 늘어남."
                     ]} />
                </div>
                <div>
                     <h4 className="text-white font-bold mb-3">CNN 발전사</h4>
                     <ul className="space-y-2 text-xs text-gray-400">
                         <li className="flex gap-2"><span className="text-emerald-400 font-mono">1998</span> <strong>LeNet-5:</strong> 최초의 CNN, 우편번호 인식.</li>
                         <li className="flex gap-2"><span className="text-emerald-400 font-mono">2012</span> <strong>AlexNet:</strong> ImageNet 우승, ReLU & Dropout 도입.</li>
                         <li className="flex gap-2"><span className="text-emerald-400 font-mono">2014</span> <strong>VGGNet:</strong> 3x3 작은 필터로 깊게 쌓음.</li>
                         <li className="flex gap-2"><span className="text-emerald-400 font-mono">2015</span> <strong>ResNet:</strong> Skip Connection으로 152층까지 학습 가능해짐.</li>
                     </ul>
                </div>
            </div>
        </Section>

        <Section id="python" title="7. Python Implementation (PyTorch)">
             <p className="text-gray-400 mb-4">PyTorch를 사용하여 간단한 MLP와 CNN을 정의하는 법을 알아봅니다.</p>
             <InArticleAd />
             <CodeBlock 
                 language="python" 
                 title="MLP & CNN Architecture"
                 code={`import torch.nn as nn

# 1. Multi-Layer Perceptron (for simple data)
class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(784, 256),  # Input
            nn.ReLU(),            # Activation
            nn.BatchNorm1d(256),  # Regularization
            nn.Dropout(0.5),      # Regularization
            nn.Linear(256, 10),   # Output (10 classes)
        )

    def forward(self, x):
        x = x.view(-1, 784)       # Flatten
        return self.layers(x)

# 2. Convolutional Neural Network (for images)
class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            # Conv Block 1
            nn.Conv2d(1, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),      # Half the size
            
            # Conv Block 2
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 7 * 7, 10) # 28x28 -> 14x14 -> 7x7
        )

    def forward(self, x):
        x = self.features(x)
        return self.classifier(x)`}
             />
        </Section>
        
        <div className="mt-20 pb-24">
             <InArticleAd />
        </div>
      </div>
    </>
  );
}
