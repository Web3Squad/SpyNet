import { ethers } from 'ethers';
import * as NetAbi from './abis/Net.json';

const NET_TOKEN_ADDRESS = '0x36F027F6A4B392fC261320d03103F1f12dF83E61';

export const getNetTokenContract = (providerOrSigner: ethers.Provider | ethers.Signer) => {
  return new ethers.Contract(NET_TOKEN_ADDRESS, NetAbi, providerOrSigner);
};
