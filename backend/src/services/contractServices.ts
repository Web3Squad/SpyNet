// src/services/contractService.ts
import { createContract, getUserContracts } from '../repositories/contractRepository';

export const criarContrato = async (
  userId: number,
  agenteId: string,
  callsPurchased: number,
  paymentTxHash: string
) => {
  return createContract(userId, agenteId, callsPurchased, paymentTxHash);
};

export const listarContratosDoUsuario = async (userId: number) => {
  return getUserContracts(userId);
};
