// src/lib/wagmi.ts
import { http, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';

export const config = createConfig({
  chains: [polygonMumbai],
  transports: {
    [polygonMumbai.id]: http('https://rpc-mumbai.maticvigil.com/'),
  },
});