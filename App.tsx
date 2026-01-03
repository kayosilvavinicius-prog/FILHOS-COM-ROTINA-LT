
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import IntroWhatsAppMission from './pages/IntroWhatsAppMission';
import CallMission from './pages/CallMission';
import WhatsAppMission from './pages/WhatsAppMission';
import VideoMission from './pages/VideoMission';
import SalesPage from './pages/SalesPage';

// Componente para disparar PageView em cada mudança de rota
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Fix: cast window to any to access the fbq function from Meta Pixel and avoid TS error
    const fbq = (window as any).fbq;
    // Verifica se a função fbq do Facebook existe e dispara o PageView
    if (typeof fbq === 'function') {
      fbq('track', 'PageView');
    }
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AnalyticsTracker />
      <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        <Routes>
          <Route path="/" element={<IntroWhatsAppMission />} />
          <Route path="/missao-1-ligacao" element={<CallMission />} />
          <Route path="/missao-2-whatsapp" element={<WhatsAppMission />} />
          <Route path="/missao-3-video" element={<VideoMission />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
