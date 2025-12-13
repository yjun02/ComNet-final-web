import React from 'react';

export function Section({ title, id, children }) {
  return (
    <section id={id} className="space-y-6 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white border-l-4 border-emerald-500 pl-4">{title}</h2>
      {children}
    </section>
  );
}

export function SubSection({ title, id, children }) {
  return (
    <div id={id} className="space-y-4 scroll-mt-24">
      <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
      {children}
    </div>
  );
}

export function Card({ title, icon, children }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-emerald-500/50 transition-colors h-full">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-bold text-white mb-3 text-lg">{title}</h4>
      <div className="text-gray-400 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function InfoBox({ title, children }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      {title && <h4 className="font-bold text-white mb-3 text-lg">{title}</h4>}
      <div className="text-gray-300 leading-relaxed text-sm">{children}</div>
    </div>
  );
}

export function Concept({ title, children }) {
  return (
    <div className="bg-emerald-950/30 border-l-4 border-emerald-500 p-4 rounded-r-lg">
      <h5 className="font-bold text-emerald-400 mb-1">{title}</h5>
      <p className="text-gray-300 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

export function Highlight({ children, color = 'emerald' }) {
  const colors = {
    blue: 'text-blue-400',
    emerald: 'text-emerald-400',
    purple: 'text-purple-400',
    red: 'text-red-400',
  };
  return <span className={`${colors[color] || colors.emerald} font-semibold`}>{children}</span>;
}

export function Step({ num, label, color }) {
  const colors = {
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-600'
  };
  return (
    <div className="flex-1">
      <div className={`${colors[color]} text-white rounded-lg p-4`}>
        <div className="text-2xl font-bold mb-1">{num}</div>
        <div className="text-sm">{label}</div>
      </div>
    </div>
  );
}

export function Arrow() {
  return <div className="text-2xl text-gray-600 flex items-center justify-center">→</div>;
}

export function AlgorithmCard({ title, algorithm, complexity, children }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-lg p-6 h-full">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="text-sm text-emerald-400 mb-1">{algorithm}</div>
      <div className="text-xs text-gray-500 mb-4">{complexity}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function LayerCard({ title, icon, children }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center h-full">
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="font-semibold text-white mb-2 text-sm">{title}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{children}</p>
    </div>
  );
}

export function ServiceCard({ title, icon, children }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 text-center hover:border-blue-500/50 transition-colors h-full">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-bold text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed">{children}</p>
    </div>
  );
}

export function ProcessStep({ num, title, children }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
        {num}
      </div>
      <div className="flex-1">
        <h5 className="font-semibold text-white mb-1">{title}</h5>
        <div className="text-sm text-gray-400 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto border border-gray-800 rounded-lg">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="bg-gray-900 text-gray-200 uppercase">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-6 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-800 hover:bg-gray-900/50">
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function List({ items }) {
  return (
    <ul className="space-y-2 text-gray-400 text-sm list-inside">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2 items-start">
          <span className="text-emerald-500 mt-1 flex-shrink-0">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
