
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import IntroWhatsAppMission from './pages/IntroWhatsAppMission';
import CallMission from './pages/CallMission';
import WhatsAppMission from './pages/WhatsAppMission';
import VideoMission from './pages/VideoMission';
import SalesPage from './pages/SalesPage';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    try {
      const fbq = (window as any).fbq;
      if (typeof fbq === 'function') {
        const routeMap: Record<string, string> = {
          '/': '0 - Intro WhatsApp',
          '/missao-1-ligacao': '1 - Ligacao Recebida',
          '/missao-2-whatsapp': '2 - Chat de Conscientizacao',
          '/missao-3-video': '3 - Video VSL',
          '/sales': '4 - Pagina de Vendas'
        };

        const pageName = routeMap[location.pathname] || 'Outra Pagina';
        fbq('track', 'PageView');
        
        const isSalesPage = location.pathname === '/sales';
        fbq('track', 'ViewContent', {
          content_name: pageName,
          content_category: 'Funil Filhos com Rotina',
          value: isSalesPage ? 19.90 : 0,
          currency: 'BRL'
        });
      }
    } catch (e) {
      console.warn("Analytics error:", e);
    }
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AnalyticsTracker />
      <div className="min-h-screen bg-white text-gray-900 selection:bg-red-500/20">
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
