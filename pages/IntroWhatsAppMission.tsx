
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, MessageSquare, Phone, Info } from 'lucide-react';
import IOSStatusBar from '../components/iOSStatusBar';
import { Message } from '../types';

const SINGLE_KEY_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"; 
const RECEIVED_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3";

const IntroWhatsAppMission: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);
  const navTimeoutRef = useRef<any>(null);
  
  const keySoundsRef = useRef<HTMLAudioElement[]>([]);
  const receivedAudioRef = useRef<HTMLAudioElement | null>(null);

  const profileImg = "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/33b5814f67fd820ca815cac9094f790e29102d28/ALINE%20WHATSAPP.jpg";

  const introCopy = [
    "Olá, mãe!",
    "Acredito que posso te ajudar a organizar essa rotina.",
    "Agora, preciso falar com você rapidinho.",
    "Fique nessa tela, eu vou te ligar agora."
  ];

  useEffect(() => {
    isMounted.current = true;
    const poolSize = 8;
    const pool: HTMLAudioElement[] = [];
    for (let i = 0; i < poolSize; i++) {
      const audio = new Audio(SINGLE_KEY_SOUND_URL);
      audio.volume = 0.3;
      audio.preload = "auto";
      pool.push(audio);
    }
    keySoundsRef.current = pool;

    const rAudio = new Audio(RECEIVED_SOUND_URL);
    rAudio.volume = 0.4;
    rAudio.preload = "auto";
    receivedAudioRef.current = rAudio;

    return () => {
      isMounted.current = false;
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
      keySoundsRef.current.forEach(a => { a.pause(); a.src = ""; });
    };
  }, []);

  let poolIndex = 0;
  const playKeySound = () => {
    if (!isMounted.current) return;
    const audio = keySoundsRef.current[poolIndex];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      poolIndex = (poolIndex + 1) % keySoundsRef.current.length;
    }
  };

  const typeMessage = async (text: string) => {
    if (!isMounted.current) return;
    setIsTyping(true);
    for (let i = 0; i < text.length; i++) {
      if (!isMounted.current) return;
      playKeySound();
      await new Promise(resolve => setTimeout(resolve, 35 + Math.random() * 40));
    }
    
    if (!isMounted.current) return;
    setIsTyping(false);
    
    if (receivedAudioRef.current) {
      receivedAudioRef.current.currentTime = 0;
      receivedAudioRef.current.play().catch(() => {});
    }

    const newMessage: Message = {
      id: Date.now(),
      text: text,
      sender: "character",
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: "read"
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const startSequence = async () => {
    if (hasStarted || !isMounted.current) return;
    setHasStarted(true);
    await new Promise(res => setTimeout(res, 500));

    for (const text of introCopy) {
      if (!isMounted.current) return;
      await new Promise(res => setTimeout(res, 600 + Math.random() * 800));
      await typeMessage(text);
    }

    if (isMounted.current) {
      navTimeoutRef.current = setTimeout(() => {
        if (isMounted.current) navigate('/missao-1-ligacao');
      }, 2000);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[100dvh] bg-[#F2F2F7] overflow-hidden max-w-[480px] mx-auto border-x border-gray-200 shadow-xl relative">
      {!hasStarted && (
        <div onClick={startSequence} className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6 cursor-pointer">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center gap-6 text-center animate-bounce">
            <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#25D366]/30">
              <MessageSquare size={40} fill="currentColor" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-black tracking-tight mb-2">Nova Mensagem</h3>
              <p className="text-gray-500 text-sm font-medium">Toque para ouvir o que a Aline tem para você</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#F6F6F6] z-20">
        <IOSStatusBar dark />
        <header className="border-b border-gray-300 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChevronLeft className="text-[#007AFF]" size={28} />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden border border-gray-200">
                <img src={profileImg} alt="Aline" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col -gap-1">
                <h2 className="text-[16px] font-bold text-black leading-tight">Aline Neves</h2>
                <p className="text-[11px] text-gray-500 font-medium">
                  {isTyping ? <span className="text-[#007AFF] animate-typing">digitando...</span> : 'online'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#007AFF]">
             <Phone size={20} />
             <Info size={20} />
          </div>
        </header>
      </div>

      <main className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#E5DDD5] relative" 
            style={{ 
              backgroundImage: "url('https://w0.peakpx.com/wallpaper/580/624/HD-wallpaper-whatsapp-background-dark-pattern-whatsapp-doodle-doodle-art.jpg')", 
              backgroundSize: '400px', 
              backgroundBlendMode: 'overlay' 
            }}>
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col animate-fade-in">
            <div className="max-w-[85%] px-3 py-1.5 rounded-lg relative text-[15px] shadow-sm bg-white self-start text-black rounded-tl-none border border-gray-200/50">
              {msg.text}
              <div className="flex items-center justify-end gap-1 mt-0.5 text-[9px] text-gray-400 font-medium">
                {msg.timestamp} <span className="text-[#34B7F1] text-[12px]">✓✓</span>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex self-start bg-white px-3 py-2 rounded-lg rounded-tl-none shadow-sm animate-fade-in">
            <div className="flex gap-1 py-1">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} className="h-12" />
      </main>

      <footer className="bg-[#F6F6F6] border-t border-gray-300 p-2 pb-10 flex items-center gap-3 z-20">
        <Plus className="text-[#007AFF]" size={24} />
        <div className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-gray-300 text-[15px]">Mensagem</div>
        <div className="w-10 h-10 bg-[#007AFF] rounded-full flex items-center justify-center text-white">
          <MessageSquare size={20} fill="currentColor" />
        </div>
      </footer>
    </div>
  );
};

export default IntroWhatsAppMission;
