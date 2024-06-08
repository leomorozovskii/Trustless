import React from 'react';

interface IOfferCancelValues {
  cancelId: string | null;
  setCancelId: React.Dispatch<React.SetStateAction<string | null>>;
}

export type { IOfferCancelValues };
