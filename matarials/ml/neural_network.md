# [강의 정리] 머신러닝: 신경망 [Part 1: 기초와 구조]

## 1. AI의 역사적 배경과 비선형성의 필요성

인공지능 초기에 등장한 **Perceptron(퍼셉트론)**은 선형 모델로서의 한계가 있었습니다.

* **XOR 문제:** Minsky와 Papert(1969)는 단층 퍼셉트론이 XOR과 같은 단순한 비선형 문제를 해결할 수 없음을 증명했습니다.
* **해결책의 진화:**
1. **기저 함수(Basis Functions):** $\phi(\mathbf{x})$를 사용하여 데이터를 고차원으로 보낸 뒤 선형 모델 적용. (수동적인 특징 추출의 한계)
2. **커널(Kernels):** SVM 등에서 효율적인 계산을 위해 사용.
3. **다층 구조(Layering):** 단순한 선형 레이어를 여러 층 쌓고, 그 사이에 비선형 활성화 함수를 넣어 복잡한 경계를 학습.



## 2. 다층 퍼셉트론 (MLP: Multi-Layer Perceptron)
여러 개의 뉴런(Unit)을 층(Layer)으로 쌓아 올린 구조입니다. 이를 **Feed-forward Neural Network(FFNN)**라고도 부릅니다.

### 2.1 왜 비선형 활성화 함수가 필요한가?
단순히 선형 레이어만 여러 개 쌓으면(\mathbf{y} = \mathbf{W}_2(\mathbf{W}_1\mathbf{x})), 이는 결국 하나의 큰 선형 레이어(\mathbf{y} = \mathbf{W}_{new}\mathbf{x})와 수학적으로 동일합니다. 따라서 층 사이에는 반드시 **비선형 활성화 함수(Activation Function)**가 들어가야 깊은 층의 표현력을 살릴 수 있습니다.

### 2.2 활성화 함수의 종류
* **Sigmoid (Logistic):** \sigma(z) = \frac{1}{1 + e^{-z}}, 출력값을 [0, 1] 사이로 압축.
* **tanh:** 출력값을 [-1, 1] 사이로 조절.
* **ReLU:** f(z) = \max(0, z), 현대 딥러닝에서 가장 많이 쓰이며 연산이 빠르고 기울기 소실 문제를 완화함.



## 3. 피드-포워드 신경망(FFNN)의 구조
데이터가 입력층에서 출력층으로 한 방향으로만 흐르는 구조입니다.

* **입력층(Input Layer):** 데이터 특징(\mathbf{x})이 들어오는 곳.
* **은닉층(Hidden Layers):** 특징들의 복합적인 관계를 학습하는 층. 데이터의 **분산 표현(Distributed Representation)**이 일어납니다.
* **출력층(Output Layer):** 최종 예측값 도출.
* **회귀(Regression):** 활성화 함수 없이 수치 출력.
* **이진 분류:** Sigmoid 함수 사용 (P(y=1|\mathbf{x})).
* **다중 분류:** Softmax 함수 사용하여 확률 분포 출력.



## 4. 신경망의 주요 특징
1. **비볼록 최적화 (Non-convex Optimization):** 신경망의 목적 함수는 복잡하여 여러 개의 지역 최적해(Local Optima)를 가집니다. 학습이 어렵지만, 적절한 초기화와 최적화 기법으로 극복합니다.
2. **적응형 기저 함수 (Adaptive Basis Functions):** 고정된 기저 함수를 쓰는 것이 아니라, 데이터로부터 최적의 기저 함수(\phi) 자체를 스스로 학습해 나가는 과정으로 볼 수 있습니다.
3. **생물학적 영감:** 뇌의 뉴런 구조에서 아이디어를 얻었으나, 현대의 신경망은 통계적 패턴 인식 효율성을 극대화하는 방향으로 발전하여 실제 뇌의 작동 방식과는 차이가 있습니다.



## 5. 학습을 위한 목적 함수 (Objective Functions)
모델이 예측한 값과 실제 정답 사이의 차이를 측정합니다.

* **Binary Case (이진 분류):** Bernoulli 분포를 가정한 **Binary Cross-Entropy**.

$$\mathcal{L} = -[y \ln \hat{y} + (1-y) \ln(1-\hat{y})]$$

* **Multi-class Case (다중 분류):** Categorical 분포를 가정한 **Cross-Entropy**.

$$\mathcal{L} = -\sum_{k} y_k \ln \hat{y}_k$$

---

# [강의 정리] 머신러닝: 신경망 [Part 2: 역전파와 CNN]

