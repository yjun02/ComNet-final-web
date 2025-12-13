import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function EthernetFrameBuilder() {
  const [description, setDescription] = useState('각 필드를 클릭하여 설명을 확인하세요.');
  const [activeField, setActiveField] = useState(null);

  const fields = [
    { name: 'Preamble', size: '8 Bytes', color: 'bg-gray-700', desc: '10101010... 패턴으로 수신측과 송신측의 클록 동기화를 맞춥니다.' },
    { name: 'Dest Addr', size: '6 Bytes', color: 'bg-emerald-600', desc: '목적지 MAC 주소입니다. 이 주소가 자신과 맞지 않으면 카드는 프레임을 버립니다.' },
    { name: 'Src Addr', size: '6 Bytes', color: 'bg-blue-600', desc: '송신지 MAC 주소입니다.' },
    { name: 'Type', size: '2 Bytes', color: 'bg-purple-600', desc: '상위 계층 프로토콜(주로 IP)을 구분하여 디멀티플렉싱합니다.' },
    { name: 'Data (Payload)', size: '46~1500', color: 'bg-gray-600', desc: '실제 IP 데이터그램이 들어가는 곳입니다. 최소 46바이트보다 작으면 패딩이 추가됩니다.', flex: true },
    { name: 'CRC', size: '4 Bytes', color: 'bg-red-600', desc: '오류 검출을 위한 값입니다. 덩어리 전체의 오류를 검사합니다.' },
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Ethernet Frame Structure</h3>
      
      {/* Frame Visual */}
      <div className="flex w-full h-16 mb-4 rounded overflow-hidden border border-gray-700">
        {fields.map((field) => (
          <motion.div
            key={field.name}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            onClick={() => {
              setActiveField(field.name);
              setDescription(field.desc);
            }}
            className={`${field.color} ${field.flex ? 'flex-[2]' : 'w-auto px-2'} 
              h-full flex flex-col items-center justify-center cursor-pointer border-r border-black/20 transition-all`}
          >
            <span className="text-white text-xs font-bold whitespace-nowrap">{field.name}</span>
            <span className="text-[10px] text-white/70">{field.size}</span>
          </motion.div>
        ))}
      </div>

      {/* Description Box */}
      <div className="bg-black/40 p-4 rounded text-center min-h-[80px] flex items-center justify-center border border-gray-800">
        <p className={`text-sm ${activeField ? 'text-white' : 'text-gray-500'}`}>
          {activeField && <span className="font-bold text-emerald-400 mr-2">[{activeField}]</span>}
          {description}
        </p>
      </div>
    </div>
  );
}
