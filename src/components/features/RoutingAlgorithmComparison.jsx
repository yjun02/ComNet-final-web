import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function RoutingAlgorithmComparison() {
  const [activeTab, setActiveTab] = useState('LS'); // LS or DV

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      {/* Header Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab('LS')}
          className={`flex-1 py-4 text-center font-bold transition-colors ${
            activeTab === 'LS' 
              ? 'bg-gray-800 text-emerald-400 border-b-2 border-emerald-400' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Link State (Dijkstra)
        </button>
        <button
          onClick={() => setActiveTab('DV')}
          className={`flex-1 py-4 text-center font-bold transition-colors ${
            activeTab === 'DV' 
              ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Distance Vector (Bellman-Ford)
        </button>
      </div>

      {/* Content */}
      <div className="p-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'LS' ? (
            <motion.div
              key="LS"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500/10 p-3 rounded-lg text-2xl">🌍</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Global Knowledge</h3>
                  <p className="text-gray-400 text-sm">
                    모든 라우터가 <span className="text-emerald-400">전체 네트워크 지도(Topology)</span>와 모든 링크 비용을 알고 시작합니다.
                    이를 위해 <strong>Link State Broadcast</strong>가 선행되어야 합니다.
                  </p>
                </div>
              </div>

              <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                <h4 className="text-sm font-bold text-gray-300 mb-3">Algorithm Steps:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-400">
                  <li>출발점(u)의 비용은 0, 나머지는 ∞로 초기화</li>
                  <li>방문하지 않은 노드 중 가장 비용이 적은 노드(v) 선택</li>
                  <li>v를 거쳐가는 경로가 더 싸다면 비용 업데이트 (Relaxation)</li>
                  <li>모든 노드를 방문할 때까지 반복</li>
                </ol>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-800 p-3 rounded">
                  <span className="block text-gray-500 text-xs">Complexity</span>
                  <span className="text-white font-mono">O(n²) or O(n log n)</span>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <span className="block text-gray-500 text-xs">Problem</span>
                  <span className="text-white">Oscillations (진동) 가능</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="DV"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/10 p-3 rounded-lg text-2xl">🗣️</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Decentralized Knowledge</h3>
                  <p className="text-gray-400 text-sm">
                     오직 <span className="text-blue-400">직접 연결된 이웃</span>하구만 정보를 교환합니다.
                     이웃이 준 정보를 믿고 자신의 테이블을 업데이트하는 반복적 과정입니다.
                  </p>
                </div>
              </div>

              <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                <h4 className="text-sm font-bold text-gray-300 mb-3">Bellman-Ford Equation:</h4>
                <div className="font-mono text-center text-blue-300 text-lg mb-4 bg-gray-900 p-2 rounded">
                  dx(y) = min {`{ c(x,v) + dv(y) }`}
                </div>
                <p className="text-xs text-gray-500 text-center">
                  x에서 y로 가는 최소 비용 = min (x에서 이웃 v까지 비용 + v가 알려준 y까지 비용)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-800 p-3 rounded">
                  <span className="block text-gray-500 text-xs">Message Complexity</span>
                  <span className="text-white">이웃끼리만 교환 (적음)</span>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <span className="block text-gray-500 text-xs">Problem</span>
                  <span className="text-red-400">Count-to-Infinity</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
