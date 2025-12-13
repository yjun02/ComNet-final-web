# 🌐 CS Network Wiki - 컴퓨터 네트워크 학습 가이드

컴퓨터 네트워크 기말고사 공부를 위한 인터랙티브 위키 사이트 (근데 antigravity를 곁들인)

절대 기말고사 공부하기 싫어서 만든 거 아님

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://comnet-final-web.vercel.app/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)

## 🎯 프로젝트 소개

**CS Network Wiki**는 컴퓨터 네트워크를 처음 배우는 학생들을 위한 인터랙티브 학습 사이트입니다. 복잡한 네트워크 개념을 시각화하고, 실습 도구를 제공하여 이론과 실습을 동시에 학습할 수 있습니다.

### 🌟 주요 학습 주제

- **Network Layer (네트워크 계층)**: IP 프로토콜, 라우터 구조, Fragmentation, DHCP, NAT, IPv6
- **Routing Algorithms (라우팅 알고리즘)**: Dijkstra, Bellman-Ford, OSPF, BGP, SDN
- **Link Layer (링크 계층)**: Ethernet, MAC 주소, CSMA/CD, CRC, Switch, ARP

## ✨ 주요 기능

### 📊 인터랙티브 계산기
- **IP Fragmentation Simulator**: MTU에 따른 IP 패킷 단편화 과정 시뮬레이션
- **CRC Calculator**: 에러 검출을 위한 CRC 계산 도구

### 🎨 시각화 도구
- **DHCP 프로세스 플로우**: DORA 프로세스 단계별 시각화
- **"A Day in the Life of a Web Request"**: 웹 요청의 전체 과정 애니메이션
- **라우팅 알고리즘 비교**: Link State vs Distance Vector

### 💡 학습 최적화 UI
- 다크 테마 기반 눈의 피로도 감소
- 반응형 레이아웃 (모바일/태블릿/데스크톱 지원)
- On-Page TOC (목차) - 빠른 네비게이션
- 사이드바 챕터 네비게이션

## 🛠️ 기술 스택

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Router**: React Router v7
- **Animation**: Framer Motion
- **Markdown**: React Markdown + KaTeX (수식 렌더링)
- **Deployment**: Vercel

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 📖 챕터 구성

### Chapter 4: Network Layer - Data Plane
- 라우터 내부 구조 (입력/출력 포트, 스위칭 패브릭)
- IP 프로토콜 및 Fragmentation
- DHCP, NAT, IPv6

### Chapter 5: Network Layer - Control Plane
- 라우팅 알고리즘 (Dijkstra, Bellman-Ford)
- Intra-AS Routing (OSPF)
- Inter-AS Routing (BGP)
- SDN (Software-Defined Networking)

### Chapter 6: Link Layer & LANs
- 에러 탐지 및 정정 (CRC)
- 다중 접속 프로토콜 (CSMA/CD, CSMA/CA)
- Ethernet, MAC 주소, Switch, ARP
- 종합 시뮬레이션

## 🔗 배포

**Live Demo**: [https://comnet-final-web.vercel.app/](https://comnet-final-web.vercel.app/)

## 📝 SEO 최적화

- ✅ 구조화된 데이터 (JSON-LD)
- ✅ 동적 메타 태그 (페이지별)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Google AdSense 통합

## 🎓 학습 자료 출처

❤️ 이 사이트는 **한동대학교 고윤민 교수님**의 컴퓨터 네트워크 수업 자료를 기반으로 제작되었습니다.