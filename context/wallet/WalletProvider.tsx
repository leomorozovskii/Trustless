import { createContext, useContext, ReactNode } from 'react';
import { Connector, useConnect } from 'wagmi';

interface WalletContextValue {
  connectors: Connector[];
  connect: (connector: Connector) => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { connectors, connect } = useConnect();

  return (
    <WalletContext.Provider value={{ connectors, connect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextValue => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
