import { http, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { walletConnect, injected, metaMask, coinbaseWallet } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error('A variável de ambiente NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID não está definida.');
}

const metadata = {
  name: 'SpyAgents',
  description: 'Marketplace de APIs com Pagamentos On-Chain',
  url: 'https://seusite.com', // Substitua pela URL do seu site
  icons: ['https://seusite.com/icon.png'], // Substitua pelo ícone do seu site
};

export const config = createConfig({
  chains: [polygonMumbai],
  connectors: [
    metaMask(),
    coinbaseWallet({ appName: metadata.name }),
    walletConnect({ projectId, metadata, showQrModal: true }),
    // injected(), // Mantém o 'injected' como um fallback para outras carteiras de navegador
  ],
  transports: {
    [polygonMumbai.id]: http('https://rpc-mumbai.maticvigil.com/'),
  },
  ssr: true, // Adicionado para melhor suporte a Server-Side Rendering com Next.js
});