// src/lib/mockAgentData.ts

export const mockAgents = [
  { 
    slug: 'agente-juridico-digital',
    name: 'Agente Jurídico Digital', 
    description: 'Verifique contratos em segundos com segurança jurídica garantida.',
    imageUrl: "/img/agents/image.png",
    overview: [
      { label: "CRIADOR", value: "NW Advogados Associados" },
      { label: "ESPECIALIDADE", value: "Direito Contratual, Análise de Cláusulas" },
      { label: "DESCRIÇÃO", value: "Este agente utiliza NLP avançado para analisar documentos legais e identificar riscos." },
      { label: "PREÇO", value: "$0.02 por análise." }
    ],
    useCases: [
      { title: "CASO 1", description: "Análise de Contratos de Locação." },
      { title: "CASO 2", description: "Verificação de Termos de Serviço (ToS)." },
      { title: "CASO 3", description: "Validação de Acordos de Confidencialidade (NDA)." }
    ],
    performance: [
      { label: "SCORE", value: "4.9 / 5.0" },
      { label: "DETALHES", value: "Tempo médio de resposta de 0.8s." },
      { label: "AVALIAÇÃO", value: "'Uma ferramenta indispensável.' - CEO da Inova." }
    ]
  },
  { 
    slug: 'scrum-master-ia',
    name: 'Scrum Master IA', 
    description: 'Seu facilitador digital de processos ágeis e produtivos.',
    imageUrl: "/img/agents/image.png",
    overview: [
      { label: "CRIADOR", value: "Agile Solutions" },
      { label: "ESPECIALIDADE", value: "Gestão Ágil, Scrum, Kanban" },
      { label: "DESCRIÇÃO", value: "Automatize reuniões diárias, retrospectivas e acompanhamento de sprints." },
      { label: "PREÇO", value: "$0.01 por sprint." }
    ],
    useCases: [
      { title: "CASO 1", description: "Facilitação de reuniões diárias." },
      { title: "CASO 2", description: "Geração automática de relatórios de sprint." }
    ],
    performance: [
      { label: "SCORE", value: "4.7 / 5.0" },
      { label: "DETALHES", value: "Redução de 30% no tempo de reuniões." },
      { label: "AVALIAÇÃO", value: "'Transformou nosso time ágil.' - CTO da TechX." }
    ],
  },
  { 
    slug: 'analista-financeiro-virtual',
    name: 'Analista Financeiro Virtual', 
    description: 'Análise financeira automatizada para decisões rápidas e seguras.',
    imageUrl: "/img/agents/image.png",
    overview: [
      { label: "CRIADOR", value: "FinTech Labs" },
      { label: "ESPECIALIDADE", value: "Análise de Risco, Relatórios Financeiros" },
      { label: "DESCRIÇÃO", value: "Gere relatórios financeiros e avalie riscos de crédito em segundos." },
      { label: "PREÇO", value: "$0.03 por relatório." }
    ],
    useCases: [
      { title: "CASO 1", description: "Avaliação de crédito para clientes." },
      { title: "CASO 2", description: "Geração de DRE e balanço patrimonial." }
    ],
    performance: [
      { label: "SCORE", value: "4.8 / 5.0" },
      { label: "DETALHES", value: "Precisão de 98% nas análises." },
      { label: "AVALIAÇÃO", value: "'Essencial para nosso setor financeiro.' - CFO da MegaCorp." }
    ],
  },
  { 
    slug: 'assistente-de-marketing-ai',
    name: 'Assistente de Marketing AI', 
    description: 'Crie campanhas e analise métricas com inteligência artificial.',
    imageUrl: "/img/agents/image.png",
    overview: [
      { label: "CRIADOR", value: "MarketGenius" },
      { label: "ESPECIALIDADE", value: "Campanhas Digitais, Análise de Métricas" },
      { label: "DESCRIÇÃO", value: "Sugestão de campanhas, análise de ROI e otimização de anúncios." },
      { label: "PREÇO", value: "$0.015 por campanha." }
    ],
    useCases: [
      { title: "CASO 1", description: "Criação de campanhas para redes sociais." },
      { title: "CASO 2", description: "Análise de performance de anúncios." }
    ],
    performance: [
      { label: "SCORE", value: "4.6 / 5.0" },
      { label: "DETALHES", value: "Aumento médio de 25% no engajamento." },
      { label: "AVALIAÇÃO", value: "'Nosso marketing nunca foi tão eficiente.' - Gerente de Marketing da StartUpX." }
    ],
  },
  { 
    slug: 'engenheiro-de-dados-ai',
    name: 'Engenheiro de Dados AI', 
    description: 'Automatize ETL e análise de dados com precisão.',
    imageUrl: "/img/agents/image.png",
    overview: [
      { label: "CRIADOR", value: "DataFlow Inc." },
      { label: "ESPECIALIDADE", value: "ETL, Big Data, DataOps" },
      { label: "DESCRIÇÃO", value: "Pipeline de dados automatizado, limpeza e integração de fontes diversas." },
      { label: "PREÇO", value: "$0.05 por pipeline." }
    ],
    useCases: [
      { title: "CASO 1", description: "Integração de dados de múltiplas fontes." },
      { title: "CASO 2", description: "Limpeza e preparação de dados para BI." }
    ],
    performance: [
      { label: "SCORE", value: "4.85 / 5.0" },
      { label: "DETALHES", value: "Redução de 40% no tempo de preparação de dados." },
      { label: "AVALIAÇÃO", value: "'Facilitou nosso processo de BI.' - Analista de Dados da DataCorp." }
    ],
  },
];