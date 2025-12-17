# [강의 정리] 머신러닝: 클러스터링 (Clustering)

## 1. 비지도 학습 (Unsupervised Learning)의 이해
비지도 학습은 타겟 출력값(y)이 없는 상태에서 데이터 $D = {x_1, x_2, \dots, x_N}$의 내부 구조를 파악하는 학습 방식입니다. 레이블이 없는 데이터로부터 추론을 이끌어내며, 크게 두 가지 문제로 나뉩니다.

* **밀도 추정 (Density Estimation):** 샘플들이 추출되었을 법한 모집단의 확률 모델을 구축하는 것.
* **클러스터링 (Clustering):** 유사한 예제들을 하나의 그룹으로 묶는 것.

---

## 2. 데이터 탐색의 시작: EDA (Exploratory Data Analysis)
데이터를 받으면 가장 먼저 수행하는 작업이 **탐색적 데이터 분석(EDA)**입니다.

* **통계치 활용:** 평균, 표준편차, 중앙값, 최솟값, 최댓값 등을 확인합니다.
* **목적:** 데이터에 숨겨진 패턴 발견, 이상치(Anomaly) 탐지, 가설 검증 및 가정 확인을 목적으로 합니다.
* **필요성:** 단순히 수치만 보는 것이 아니라, 여러 그룹이 섞여 있는 경우 그래프나 클러스터링 같은 도구를 통해 데이터가 무엇을 말하는지(Beyond formal modeling)를 파악해야 합니다.

---

### Connectivity-based approach

1. 클러스터링(Clustering)의 본질정의: 클래스 레이블(Label)이 없는 데이터로부터 선천적인 그룹을 발견하는 **비지도 학습(Unsupervised Learning)**입니다.핵심 원리:유사성(Similarity): 같은 클러스터 멤버 간에는 유사해야 함.이질성(Dissimilarity): 서로 다른 클러스터 멤버 간에는 달라야 함.유사성의 척도 (Distance Measures): 데이터 간의 "거리"를 어떻게 정의하느냐에 따라 결과가 달라집니다.Euclidean(직선 거리), Manhattan(격자 거리), Mahalanobis(분산 고려), Hamming(문자열/이진 데이터), Haversine(구면 거리) 등.2. 계층적 클러스터링 (Hierarchical Clustering)의 개념데이터를 트리 형태의 계층적 구조인 **덴드로그램(Dendrogram)**으로 구축하는 방법입니다.2.1 덴드로그램 (Dendrogram)데이터 포인트들이 어떻게 결합되는지를 보여주는 계층도입니다.클러스터 형성: 특정 높이(Level)에서 덴드로그램을 자르면(Cut), 그 아래로 연결된 구성 요소들이 각각 하나의 클러스터가 됩니다. 자르는 위치에 따라 클러스터 개수($k$)가 결정됩니다.2.2 구축 방향Agglomerative (병합형, Bottom-up): 각 포인트를 개별 클러스터로 시작하여 가장 가까운 것끼리 합쳐 나가는 방식 (자료에서 중점적으로 다룸).Divisive (분할형, Top-down): 모든 데이터를 하나의 큰 클러스터로 시작하여 쪼개 나가는 방식.3. 병합형 클러스터링 (Agglomerative Clustering) 상세3.1 클러스터의 대표값 설정 (Representation)여러 점이 모인 클러스터를 어떻게 하나의 위치로 나타낼 것인가?Centroid (중심점): 클러스터 멤버들의 산술 평균값.Medoid (중간점): 클러스터 멤버 중 가장 중심에 위치한 실제 데이터 포인트.3.2 클러스터 간 거리 측정법 (Linkage Methods)두 클러스터 사이의 "가까움"을 정의하는 방식에 따라 클러스터의 모양이 달라집니다.방식정의특징Single Link (단일 연결)두 클러스터의 가장 가까운 점 사이의 거리최소 신장 트리(MST)와 관련. 사슬 현상(Chaining)이 생길 수 있음.Complete Link (완전 연결)두 클러스터의 가장 먼 점 사이의 거리지름이 작은 조밀하고 압축된(Compact) 클러스터를 형성함.Average Link (평균 연결)두 클러스터의 중심점(Centroid) 사이의 거리단일 연결과 완전 연결의 절충안. 비교적 조밀하고 멀리 떨어진 클러스터 형성.[Image comparing Single Linkage, Complete Linkage, and Average Linkage in hierarchical clustering]3.3 중단 조건 (Stopping Criteria)언제 병합을 멈출 것인가?방법 1: 미리 정해진 클러스터 개수 $k$에 도달했을 때.방법 2: 다음 병합 시 클러스터의 응집도(Cohesion)가 너무 낮아질 때 (품질이 나빠질 때).4. 특징 및 한계점장점: 클러스터 개수 $k$를 미리 정하지 않고도 전체 구조를 시각적으로 파악할 수 있습니다.단점 (비용): 매 단계마다 모든 클러스터 쌍의 거리를 계산해야 하므로 계산 복잡도가 $O(N^3)$에 달합니다.따라서 데이터셋이 클 경우에는 너무 비싸서 사용하기 어렵고, 주로 데이터 규모가 작을 때 사용됩니다.

