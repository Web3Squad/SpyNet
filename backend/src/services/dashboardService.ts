import prisma from '../config/db';
import { Prisma } from '@prisma/client';

export const getBuyerDashboardDataService = async (userId: number) => {
  // Busca todos os contratos do usuário, incluindo dados do Agente, do Criador e os Logs de Uso.
  const contracts = await prisma.contract.findMany({
    where: { userId },
    include: {
      Agent: {
        include: {
          creator: true, // Inclui o criador do agente
        },
      },
      UsageLogs: true, // Nossas "Provas de Trabalho"
      apiKey: true,
    },
  });

  // Calcula as estatísticas agregadas
  let accumulatedCosts = 0;
  let totalQueries = 0;

  for (const contract of contracts) {
    const callsMade = contract.callsPurchased - contract.callsRemaining;
    // O preço está como string, então convertemos para número
    const price = contract.Agent.pricePerCall.toNumber();
    accumulatedCosts += callsMade * price;
    totalQueries += callsMade;
  }

  // Formata a resposta em um objeto claro e organizado
  return {
    summary: {
      accumulatedCosts: accumulatedCosts.toFixed(2),
      totalQueries,
      // Saldo disponível pode ser complexo; por enquanto, vamos focar no que já temos.
      // Você poderia somar todos os "callsRemaining" se quisesse um total.
      availableBalance: "N/A", 
    },
    hiredAgents: contracts.map(contract => ({
      id: contract.id,
      agentName: contract.Agent.name,
      creatorName: contract.Agent.creator.name,
      cost: ( (contract.callsPurchased - contract.callsRemaining) * contract.Agent.pricePerCall.toNumber() ).toFixed(2),
      queries: contract.callsPurchased - contract.callsRemaining,
      apiKey: contract.apiKey?.key ?? 'Chave não disponível',
      proofOfWork: contract.UsageLogs.map(log => ({ // Formatando as Provas de Trabalho
        id: log.id,
        date: log.timestamp,
        usageHash: log.usageHash,
        // Os campos 'duração', 'custo' e 'resultado' não existem no seu schema atual.
        // Adicionamos como placeholders para o futuro.
        duration: "N/A", 
        cost: contract.Agent.pricePerCall.toNumber().toFixed(4), 
        result: "Sucesso",
      }))
    })),
  };
};


export const getCreatorDashboardDataService = async (creatorId: number) => {
  const agents = await prisma.agent.findMany({
    where: { creatorId },
    include: {
      Contracts: {
        include: {
          UsageLogs: true, // Precisamos dos logs para obter as datas das chamadas
        },
      },
    },
  });

  let accumulatedRevenue = 0;
  let totalQueries = 0;
  
  // Objeto para agrupar os dados por mês (ex: '2025-06')
  const monthlyData: { [key: string]: { revenue: number; queries: number } } = {};

  for (const agent of agents) {
    const price = agent.pricePerCall.toNumber();
    for (const contract of agent.Contracts) {
      // Usamos os logs de uso para obter a data de cada chamada
      for (const log of contract.UsageLogs) {
        totalQueries++;
        accumulatedRevenue += price;

        const monthKey = log.timestamp.toISOString().slice(0, 7); // Formato 'YYYY-MM'
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { revenue: 0, queries: 0 };
        }
        monthlyData[monthKey].revenue += price;
        monthlyData[monthKey].queries++;
      }
    }
  }

  // --- LÓGICA DO GRÁFICO ---
  // Formata os dados mensais para o formato que o gráfico espera
  const getMonthName = (month: string) => new Date(month + '-02').toLocaleString('default', { month: 'short' });
  
  const sortedMonths = Object.keys(monthlyData).sort().reverse().slice(0, 6); // Pega os últimos 6 meses

  const revenueChart = sortedMonths.map(key => ({ month: getMonthName(key), value: monthlyData[key].revenue }));
  const queriesChart = sortedMonths.map(key => ({ month: getMonthName(key), value: monthlyData[key].queries }));
  
  // O score médio por mês precisa de uma tabela de 'reviews' com data. Por enquanto, será mockado.
  const scoreChart = [
      { month: 'Jun', value: 4.8 }, { month: 'May', value: 4.7 }, { month: 'Apr', value: 4.8 },
      { month: 'Mar', value: 4.6 }, { month: 'Feb', value: 4.7 }, { month: 'Jan', value: 4.5 }
  ];


  return {
    summary: {
      accumulatedRevenue: accumulatedRevenue.toFixed(2),
      totalQueries,
      averageScore: 4.8, // Mantemos o score geral mockado
    },
    myAgents: agents.map(agent => ({
      id: agent.id,
      name: agent.name,
      specialty: agent.specialty,
      status: "Active", // Exemplo
      score: 4.8, // Exemplo
    })),
    // Nova propriedade com os dados para os gráficos
    chartData: {
        revenue: revenueChart,
        queries: queriesChart,
        score: scoreChart
    }
  };
};