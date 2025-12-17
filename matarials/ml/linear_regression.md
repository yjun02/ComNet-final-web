# [강의 정리] 머신러닝: 선형 회귀 (Linear Regression)

##  1. 지도 학습 (Supervised Learning)의 재해석
지도 학습은 정답(Label)이 포함된 데이터 $D = {(x^{(1)}, y^{(1)}), \dots, (x^{(N)}, y^{(N)})}$를 사용하여 입력 X에서 출력 Y로의 매핑 함수 f: X \rightarrow Y를 학습하는 과정입니다.

* **회귀 (Regression):** 출력값 Y가 연속적인 수치(Continuous)일 때. (예: 유전 정보를 통한 기대 수명 예측)
* **분류 (Classification):** 출력값 Y가 이산적인 범주(Discrete)일 때. (예: 질병 유무 판별)

---

## 2. 회귀 분석 (Regression Analysis)의 정의
회귀 분석은 독립 변수(Independent variable, X)와 종속 변수(Dependent variable, Y) 사이의 관계를 추정하는 것입니다.

* **함수 근사 (Function Approximation):** 주어진 데이터를 가장 잘 설명하는 함수(선 또는 곡선)를 찾는 과정입니다. 모델의 복잡도(M, 차수)에 따라 데이터에 적합되는 정도가 달라집니다.
* M=0, 1: 단순한 모델 (Underfitting 위험)
* M=9: 매우 복잡한 모델 (Overfitting 위험)



---

## 3. 선형 회귀 (Linear Regression) 모델
입력값들의 선형 조합으로 결과값을 예측하는 모델입니다.

### 3.1 수학적 표현
* \mathbf{w}: 파라미터(Weights, 회귀 계수)

$$f(\mathbf{x}, \mathbf{w}) = w_0 + w_1x_1 + w_2x_2 + \dots + w_dx_d = w_0 + \sum_{j=1}^{d} w_jx_j$$

* w_0: 오프셋 또는 편향(Offset/Bias)
* 표기 편의상 x_0 = 1로 가정하면 $f(\mathbf{x}, \mathbf{w}) = \mathbf{w}^T\mathbf{x}$로 간결하게 표현할 수 있습니다.

---

## 4. 모델 학습 과정 (Learning Cycle)
데이터로부터 최적의 모델을 찾아내는 표준 절차는 다음과 같습니다.

1. **데이터 준비:** 학습 데이터셋 D 수집.
2. **모델 선택:** 함수 형태 결정 (예: y = ax + b).
3. **목적 함수(Error Function) 설정:** 예측값과 실제값의 차이를 측정하는 기준 마련 (주로 **Squared Error** 사용).
4. **학습(Learning):** 에러 함수를 최소화하는 파라미터 $(a, b)$를 찾음.
5. **검증(Testing):** 학습되지 않은 데이터를 통해 모델 성능 평가.
6. **적용:** 학습된 모델을 새로운 데이터에 활용.

---

## 5. 최적화 1: 해석적 해법 (Analytic Solution)
에러 함수 $J(\mathbf{w}, D)$가 최소가 되는 지점은 미분값이 0이 되는 지점입니다.

* **Normal Equation (정규 방정식):**
에러 함수를 \mathbf{w}$에 대해 미분하여 0으로 설정하면 선형 연립방정식 형태($$\mathbf{Aw} = \mathbf{b}$$)를 얻게 됩니다.
* **해석적 해:**

$$\mathbf{w} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$$



단, $\mathbf{X}^T\mathbf{X}$의 역행렬이 존재해야 하며(Full rank), 이는 유일한 글로벌 최솟값을 보장합니다.

---

## 6. 최적화 2: 경사 하강법 (Gradient Descent)
해석적 해를 구하기 어렵거나 데이터가 클 때 사용하는 반복적 최적화 알고리즘입니다.

* **기본 아이디어:** 에러가 줄어드는 방향(기울기의 반대 방향)으로 가중치를 조금씩 업데이트합니다.

$$\mathbf{w} \leftarrow \mathbf{w} - \alpha \nabla_{\mathbf{w}}J(\mathbf{w}, D)$$

