import { ethers } from 'ethers';
import MarketplaceAbi from './abis/Marketplace.json';

export const getMarketplaceContract = (providerOrSigner: ethers.Provider | ethers.Signer) => {
  const address = process.env.NFT_MARKETPLACE_ADDRESS;

  if (!address || !ethers.isAddress(address)) {
    console.error('MARKETPLACE_ADDRESS inválido ou não definido:', address);
    throw new Error('MARKETPLACE_ADDRESS inválido ou não definido.');
  }

  const contract = new ethers.Contract(address, MarketplaceAbi, providerOrSigner);
  console.log(' Contrato marketplace instanciado:', contract.target); // ethers v6 usa `.target`

  return contract;
};
