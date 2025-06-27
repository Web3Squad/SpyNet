import { upsertUserByWallet, createApi, findAllApis } from '../repositories/apiReposity';

export const registerApiService = async (
  name: string,
  description: string,
  endpoint: string,
  pricePerCall: number,
  creatorWalletAddress: string
) => {
  const creator = await upsertUserByWallet(creatorWalletAddress);
  return createApi(name, description, endpoint, pricePerCall, Number(creator.id));
};

export const getAllApisService = async () => {
  return findAllApis();
};