---


### Centroid-based approach(K-means)

##1. 개요 및 동기 (Motivation)* **배경:** 계층적 클러스터링(Hierarchical)은 시간과 공간 복잡도가 매우 높아(O(N^3)) 대규모 데이터에 부적합합니다.
* **해결책:** 실제 데이터 분석을 위해 더 효율적인 알고리즘인 **k-Means**가 필요합니다.
* **특징:**
* k는 클러스터의 개수를 의미하며, 데이터 샘플 수(N)보다 훨씬 작아야 합니다 (k \ll N).
* 반복적으로 데이터의 k개 클러스터를 찾아가는 비지도 학습 알고리즘입니다.



---

##2. k-Means 알고리즘의 원리###2.1 최적화 목표 (Objective Function)k-Means는 **클러스터 내부의 편차(Within-cluster deviations)**를 최소화하는 것을 목표로 합니다. 일반적으로 **유클리드 거리(Euclidean distance)**를 사용하여 **SSE(Sum of Squared Error)**를 최소화합니다.

$$\arg\min_{S} \sum_{i=1}^{k} \sum_{\mathbf{x} \in S_i} \|\mathbf{x} - \mathbf{m}_i\|^2$$

* \mathbf{x}: 데이터 인스턴스
* S_i: i번째 클러스터
* \mathbf{m}_i: i번째 클러스터의 평균 벡터 (Centroid)

###2.2 알고리즘 절차 (Procedure)1. **초기화:** 클러스터 개수 k를 정하고, k개의 초기 중심점을 무작위로 선택합니다.
2. **할당 단계 (Assignment Step):** 각 데이터 포인트를 가장 가까운 중심점에 할당하여 클러스터 멤버십을 결정합니다.
3. **업데이트 단계 (Update Step):** 할당된 멤버들의 평균값을 계산하여 클러스터 중심(\mathbf{m}_i)을 재설정합니다.
4. **반복:** 중심점이 변하지 않고 수렴할 때까지 2~3단계를 반복합니다.

---

##3. k-Means의 장단점* **장점:** 이해와 구현이 쉽고 속도가 빠르며, 항상 수렴이 보장됩니다.
* **단점:** * 전역 최적해가 아닌 **지역 최적해(Local optimum)**에 빠질 수 있습니다.
* 초기값 설정에 민감합니다.
* 이상치(Outliers)에 민감하며, 원형이 아닌(Non-convex) 형태의 클러스터는 잘 찾지 못합니다.



---

##4. 실전적 이슈와 해결 방안###4.1 데이터 정규화 (Normalization)유클리드 거리를 사용하기 때문에, 특정 속성(예: 소득 vs 나이)의 단위가 크면 그 속성이 결과를 지배하게 됩니다. 이를 방지하기 위해 **Standardization(표준화)**이나 **Min-Max Scaling**이 필수적입니다.

###4.2 최적의 k 선택 (Elbow Method)k가 커질수록 SSE는 계속 줄어들기 때문에 무작정 크게 잡을 수 없습니다.

* **Knee/Elbow Finding:** k값 변화에 따른 목적 함수 값의 변화를 그래프로 그렸을 때, 기울기가 급격히 완만해지는 지점(꺽이는 부분)을 최적의 k로 판단합니다.

###4.3 클러스터 품질 평가 (Internal Criterion)* **Silhouette Coefficient (sc_n):** * a(현재 클러스터 내 거리)와 b(가장 가까운 다른 클러스터와의 거리)를 비교합니다.
* 1에 가까울수록 잘 분류된 것이고, 0은 경계선, -1은 잘못 분류되었음을 의미합니다.



---

##5. k-Means의 확장 및 대안* **초기값 문제:** **k-Means++**와 같은 휴리스틱 초기화 기법을 사용하거나 여러 번 실행하여 가장 좋은 결과를 선택합니다.
* **이상치 대응:** 평균(Mean) 대신 중앙값(Median)을 사용하는 **k-Medoids**를 사용합니다.
* **확률적 할당:** 무조건적인 할당 대신 확률적으로 할당하는 **GMM (Mixtures-of-Gaussians)**으로 확장할 수 있습니다.

---

# 추가 자료


