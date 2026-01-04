
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import IntroWhatsAppMission from './pages/IntroWhatsAppMission';
import CallMission from './pages/CallMission';
import WhatsAppMission from './pages/WhatsAppMission';
import VideoMission from './pages/VideoMission';
import SalesPage from './pages/SalesPage';

const CRITICAL_ASSETS = [
  "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/fe3f6ea59b951352e43388c8da1f56115e911980/WhatsApp%20Ptt%202025-12-30%20at%2009.57.36.ogg",
  "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/2e88443c33f9150b3ac0649a37043d6ff25a5844/filhos%20com%20rotina%20material.png",
  "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/33b5814f67fd820ca815cac9094f790e29102d28/ALINE%20WHATSAPP.jpg"
];

const AssetPreloader = () => {
  useEffect(() => {
    // Pré-carrega imagens e áudios críticos no início do funil
    CRITICAL_ASSETS.forEach(url => {
      if (url.endsWith('.png') || url.endsWith('.jpg')) {
        const img = new Image();
        img.src = url;
      } else if (url.endsWith('.ogg') || url.endsWith('.mp3')) {
        const audio = new Audio();
        audio.preload = "auto";
        audio.src = url;
      }
    });

    // Prefetch do vídeo da VSL (estratégico)
    const videoPrefetch = document.createElement('link');
    videoPrefetch.rel = 'prefetch';
    videoPrefetch.href = "https://res.cloudinary.com/dafhibb8s/video/upload/v1767185181/MINI_VSL_40MB_-_FILHOS_COM_ROTINA_jgqf44.mp4";
    document.head.appendChild(videoPrefetch);
  }, []);

  return null;
};

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
      <AssetPreloader />
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
