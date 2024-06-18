import { Header } from './components/Header';

const HeaderLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export { HeaderLayout };
