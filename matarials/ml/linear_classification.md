# [강의 정리] 머신러닝: 선형 분류 (Linear Classification)

## 1. 분류(Classification)의 기본 개념
분류는 입력 벡터 $\mathbf{x}$를 이산적인 범주(Discrete Class) y로 매핑하는 지도 학습의 일종입니다.

* **판별 함수 (Discriminant Functions):** 각 클래스 c에 대해 함수 $g_c(\mathbf{x})$를 정의하고, 가장 높은 값을 가진 클래스를 선택합니다.
* y^* = \text{argmax}_c g_c(\mathbf{x})


* **결정 경계 (Decision Boundary):** 두 판별 함수의 값이 같아지는 지점(g_i(\mathbf{x}) = g_j(\mathbf{x}))으로, 이 경계를 기준으로 클래스 판단이 나뉩니다.

---

## 2. 생성 모델 vs 판별 모델
분류기는 크게 두 가지 접근 방식으로 나뉩니다.

* **생성 모델 (Generative Classifier):** 데이터가 생성되는 방식(P(\mathbf{x}|y))과 클래스 비율(P(y))을 모델링하여 사후 확률(P(y|\mathbf{x}))을 계산합니다.
* 예: **LDA (선형 판별 분석)**


* **판별 모델 (Discriminative Classifier):** 입력 $\mathbf{x}$가 주어졌을 때 클래스 y일 확률(P(y|\mathbf{x}))을 직접 모델링합니다.
* 예: **Logistic Regression (로지스틱 회귀)**



---

## 3. 선형 판별 분석 (LDA: Linear Discriminant Analysis)
LDA는 데이터를 저차원 공간으로 투영(Projection)했을 때, 클래스 간 분리도를 최대화하는 방향을 찾는 기법입니다.

### 3.1 Fisher의 결정 준수 (Fisher’s Criterion)
좋은 투영 축이란 다음 두 가지 조건을 만족하는 축입니다.

1. **클러스터 간 거리 최대화:** 클래스 평균들 사이의 거리가 멀어야 함.
2. **클러스터 내 분산 최소화:** 같은 클래스끼리는 조밀하게 모여야 함.

### 3.2 LDA의 수학적 최적화
* **목적 함수:** $J(\mathbf{w}) = \frac{\mathbf{w}^T \mathbf{S}_B \mathbf{w}}{\mathbf{w}^T \mathbf{S}_W \mathbf{w}}$를 최대화하는 \mathbf{w} 찾기.

* \mathbf{S}_B (Between-class scatter): 클래스 간 변함 정도.
* \mathbf{S}_W (Within-class scatter): 클래스 내부 변함 정도.


* **해석적 해:** Lagrange multiplier를 사용하여 풀면, 최적의 방향 $\mathbf{w}^*$는 다음을 만족합니다.
$$\mathbf{w}^* \propto \mathbf{S}_W^{-1}(\mathbf{m}_0 - \mathbf{m}_1)$$

---

## 4. 로지스틱 회귀 (Logistic Regression)
출력값이 0과 1 사이의 확률값이 되도록 선형 결합에 **시그모이드 함수(Sigmoid Function)**를 적용한 모델입니다.

### 4.1 시그모이드(로지스틱) 함수
* 실수를 입력받아 [0, 1] 사이의 값을 출력합니다. 이는 확률 $P(y=1|\mathbf{x})$로 해석됩니다.

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

### 4.2 로지스틱 회귀의 학습 (MLE)
가중치 $\mathbf{w}$를 찾기 위해 **최대 우도 추정(Maximum Likelihood Estimation)**을 사용합니다.

* **Log-Likelihood:** l(\mathbf{w}) = \sum [y^{(n)} \log \mu^{(n)} + (1-y^{(n)}) \log(1-\mu^{(n)})]
* **경사 하강법 업데이트:** 로그 우도를 최대화하기 위해 미분값을 더해나갑니다.

