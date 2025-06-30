import { ethers } from 'ethers';
import * as NetSaleAbi from './abis/NetSale.json';

const NET_SALE_ADDRESS = '0xa2961Ca8120F2E46B7a3b740822EEE860bF15753';

export const getNetSaleContract = (providerOrSigner: ethers.Provider | ethers.Signer) => {
  return new ethers.Contract(NET_SALE_ADDRESS, NetSaleAbi, providerOrSigner);
};
