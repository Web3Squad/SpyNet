import { ethers } from 'ethers';
import * as NetSaleCCIPSenderAbi from './abis/NetSaleCCIPSender.json';

const CCIP_SENDER_ADDRESS = '0xf9Dd3088537A01949E3cDa09CEFc6c4E79dC1a90';

export const getNetSaleCCIPSenderContract = (providerOrSigner: ethers.Provider | ethers.Signer) => {
  return new ethers.Contract(CCIP_SENDER_ADDRESS, NetSaleCCIPSenderAbi, providerOrSigner);
};