### 1. 클러스터링의 수학적 최적화 목표 (k-Means 중심)
k-Means 알고리즘은 단순히 점을 찍는 것이 아니라, **내부 클러스터 편차(Within-cluster Variation)를 최소화**하는 최적화 문제를 푸는 과정입니다.

* **손실 함수 (Objective Function):** SSE (Sum of Squared Errors)

$$\text{argmin}_S \sum_{i=1}^{k} \sum_{\mathbf{x} \in S_i} \|\mathbf{x} - \mathbf{m}_i\|^2$$


* S_i: i번째 클러스터에 속하는 데이터 집합
* \mathbf{m}_i: i번째 클러스터의 평균 벡터 (Centroid)
* \|\mathbf{x} - \mathbf{m}_i\|^2: 데이터 포인트와 중심점 사이의 유클리드 거리의 제곱


* **업데이트 단계의 수학적 근거:**
고정된 클러스터 할당 상태에서 중심점 \mathbf{m}_i를 업데이트할 때, 손실 함수를 \mathbf{m}_i에 대해 편미분하여 0이 되는 지점을 찾으면 다음과 같은 평균 공식이 유도됩니다.

$$\frac{\partial e(\mathbf{m})}{\partial \mathbf{m}} = 0 \implies \mathbf{m}_i = \frac{1}{|S_i|} \sum_{\mathbf{x} \in S_i} \mathbf{x}$$

---

### 2. 클러스터 평가 지표: 실루엣 계수 (Silhouette Coefficient)
실루엣 계수의 상세 식입니다. 이 수치는 개별 데이터가 본인이 속한 그룹에 얼마나 잘 맞는지, 다른 그룹과는 얼마나 잘 분리되었는지를 수치화합니다.

* **데이터 n의 실루엣 계수 sc_n:**

$$sc_n = \frac{b_n - a_n}{\max(a_n, b_n)}$$


* a_n: 자신이 속한 클러스터 내의 다른 모든 데이터들과의 평균 거리 (**응집도**)
* b_n: 가장 가까운 인접 클러스터 내의 데이터들과의 평균 거리 (**분리도**)


* **해석:**
* 1에 가까울수록: 자신의 클러스터 멤버와 매우 가깝고 타 클러스터와 멀다는 뜻 (매우 우수)
* 0에 가까울수록: 클러스터 경계선상에 위치함
* -1에 가까울수록: 잘못된 클러스터에 할당되었을 가능성이 높음



---

### 3. 계층적 클러스터링의 거리 계산 (Linkage) 상세 묘사

| 연결 방식 | 수학적 정의 | 시각적 특징 / 결과 |
| --- | --- | --- |
| **Single Link** | d(C_1, C_2) = \min_{\mathbf{x} \in C_1, \mathbf{y} \in C_2} \|\mathbf{x} - \mathbf{y} | **Chain 효과:** 점들이 길게 늘어지는 경향. 최소 신장 트리(MST) 구조와 유사. |
| **Complete Link** | d(C_1, C_2) = \max_{\mathbf{x} \in C_1, \mathbf{y} \in C_2} \|\mathbf{x} - \mathbf{y} | **Compactness:** 지름이 작은 원형의 조밀한 클러스터를 형성. |
| **Average Link** | $d(C_1, C_2) = \frac{1}{ | C_1 |

---

### 4. 데이터 정규화 (Data Normalization) 기법

* **표준화 (Standardization / Z-score Normalization):** 평균을 0, 표준편차를 1로 변환.

$$x_{new} = \frac{x - \mu}{\sigma}$$

* **Min-Max Scaling:** 데이터를 0과 1 사이의 범위로 변환.

$$x_{new} = \frac{x - \min(x)}{\max(x) - \min(x)}$$

---

### 5. k-Means의 한계와 대안 (k-Medoids)

* **평균(Mean) vs 중앙값(Medoid):**
* k-Means는 **평균**을 사용하므로 이상치(Outlier) 하나가 전체 중심점을 크게 흔들 수 있습니다.
* **k-Medoids**는 실제 데이터 포인트 중 하나를 대표값으로 선택합니다. 이는 절댓값 오차를 최소화하므로 이상치에 훨씬 강건(Robust)합니다.



---

### 6. 거리 측정법의 종류 (추가 설명)

* **Euclidean:** 일반적인 직선 거리.
* **Manhattan:** 격자 형태의 도시 블록 거리 (L1 Norm).
* **Hamming/Edit Distance:** 텍스트나 카테고리형 데이터의 '다름'을 측정할 때 사용.
* **Haversine:** 지구 표면(구체) 위 두 지점 사이의 거리를 계산할 때 사용.

이 추가 정보를 앞선 강의 요약본에 덧붙이면, 시험 공부나 프로젝트 보고서 작성 시 완벽한 참고 자료가 될 것입니다. 더 궁금한 수식이 있으신가요?