* **\alpha (학습률, Learning Rate):** 한 번에 얼마나 이동할지를 결정하는 스칼라 값입니다.

### 학습 방식의 분류
1. **Batch GD:** 전체 데이터를 한 번에 사용하여 업데이트. 안정적이지만 메모리 소모가 큼.
2. **Stochastic GD (Online):** 데이터 한 개마다 업데이트. 빠르고 메모리가 적게 들지만 경로가 불안정함("Shooting").
3. **Mini-Batch GD:** 일정량(Batch size)의 데이터 묶음으로 업데이트. 두 방식의 장점을 절충.

---

## 7. 성능 평가 지표 (Evaluation Metrics)
모델이 얼마나 잘 학습되었는지 측정하는 도구들입니다.

* **RSS (Residual Sum of Squares):** 잔차 제곱합.
* **RMSE (Root Mean Squared Error):** RSS의 평균에 루트를 씌운 값.
* **R^2 (결정 계수):** 모델이 데이터의 변동성을 얼마나 설명하는지 나타냄 (1에 가까울수록 우수).

---

## 8. 모델의 확장: 기저 함수 (Basis Functions)
선형 회귀의 틀을 유지하면서도 비선형 관계를 학습할 수 있는 방법입니다. 입력 x를 비선형 함수 $\phi(x)$에 통과시킨 후 선형 결합합니다.

* **Polynomial(다항):** 1, x, x^2, \dots
* **Gaussian:** 특정 위치(\mu)를 중심으로 하는 국소적 특징 추출.
* **Sigmoidal:** 특정 위치에서의 변화율(기울기) 학습.

---

## 9. 정규화 (Regularization)
모델이 너무 복잡해져서 학습 데이터에만 과하게 최적화되는 **과적합(Overfitting)**을 방지하는 기술입니다. 에러 함수에 가중치의 크기를 페널티로 추가합니다.

* **Ridge Regression (L2 규제):** J(\mathbf{w}) + \lambda\|\mathbf{w}\|_2^2. 가중치들을 전반적으로 작게 만듭니다.
* **Lasso Regression (L1 규제):** J(\mathbf{w}) + \lambda\|\mathbf{w}\|_1. 덜 중요한 가중치를 완전히 0으로 만들어 **특성 선택(Feature Selection)** 효과를 줍니다.

---

# 추가 자료

## 1. 최적화의 수학적 유도 (Normal Equation)
강의 자료 20~21페이지에서 설명된 **해석적 해법(Analytic Solution)**의 상세 유도 과정입니다.

### 1.1 행렬 정의
* 데이터 행렬 \mathbf{X} (Size: N \times (d+1)): 각 행이 데이터 인스턴스이며, 첫 번째 열은 편향(w_0)을 위해 1로 채워짐.
* 타겟 벡터 \mathbf{y} (Size: N \times 1): 실제 출력값들.
* 가중치 벡터 \mathbf{w} (Size: (d+1) \times 1).

### 1.2 손실 함수의 미분
학습의 목표는 잔차 제곱합인 $RSS(\mathbf{w}) = \|\mathbf{y} - \mathbf{X}\mathbf{w}\|^2$를 최소화하는 것입니다.

$$\nabla_{\mathbf{w}} RSS(\mathbf{w}) = \nabla_{\mathbf{w}} (\mathbf{y} - \mathbf{X}\mathbf{w})^T (\mathbf{y} - \mathbf{X}\mathbf{w})$$

이를 전개하여 $\mathbf{w}$에 대해 미분하면 다음과 같은 **정규 방정식(Normal Equation)*이 도출됩니다:

$$\mathbf{X}^T\mathbf{X}\mathbf{w} = \mathbf{X}^T\mathbf{y}$$

$$\therefore \mathbf{w}^ = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$$

---

## 2. 확률론적 관점: 최대 우도 추정 (MLE)
강의 자료 22페이지에 언급된 내용으로, 왜 '제곱 오차'를 최소화하는 것이 타당한지에 대한 통계적 근거입니다.

