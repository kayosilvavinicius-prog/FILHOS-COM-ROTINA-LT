
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, MessageSquare } from 'lucide-react';
import IOSStatusBar from '../components/iOSStatusBar';
import { Message } from '../types';

const SINGLE_KEY_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"; 
const RECEIVED_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3";

const WhatsAppMission: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);
  
  const keySoundsRef = useRef<HTMLAudioElement[]>([]);
  const receivedAudioRef = useRef<HTMLAudioElement | null>(null);

  const profileImg = "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/33b5814f67fd820ca815cac9094f790e29102d28/ALINE%20WHATSAPP.jpg";

  const copy = [
    "posso ser sincera com vc?",
    "vc nao ta cansada fisicamente",
    "vc ta cansada de pensar por TODO MUNDO",
    "o dia inteiro",
    "vc carrega o dia inteiro na cabeça",
    "seu filho nao",
    "ai, cada tarefa vira uma briga.",
    "nao pq ele é dificil",
    "mas pq ele nao sabe o q vem depois",
    "criança coopera quando ENXERGA o dia",
    "quer ver como isso muda tudo?"
  ];

  useEffect(() => {
    isMounted.current = true;
    const poolSize = 12;
    const pool: HTMLAudioElement[] = [];
    for (let i = 0; i < poolSize; i++) {
      const audio = new Audio(SINGLE_KEY_SOUND_URL);
      audio.volume = 0.4;
      audio.preload = "auto";
      pool.push(audio);
    }
    keySoundsRef.current = pool;

    const rAudio = new Audio(RECEIVED_SOUND_URL);
    rAudio.volume = 0.5;
    rAudio.preload = "auto";
    receivedAudioRef.current = rAudio;

    return () => {
      isMounted.current = false;
      keySoundsRef.current.forEach(a => {
        a.pause();
        a.currentTime = 0;
        a.src = "";
      });
      if (receivedAudioRef.current) {
        receivedAudioRef.current.pause();
        receivedAudioRef.current.src = "";
      }
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
      const delay = 45 + Math.random() * 60;
      await new Promise(resolve => setTimeout(resolve, delay));
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
    for (const text of copy) {
      if (!isMounted.current) return;
      const thinkTime = 1000 + Math.random() * 1200;
      await new Promise(res => setTimeout(res, thinkTime));
      await typeMessage(text);
    }
    if (isMounted.current) setShowCTA(true);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-screen bg-[#F2F2F7] overflow-hidden max-w-[480px] mx-auto border-x border-gray-200 shadow-xl relative">
      {!hasStarted && (
        <div onClick={startSequence} className="absolute inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 cursor-pointer group">
          <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 text-center animate-bounce">
            <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white">
              <MessageSquare size={32} fill="currentColor" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-black">Aline está online</h3>
              <p className="text-gray-500 text-sm">Toque para ver as mensagens</p>
            </div>
          </div>
        </div>
      )}

      <IOSStatusBar dark />
      <header className="bg-[#F6F6F6] border-b border-gray-300 px-4 py-2 flex items-center justify-between z-10">
        <div className="flex items-center gap-1">
          <ChevronLeft className="text-[#007AFF]" size={28} />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              <img src={profileImg} alt="Aline" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-[17px] font-semibold text-black">Aline Neves</h2>
              <p className="text-[12px] text-gray-500 font-normal h-4">
                {isTyping ? <span className="text-[#007AFF] animate-typing">digitando...</span> : 'online'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#E5DDD5] relative" 
            style={{ backgroundImage: "url('https://w0.peakpx.com/wallpaper/580/624/HD-wallpaper-whatsapp-background-dark-pattern-whatsapp-doodle-doodle-art.jpg')", backgroundSize: '400px', backgroundBlendMode: 'overlay' }}>
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col animate-fade-in">
            <div className={`max-w-[85%] px-3 py-2 rounded-lg relative text-[16px] shadow-sm ${msg.sender === 'character' ? 'bg-white self-start text-black rounded-tl-none' : 'bg-[#DCF8C6] self-end text-black rounded-tr-none'}`}>
              {msg.text}
              <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-gray-400">
                {msg.timestamp}
                {msg.sender === 'character' && <div className="flex ml-0.5"><span className="text-[#34B7F1]">✓✓</span></div>}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex self-start bg-white px-4 py-2 rounded-lg rounded-tl-none shadow-sm animate-fade-in">
            <div className="flex gap-1 py-1">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} className="h-24" />
      </main>

      {showCTA && (
        <div className="absolute bottom-[100px] left-0 right-0 px-6 flex justify-center z-20 animate-fade-in">
          <button onClick={() => navigate('/missao-3-video')} className="w-full bg-[#25D366] text-white font-bold py-4 rounded-2xl shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center gap-3 active:scale-95 transition-all animate-pulse">
            <span>VER COMO ISSO MUDA TUDO ▶️</span>
          </button>
        </div>
      )}

      <footer className="bg-[#F6F6F6] border-t border-gray-300 p-2 pb-8 flex items-center gap-3">
        <Plus className="text-[#007AFF]" size={24} />
        <div className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-1.5 flex items-center text-gray-300 text-sm">Mensagem</div>
      </footer>
    </div>
  );
};

export default WhatsAppMission;
