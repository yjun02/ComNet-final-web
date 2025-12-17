import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Chapter4 from './comnet/Chapter4';
import Chapter5 from './comnet/Chapter5';
import Chapter6 from './comnet/Chapter6';

export function ComNetChapterPage() {
  const { id } = useParams();

  if (id === '4') {
    return <Chapter4 />;
  } else if (id === '5') {
    return <Chapter5 />;
  } else if (id === '6') {
    return <Chapter6 />;
  }
  
  return <Navigate to="/comnet/intro" />;
}
