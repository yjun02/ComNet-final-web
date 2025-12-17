import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Chapter7 from './ml/Chapter7';
import Chapter8 from './ml/Chapter8';
import Chapter9 from './ml/Chapter9';
import Chapter10 from './ml/Chapter10';

export function MlChapterPage() {
  const { id } = useParams();

  if (id === '7') {
    return <Chapter7 />;
  } else if (id === '8') {
    return <Chapter8 />;
  } else if (id === '9') {
    return <Chapter9 />;
  } else if (id === '10') {
    return <Chapter10 />;
  }
  
  return <Navigate to="/ml/intro" />;
}
