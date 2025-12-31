
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import IntroWhatsAppMission from './pages/IntroWhatsAppMission';
import CallMission from './pages/CallMission';
import WhatsAppMission from './pages/WhatsAppMission';
import VideoMission from './pages/VideoMission';
import SalesPage from './pages/SalesPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        <Routes>
          {/* A jornada começa aqui */}
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
