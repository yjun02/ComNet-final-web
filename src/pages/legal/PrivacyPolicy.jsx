import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-gray-300 space-y-8">
      <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">1. 개요</h2>
        <p>
          슬기로운 전전위키(이하 "본 사이트")는 이용자의 개인정보를 소중하게 생각하며, 개인정보 보호 관련 법령을 준수하기 위해 노력합니다. 
          본 개인정보처리방침은 본 사이트가 이용자의 정보를 어떻게 처리하는지 설명합니다.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">2. 광고 관련 정보 처리 (Google AdSense)</h2>
        <p>
          본 사이트는 광고를 게재하기 위해 Google AdSense를 사용합니다. Google과 같은 제3자 제공업체는 쿠키를 사용하여 본 사이트 또는 다른 사이트에 대한 사용자의 이전 방문을 기반으로 광고를 게재합니다.
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Google의 광고 쿠키를 사용함으로써 Google과 파트너는 본 사이트 및 인터넷 상의 다른 사이트에 대한 방문을 기반으로 사용자에게 광고를 게재할 수 있습니다.</li>
          <li>사용자는 <a href="https://www.google.com/settings/ads" className="text-emerald-400 hover:underline">광고 설정</a>을 방문하여 관심 기반 광고를 거부할 수 있습니다.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">3. 로그 데이터 및 쿠키</h2>
        <p>
          본 사이트는 서비스 개선 및 통계 분석을 위해 Google Analytics 등의 도구를 사용할 수 있습니다. 이 과정에서 방문자의 IP 주소, 브라우저 유형, 방문 시간 등의 로그 정보가 수집될 수 있으며, 이는 쿠키를 통해 처리될 수 있습니다. 
          사용자는 브라우저 설정에서 쿠키 수집을 거부할 수 있습니다.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">4. 변경 사항 준수</h2>
        <p>
          본 개인정보처리방침은 법령 변경이나 서비스 운영 정책에 따라 변경될 수 있으며, 변경 시 해당 내용을 사이트를 통해 공지합니다.
        </p>
      </section>

      <div className="pt-8 border-t border-gray-800 text-sm text-gray-500 text-center">
        최종 수정일: 2025년 12월 30일
      </div>
    </div>
  );
}