## 1. 역전파 (Backpropagation)
역전파는 **연쇄 법칙(Chain Rule)**을 이용하여 출력층에서 발생한 오차를 입력층 방향으로 전파하며 가중치를 업데이트하는 알고리즘입니다.

### 1.1 핵심 원리: 신용 할당 문제 (Credit Assignment)
* **목표:** "최종 오차에 대해 각 가중치가 얼마나 기여했는가?"를 계산하는 것입니다.
* **Gradient Descent:** 각 가중치 w에 대해 손실 함수의 기울기 $\frac{\partial \mathcal{L}}{\partial w}$를 구하고, 이를 반대 방향으로 업데이트합니다.

$$\mathbf{w} \leftarrow \mathbf{w} - \eta \nabla_{\mathbf{w}} \mathcal{L}$$

### 1.2 역전파의 수학적 흐름 (Delta Rule)
1. **출력층의 오차(\delta_L):** 정답과 예측값의 차이에서 시작합니다.
2. **은닉층으로의 전파:** 앞층의 델타값에 가중치를 곱하고, 현재 노드의 활성화 함수 미분값을 곱하여 현재 층의 델타(\delta_l)를 구합니다.

$$\delta_l = \sigma'(a_l) \sum (w_{next} \cdot \delta_{next})$$

3. **가중치 업데이트:** 계산된 델타값과 입력값(x 또는 이전 층의 출력 b)을 곱해 기울기를 구합니다.



## 2. 역전파 수치 계산 사례

* **Forward Pass:** 입력값에 가중치를 곱하고 시그모이드를 통과시켜 최종 출력(out_{y1}, out_{y2})을 얻습니다.
* **Error Calculation:** 제곱 오차(Squared Error)를 사용하여 전체 손실을 구합니다.

$$Loss = \frac{1}{2}\sum(target - output)^2$$


* **Backward Pass (Update w_5):**
* \frac{\partial Loss}{\partial out_{y1}} = out_{y1} - target_1
* \frac{\partial out_{y1}}{\partial net_{y1}} = out_{y1}(1 - out_{y1})
* \frac{\partial net_{y1}}{\partial w_5} = out_{h1}
* 이 셋을 곱하여 \frac{\partial Loss}{\partial w_5}$를 구하고, 학습률($\eta=0.5)을 적용해 w_5를 업데이트합니다.



## 3. 합성곱 신경망 (CNN: Convolutional Neural Networks)
이미지와 같이 공간적 구조를 가진 데이터를 처리하기 위해 설계된 신경망입니다.

### 3.1 왜 CNN인가?
* 일반적인 FFNN에 이미지를 넣으려면 1차원으로 펼쳐야 하는데, 이때 **공간적 정보(인접 픽셀 간의 관계)**가 파괴됩니다.
* 이미지가 회전하거나 이동했을 때 FFNN은 이를 완전히 새로운 데이터로 인식하지만, CNN은 특징을 효과적으로 포착합니다.

### 3.2 핵심 연산 구조
1. **Convolution (합성곱):** 커널(필터)이 이미지를 훑으며 특징 지도(Feature Map)를 만듭니다.
* **선명하게(Sharpen), 흐리게(Blur), 외곽선 추출(Edge Detection)** 등의 역할을 수행합니다.

2. **Pooling (풀링):** 데이터의 크기를 줄여 계산 효율을 높이고, 사소한 변화에 강건(Robust)하게 만듭니다. (주로 Max Pooling 사용)

3. **Fully Connected (전결합층):** 추출된 특징들을 하나로 모아 최종 분류를 수행합니다.



## 4. 현대적 딥러닝 인프라: AutoGrad
과거에는 연구자가 직접 미분 방정식을 풀어 코딩해야 했으나, 현재는 **PyTorch, TensorFlow** 등의 라이브러리가 **자동 미분(Automatic Differentiation)**을 지원합니다.

* **fprop (Forward):** 입력을 넣어 출력을 계산.
* **bprop (Backward):** 정의된 연산 그래프를 역으로 따라가며 자동으로 기울기 계산.



## 5. CNN의 발전과 깊이 (Deeper and Wider)
강의의 마지막은 CNN의 역사적 모델들을 소개합니다.

* **LeNet (1989):** 필기체 인식(MNIST)의 시초.
* **AlexNet (2012):** ImageNet 대회 우승, 딥러닝 시대를 연 주역.
* **VGGNet / GoogLeNet (2014):** 층을 더 깊게 쌓고 모듈화된 구조 도입.
* **ResNet (2015):** Skip Connection을 통해 100층 이상의 깊은 네트워크 학습 가능.