* **가정:** 출력값 y는 모델의 예측값에 가우시안 노이즈 $\epsilon \sim \mathcal{N}(0, \sigma^2)$이 더해진 형태입니다.

$$p(y|\mathbf{x}, \mathbf{w}, \sigma^2) = \mathcal{N}(y|\mathbf{w}^T\mathbf{x}, \sigma^2)$$

* **로그 우도(Log-likelihood):** 모든 데이터가 독립적으로 추출되었다고 가정할 때, 로그 우도 함수는 다음과 같습니다.

$$\sum_{n=1}^{N} \log p(y^{(n)}|\mathbf{x}^{(n)}, \mathbf{w}, \sigma^2) = -\frac{1}{2\sigma^2} \sum_{n=1}^{N} (y^{(n)} - \mathbf{w}^T\mathbf{x}^{(n)})^2 + \text{const}$$

* **결론:** 로그 우도를 최대화하는 것은 결국 **잔차 제곱합(RSS)을 최소화**하는 것과 수학적으로 동일합니다.

---

## 3. 평가 지표의 상세 수식
강의 자료 31페이지의 평가 지표들을 더 명확하게 정의합니다.

* **RMSE (Root Mean Squared Error):** 에러의 단위를 실제 데이터와 맞추기 위해 사용합니다.

$$RMSE = \sqrt{\frac{1}{N} \sum_{n=1}^{N} (y^{(n)} - \hat{y}^{(n)})^2}$$

* **R^2 (결정 계수):**

$$R^2 = 1 - \frac{RSS}{TSS} = 1 - \frac{\sum (y^{(n)} - \hat{y}^{(n)})^2}{\sum (y^{(n)} - \bar{y})^2}$$


* TSS (Total Sum of Squares): 데이터 본연의 분산.
* R^2=1: 모델이 데이터를 완벽하게 설명함.
* R^2=0: 모델이 단순히 평균값(\bar{y})으로 예측하는 것보다 나을 게 없음.



---

## 4. 경사 하강법의 업데이트 상세 (Stochastic vs Batch)
강의 자료 37~38페이지의 **Update Rule**을 변수별로 분해하면 다음과 같습니다.

* **개별 가중치 업데이트 (j번째 특징):**

$$w_j \leftarrow w_j + \alpha (y^{(n)} - f(\mathbf{x}^{(n)}, \mathbf{w})) x_j^{(n)}$$


* (y^{(n)} - f(\mathbf{x}^{(n)}, \mathbf{w})): 오차(Error). 오차가 클수록 업데이트 강도가 세집니다.
* x_j^{(n)}: 해당 특징값. 입력값이 클수록 가중치에 주는 영향이 큽니다.


* **학습률 스케줄링 (Learning Schedule):**
* Fixed: \alpha = C
* Annealed: \alpha \approx 1/n (학습이 진행될수록 보폭을 줄여 수렴을 도움)



---

## 5. Ridge vs Lasso의 기하학적 해석
강의 자료 51~52페이지에 언급된 규제화의 차이점입니다.

* **Ridge (L2):** 제약 조건이 원형(w_1^2 + w_2^2 \le B)입니다. 최적해가 축(axis) 위가 아닌 지점에서 형성될 확률이 높아 가중치를 작게 유지하지만 0으로 만들지는 않습니다.
* **Lasso (L1):** 제약 조건이 마름모꼴(|w_1| + |w_2| \le B)입니다. 마름모의 모서리(축 위)에서 최적해가 형성될 가능성이 매우 높아, 불필요한 변수의 가중치를 **정확히 0**으로 만듭니다.

---

## 6. 비선형 확장을 위한 기저 함수 (Basis Functions)
강의 자료 45페이지의 기저 함수들입니다.

* **Gaussian Basis:**

$$\phi_j(x) = \exp \left( -\frac{(x - \mu_j)^2}{2s^2} \right)$$

* \mu_j: 함수가 집중될 위치.
* s: 함수의 폭(Scale).


* **Sigmoid Basis:**

$$\phi_j(x) = \sigma \left( \frac{x - \mu_j}{s} \right) = \frac{1}{1 + \exp(-\frac{x - \mu_j}{s})}$$