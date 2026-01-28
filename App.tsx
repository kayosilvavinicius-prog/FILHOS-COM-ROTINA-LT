import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import IntroWhatsAppMission from './pages/IntroWhatsAppMission';
import CallMission from './pages/CallMission';
import WhatsAppMission from './pages/WhatsAppMission';
import VideoMission from './pages/VideoMission';
import SalesPage from './pages/SalesPage';
import TestHome from './pages/TestHome';
import { Settings } from 'lucide-react';
import { funnelTracker, FunnelStep } from './services/funnelTracker';

const CRITICAL_ASSETS = [
  "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/fe3f6ea59b951352e43388c8da1f56115e911980/WhatsApp%20Ptt%202025-12-30%20at%2009.57.36.ogg",
  "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/2e88443c33f9150b3ac0649a37043d6ff25a5844/filhos%20com%20rotina%20material.png",
  "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/33b5814f67fd820ca815cac9094f790e29102d28/ALINE%20WHATSAPP.jpg"
];

const AssetPreloader = () => {
  useEffect(() => {
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
      // 1. Facebook Pixel
      const fbq = (window as any).fbq;
      if (typeof fbq === 'function') {
        fbq('track', 'PageView');
      }

      // 2. Google Sheets Tracker
      const routeToStep: Record<string, FunnelStep> = {
        '/': 'ETAPA_0_ENTROU_FUNIL',
        '/missao-1-ligacao': 'ETAPA_2_LIGACAO', // Mapeamento conforme colunas do usuário
        '/missao-2-whatsapp': 'ETAPA_1_WHATSAPP', 
        '/missao-3-video': 'ETAPA_3_VSL_INICIADA',
        '/sales': 'ETAPA_4_PAGINA_VENDAS'
      };

      const step = routeToStep[location.pathname];
      if (step) {
        funnelTracker.track(step);
      }

    } catch (e) {
      console.warn("Analytics error:", e);
    }
  }, [location]);

  return null;
};

const DevMenuTrigger = () => {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === '/dev') return null;
  return (
    <button 
      onClick={() => navigate('/dev')}
      className="fixed bottom-4 right-4 z-[9999] p-3 bg-black/10 hover:bg-black/30 backdrop-blur-sm text-white/20 hover:text-white/80 rounded-full transition-all active:scale-90"
      title="Painel de Missões"
    >
      <Settings size={20} />
    </button>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AssetPreloader />
      <AnalyticsTracker />
      <DevMenuTrigger />
      <div className="min-h-screen bg-white text-gray-900 selection:bg-red-500/20">
        <Routes>
          <Route path="/" element={<IntroWhatsAppMission />} />
          <Route path="/missao-1-ligacao" element={<CallMission />} />
          <Route path="/missao-2-whatsapp" element={<WhatsAppMission />} />
          <Route path="/missao-3-video" element={<VideoMission />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/dev" element={<TestHome />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;