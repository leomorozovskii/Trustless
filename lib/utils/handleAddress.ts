// TODO add ethers address hooks check
export const isValidCryptoAddress = (address: string): boolean => {
  if (!address || address?.length < 10) return false;

  return true;
};
