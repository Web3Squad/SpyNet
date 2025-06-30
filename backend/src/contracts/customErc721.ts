import { ethers } from 'ethers';
import CustomERC721Abi from './abis/CustomERC721.json';
import dotenv from 'dotenv';
dotenv.config();


const CUSTOM_ERC721_ADDRESS = process.env.CUSTOM_ERC721_ADDRESS!;

export const getERC721Contract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(CUSTOM_ERC721_ADDRESS, CustomERC721Abi, providerOrSigner);
