// src/lib/mockAgentData.ts

export const mockAgents = [
  { 
    slug: 'digital-legal-agent',
    name: 'Digital Legal Agent', 
    description: 'Check contracts in seconds with guaranteed legal security.',
    imageUrl: "/img/agents/image.png",
    overview: [
      { label: "CREATOR", value: "NW Associated Lawyers" },
      { label: "SPECIALTY", value: "Contract Law, Clause Analysis" },
      { label: "DESCRIPTION", value: "This agent uses advanced NLP to analyze legal documents and identify risks." },
      { label: "PRICE", value: "$0.02 per analysis." }
    ],
    useCases: [
      { title: "CASE 1", description: "Lease Contract Analysis." },
      { title: "CASE 2", description: "Terms of Service (ToS) Verification." },
      { title: "CASE 3", description: "Non-Disclosure Agreement (NDA) Validation." }
    ],
    performance: [
      { label: "SCORE", value: "4.9 / 5.0" },
      { label: "DETAILS", value: "Average response time of 0.8s." },
      { label: "REVIEW", value: "'An indispensable tool.' - CEO of Inova." }
    ]
  },
  { 
    slug: 'scrum-master-ai',
    name: 'Scrum Master AI', 
    description: 'Your digital facilitator for agile and productive processes.',
    imageUrl: "/img/agents/image.png",
    overview: [
      { label: "CREATOR", value: "Agile Solutions" },
      { label: "SPECIALTY", value: "Agile Management, Scrum, Kanban" },
      { label: "DESCRIPTION", value: "Automate daily meetings, retrospectives, and sprint tracking." },
      { label: "PRICE", value: "$0.01 per sprint." }
    ],
    useCases: [
      { title: "CASE 1", description: "Facilitation of daily meetings." },
      { title: "CASE 2", description: "Automatic sprint report generation." }
    ],
    performance: [
      { label: "SCORE", value: "4.7 / 5.0" },
      { label: "DETAILS", value: "30% reduction in meeting time." },
      { label: "REVIEW", value: "'Transformed our agile team.' - CTO of TechX." }
    ],
  },
  { 
    slug: 'virtual-financial-analyst',
    name: 'Virtual Financial Analyst', 
    description: 'Automated financial analysis for fast and secure decisions.',
    imageUrl: "/img/agents/image.png",
    overview: [
      { label: "CREATOR", value: "FinTech Labs" },
      { label: "SPECIALTY", value: "Risk Analysis, Financial Reports" },
      { label: "DESCRIPTION", value: "Generate financial reports and assess credit risks in seconds." },
      { label: "PRICE", value: "$0.03 per report." }
    ],
    useCases: [
      { title: "CASE 1", description: "Credit evaluation for clients." },
      { title: "CASE 2", description: "Generation of income statement and balance sheet." }
    ],
    performance: [
      { label: "SCORE", value: "4.8 / 5.0" },
      { label: "DETAILS", value: "98% accuracy in analyses." },
      { label: "REVIEW", value: "'Essential for our financial sector.' - CFO of MegaCorp." }
    ],
  },
  { 
    slug: 'marketing-assistant-ai',
    name: 'Marketing Assistant AI', 
    description: 'Create campaigns and analyze metrics with artificial intelligence.',
    imageUrl: "/img/agents/image.png",
    overview: [
      { label: "CREATOR", value: "MarketGenius" },
      { label: "SPECIALTY", value: "Digital Campaigns, Metrics Analysis" },
      { label: "DESCRIPTION", value: "Campaign suggestions, ROI analysis, and ad optimization." },
      { label: "PRICE", value: "$0.015 per campaign." }
    ],
    useCases: [
      { title: "CASE 1", description: "Creation of social media campaigns." },
      { title: "CASE 2", description: "Ad performance analysis." }
    ],
    performance: [
      { label: "SCORE", value: "4.6 / 5.0" },
      { label: "DETAILS", value: "Average 25% increase in engagement." },
      { label: "REVIEW", value: "'Our marketing has never been so efficient.' - Marketing Manager at StartUpX." }
    ],
  },
  { 
    slug: 'data-engineer-ai',
    name: 'Data Engineer AI', 
    description: 'Automate ETL and data analysis with precision.',
    imageUrl: "/img/agents/image.png",
    overview: [
      { label: "CREATOR", value: "DataFlow Inc." },
      { label: "SPECIALTY", value: "ETL, Big Data, DataOps" },
      { label: "DESCRIPTION", value: "Automated data pipeline, cleaning, and integration from diverse sources." },
      { label: "PRICE", value: "$0.05 per pipeline." }
    ],
    useCases: [
      { title: "CASE 1", description: "Integration of data from multiple sources." },
      { title: "CASE 2", description: "Data cleaning and preparation for BI." }
    ],
    performance: [
      { label: "SCORE", value: "4.85 / 5.0" },
      { label: "DETAILS", value: "40% reduction in data preparation time." },
      { label: "REVIEW", value: "'Made our BI process easier.' - Data Analyst at DataCorp." }
    ],
  },
];