import { http, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
// ATUALIZADO: Importar conectores específicos
import { walletConnect, injected, metaMask, coinbaseWallet } from 'wagmi/connectors'; 

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;
if (!projectId) {
  throw new Error('WalletConnect projectId is not defined. Please check your .env.local file.');
}

const metadata = {
  name: 'SpyAgents',
  description: 'Marketplace de APIs com Pagamentos On-Chain',
  url: 'https://seusite.com', 
  icons: ['https://seusite.com/icon.png'], 
};

export const config = createConfig({
  chains: [polygonMumbai],
  
  // ATUALIZADO: Adicionados conectores específicos na lista
  connectors: [
    metaMask(),
    coinbaseWallet({ appName: metadata.name }),
    walletConnect({ projectId, metadata, showQrModal: true }),
    injected(), // Mantenha o injected como um fallback
  ],
  transports: {
    [polygonMumbai.id]: http('https://rpc-mumbai.maticvigil.com/'),
  },
});