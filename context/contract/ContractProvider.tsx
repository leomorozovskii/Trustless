import { createContext, useContext, PropsWithChildren } from 'react';
// import { useWriteContract } from 'wagmi';
import { useAccount } from 'wagmi';

interface ContractContextProps {}

const ContractContext = createContext<ContractContextProps | null>(null);

export const ContractProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const account = useAccount();
  // const { data: hash, writeContract } = useWriteContract();
  return (
    <ContractContext.Provider value={{}}>{children}</ContractContext.Provider>
  );
};

export const useContractContext = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};
