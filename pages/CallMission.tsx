
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MicOff, Grid3x3, Volume2, Plus, Video, Users, Phone, MessageSquare, X, AlertCircle, Home
} from 'lucide-react';
import IOSStatusBar from '../components/iOSStatusBar';

/**
 * Assets da Missão
 * Nota: Arquivos .ogg podem falhar em alguns navegadores iOS. Recomenda-se .mp3 para máxima compatibilidade.
 */
const ALINE_AUDIO_URL = "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/fe3f6ea59b951352e43388c8da1f56115e911980/WhatsApp%20Ptt%202025-12-30%20at%2009.57.36.ogg"; 
const VIBRATION_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/1358/1358-preview.mp3"; 
const END_CALL_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3";

const CallMission: React.FC = () => {
  const [status, setStatus] = useState<'incoming' | 'active' | 'ended'>('incoming');
  const [callDuration, setCallDuration] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVibratingVisual, setIsVibratingVisual] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const vibrationAudioRef = useRef<HTMLAudioElement | null>(null);
  const endCallAudioRef = useRef<HTMLAudioElement | null>(null);
  const vibrationIntervalRef = useRef<any>(null);
  const isMounted = useRef(true);

  const profileImg = "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/33b5814f67fd820ca815cac9094f790e29102d28/ALINE%20WHATSAPP.jpg";

  useEffect(() => {
    isMounted.current = true;
    
    // Inicialização do áudio da Aline
    const audio = new Audio();
    audio.src = ALINE_AUDIO_URL;
    audio.preload = "auto";
    audio.playbackRate = 1.5;
    
    audio.onerror = () => {
      // Se o .ogg falhar (comum no iOS), avisamos o usuário
      if (isMounted.current) setAudioError("Este formato de áudio não é suportado pelo seu navegador.");
    };
    audioRef.current = audio;

    // Inicialização do som de vibração
    const vAudio = new Audio();
    vAudio.src = VIBRATION_SOUND_URL;
    vAudio.preload = "auto";
    vAudio.volume = 0.35;
    vibrationAudioRef.current = vAudio;

    // Inicialização do som de fim de chamada
    const endAudio = new Audio();
    endAudio.src = END_CALL_SOUND_URL;
    endAudio.preload = "auto";
    endAudio.volume = 0.4;
    endCallAudioRef.current = endAudio;

    startHapticPattern();

    return () => {
      isMounted.current = false;
      stopVibration();
      
      // Cleanup sem disparar erro de source
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeAttribute('src');
        audioRef.current.load();
      }
      if (vibrationAudioRef.current) {
        vibrationAudioRef.current.pause();
        vibrationAudioRef.current.removeAttribute('src');
        vibrationAudioRef.current.load();
      }
      if (endCallAudioRef.current) {
        endCallAudioRef.current.pause();
        endCallAudioRef.current.removeAttribute('src');
        endCallAudioRef.current.load();
      }
    };
  }, []);

  useEffect(() => {
    let timer: any;
    if (status === 'active') {
      timer = setInterval(() => {
        if (isMounted.current) setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status]);

  const startHapticPattern = () => {
    if (vibrationIntervalRef.current || status !== 'incoming') return;

    const playVibrationCycle = () => {
      if (status !== 'incoming' || !isMounted.current) return;

      const vibrationDuration = 1500;
      
      if (vibrationAudioRef.current) {
        vibrationAudioRef.current.currentTime = 0;
        vibrationAudioRef.current.play().catch(() => {});
        setTimeout(() => {
           if (vibrationAudioRef.current) vibrationAudioRef.current.pause();
        }, vibrationDuration);
      }
      
      if (navigator.vibrate) {
        navigator.vibrate(vibrationDuration);
      }

      setIsVibratingVisual(true);
      setTimeout(() => {
        if (isMounted.current) setIsVibratingVisual(false);
      }, vibrationDuration);
    };

    playVibrationCycle();
    vibrationIntervalRef.current = setInterval(playVibrationCycle, 1600);
  };

  const stopVibration = () => {
    if (vibrationIntervalRef.current) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }
    if (navigator.vibrate) navigator.vibrate(0);
    setIsVibratingVisual(false);
    if (vibrationAudioRef.current) {
      vibrationAudioRef.current.pause();
    }
  };

  const handleAnswer = () => {
    stopVibration();
    setStatus('active');
    if (audioRef.current) {
      audioRef.current.playbackRate = 1.5;
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay block:", err);
        setAudioError("Toque na tela para ouvir.");
      });
      
      audioRef.current.onended = () => {
        if (isMounted.current) handleHangUp();
      };
    }
  };

  const handleHangUp = () => {
    stopVibration();
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    if (endCallAudioRef.current) {
      endCallAudioRef.current.currentTime = 0;
      endCallAudioRef.current.play().catch(() => {});
    }

    setStatus('ended');
    setIsExiting(true);
    setTimeout(() => {
      if (isMounted.current) navigate('/missao-2-whatsapp');
    }, 700);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={`relative w-full h-screen overflow-hidden flex flex-col bg-gradient-to-b from-[#1C1C1E] to-black transition-opacity duration-500 
        ${isExiting ? 'opacity-0' : 'opacity-100'} 
        ${isVibratingVisual && status === 'incoming' ? 'ios-vibrate-effect' : ''}`}
      onClick={() => {
        if (status === 'incoming' && vibrationAudioRef.current?.paused) {
          vibrationAudioRef.current.play().catch(() => {});
        }
        if (status === 'active' && audioRef.current?.paused) {
          audioRef.current.play().catch(() => {});
        }
      }}
    >
      
      <button 
        onClick={(e) => { e.stopPropagation(); navigate('/'); }}
        className="fixed top-14 left-6 z-[9999] bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white font-bold flex items-center gap-2 active:scale-95 transition-all shadow-lg"
      >
        <Home size={18} />
        <span className="text-xs uppercase tracking-wider">Painel</span>
      </button>

      <IOSStatusBar />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes iosHapticShake {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-0.3px, -0.2px); }
          20% { transform: translate(0.3px, 0.2px); }
          30% { transform: translate(-0.2px, 0.3px); }
          40% { transform: translate(0.2px, -0.3px); }
          50% { transform: translate(-0.4px, 0.1px); }
          60% { transform: translate(0.4px, -0.1px); }
          70% { transform: translate(-0.1px, 0.4px); }
          80% { transform: translate(0.1px, -0.4px); }
          90% { transform: translate(-0.1px, 0.1px); }
          100% { transform: translate(0, 0); }
        }
        .ios-vibrate-effect { 
          animation: iosHapticShake 0.12s linear infinite; 
        }
      `}} />

      {status === 'incoming' ? (
        <div className="flex-1 flex flex-col items-center justify-between py-24 px-8 animate-fade-in">
          <div className="flex flex-col items-center pt-8">
            <div className="w-[140px] h-[140px] rounded-full overflow-hidden bg-gray-800 mb-8 border-4 border-white/5 shadow-2xl">
              <img src={profileImg} alt="Aline" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-[42px] font-bold text-white tracking-tight leading-none mb-4">Aline</h1>
            <p className="text-[20px] text-white/60 font-medium">Chamada de áudio</p>
          </div>

          <div className="w-full flex flex-col gap-12">
            <div className="flex justify-around items-end opacity-80">
                <div className="flex flex-col items-center gap-2 text-white"><MessageSquare size={24} /><span className="text-xs">Mensagem</span></div>
                <div className="flex flex-col items-center gap-2 text-white"><X size={24} /><span className="text-xs">Lembrar</span></div>
            </div>

            <div className="flex justify-between items-center px-4 pb-12">
              <div className="flex flex-col items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); handleHangUp(); }} className="w-[78px] h-[78px] bg-[#FF3B30] rounded-full flex items-center justify-center text-white active:scale-90 transition-all">
                  <Phone size={34} className="rotate-[135deg]" fill="currentColor" />
                </button>
                <span className="text-sm font-medium text-white">Recusar</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); handleAnswer(); }} className="w-[78px] h-[78px] bg-[#34C759] rounded-full flex items-center justify-center text-white active:scale-90 shadow-[0_0_30px_rgba(52,199,89,0.4)]">
                  <Phone size={34} fill="currentColor" />
                </button>
                <span className="text-sm font-medium text-white">Aceitar</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col animate-fade-in">
          <div className="flex-1 flex flex-col items-center pt-20">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-800 mb-6 border-2 border-white/10">
              <img src={profileImg} alt="Aline" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-[32px] font-semibold text-white tracking-tight">Aline</h1>
            <p className="text-[16px] text-[#A0A0A0] font-normal mb-2">mobile</p>
            <p className="text-[22px] font-light text-white tabular-nums">{formatTime(callDuration)}</p>
            
            {audioError && (
              <div className="mt-8 mx-6 flex flex-col items-center gap-3 bg-red-500/10 p-5 rounded-2xl border border-red-500/30 text-red-200 text-center animate-pulse">
                <AlertCircle size={24} className="mb-1" />
                <p className="text-sm font-bold">Aviso</p>
                <p className="text-[11px] opacity-80">{audioError}</p>
              </div>
            )}
          </div>

          <div className="px-10 pb-16">
            <div className="grid grid-cols-3 gap-y-10 mb-20">
              <div className="flex flex-col items-center gap-2"><div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white"><MicOff size={28} /></div><span className="text-[13px] text-white/80">mudo</span></div>
              <div className="flex flex-col items-center gap-2"><div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white"><Grid3x3 size={28} /></div><span className="text-[13px] text-white/80">teclado</span></div>
              <div className="flex flex-col items-center gap-2"><div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white"><Volume2 size={28} /></div><span className="text-[13px] text-white/80">alto-falante</span></div>
              <div className="flex flex-col items-center gap-2"><div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white"><Plus size={28} /></div><span className="text-[13px] text-white/80">adicionar</span></div>
              <div className="flex flex-col items-center gap-2 opacity-40"><div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white"><Video size={28} /></div><span className="text-[13px] text-white/80">FaceTime</span></div>
              <div className="flex flex-col items-center gap-2"><div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white"><Users size={28} /></div><span className="text-[13px] text-white/80">contatos</span></div>
            </div>
            <div className="flex justify-center pb-8">
              <button onClick={handleHangUp} className="w-[72px] h-[72px] bg-[#FF3B30] rounded-full flex items-center justify-center text-white active:scale-90 transition-all shadow-xl">
                <Phone size={32} className="rotate-[135deg]" fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center pb-2"><div className="w-32 h-1 bg-white/30 rounded-full" /></div>
    </div>
  );
};

export default CallMission;
