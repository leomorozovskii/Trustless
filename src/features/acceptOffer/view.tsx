import { Skeleton } from '@radix-ui/themes';
import cn from 'classnames';
import type { FC } from 'react';

import { useGetOfferDetails } from '@berezka-dao/shared/retrieve-data/useGetOfferDetails';
import { isEmptyAddress } from '@berezka-dao/shared/utils/isEmptyAddress';

import { ReceiverContainer } from './components/ReceiverContainer';
import { TokensContainer } from './components/TokensContainer';
import { TokenWarning } from './components/TokenWarning';
import { useOfferAcceptContext } from './store';
import s from './view.module.scss';

const AcceptOffer: FC = () => {
  const { acceptId } = useOfferAcceptContext();
  const { isTokenFromCustom, tokenFrom, isLoading, optionalTaker } = useGetOfferDetails({ id: acceptId });

  return (
    <Skeleton loading={isLoading}>
      <div className={cn(s.container, { [s.paddingLg]: isTokenFromCustom })}>
        <TokensContainer />
        {!isEmptyAddress(optionalTaker) && <ReceiverContainer receiver={optionalTaker} />}
        {isTokenFromCustom && <TokenWarning address={tokenFrom?.address} name={tokenFrom?.symbol} />}
      </div>
    </Skeleton>
  );
};

export { AcceptOffer };
