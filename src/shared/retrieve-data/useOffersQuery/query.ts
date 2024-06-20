import { gql } from 'graphql-request';

const OFFERS_QUERY = gql`
  query OffersDetails(
    $filters: TradeOffer_filter
    $skip: Int
    $first: Int
    $orderBy: TradeOffer_orderBy
    $orderDirection: OrderDirection
  ) {
    tradeOffers(where: $filters, skip: $skip, first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
      optionalTaker
      creationHash
      creationTimestamp
      cancelTimestamp
      cancelHash
      completed
      amountTo
      amountFrom
      amountFromWithFee
      active
      takenHash
      takenTimestamp
      tokenFrom {
        ...TokenFragment
      }
      tokenTo {
        ...TokenFragment
      }
      tradeID
    }
  }

  fragment TokenFragment on Token {
    decimals
    symbol
    id
  }
`;

export { OFFERS_QUERY };
