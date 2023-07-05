import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';

const localChainId = import.meta.env.REACT_APP_CHAIN_ID;
const mode = import.meta.env.REACT_APP_MODE;

export const NETWORKS = {
  11155111: 'Sepolia Testnet',
  80001: 'Polygon TestNet(Mumbai)',
  //
  [localChainId]: 'Ganache',
  //
};

const NETWORK_MAPPING = {
  testnet: {
    11155111: NETWORKS[11155111],
    80001: NETWORKS[80001],
  },
  local: {
    [localChainId]: NETWORKS[localChainId],
  },
};

export const RPC_URLS = {
  11155111: 'https://eth-sepolia.g.alchemy.com/v2/PN7ox_cWivKpFnRnE5YKoJ5Vyp8-Bx5j',
  [localChainId]: import.meta.env.REACT_APP_RPC_SERVER,
};

export const CURRENCY = {
  11155111: 'ETH',
  1337: 'ETH',
};

export const CHAIN = {
  11155111: 'SEPOLIA ETHEREUM',
  1337: 'ETHEREUM',
};

export const CHAIN_IDS = Object.keys(NETWORK_MAPPING?.[mode === 'production' ? 'mainnet' : mode === 'development' ? 'testnet' : 'local'])?.map((chainId) => +chainId);

export const [metamask, metamaskHooks] = initializeConnector((actions) => new MetaMask({ actions }));


export const [network, networkHooks] = initializeConnector((actions) => new Network({ actions, urlMap: RPC_URLS, defaultChainId: CHAIN_IDS[0] }));

export function getConnectorName(connector) {
  if (connector instanceof MetaMask) return 'METAMASK';
  return 'UNKNOWN';
}

// Info
/*
  ChainId for networks:
    Mainnet: 1
    Goerli: 5

  ChainList: https://chainlist.org/

  For our app in production, we will only allow:
    Ethereum Mainnet: 1
    Polygon Mainnet: 137
  
  For development,
  Goerli Testnet(ETH): 5
  Mumbai Testnet(Matic): 80001
*/
