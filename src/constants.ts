import { Question, Profile } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Você sabe exatamente quanto gasta por mês com cada categoria (como mercado, lazer, transporte etc)?",
    options: [
      { id: 'a', text: "Não tenho a menor ideia de para onde vai meu dinheiro.", points: 1 },
      { id: 'b', text: "Tenho uma noção por cima, mas nada registrado.", points: 2 },
      { id: 'c', text: "Anoto algumas coisas, mas perco o controle no meio do mês.", points: 3 },
      { id: 'd', text: "Tenho tudo separado por categorias e acompanho de perto.", points: 4 },
    ]
  },
  {
    id: 2,
    text: "Quando você recebe seu salário ou pagamento, o que acontece com o dinheiro?",
    options: [
      { id: 'a', text: "Ele some em poucos dias sem eu perceber.", points: 1 },
      { id: 'b', text: "Pago as contas e o que sobra eu gasto sem plano.", points: 2 },
      { id: 'c', text: "Guardo um pouco, mas não tenho uma meta clara.", points: 3 },
      { id: 'd', text: "Já sei exatamente quanto vai para cada conta e investimento.", points: 4 },
    ]
  },
  {
    id: 3,
    text: "Como você faz hoje para anotar suas entradas e saídas financeiras?",
    options: [
      { id: 'a', text: "Não anoto absolutamente nada.", points: 1 },
      { id: 'b', text: "Uso caderninho ou planilhas que raramente atualizo.", points: 2 },
      { id: 'c', text: "Uso algum app, mas acho complicado e acabo desistindo.", points: 3 },
      { id: 'd', text: "Uso um método simples, prático e automatizado.", points: 4 },
    ]
  },
  {
    id: 4,
    text: "Você sabe quanto tem disponível hoje em cada uma das suas contas ou bancos?",
    options: [
      { id: 'a', text: "Não sei nem o total da minha dívida, quanto mais o saldo.", points: 1 },
      { id: 'b', text: "Só vejo o saldo quando o cartão é recusado ou preciso pagar algo.", points: 2 },
      { id: 'c', text: "Tenho uma visão geral, mas sem detalhes dos centavos.", points: 3 },
      { id: 'd', text: "Sei exatamente o saldo e o que está comprometido.", points: 4 },
    ]
  },
  {
    id: 5,
    text: "Você acompanha seus investimentos e metas financeiras de forma organizada?",
    options: [
      { id: 'a', text: "Nem comecei a investir e nem tenho metas.", points: 1 },
      { id: 'b', text: "Até queria investir, mas é tudo bagunçado e sobra pouco.", points: 2 },
      { id: 'c', text: "Invisto esporadicamente quando sobra algo no fim do mês.", points: 3 },
      { id: 'd', text: "Tenho tudo registrado, acompanho rendimentos e metas.", points: 4 },
    ]
  }
];

export const PROFILES: Profile[] = [
  {
    id: 1,
    name: "Desorganizado Financeiro",
    minPoints: 5,
    maxPoints: 8,
    diagnosis: "Sua vida financeira está em um estado crítico de descontrole. O dinheiro entra e sai sem que você tenha qualquer comando sobre ele, o que gera estresse e insegurança constante.",
    alert: "⚠️ ALERTA DE RISCO: Você está no vermelho ou muito próximo de um colapso financeiro. A falta de registro é sua maior inimiga agora.",
    recommendation: "O Habitus foi criado exatamente para pessoas que precisam de um 'choque de ordem'. Com ele, você vai ver para onde cada centavo está indo e retomar o fôlego."
  },
  {
    id: 2,
    name: "Sobrevivente Financeiro",
    minPoints: 9,
    maxPoints: 12,
    diagnosis: "Você vive no limite. Consegue pagar as contas, mas não sobra nada para o futuro. Qualquer imprevisto pode desestabilizar completamente sua estrutura.",
    alert: "⚠️ ALERTA DE RISCO: Seu salário está totalmente comprometido. Você está trabalhando para pagar boletos, sem construir patrimônio.",
    recommendation: "O Habitus vai te ajudar a identificar gastos invisíveis que estão drenando seu salário. É hora de sair do modo sobrevivência e começar a planejar."
  },
  {
    id: 3,
    name: "Organizado em Evolução",
    minPoints: 13,
    maxPoints: 16,
    diagnosis: "Você já tem consciência e tenta se organizar, mas ainda falta consistência e ferramentas melhores. Você tem potencial, mas gasta muita energia em métodos manuais ou complexos.",
    recommendation: "Você já deu os primeiros passos. O Habitus vai automatizar sua organização, dando a clareza que falta para você começar a investir com estratégia e segurança."
  },
  {
    id: 4,
    name: "Controlador Estratégico",
    minPoints: 17,
    maxPoints: 20,
    diagnosis: "Parabéns! Você tem um excelente domínio sobre suas finanças. Você não apenas controla gastos, mas enxerga o dinheiro como uma ferramenta de crescimento.",
    recommendation: "Para quem já é organizado, o Habitus é o próximo nível. Ele oferece os relatórios e a praticidade que você precisa para otimizar ainda mais seus investimentos e metas."
  }
];