$$\mathbf{w} \leftarrow \mathbf{w} + \alpha \sum (\text{정답} - \text{예측}) \mathbf{x}$$

---

## 5. 다중 클래스 분류 (Multi-Class Classification)
이진 분류기를 확장하여 3개 이상의 클래스를 분류하는 전략입니다.

* **One-vs-Rest (OVR):** 특정 클래스 하나와 나머지 전체를 구분하는 이진 분류기를 클래스 개수만큼 만듭니다. (모호한 영역 발생 가능)
* **One-vs-One (OVO):** 가능한 모든 클래스 쌍에 대해 이진 분류기를 만듭니다. (C(C-1)/2개 필요)
* **Softmax (Joint Learning):** 여러 이진 분류기를 독립적으로 학습시키는 대신, 전체 클래스에 대한 확률 분포를 한 번에 계산하여 비교 가능하게 만듭니다.

---

## 6. 일반화 선형 모델 (GLM: Generalized Linear Models)
선형 회귀와 로지스틱 회귀를 하나의 큰 틀로 묶은 이론입니다.

### 6.1 GLM의 구성 요소
1. **Random Component:** 종속 변수 y의 확률 분포 (Normal, Bernoulli, Poisson 등).
2. **Systematic Component:** 입력의 선형 결합 \eta = \mathbf{w}^T \mathbf{x}.
3. **Link Function:** 분포의 평균 \mu와 선형 결합 \eta를 연결하는 함수 (g(\mu) = \eta).

### 6.2 주요 링크 함수 (Link Functions)
| 분포 (Distribution) | 용도 | 링크 함수 이름 | 수식 |
| --- | --- | --- | --- |
| **Normal** | 연속 수치 예측 | Identity | \mu = \eta |
| **Bernoulli** | 이진 분류 | Logit | \log(\frac{\mu}{1-\mu}) = \eta |
| **Poisson** | 횟수(Count) 데이터 | Log | \log(\mu) = \eta |

---

# 보충 내용

## 1. LDA의 수학적 세부 유도 (Scatter Matrices)
강의 자료 14~19페이지에서 설명된 LDA 최적화의 핵심은 **Scatter Matrix(산포 행렬)**의 정의와 이를 이용한 고유값 문제 풀이입니다.

### 1.1 산포 행렬의 수학적 정의
* **Within-class Scatter (\mathbf{S}_W):** 각 클래스 내부에서 데이터가 평균으로부터 얼마나 퍼져 있는지를 측정합니다.

$$\mathbf{S}_W = \sum_{\mathbf{x} \in \text{Class 0}} (\mathbf{x} - \mathbf{m}_0)(\mathbf{x} - \mathbf{m}_0)^T + \sum_{\mathbf{x} \in \text{Class 1}} (\mathbf{x} - \mathbf{m}_1)(\mathbf{x} - \mathbf{m}_1)^T$$

* **Between-class Scatter (\mathbf{S}_B):** 클래스 간의 평균이 얼마나 멀리 떨어져 있는지를 측정합니다.

$$\mathbf{S}_B = (\mathbf{m}_0 - \mathbf{m}_1)(\mathbf{m}_0 - \mathbf{m}_1)^T$$

### 1.2 Generalized Eigenvalue Problem
투영 축 $\mathbf{w}$에 대한 목적 함수 $J(\mathbf{w})$를 미분하여 0으로 두면 다음과 같은 형태가 됩니다.

$$\mathbf{S}_B \mathbf{w} = \lambda \mathbf{S}_W \mathbf{w}$$

여기서 \mathbf{S}_W의 역행렬이 존재한다고 가정하면, 이는 $\mathbf{S}_W^{-1} \mathbf{S}_B \mathbf{w} = \lambda \mathbf{w}$라는 **고유값 문제(Eigenvalue Problem)**로 변환됩니다. 최적의 $\mathbf{w}$는 이 행렬의 가장 큰 고유값에 대응하는 고유벡터가 됩니다.

