import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Lock,
  X,
  User,
  Mail,
  MessageCircle,
  Loader2,
  Star,
  Clock,
  Quote,
  ShieldAlert,
  CalendarCheck,
  Tv,
  EyeOff,
  Brain,
  ChevronDown,
  Info,
  Lightbulb,
  Users
} from 'lucide-react';

const ASSETS = {
  ALINE_FOTO: "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/2e88443c33f9150b3ac0649a37043d6ff25a5844/Expert%20aline.png",
  PRODUTO_MOCKUP: "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/f3a64c152a91eb1ab2000ecf39405c8686bd54c9/FILHOS%20COM%20ROTINA%20-%20SITE.png"
};

const CHECKOUT_URL = "https://pay.cakto.com.br/8orm8zt_705304";

const SalesPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const finalCtaRef = useRef<HTMLDivElement>(null);

  const isFormValid = formData.name.trim().length >= 2 && 
                      formData.email.includes('@') && 
                      formData.whatsapp.replace(/\D/g, '').length >= 10;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFinal = () => {
    finalCtaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const openCheckoutProcess = () => {
    const fbq = (window as any).fbq;
    if (typeof fbq === 'function') {
      fbq('track', 'InitiateCheckout', {
        content_name: 'Filhos com Rotina - Final Click',
        value: 19.90,
        currency: 'BRL'
      });
    }
    setShowLeadForm(true);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);

    const fbq = (window as any).fbq;
    if (typeof fbq === 'function') {
      fbq('track', 'Lead', { content_category: 'Maternidade' });
    }

    setTimeout(() => {
      window.location.href = CHECKOUT_URL;
    }, 400);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#0F172A] min-h-screen font-sans pb-32 overflow-x-hidden selection:bg-[#FE2C55]/20 text-[16px]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shine {
          0% { left: -100%; }
          20% { left: 100%; }
          100% { left: 100%; }
        }
        .animate-shine {
          position: relative;
          overflow: hidden;
        }
        .animate-shine::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -100%;
          width: 50%;
          height: 200%;
          background: rgba(255, 255, 255, 0.4);
          transform: rotate(30deg);
          animation: shine 3s infinite;
        }
        .btn-pulse-heavy {
          animation: pulseHeavy 2s infinite;
        }
        @keyframes pulseHeavy {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(254, 44, 85, 0.7); }
          70% { transform: scale(1.03); box-shadow: 0 0 0 20px rgba(254, 44, 85, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(254, 44, 85, 0); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Barra de Urgência */}
      <div className="bg-[#FE2C55] text-white text-[10px] sm:text-xs font-black py-2.5 text-center uppercase tracking-[0.2em] sticky top-0 z-[100] shadow-md px-4">
        ACESSO IMEDIATO
      </div>

      {/* Hero Section */}
      <section className="px-6 pt-12 pb-20 max-w-[1100px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/80 border border-red-100 px-4 py-2 rounded-full mb-8 shadow-sm">
          <Star className="text-yellow-400 fill-yellow-400" size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FE2C55]">Mais de 5.400 mães transformadas</span>
        </div>
        
        <h1 className="text-4xl sm:text-7xl font-black leading-[1.05] mb-8 tracking-tight text-[#0F172A]">
          Pare de gritar. <br/>Comece a <span className="text-[#FE2C55] italic">guiar</span>.
        </h1>
        
        <p className="text-gray-500 mb-12 text-lg sm:text-xl leading-relaxed max-w-[800px] mx-auto font-medium">
          O <strong>Sistema Filhos com Rotina</strong> não é apenas um guia, é o método visual que vai dar autonomia para o seu filho e paz para o seu coração.
        </p>

        <div className="flex flex-col items-center gap-4 mb-20">
          <button 
            onClick={scrollToFinal} 
            className="w-full max-w-[550px] bg-[#FE2C55] text-white font-black py-7 rounded-[2.5rem] text-xl shadow-[0_25px_60px_rgba(254,44,85,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3 group border-b-4 border-red-700"
          >
            QUERO A PAZ DE VOLTA NA MINHA CASA <ChevronDown className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent z-10 h-64 bottom-0"></div>
          <img 
            src={ASSETS.PRODUTO_MOCKUP} 
            alt="Material Filhos com Rotina" 
            decoding="async"
            className="relative z-20 w-full max-w-[950px] mx-auto drop-shadow-[0_50px_100px_rgba(0,0,0,0.12)]" 
          />
        </div>
      </section>

      {/* Seção de Telas vs Rotina Visual (Copy Contraintuitiva) */}
      <section className="py-24 px-6 bg-red-50/50">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-white p-10 sm:p-16 rounded-[4rem] shadow-[0_30px_70px_rgba(254,44,85,0.08)] border border-red-100">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                   <Lightbulb size={14} /> Você sabia disso?
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight">
                  A Sociedade Brasileira de Pediatria <span className="text-blue-600 underline">não proíbe</span> o uso de telas.
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  Isso mesmo. O segredo não está na proibição total, mas no <strong>equilíbrio e no limite adequado</strong> de exposição para cada fase do desenvolvimento.
                </p>
                <div className="space-y-4 grid grid-cols-1 gap-4">
                  <div className="flex items-start gap-4 p-3 bg-red-50/30 rounded-2xl border border-red-100/50">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1"><X size={14} className="text-red-600" /></div>
                    <p className="text-sm text-gray-600"><strong>Menores de 2 anos:</strong> Exposição zero, nem mesmo passivamente.</p>
                  </div>
                  <div className="flex items-start gap-4 p-3 bg-red-50/30 rounded-2xl border border-red-100/50">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1"><X size={14} className="text-red-600" /></div>
                    <p className="text-sm text-gray-600"><strong>2 a 5 anos:</strong> Máximo de 1 hora/dia, sempre com supervisão.</p>
                  </div>
                  <div className="flex items-start gap-4 p-3 bg-red-50/30 rounded-2xl border border-red-100/50">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1"><X size={14} className="text-red-600" /></div>
                    <p className="text-sm text-gray-600"><strong>6 a 10 anos:</strong> Limite de 1 a 2 horas/dia, sob vigilância total.</p>
                  </div>
                  <div className="flex items-start gap-4 p-3 bg-red-50/30 rounded-2xl border border-red-100/50">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1"><X size={14} className="text-red-600" /></div>
                    <p className="text-sm text-gray-600"><strong>11 a 18 anos:</strong> Máximo de 2 a 3 horas/dia. Proibido durante a noite.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 bg-[#FAF9F6] p-8 rounded-[3rem] border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <Brain size={24} />
                  </div>
                  <h4 className="font-black text-lg text-[#0F172A]">O Problema Real</h4>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Seu filho não briga pela tela porque é "viciado", ele briga porque <strong>não consegue enxergar o que vem depois</strong> daquele prazer imediato.
                </p>
                <p className="text-[#0F172A] font-bold text-sm leading-relaxed">
                  O <strong>Filhos com Rotina</strong> ensina a criança a ter o "GPS Visual" do dia. Quando ela sabe exatamente a hora de brincar, comer e sim, o momento da tela, a ansiedade acaba e a cooperação começa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-24 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16 px-6">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] mb-4">O que as mães estão dizendo</h2>
            <div className="flex justify-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />)}
            </div>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-6 md:px-0 md:grid md:grid-cols-3 md:gap-8 pb-8">
            {[
              { name: "Juliana Santos", text: "Meu filho de 4 anos não queria escovar os dentes por nada. Com o quadro visual, ele mesmo vai e faz sem eu precisar gritar. É mágico!", role: "Mãe do Pedro (4 anos)" },
              { name: "Camila Duarte", text: "O aplicativo é incrível! O Theo ama ver as estrelinhas subindo quando ele termina de se arrumar sozinho. O sistema de pontos realmente funciona e tirou o peso das minhas costas.", role: "Mãe do Theo (6 anos)" },
              { name: "Mariana Costa", text: "A rotina cristã mudou nossas noites. O momento de dormir era um caos, agora é o momento mais doce do nosso dia.", role: "Mãe de 2 (3 e 6 anos)" },
              { name: "Letícia Mendes", text: "O planner transformou nossa manhã. É tão visual e intuitivo que minha filha de 4 anos já acorda olhando o que tem que fazer. O material é de altíssima qualidade.", role: "Mãe da Beatriz (4 anos)" },
              { name: "Renata Oliveira", text: "Vale cada centavo. O preço é simbólico perto da paz que trouxe para minha casa. Recomendo para todas as amigas.", role: "Mãe da Alice (5 anos)" }
            ].map((dep, idx) => (
              <div 
                key={idx} 
                className="bg-[#FAF9F6] p-8 rounded-[2.5rem] border border-gray-100 relative shadow-sm min-w-[85%] sm:min-w-[70%] md:min-w-0 snap-start flex flex-col justify-between"
              >
                <div>
                  <Quote className="text-[#FE2C55] opacity-10 absolute top-6 right-8" size={40} />
                  <p className="text-gray-600 font-medium italic mb-6 leading-relaxed">"{dep.text}"</p>
                </div>
                <div>
                  <div className="font-black text-[#0F172A]">{dep.name}</div>
                  <div className="text-xs font-bold text-[#FE2C55] uppercase tracking-wider mt-1">{dep.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:hidden flex justify-center gap-2 pb-4">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-[#FE2C55]"></div>
              </div>
              Deslize para ver mais
            </div>
          </div>
        </div>
      </section>

      {/* Expert Story Detail */}
      <section className="py-24 px-6">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full max-w-[420px] shrink-0">
            <div className="relative">
              <div className="absolute -inset-4 bg-red-100 rounded-[5rem] -rotate-3"></div>
              <img 
                src={ASSETS.ALINE_FOTO} 
                alt="Aline Neves" 
                loading="lazy"
                decoding="async"
                className="relative z-10 w-full rounded-[4rem] shadow-2xl grayscale-[20%]" 
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-[2rem] shadow-xl z-20 border border-gray-100 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-black">3</div>
                  <div className="font-black text-xs uppercase tracking-widest text-gray-500">Mãe de Três<br/>Aventureiros</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <div className="inline-block bg-[#FE2C55]/10 text-[#FE2C55] font-black text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full">A Criadora</div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A] leading-[1.1]">Como a Aline venceu o caos...</h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-medium">
              <p>Eu sei exatamente o que é chegar ao fim do dia sentindo que o seu único papel foi <strong>"policial de rotina"</strong>. Eu tenho 3 filhos e, por muito tempo, minha casa era um campo de batalha.</p>
              <p>O cansaço não era só físico, era <strong>mental</strong>. Eu precisava pensar por todo mundo, o tempo todo. Foi quando decidi usar minha especialização para criar algo que falasse a língua deles: o <strong>visual</strong>.</p>
              <p>Hoje, meus filhos sabem o que vem depois sem eu precisar dar uma única ordem. Eu recuperei meu papel de mãe, e quero que você recupere o seu também.</p>
            </div>
            <div className="pt-4">
               <div className="flex items-center gap-3 mb-2">
                 {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-[#FE2C55] fill-[#FE2C55]" />)}
               </div>
               <p className="text-xs font-bold uppercase tracking-widest text-gray-400">+5.000 Famílias com o método</p>
            </div>
          </div>
        </div>
      </section>

      {/* Garantia Section */}
      <section className="py-24 px-6 bg-[#0F172A] text-white">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-[4rem] p-10 sm:p-20 text-center relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#FE2C55]/20 blur-[80px]"></div>
            
            <div className="flex justify-center mb-10">
              <div className="relative">
                <ShieldCheck size={100} className="text-[#FE2C55]" strokeWidth={1} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-black mt-2">30</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black mb-8">Risco Zero para Você</h2>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-12 max-w-[650px] mx-auto font-medium">
              Eu confio tanto na transformação que o Filhos com Rotina causa na vida das famílias, que você tem 30 dias de garantia incondicional para testar o sistema na sua rotina real. <br/><br/> Use com calma, aplique no dia a dia e veja se faz sentido para sua família. Se dentro desse período você sentir que não é para você, devolvemos 100% do seu dinheiro. Sem perguntas.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <CalendarCheck className="text-[#FE2C55] mb-4" size={24} />
                <h4 className="font-bold text-sm uppercase mb-2">30 DIAS</h4>
                <p className="text-xs text-white/40">Tempo suficiente para testar o sistema na rotina da sua casa.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <ShieldAlert className="text-[#FE2C55] mb-4" size={24} />
                <h4 className="font-bold text-sm uppercase mb-2">SEM BUROCRACIA</h4>
                <p className="text-xs text-white/40">Reembolso simples e direto pela plataforma.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <Sparkles className="text-[#FE2C55] mb-4" size={24} />
                <h4 className="font-bold text-sm uppercase mb-2">SATISFAÇÃO GARANTIDA</h4>
                <p className="text-xs text-white/40">Confiança total na qualidade e no propósito do Filhos com Rotina.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - ONDE A ANCORAGEM ACONTECE */}
      <section ref={finalCtaRef} className="py-32 px-6 text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-4xl sm:text-6xl font-black text-[#0F172A] mb-8 leading-tight tracking-tight">O próximo passo para uma casa em paz.</h2>
          <div className="bg-white rounded-[3.5rem] p-10 sm:p-14 shadow-2xl text-left border border-gray-100 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#FE2C55] text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">CONDIÇÃO ESPECIAL • VOLTA ÀS AULAS</div>
            
            <div className="space-y-4 mb-12">
              <div className="flex items-center gap-4 bg-[#FAF9F6] p-4 rounded-[1.5rem] border border-gray-100"><CheckCircle2 className="text-[#FE2C55]" size={18}/><span className="font-black text-[13px]">Aplicativo do Sistema Filhos com Rotina</span></div>
              <div className="flex items-center gap-4 bg-[#FAF9F6] p-4 rounded-[1.5rem] border border-gray-100"><Sparkles className="text-[#FE2C55]" size={18}/><span className="font-black text-[13px]">Rotinas prontas + criador de rotinas personalizadas</span></div>
              <div className="flex items-center gap-4 bg-[#FAF9F6] p-4 rounded-[1.5rem] border border-gray-100"><Star className="text-[#FE2C55]" size={18}/><span className="font-black text-[13px]">Sistema de pontos com recompensas reais</span></div>
              
              <div className="pt-4 pb-2 text-[10px] font-black text-red-600 uppercase tracking-[0.2em] text-center">BÔNUS INCLUÍDOS NESTA CONDIÇÃO ESPECIAL</div>

              <div className="flex items-center gap-4 bg-red-50/30 p-4 rounded-[1.5rem] border border-red-100/50">
                <ShieldAlert className="text-red-600 shrink-0" size={18}/>
                <div>
                  <div className="font-black text-[13px]">Manual de Emergência para Crises</div>
                  <div className="text-[11px] text-gray-500 leading-tight mt-0.5">Estratégias para quando seu filho chora, grita ou colapsa. Prático para momentos difíceis.</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-red-50/30 p-4 rounded-[1.5rem] border border-red-100/50">
                <CalendarCheck className="text-red-600 shrink-0" size={18}/>
                <div>
                  <div className="font-black text-[13px]">Rotina Cristã Infantil (Digital + Imprimível)</div>
                  <div className="text-[11px] text-gray-500 leading-tight mt-0.5">Uma rotina visual especial para alinhar organização, valores e fé no dia a dia.</div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-red-50/30 p-4 rounded-[1.5rem] border border-red-100/50">
                <Clock className="text-red-600 shrink-0" size={18}/>
                <div>
                  <div className="font-black text-[13px]">Acesso liberado por 12 meses ao aplicativo</div>
                  <div className="text-[11px] text-gray-500 leading-tight mt-0.5">Use o sistema com calma, sem cobrança mensal nesse período.</div>
                </div>
              </div>
            </div>

            <div className="text-center mb-10">
              <div className="text-gray-400 line-through text-lg font-bold">Valor regular do sistema: R$ 358,80 / ano</div>
              <div className="text-4xl sm:text-5xl font-black text-[#FE2C55] tracking-tight mt-2">
                Por uma <span className="italic underline">fração</span> deste valor
              </div>
              <p className="text-xs font-bold text-gray-400 mt-4 uppercase tracking-widest">Últimos acessos disponíveis nessa condição</p>
            </div>

            <button 
              onClick={openCheckoutProcess} 
              className="w-full bg-[#FE2C55] text-white font-black py-7 rounded-[2rem] text-xl shadow-[0_20px_50px_rgba(254,44,85,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase border-b-4 border-red-700 animate-shine btn-pulse-heavy"
            >
              QUERO GARANTIR MEU ACESSO AGORA <ArrowRight size={24} />
            </button>
            <p className="text-[10px] font-bold text-gray-400 mt-6 uppercase tracking-widest text-center">
              Acesso imediato • Vagas limitadas • Garantia de 30 dias
            </p>
          </div>
        </div>
      </section>

      {/* Botão Flutuante Mobile */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 z-[200] transition-all duration-700 transform ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="max-w-[500px] mx-auto">
          <button 
            onClick={openCheckoutProcess} 
            className="w-full bg-[#FE2C55] text-white font-black py-5 rounded-[2rem] shadow-[0_15px_45px_rgba(254,44,85,0.6)] flex items-center justify-center gap-3 active:scale-95 border-2 border-white/20 uppercase tracking-tight text-sm animate-shine"
          >
            Aproveitar Preço Especial • AGORA
          </button>
        </div>
      </div>

      {/* Modal de Lead Captura */}
      {showLeadForm && (
        <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl relative overflow-hidden">
            <button onClick={() => setShowLeadForm(false)} className="absolute top-8 right-8 p-2 bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"><X size={20} /></button>
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#FE2C55]">
                <Lock size={40} />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-2">Para onde enviamos o acesso?</h3>
              <p className="text-gray-400 text-sm font-medium mb-8">Preencha os dados abaixo para prosseguir com segurança.</p>
              
              <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input type="text" required placeholder="Seu Nome Completo" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-[1.5rem] py-5 pl-14 pr-6 outline-none font-bold focus:border-[#FE2C55] transition-colors" />
                </div>
                <div className="relative">
                  <MessageCircle className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input type="tel" required placeholder="WhatsApp com DDD" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-[1.5rem] py-5 pl-14 pr-6 outline-none font-bold focus:border-[#FE2C55] transition-colors" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input type="email" required placeholder="Seu Melhor E-mail" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-[1.5rem] py-5 pl-14 pr-6 outline-none font-bold focus:border-[#FE2C55] transition-colors" />
                </div>
                
                <button 
                  type="submit" 
                  disabled={!isFormValid || isSubmitting} 
                  className="w-full py-6 rounded-[1.5rem] font-black text-white bg-[#FE2C55] shadow-[0_15px_35px_rgba(254,44,85,0.4)] flex items-center justify-center gap-3 mt-6 hover:bg-red-600 transition-colors border-b-4 border-red-700 disabled:opacity-50 animate-shine"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : 'LIBERAR MEU DESCONTO AGORA'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <footer className="py-24 px-6 border-t border-gray-100 text-center bg-white opacity-40">
        <div className="text-[#FE2C55] font-black text-2xl tracking-tighter mb-4">d4k maternidade.</div>
        <p className="text-[10px] font-bold uppercase tracking-widest max-w-[300px] mx-auto leading-loose">
          Este site não faz parte do Google ou Facebook. <br/>
          CNPJ: 54.706.912/0001-02 <br/>
          © 2025 Filhos com Rotina. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default SalesPage;