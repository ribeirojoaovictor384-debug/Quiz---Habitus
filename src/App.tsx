import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Wallet, 
  Rocket, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { QUESTIONS, PROFILES } from './constants';
import { Profile } from './types';

export default function App() {
  const [step, setStep] = useState<'start' | 'quiz' | 'calculating' | 'result'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const totalScore = useMemo(() => answers.reduce((acc, curr) => acc + curr, 0), [answers]);
  
  const profile = useMemo(() => {
    return PROFILES.find(p => totalScore >= p.minPoints && totalScore <= p.maxPoints) || PROFILES[0];
  }, [totalScore]);

  const handleStart = () => setStep('quiz');

  const handleOptionSelect = (optionId: string, points: number) => {
    setSelectedOption(optionId);
    
    // Small delay for visual feedback
    setTimeout(() => {
      const newAnswers = [...answers, points];
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setStep('calculating');
        setTimeout(() => setStep('result'), 2000);
      }
    }, 400);
  };

  const progress = ((currentQuestionIndex) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#1E69FF] flex flex-col items-center justify-center p-4 font-sans text-slate-900">
      {/* Logo Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="bg-white p-2 rounded-xl shadow-lg">
          <Wallet className="w-8 h-8 text-[#1E69FF]" />
        </div>
        <div className="text-white">
          <h1 className="text-2xl font-bold leading-none">Habitus</h1>
          <p className="text-xs opacity-80 uppercase tracking-widest font-semibold">Finança de Bolso</p>
        </div>
      </div>

      <main className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {step === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Como está sua saúde financeira <span className="text-[#1E69FF]">(de verdade)?</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
                Responda 5 perguntas rápidas e descubra se você está sem controle do seu dinheiro ou perdendo oportunidades de crescimento.
              </p>
              <div className="bg-blue-50 rounded-2xl p-4 mb-8 text-blue-700 text-sm font-medium">
                No final, você receberá um <span className="underline">plano personalizado</span> para organizar suas finanças com ajuda de uma ferramenta prática e inteligente.
              </div>
              <button
                onClick={handleStart}
                className="w-full md:w-auto px-8 py-4 bg-[#10B981] hover:bg-[#059669] text-white rounded-2xl font-bold text-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 group"
              >
                <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Iniciar Quiz Gratuito
              </button>
              <p className="mt-6 text-slate-400 text-sm flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" /> Leva apenas 2 minutos para completar
              </p>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                  Pergunta {currentQuestionIndex + 1} de {QUESTIONS.length}
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                  {Math.round(progress)}%
                </span>
              </div>
              
              <div className="w-full bg-slate-100 h-2 rounded-full mb-10 overflow-hidden">
                <motion.div 
                  className="h-full bg-[#1E69FF]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
                {QUESTIONS[currentQuestionIndex].text}
              </h3>

              <div className="space-y-4">
                {QUESTIONS[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id, option.points)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group ${
                      selectedOption === option.id 
                        ? 'border-[#1E69FF] bg-blue-50' 
                        : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold uppercase transition-colors ${
                      selectedOption === option.id 
                        ? 'bg-[#1E69FF] text-white' 
                        : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                    }`}>
                      {option.id}
                    </div>
                    <span className="text-lg font-medium text-slate-700">{option.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'calculating' && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-12 shadow-2xl text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                <motion.div 
                  className="absolute inset-0 border-4 border-blue-100 rounded-full"
                />
                <motion.div 
                  className="absolute inset-0 border-4 border-[#1E69FF] rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-[#1E69FF]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Analisando seu perfil...</h2>
              <p className="text-slate-500">Cruzando dados para gerar seu diagnóstico personalizado.</p>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pb-12"
            >
              {/* Diagnosis Card */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <ShieldCheck className="w-32 h-32" />
                </div>
                
                <h4 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">Resultado do Diagnóstico</h4>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Sua saúde financeira hoje está em nível: <br/>
                  <span className="text-[#1E69FF]">{profile.name}</span>
                </h2>

                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-[#1E69FF]">
                    <p className="text-slate-700 text-lg leading-relaxed italic">
                      "{profile.diagnosis}"
                    </p>
                  </div>

                  {profile.alert && (
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex gap-4">
                      <AlertTriangle className="w-8 h-8 text-red-500 shrink-0" />
                      <p className="text-red-700 font-semibold leading-snug">
                        {profile.alert}
                      </p>
                    </div>
                  )}

                  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex gap-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
                    <div>
                      <h5 className="font-bold text-emerald-900 mb-1">Recomendação Estratégica</h5>
                      <p className="text-emerald-800 leading-relaxed">
                        {profile.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Plans */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Plan */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col"
                >
                  <div className="mb-6">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Plano Individual</span>
                    <h3 className="text-2xl font-bold mt-2">Habitus Básico</h3>
                  </div>
                  <div className="mb-8">
                    <span className="text-4xl font-black">R$ 47,90</span>
                    <span className="text-slate-400">/mês</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-slate-600 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Controle de gastos ilimitado
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Relatórios de categorias
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Metas de economia
                    </li>
                  </ul>
                  <a 
                    href="https://pay.kiwify.com.br/d5Rfbji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-bold transition-colors text-center block"
                  >
                    Escolher Básico
                  </a>
                </motion.div>

                {/* Business Plan */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-[#1E69FF] rounded-3xl p-8 shadow-xl shadow-blue-200 flex flex-col text-white relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-1 font-bold text-xs uppercase tracking-tighter transform rotate-45 translate-x-8 translate-y-4">
                    Popular
                  </div>
                  <div className="mb-6">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Plano Empresarial</span>
                    <h3 className="text-2xl font-bold mt-2">Habitus Business</h3>
                  </div>
                  <div className="mb-8">
                    <span className="text-4xl font-black">R$ 77,90</span>
                    <span className="text-white/60">/mês</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-white/90 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400" /> Tudo do plano Básico
                    </li>
                    <li className="flex items-center gap-2 text-white/90 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400" /> Fluxo de caixa avançado
                    </li>
                    <li className="flex items-center gap-2 text-white/90 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400" /> Gestão de múltiplos usuários
                    </li>
                    <li className="flex items-center gap-2 text-white/90 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400" /> Suporte prioritário 24/7
                    </li>
                  </ul>
                  <a 
                    href="https://pay.kiwify.com.br/G14YCUr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-white text-[#1E69FF] hover:bg-blue-50 rounded-2xl font-bold transition-colors shadow-lg text-center block"
                  >
                    Escolher Business
                  </a>
                </motion.div>
              </div>

              {/* Final CTA */}
              <div className="text-center pt-8">
                <a 
                  href="https://pay.kiwify.com.br/G14YCUr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-[#10B981] hover:bg-[#059669] text-white rounded-2xl font-black text-xl shadow-2xl shadow-emerald-300 transition-all hover:scale-105"
                >
                  Quero organizar minha vida financeira agora
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </a>
                <p className="mt-4 text-white/70 text-sm font-medium">
                  Junte-se a mais de 50.000 pessoas que já usam o Habitus.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-white/40 text-xs font-medium uppercase tracking-[0.2em]">
        &copy; {new Date().getFullYear()} Habitus • Tecnologia para sua Liberdade
      </footer>
    </div>
  );
}