---

## 2. 로지스틱 회귀: 오차 함수와 Cross-Entropy
강의 자료 38~41페이지에서 다룬 로그 우도 최대화는 딥러닝에서 쓰이는 **Binary Cross-Entropy (BCE)** 손실 함수 최소화와 수학적으로 정확히 같습니다.

### 2.1 손실 함수(Cost Function)의 정의
최대 우도 추정(MLE)에 마이너스(-)를 붙여 최소화 문제로 바꾼 것이 비용 함수 $J(\mathbf{w})$입니다.

$$J(\mathbf{w}) = -\frac{1}{N} \sum_{n=1}^{N} \left[ y^{(n)} \log(\hat{y}^{(n)}) + (1 - y^{(n)}) \log(1 - \hat{y}^{(n)}) \right]$$


* $y^{(n)}$이 1일 때: $-\log(\hat{y}^{(n)})$만 남음 (예측값이 1에 가까울수록 손실 작음)
* $y^{(n)}$이 0일 때: $-\log(1 - \hat{y}^{(n)})$만 남음 (예측값이 0에 가까울수록 손실 작음)

### 2.2 Gradient Descent 업데이트의 유사성
흥미로운 점은 **Linear Regression**과 **Logistic Regression**의 가중치 업데이트 식이 겉보기에 동일하다는 것입니다.

$$\mathbf{w} \leftarrow \mathbf{w} + \alpha (y - \hat{y})\mathbf{x}$$



단, 선형 회귀에서 $\hat{y} = \mathbf{w}^T \mathbf{x}$인 반면, 로지스틱 회귀에서는 $\hat{y} = \sigma(\mathbf{w}^T \mathbf{x})$라는 차이가 있습니다.

---

## 3. 다중 클래스 분류의 심화: Softmax Regression
강의 자료 54페이지에서 언급된 "Joint learning"의 구체적인 형태입니다. 클래스가 K개일 때, 각 클래스에 속할 확률을 한 번에 계산합니다.

### 3.1 Softmax Function
* 모든 클래스 확률의 합은 항상 1이 됩니다.

$$P(y=k | \mathbf{x}) = \frac{\exp(\mathbf{w}_k^T \mathbf{x})}{\sum_{j=1}^{K} \exp(\mathbf{w}_j^T \mathbf{x})}$$

* 가장 큰 값을 가진 인덱스를 최종 클래스로 분류합니다.

---

## 4. GLM의 핵심: 지수 가족(Exponential Family)
강의 자료 58페이지의 GLM 공식에 대한 보충입니다.

### 4.1 지수 가족의 일반형

$$p(y | \eta) = h(y) \exp(\eta^T T(y) - A(\eta))$$

* **\eta (Natural Parameter):** 입력의 선형 결합 $\mathbf{w}^T \mathbf{x}$와 연결됩니다.
* **A(\eta) (Log Normalizer):** 확률 분포의 합이 1이 되도록 정규화하는 역할을 하며, 이 함수를 미분하면 분포의 평균(E[y])이 나옵니다.
* **결론:** 어떤 분포가 이 형식을 따른다면, 우리는 항상 선형 모델의 틀(GLM) 안에서 해결할 수 있습니다.

---

## 5. 로지스틱 회귀가 실패하는 경우 (Separability)
강의 자료 45페이지의 비선형 확장 배경입니다.

* **Linear Separability:** 로지스틱 회귀는 선형 결정 경계만을 만듭니다. 따라서 **XOR 문제**와 같이 데이터가 선형적으로 분리되지 않는 경우(Non-linearly separable) 성능이 급격히 떨어집니다.
* **해결책:** 앞선 강의에서 배운 **Basis Functions(\phi(x))**를 사용하여 데이터를 고차원 공간으로 보낸 뒤 선형 분류를 수행해야 합니다