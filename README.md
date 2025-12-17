# � 슬기로운 전전위키 - 슬기로운전전생활의 시험기간 도피처

한동대학교 슬기로운전전생활의 전전 과목 공부 정리 위키 (근데 antigravity를 곁들인)

절대 시험공부하기 싫어서 만든 거 아님

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://sj-wiki.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff0055?logo=framer)](https://www.framer.com/motion/)

## 🎯 프로젝트 소개

**슬기로운 전전위키**는 한동대학교 전기전자컴퓨터공학부 학생들을 위한 인터랙티브 학습 플랫폼입니다. 
복잡한 개념을 시각화하고, 실습 도구를 제공하여 이론과 실습을 동시에 학습할 수 있습니다.

### 📚 현재 제공 중인 과목

#### 🌐 Computer Networks (컴퓨터 네트워크) 기말고사 범위
- **Network Layer**: IP 프로토콜, 라우터 구조, Fragmentation, DHCP, NAT, IPv6
- **Routing Algorithms**: Dijkstra, Bellman-Ford, OSPF, BGP, SDN
- **Link Layer**: Ethernet, MAC 주소, CSMA/CD, CRC, Switch, ARP

#### 🤖 Machine Learning (머신러닝) 기말고사 범위
- **Neural Networks**: Perceptron, MLP, Backpropagation, Activation Functions
- **Deep Learning**: CNN, RNN, LSTM, Optimization Techniques
- **Clustering**: K-Means, Hierarchical Clustering, DBSCAN
- **Classification & Regression**: Decision Trees, SVM, Ensemble Methods

## ✨ 주요 기능

### 📊 인터랙티브 도구
- **IP Fragmentation Simulator**: MTU에 따른 IP 패킷 단편화 과정 시뮬레이션
- **CRC Calculator**: 에러 검출을 위한 CRC 계산 도구
- **Neural Network Visualizer**: 신경망 구조 및 학습 과정 시각화

### 🎨 시각화 컴포넌트
- **DHCP 프로세스 플로우**: DORA 프로세스 단계별 시각화
- **"A Day in the Life of a Web Request"**: 웹 요청의 전체 과정 애니메이션
- **라우팅 알고리즘 비교**: Link State vs Distance Vector
- **Activation Function Graphs**: 활성화 함수 비교 및 특성 분석

### 💡 학습 최적화 UI
- 🌙 다크 테마 기반 눈의 피로도 감소
- 📱 반응형 레이아웃 (모바일/태블릿/데스크톱 지원)
- 📑 On-Page TOC (목차) - 빠른 네비게이션
- 🎯 사이드바 챕터 네비게이션 (접기/펼치기 지원)
- ⚡ 부드러운 페이지 전환 애니메이션

## 🛠️ 기술 스택

| 카테고리 | 기술 |
|---------|------|
| **Frontend** | React 19 + Vite 7 |
| **Styling** | Tailwind CSS v4 |
| **Routing** | React Router v7 |
| **Animation** | Framer Motion 12 |
| **Markdown** | React Markdown + Rehype/Remark |
| **Math Rendering** | KaTeX |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

## 🚀 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/yjun02/SJ_WIKI.git
cd SJ_WIKI

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 🔗 배포

**Live Demo**: [https://sj-wiki.vercel.app/](https://sj-wiki.vercel.app/)

## 📝 SEO 최적화

- ✅ 구조화된 데이터 (JSON-LD)
- ✅ 동적 메타 태그 (페이지별 최적화)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Google AdSense 통합
- ✅ Open Graph 메타 태그
- ✅ Twitter Card 지원

## 📂 프로젝트 구조

```
SJ_WIKI/
├── src/
│   ├── components/       # 재사용 가능한 UI 컴포넌트
│   │   ├── layout/      # Layout, Sidebar, Header 등
│   │   ├── common/      # Button, Card, TOC 등
│   │   └── interactive/ # 인터랙티브 도구 및 시각화
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── comnet/      # 컴퓨터 네트워크 챕터
│   │   └── ml/          # 머신러닝 챕터
│   ├── utils/           # 유틸리티 함수
│   └── App.jsx          # 메인 앱 및 라우팅
├── public/              # 정적 파일
└── index.html           # HTML 엔트리 포인트
```