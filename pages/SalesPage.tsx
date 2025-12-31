
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Home, 
  CheckCircle2, 
  ShieldCheck, 
  Heart, 
  Clock, 
  ArrowRight,
  Sparkles,
  Lock,
  Smartphone,
  Sun,
  Moon,
  Check,
  Package,
  FileText,
  X,
  User,
  Mail,
  MessageCircle,
  Loader2
} from 'lucide-react';
import { FAQItem } from '../types';

/**
 * 📸 ASSETS OFICIAIS
 */
const ASSETS = {
  ALINE_FOTO: "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/2e88443c33f9150b3ac0649a37043d6ff25a5844/Expert%20aline.png",
  PRODUTO_MOCKUP: "https://raw.githubusercontent.com/kayosilvavinicius-prog/FILHOS-COM-ROTINA/2e88443c33f9150b3ac0649a37043d6ff25a5844/filhos%20com%20rotina%20material.png"
};

// --- CONFIGURAÇÃO DE INTEGRAÇÃO ---
const CHECKOUT_URL = "https://pay.cakto.com.br/8orm8zt_705304";
// COLE SUA URL DO MAKE.COM / ZAPIER ABAIXO:
const WEBHOOK_URL = "SUA_URL_DO_WEBHOOK_AQUI"; 

const SalesPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estados para Captura de Lead
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });

  // Validação simples para habilitar o botão
  const isFormValid = formData.name.trim().length >= 2 && 
                      formData.email.includes('@') && 
                      formData.whatsapp.replace(/\D/g, '').length >= 10;

  useEffect(() => {
    // Rastreamento: Evento de visualização da página (Métrica de Funil)
    console.log("Analytics: Sales Page Viewed");
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // 1. Envio dos dados para o seu Webhook (Registro de Lead)
      if (WEBHOOK_URL && WEBHOOK_URL !== "SUA_URL_DO_WEBHOOK_AQUI") {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors', // Útil para evitar erros de CORS em alguns webhooks
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            origem: 'funnel_maternidade_d4k',
            data_cadastro: new Date().toLocaleString('pt-BR'),
            etapa: 'checkout_click'
          })
        });
      }
      
      // 2. Rastreamento Local / Pixel
      console.log("Analytics: Lead Recorded", formData.email);

      // 3. Redirecionamento Final para o Checkout
      window.location.href = CHECKOUT_URL;
    } catch (error) {
      console.error("Erro na integração:", error);
      // Fallback: Redireciona mesmo se o webhook falhar para garantir a venda
      window.location.href = CHECKOUT_URL;
    } finally {
      setIsSubmitting(false);
    }
  };

  const screenTimeGuidelines = [
    { age: "0 - 2 anos", limit: "Nenhum contato com telas ou videogames", color: "bg-green-50 text-green-700 border-green-200" },
    { age: "2 - 5 anos", limit: "Até uma hora por dia", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { age: "5 - 10 anos", limit: "Entre uma e duas horas por dia", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    { age: "11 - 18 anos", limit: "Entre duas e três horas por dia", color: "bg-orange-50 text-orange-700 border-orange-200" }
  ];

  const faqs: FAQItem[] = [
    { 
      question: "O material é enviado pelos correios?", 
      answer: "Não, o material é 100% digital. Você recebe o acesso imediatamente após o pagamento para baixar e imprimir." 
    },
    { 
      question: "Para qual idade é recomendado?", 
      answer: "É ideal para crianças entre 2 e 10 anos, fase fundamental para a criação de hábitos e autonomia." 
    },
    {
      question: "Como funciona a garantia?",
      answer: "Você tem 7 dias para testar. Se não sentir melhora na rotina da sua casa, devolvemos 100% do seu dinheiro."
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-gray-900 min-h-screen font-sans pb-32 overflow-x-hidden selection:bg-[#FE2C55]/20">
      
      {/* HEADER ESCASSEZ */}
      <div className="bg-[#FE2C55] text-white text-[10px] sm:text-xs font-black py-2.5 text-center uppercase tracking-[0.2em] sticky top-0 z-[100] shadow-md px-4">
        Oferta Limitada: Acesso Imediato por apenas R$ 19,90
      </div>

      {/* NAV */}
      <div className="max-w-[1200px] mx-auto px-6 pt-6 flex justify-between items-center">
        <div className="text-[#FE2C55] font-black text-xl tracking-tighter">d4k maternidade.</div>
        <button 
          onClick={() => navigate('/')}
          className="bg-white px-4 py-2 rounded-full border border-gray-200 text-gray-500 font-bold flex items-center gap-2 active:scale-95 transition-all text-xs shadow-sm"
        >
          <Home size={14} />
          <span>PAINEL</span>
        </button>
      </div>

      {/* SEÇÃO 1: HERO */}
      <section className="px-6 pt-16 pb-12 max-w-[1000px] mx-auto text-center animate-fade-in">
        <h1 className="text-4xl sm:text-7xl font-black leading-[1.05] mb-8 tracking-tight text-[#0F172A]">
          Pare de gritar. Comece a <span className="text-[#FE2C55]">guiar</span>.
        </h1>
        <p className="text-gray-500 mb-10 text-lg sm:text-xl leading-relaxed max-w-[750px] mx-auto">
          O <strong>Filhos com Rotina</strong> é a ferramenta visual que transforma o caos diário em momentos de cooperação e paz na sua casa.
        </p>
        
        <div className="flex flex-col items-center gap-4 mb-16">
          <button 
            onClick={() => setShowLeadForm(true)}
            className="w-full max-w-[500px] bg-[#FE2C55] text-white font-black py-6 rounded-[2.5rem] text-xl shadow-[0_25px_60px_rgba(254,44,85,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            QUERO A PAZ DE VOLTA
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            <Lock size={12} /> Pagamento Único • R$ 19,90
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] to-transparent z-10 h-32 bottom-0"></div>
          <div className="relative group perspective">
            <div className="absolute -inset-4 bg-[#FE2C55]/5 rounded-[3rem] blur-2xl group-hover:bg-[#FE2C55]/10 transition-colors"></div>
            <img 
              src={ASSETS.PRODUTO_MOCKUP} 
              alt="Material Filhos com Rotina" 
              className="relative z-20 w-full max-w-[850px] drop-shadow-[0_50px_100px_rgba(0,0,0,0.12)] transform group-hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: OFERTA FINAL */}
      <section className="py-24 px-6 bg-[#0F172A] text-white">
        <div className="max-w-[650px] mx-auto text-center">
          <h2 className="text-4xl font-black mb-16 tracking-tight leading-tight">Escolha a paz na sua casa hoje.</h2>
          
          <div className="bg-white rounded-[3.5rem] p-10 sm:p-14 mb-12 shadow-2xl text-gray-900">
            <div className="space-y-4 mb-12 text-left">
              {[
                { label: "PDF Filhos com Rotina", icon: <FileText size={18}/> },
                { label: "Guia de Implementação", icon: <CheckCircle2 size={18}/> },
                { label: "BÔNUS: Rotina Cristã", icon: <Sparkles size={18} className="text-[#FE2C55]"/> },
                { label: "Acesso Vitalício", icon: <ShieldCheck size={18}/> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-gray-50 p-5 rounded-[1.5rem] border border-gray-100">
                  <div className="text-[#FE2C55]">{item.icon}</div>
                  <span className="font-bold text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mb-12">
              <span className="text-gray-300 line-through text-lg font-bold">R$ 97,00</span>
              <div className="text-7xl font-black text-[#0F172A] mt-2">R$ 19,90</div>
              <p className="text-[#FE2C55] font-black text-[10px] uppercase tracking-[0.4em] mt-6">Pagamento Único</p>
            </div>

            <button 
              onClick={() => setShowLeadForm(true)}
              className="w-full bg-[#FE2C55] text-white font-black py-7 rounded-3xl text-xl shadow-[0_20px_50px_rgba(254,44,85,0.4)] active:scale-95 transition-all mb-8 flex items-center justify-center gap-3"
            >
              QUERO MEU ACESSO AGORA
              <ArrowRight />
            </button>
            
            {/* GARANTIA */}
            <div className="mt-12 p-8 bg-white rounded-[2.5rem] border-2 border-[#FE2C55]/10 flex flex-col items-center text-center shadow-lg animate-fade-in">
               <div className="bg-[#FE2C55] text-white p-3 rounded-full mb-4 shadow-lg">
                  <ShieldCheck size={32} />
               </div>
               <h4 className="font-black text-xl mb-2 text-gray-900">Garantia Incondicional de 7 dias</h4>
               <p className="text-gray-600 text-sm leading-relaxed max-w-[400px]">
                  Se o <strong>Filhos com Rotina</strong> não devolver a paz para sua casa, devolvemos 100% do seu dinheiro. Sem perguntas. Você não corre risco nenhum.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-6 border-t border-gray-100 text-center bg-white">
        <div className="text-[#FE2C55] font-black text-3xl tracking-tighter mb-6">d4k maternidade.</div>
        <p className="text-gray-900 text-[11px] font-black uppercase tracking-[0.1em] mb-2 leading-tight">
          D N F SANTOS MARKETING DIGITAL - ME (DIGITAL KINGDOM)
        </p>
        <p className="text-gray-400 text-[10px] font-bold max-w-[500px] mx-auto leading-relaxed uppercase tracking-[0.2em] mb-10">
          CNPJ: 54.706.912/0001-02 • Todos os direitos reservados.
        </p>
      </footer>

      {/* CTA FLUTUANTE MOBILE */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 z-[200] transition-all duration-700 transform ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="max-w-[480px] mx-auto">
          <button 
            onClick={() => setShowLeadForm(true)}
            className="w-full bg-[#FE2C55] text-white font-black py-5 rounded-[2rem] shadow-[0_15px_45px_rgba(254,44,85,0.6)] flex items-center justify-center gap-3 active:scale-95 border-2 border-white/20"
          >
            <span className="text-base uppercase tracking-tight">Garantir Promoção • R$ 19,90</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* MODAL DE CAPTURA DE LEAD */}
      {showLeadForm && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl relative overflow-hidden animate-fade-in">
            <button 
              onClick={() => setShowLeadForm(false)}
              className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <div className="inline-flex p-3 bg-[#FE2C55]/10 rounded-2xl text-[#FE2C55] mb-4">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-[#0F172A] mb-2">Quase lá!</h3>
                <p className="text-gray-500 text-sm">Preencha seus dados para receber o acesso exclusivo e prosseguir com sua compra.</p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Primeiro Nome</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Maria"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-3xl py-4 pl-12 pr-6 text-gray-900 focus:ring-2 focus:ring-[#FE2C55]/20 focus:border-[#FE2C55] outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">WhatsApp</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="tel" 
                      required
                      placeholder="(00) 00000-0000"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-3xl py-4 pl-12 pr-6 text-gray-900 focus:ring-2 focus:ring-[#FE2C55]/20 focus:border-[#FE2C55] outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="email" 
                      required
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-3xl py-4 pl-12 pr-6 text-gray-900 focus:ring-2 focus:ring-[#FE2C55]/20 focus:border-[#FE2C55] outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-5 rounded-3xl font-black text-white shadow-xl transition-all flex items-center justify-center gap-3 ${
                    isFormValid && !isSubmitting
                    ? 'bg-[#FE2C55] shadow-[#FE2C55]/30 active:scale-95' 
                    : 'bg-gray-200 cursor-not-allowed text-gray-400'
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>
                      ENVIAR INFORMAÇÕES
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SalesPage;
