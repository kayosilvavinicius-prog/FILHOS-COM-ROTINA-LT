
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageSquare, Play, ShoppingCart, Settings, Sparkles, Home } from 'lucide-react';

const TestHome: React.FC = () => {
  const navigate = useNavigate();

  const missions = [
    { 
      path: '/', 
      name: 'Missão 0: WhatsApp Intro', 
      icon: <Sparkles className="text-yellow-400" />, 
      desc: 'Início do funil: Boas-vindas e aviso de chamada' 
    },
    { 
      path: '/missao-1-ligacao', 
      name: 'Missão 1: Ligação iPhone', 
      icon: <Phone className="text-green-500" />, 
      desc: 'Simulação de chamada recebida (Aline)' 
    },
    { 
      path: '/missao-2-whatsapp', 
      name: 'Missão 2: WhatsApp Chat', 
      icon: <MessageSquare className="text-blue-500" />, 
      desc: 'Fluxo de mensagens e conscientização' 
    },
    { 
      path: '/missao-3-video', 
      name: 'Missão 3: Vídeo VSL', 
      icon: <Play className="text-red-500" />, 
      desc: 'Experiência imersiva com cenas e áudio' 
    },
    { 
      path: '/sales', 
      name: 'Página de Vendas', 
      icon: <ShoppingCart className="text-purple-500" />, 
      desc: 'Conversão final e FAQ' 
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-white/5 rounded-2xl border border-white/10 mb-2">
            <Settings className="text-white/40" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white">Painel de Missões</h1>
          <p className="text-white/40 text-sm">Selecione uma etapa para testar a execução</p>
        </div>

        <div className="grid gap-4">
          {missions.map((m) => (
            <button
              key={m.path}
              onClick={() => navigate(m.path)}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 p-5 rounded-2xl flex items-center gap-5 transition-all active:scale-95 text-left group"
            >
              <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                {m.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">{m.name}</h3>
                <p className="text-xs text-white/40">{m.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="pt-8 text-center flex flex-col gap-4">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 text-white/30 hover:text-white/60 text-xs font-bold transition-colors"
          >
            <Home size={14} /> VOLTAR PARA O INÍCIO
          </button>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-black">
            D4K Experience Debugger
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestHome;
