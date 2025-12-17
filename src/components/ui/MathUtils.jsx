import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export const InlineMath = ({ math }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, {
        throwOnError: false,
        displayMode: false
      });
    }
  }, [math]);
  return <span ref={ref} />; // Inline element
};

export const BlockMath = ({ math }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, {
        throwOnError: false,
        displayMode: true
      });
    }
  }, [math]);
  return <div ref={ref} className="overflow-x-auto overflow-y-hidden py-2" />; // Block element with scroll
};
