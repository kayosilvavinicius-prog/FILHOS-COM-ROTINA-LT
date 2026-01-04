
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import IntroWhatsAppMission from './pages/IntroWhatsAppMission';
import CallMission from './pages/CallMission';
import WhatsAppMission from './pages/WhatsAppMission';
import VideoMission from './pages/VideoMission';
import SalesPage from './pages/SalesPage';

// Configure aqui o seu Webhook para receber logs de visitas
const WEBHOOK_LOG_URL = "https://hook.us1.make.com/sua_url_aqui"; 

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const fbq = (window as any).fbq;
    if (typeof fbq === 'function') {
      // Mapeamento de rotas para nomes amigáveis no Gerenciador da Meta
      const routeMap: Record<string, string> = {
        '/': '0 - Intro WhatsApp',
        '/missao-1-ligacao': '1 - Ligacao Recebida',
        '/missao-2-whatsapp': '2 - Chat de Conscientizacao',
        '/missao-3-video': '3 - Video VSL',
        '/sales': '4 - Pagina de Vendas'
      };

      const pageName = routeMap[location.pathname] || 'Outra Pagina';

      // Dispara o PageView padrão para o Facebook saber que o site foi aberto
      fbq('track', 'PageView');
      
      // Dispara um ViewContent detalhado
      // Se for a página de vendas, incluímos o valor para o algoritmo da Meta otimizar melhor
      const isSalesPage = location.pathname === '/sales';
      
      fbq('track', 'ViewContent', {
        content_name: pageName,
        content_category: 'Funil Filhos com Rotina',
        value: isSalesPage ? 19.90 : 0,
        currency: 'BRL'
      });
    }

    // Log de visita via Webhook (Opcional - Útil para Google Sheets)
    const logVisit = async () => {
      if (WEBHOOK_LOG_URL && !WEBHOOK_LOG_URL.includes("sua_url_aqui")) {
        try {
          fetch(WEBHOOK_LOG_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'page_view',
              page: location.pathname,
              timestamp: new Date().toISOString()
            })
          });
        } catch (e) {
          // Erro silencioso
        }
      }
    };

    logVisit();
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
