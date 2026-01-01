
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MicOff, Grid3x3, Volume2, Plus, Video, Users, Phone, MessageSquare, X, AlertCircle
} from 'lucide-react';
import IOSStatusBar from '../components/iOSStatusBar';

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
    
    // Configurar áudio principal
    const audio = new Audio(ALINE_AUDIO_URL);
    audio.preload = "auto";
    audio.playbackRate = 1.4; // Ligeiramente mais rápido como pedido anteriormente
    audioRef.current = audio;

    // Configurar vibração sonora
    const vAudio = new Audio(VIBRATION_SOUND_URL);
    vAudio.preload = "auto";
    vAudio.loop = true;
    vAudio.volume = 0.4;
    vibrationAudioRef.current = vAudio;

    // Configurar som de fim de chamada
    const endAudio = new Audio(END_CALL_SOUND_URL);
    endAudio.preload = "auto";
    endAudio.volume = 0.5;
    endCallAudioRef.current = endAudio;

    // Iniciar vibração
    startVibration();

    return () => {
      isMounted.current = false;
      stopVibration();
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }
      if (vibrationAudioRef.current) { vibrationAudioRef.current.pause(); vibrationAudioRef.current.src = ""; }
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

  const startVibration = () => {
    if (vibrationAudioRef.current) {
      vibrationAudioRef.current.play().catch(() => {
        // Se falhar o autoplay do som de vibração, mostramos erro visual ou ignoramos
      });
    }
    
    setIsVibratingVisual(true);
    
    if (navigator.vibrate) {
      vibrationIntervalRef.current = setInterval(() => {
        navigator.vibrate([1000, 500, 1000]);
      }, 2500);
      navigator.vibrate([1000, 500, 1000]);
    }
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
      vibrationAudioRef.current.currentTime = 0;
    }
  };

  const handleAnswer = () => {
    stopVibration();
    setStatus('active');
    if (audioRef.current) {
      // Tenta tocar imediatamente após o clique (interação humana direta)
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Erro ao tocar áudio:", error);
          setAudioError("Erro ao iniciar áudio. Toque em 'Alto-falante' para tentar novamente.");
        });
      }
      audioRef.current.onended = () => { if (isMounted.current) handleHangUp(); };
    }
  };

  const handleHangUp = () => {
    stopVibration();
    if (audioRef.current) audioRef.current.pause();
    if (endCallAudioRef.current) {
      endCallAudioRef.current.play().catch(() => {});
    }
    setStatus('ended');
    setIsExiting(true);
    setTimeout(() => { if (isMounted.current) navigate('/missao-2-whatsapp'); }, 800);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`relative w-full h-[100dvh] overflow-hidden flex flex-col bg-gradient-to-b from-[#1C1C1E] to-black transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'} ${isVibratingVisual && status === 'incoming' ? 'ios-vibrate-effect' : ''}`}>
      <IOSStatusBar />
      <style dangerouslySetInnerHTML={{ __html: `@keyframes iosHapticShake { 0% { transform: translate(0, 0); } 25% { transform: translate(-1px, -1px); } 50% { transform: translate(1px, 1px); } 75% { transform: translate(-1px, 1px); } 100% { transform: translate(0, 0); } } .ios-vibrate-effect { animation: iosHapticShake 0.1s linear infinite; }`}} />

      {status === 'incoming' ? (
        <div className="flex-1 flex flex-col items-center justify-between py-12 sm:py-24 px-8 animate-fade-in">
          <div className="flex flex-col items-center pt-10">
            <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full overflow-hidden bg-gray-800 mb-6 border-4 border-white/5 shadow-2xl">
              <img src={profileImg} alt="Aline" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-[32px] sm:text-[42px] font-bold text-white tracking-tight leading-none mb-2 sm:mb-4">Aline</h1>
            <p className="text-[18px] sm:text-[20px] text-white/60 font-medium">Chamada de áudio do WhatsApp</p>
          </div>
          
          <div className="w-full flex flex-col gap-10">
            <div className="flex justify-around items-end opacity-60">
                <div className="flex flex-col items-center gap-2 text-white"><MessageSquare size={22} /><span className="text-[10px] uppercase font-bold tracking-widest">Mensagem</span></div>
                <div className="flex flex-col items-center gap-2 text-white"><X size={22} /><span className="text-[10px] uppercase font-bold tracking-widest">Lembrar</span></div>
            </div>
            
            <div className="flex justify-between items-center px-4 pb-8 sm:pb-12">
              <div className="flex flex-col items-center gap-3">
                <button onClick={handleHangUp} className="w-[72px] h-[72px] sm:w-[78px] sm:h-[78px] bg-[#FF3B30] rounded-full flex items-center justify-center text-white active:scale-90 transition-all">
                  <Phone size={30} className="rotate-[135deg]" fill="currentColor" />
                </button>
                <span className="text-xs font-semibold text-white/80">Recusar</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <button onClick={handleAnswer} className="w-[72px] h-[72px] sm:w-[78px] sm:h-[78px] bg-[#34C759] rounded-full flex items-center justify-center text-white active:scale-95 shadow-[0_0_30px_rgba(52,199,89,0.3)] animate-pulse">
                  <Phone size={30} fill="currentColor" />
                </button>
                <span className="text-xs font-semibold text-white/80">Aceitar</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col animate-fade-in justify-between">
          <div className="flex flex-col items-center pt-16">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-800 mb-4 border-2 border-white/10">
              <img src={profileImg} alt="Aline" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-[28px] font-semibold text-white tracking-tight">Aline</h1>
            <p className="text-[14px] text-[#A0A0A0] font-normal mb-1">WhatsApp Audio</p>
            <p className="text-[20px] font-light text-white tabular-nums tracking-wider">{formatTime(callDuration)}</p>
            
            {audioError && (
              <div className="mt-4 mx-8 flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 text-white/60 text-center animate-pulse">
                <AlertCircle size={16} />
                <p className="text-[11px]">{audioError}</p>
              </div>
            )}
          </div>

          <div className="px-8 sm:px-10 pb-12">
            <div className="grid grid-cols-3 gap-y-8 sm:gap-y-12 mb-10 sm:mb-16">
              {[
                { icon: <MicOff size={24} />, label: "mudo" },
                { icon: <Grid3x3 size={24} />, label: "teclado" },
                { icon: <Volume2 size={24} />, label: "alto-falante" },
                { icon: <Plus size={24} />, label: "adicionar" },
                { icon: <Video size={24} />, label: "FaceTime", disabled: true },
                { icon: <Users size={24} />, label: "contatos" },
              ].map((item, idx) => (
                <div key={idx} className={`flex flex-col items-center gap-2 ${item.disabled ? 'opacity-30' : 'opacity-100'}`}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-medium text-white/70">{item.label}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <button onClick={handleHangUp} className="w-[68px] h-[68px] sm:w-[72px] sm:h-[72px] bg-[#FF3B30] rounded-full flex items-center justify-center text-white active:scale-90 transition-all shadow-2xl">
                <Phone size={30} className="rotate-[135deg]" fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center pb-2 pointer-events-none">
        <div className="w-32 h-1 bg-white/20 rounded-full" />
      </div>
    </div>
  );
};

export default CallMission;
