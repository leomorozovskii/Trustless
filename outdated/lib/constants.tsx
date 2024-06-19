import { environment } from '@lib/environment';

import { TOKEN_MAP_SEPOLIA } from './tokens/tokensSepolia';
import { TOKEN_MAP_MAINNET } from './tokens/tokensMainnet';
import { TokenMap } from './types';
import { TOKEN_MAP_ARBITRUM } from './tokens/tokensArbitrum';

const getTokenMap = (): TokenMap => {
  switch (environment.network) {
    case 'mainnet':
      return TOKEN_MAP_MAINNET;
    case 'arbitrum':
      return TOKEN_MAP_ARBITRUM;
    case 'sepolia':
      return TOKEN_MAP_SEPOLIA;
    default: {
      const exhCheck: never = environment.network;
      return exhCheck;
    }
  }
};

export const TOKEN_MAP: TokenMap = getTokenMap();

type Links = {
  etherscan: string;
};

const getLinks = (): Links => {
  switch (environment.network) {
    case 'mainnet':
      return { etherscan: 'https://etherscan.io' };
    case 'arbitrum':
      return { etherscan: 'https://arbiscan.io' };
    case 'sepolia':
      return { etherscan: 'https://sepolia.etherscan.io' };
    default: {
      const exhCheck: never = environment.network;
      return exhCheck;
    }
  }
};

export const links: Links = getLinks();

export enum OfferProgress {
  None = 'none',
  Filled = 'filled',
  Approved = 'approved',
  Created = 'created',
}

export const dayUnix = 24 * 60 * 60;
