import { http, createConfig } from 'wagmi';
import { avalancheFuji } from 'wagmi/chains'; 
import { walletConnect, injected, metaMask, coinbaseWallet } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error('A variável de ambiente NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID não está definida.');
}


const fujiRpcUrl = process.env.NEXT_PUBLIC_FUJI_RPC_URL;
if (!fujiRpcUrl) {
    throw new Error('A variável de ambiente NEXT_PUBLIC_FUJI_RPC_URL não está definida.');
}

const metadata = {
  name: 'SpyAgents',
  description: 'Marketplace de APIs com Pagamentos On-Chain',
  url: 'https://seusite.com', 
  icons: ['https://seusite.com/icon.png'],
};

export const config = createConfig({
  
  chains: [avalancheFuji], 
  connectors: [
    metaMask(),
    coinbaseWallet({ appName: metadata.name }),
    walletConnect({ projectId, metadata, showQrModal: true }),
  ],
  transports: {
    
    [avalancheFuji.id]: http(fujiRpcUrl),
  },
  ssr: true,
});