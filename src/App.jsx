import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ComNetChapterPage } from './pages/ComNetChapterPage';
import { MlChapterPage } from './pages/MlChapterPage';
import Chapter7 from './pages/ml/Chapter7';
import Chapter8 from './pages/ml/Chapter8';
import Chapter9 from './pages/ml/Chapter9';
import Chapter10 from './pages/ml/Chapter10';
import { Landing } from './pages/Landing';
import { PreparingPage } from './pages/PreparingPage';
import ComNetIntro from './pages/comnet/Intro';
import MlIntro from './pages/ml/Intro';
import About from './pages/legal/About';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';

function AppLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function LegacyRedirect() {
  const { id } = useParams();
  return <Navigate to={`/comnet/chapter/${id}`} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/preparing" element={<PreparingPage />} />
        
        {/* Main Content Layout with Sidebar */}
        <Route element={<AppLayout />}>
          <Route path="/comnet/intro" element={<ComNetIntro />} />
          <Route path="/comnet/chapter/:id" element={<ComNetChapterPage />} />
          <Route path="/ml/intro" element={<MlIntro />} />
          <Route path="/ml/chapter/:id" element={<MlChapterPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Route>

        {/* Legacy Support */}
        <Route path="/chapter/:id" element={<LegacyRedirect />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
