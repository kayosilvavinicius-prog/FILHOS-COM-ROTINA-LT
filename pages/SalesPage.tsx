
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Lock,
  FileText,
  X,
  User,
  Mail,
  MessageCircle,
  Loader2,
  AlertCircle,
  Star,
  Clock
} from 'lucide-react';

const ASSETS = {
  ALINE_FOTO: "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/2e88443c33f9150b3ac0649a37043d6ff25a5844/Expert%20aline.png",
  PRODUTO_MOCKUP: "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/2e88443c33f9150b3ac0649a37043d6ff25a5844/filhos%20com%20rotina%20material.png"
};

const CHECKOUT_URL = "https://pay.cakto.com.br/8orm8zt_705304";
const WEBHOOK_URL = "SUA_URL_DO_WEBHOOK_AQUI"; 

const SalesPage: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });

  const isFormValid = formData.name.trim().length >= 2 && 
                      formData.email.includes('@') && 
                      formData.whatsapp.replace(/\D/g, '').length >= 10;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    
    // Dispara ViewContent ao carregar a página
    const fbq = (window as any).fbq;
    if (typeof fbq === 'function') {
      fbq('track', 'ViewContent', {
        content_name: 'Guia Filhos com Rotina',
        value: 19.90,
        currency: 'BRL'
      });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função centralizada para rastrear o clique no checkout/botão de compra
  const trackCheckoutAttempt = (location: string) => {
    const fbq = (window as any).fbq;
    if (typeof fbq === 'function') {
      fbq('track', 'InitiateCheckout', {
        content_name: 'Filhos com Rotina - ' + location,
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

    // Dispara Lead e reforça o InitiateCheckout antes de sair da página
    if (typeof fbq === 'function') {
      fbq('track', 'Lead', { content_category: 'Maternidade' });
      fbq('track', 'InitiateCheckout', {
        content_name: 'Lead Convertido - Redirecionando',
        value: 19.90,
        currency: 'BRL'
      });
    }

    try {
      if (WEBHOOK_URL && WEBHOOK_URL !== "SUA_URL_DO_WEBHOOK_AQUI") {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            ...formData, 
            origem: 'vendas_direta', 
            data: new Date().toISOString()
          })
        });
      }
      // Pequeno delay para garantir que o Pixel disparou antes do redirecionamento
      setTimeout(() => {
        window.location.href = CHECKOUT_URL;
      }, 100);
    } catch (error) {
      window.location.href = CHECKOUT_URL;
    }
  };

  const screenTimeData = [
    { age: "0 - 2 anos", time: "Nenhum contato com telas ou videogames", highlight: true },
    { age: "2 - 5 anos", time: "Até uma hora por dia", highlight: false },
    { age: "5 - 10 anos", time: "Entre uma e duas horas por dia", highlight: false },
    { age: "11 - 18 anos", time: "Entre duas e três horas por dia", highlight: false },
  ];

  return (
    <div className="bg-[#FAF9F6] text-gray-900 min-h-screen font-sans pb-32 overflow-x-hidden selection:bg-[#FE2C55]/20">
      <div className="bg-[#FE2C55] text-white text-[10px] sm:text-xs font-black py-2.5 text-center uppercase tracking-[0.2em] sticky top-0 z-[100] shadow-md px-4">
        Oferta Limitada: Acesso Imediato por apenas R$ 19,90
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-6 flex justify-center items-center">
        <div className="text-[#FE2C55] font-black text-2xl tracking-tighter">d4k maternidade.</div>
      </div>

      {/* Hero */}
      <section className="px-6 pt-16 pb-12 max-w-[1000px] mx-auto text-center animate-fade-in">
        <h1 className="text-4xl sm:text-7xl font-black leading-[1.05] mb-8 tracking-tight text-[#0F172A]">
          Pare de gritar. Comece a <span className="text-[#FE2C55]">guiar</span>.
        </h1>
        <p className="text-gray-500 mb-10 text-lg sm:text-xl leading-relaxed max-w-[750px] mx-auto">
          O <strong>Filhos com Rotina</strong> é a ferramenta visual que transforma o caos diário em momentos de cooperação e paz na sua casa.
        </p>
        <div className="flex flex-col items-center gap-4 mb-16">
          <button onClick={() => trackCheckoutAttempt('Hero')} className="w-full max-w-[500px] bg-[#FE2C55] text-white font-black py-6 rounded-[2.5rem] text-xl shadow-[0_25px_60px_rgba(254,44,85,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3 group">
            QUERO A PAZ DE VOLTA <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest"><Lock size={12} /> Pagamento Seguro • R$ 19,90</div>
        </div>
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] to-transparent z-10 h-32 bottom-0"></div>
          <img src={ASSETS.PRODUTO_MOCKUP} alt="Material Filhos com Rotina" className="relative z-20 w-full max-w-[850px] drop-shadow-[0_50px_100px_rgba(0,0,0,0.12)]" />
        </div>
      </section>

      {/* Tabelas de Tela */}
      <section className="py-20 px-6 max-w-[1000px] mx-auto">
        <div className="bg-white border-2 border-[#FE2C55]/10 rounded-[3.5rem] p-8 sm:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03]"><Clock size={200} /></div>
          <div className="relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="bg-[#FE2C55]/10 p-5 rounded-3xl text-[#FE2C55] mb-6"><AlertCircle size={48} /></div>
              <h3 className="text-3xl sm:text-4xl font-black mb-6 text-[#0F172A] leading-tight">Uso Consciente de Telas</h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-[800px]">A Sociedade Brasileira de Pediatria orienta o uso moderado e adequado à idade.</p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm bg-gray-50/50">
              <div className="bg-[#0F172A] text-white p-6 sm:p-8 flex items-center justify-between">
                <div><h4 className="text-xl font-bold">Guia de Tempo</h4><p className="text-white/60 text-sm font-medium">Recomendações Oficiais</p></div>
              </div>
              <div className="divide-y divide-gray-100">
                {screenTimeData.map((row, i) => (
                  <div key={i} className={`flex flex-col sm:flex-row items-center sm:items-start p-6 sm:px-8 hover:bg-white transition-colors gap-2 sm:gap-8 ${row.highlight ? 'bg-[#FE2C55]/5' : ''}`}>
                    <div className="w-full sm:w-1/3 text-[#FE2C55] font-black text-lg tracking-tight">{row.age}</div>
                    <div className="w-full sm:w-2/3 text-gray-700 font-bold">{row.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert */}
      <section className="py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-12 sm:gap-20">
          <div className="relative w-full max-w-[400px]">
            <img src={ASSETS.ALINE_FOTO} alt="Aline Neves" className="relative z-10 w-full rounded-[4rem] shadow-2xl object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-[#FE2C55]/10 text-[#FE2C55] font-black text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-6">Criadora do Método</div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A] mb-8 leading-tight">Quem é Aline Neves?</h2>
            <p className="text-gray-500 text-lg leading-relaxed">Mãe e especialista, Aline dedica-se a transformar a rotina familiar através da previsibilidade e do afeto.</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 bg-[#0F172A] text-white text-center">
        <div className="max-w-[650px] mx-auto">
          <h2 className="text-4xl font-black mb-16 tracking-tight leading-tight">Escolha a paz na sua casa hoje.</h2>
          <div className="bg-white rounded-[3.5rem] p-10 sm:p-14 mb-12 shadow-2xl text-gray-900">
            <div className="space-y-4 mb-12 text-left">
              <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-[1.5rem] border border-gray-100"><CheckCircle2 className="text-[#FE2C55]" size={18}/><span className="font-bold">PDF Filhos com Rotina</span></div>
              <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-[1.5rem] border border-gray-100"><Sparkles className="text-[#FE2C55]" size={18}/><span className="font-bold">BÔNUS: Rotina Cristã</span></div>
              <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-[1.5rem] border border-gray-100"><ShieldCheck className="text-[#FE2C55]" size={18}/><span className="font-bold">Acesso Vitalício</span></div>
            </div>
            <div className="mb-12"><div className="text-7xl font-black text-[#0F172A] mt-2">R$ 19,90</div></div>
            <button onClick={() => trackCheckoutAttempt('Footer')} className="w-full bg-[#FE2C55] text-white font-black py-7 rounded-3xl text-xl shadow-[0_20px_50px_rgba(254,44,85,0.4)] active:scale-95 transition-all mb-8 flex items-center justify-center gap-3 uppercase">QUERO MEU ACESSO AGORA</button>
          </div>
        </div>
      </section>

      {/* Botão Flutuante */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 z-[200] transition-all duration-700 transform ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="max-w-[480px] mx-auto">
          <button onClick={() => trackCheckoutAttempt('Floating')} className="w-full bg-[#FE2C55] text-white font-black py-5 rounded-[2rem] shadow-[0_15px_45px_rgba(254,44,85,0.6)] flex items-center justify-center gap-3 active:scale-95 border-2 border-white/20 uppercase tracking-tight text-sm">
            Garantir Promoção • R$ 19,90
          </button>
        </div>
      </div>

      {/* Modal Lead */}
      {showLeadForm && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl relative overflow-hidden">
            <button onClick={() => setShowLeadForm(false)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-400"><X size={20} /></button>
            <div className="p-8 sm:p-10 text-center">
              <h3 className="text-2xl font-black text-[#0F172A] mb-6">Quase lá!</h3>
              <form onSubmit={handleLeadSubmit} className="space-y-5 text-left">
                <div className="relative"><User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} /><input type="text" required placeholder="Primeiro Nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-3xl py-4 pl-12 pr-6 outline-none font-bold" /></div>
                <div className="relative"><MessageCircle className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} /><input type="tel" required placeholder="WhatsApp" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-3xl py-4 pl-12 pr-6 outline-none font-bold" /></div>
                <div className="relative"><Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} /><input type="email" required placeholder="E-mail" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-3xl py-4 pl-12 pr-6 outline-none font-bold" /></div>
                <button type="submit" disabled={!isFormValid || isSubmitting} className="w-full py-5 rounded-3xl font-black text-white bg-[#FE2C55] shadow-xl flex items-center justify-center gap-3">
                  {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : 'IR PARA PAGAMENTO SEGURO'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <footer className="py-24 px-6 border-t border-gray-100 text-center bg-white opacity-40">
        <div className="text-[#FE2C55] font-black text-2xl tracking-tighter mb-4">d4k maternidade.</div>
        <p className="text-[10px] font-bold uppercase tracking-widest">CNPJ: 54.706.912/0001-02</p>
      </footer>
    </div>
  );
};

export default SalesPage;
