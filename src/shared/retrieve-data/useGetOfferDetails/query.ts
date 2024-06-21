const OFFER_DETAILS_QUERY = `
  query OfferDetails($id: BigInt!) {
    tradeOffer(id: $id) {
      tokenFrom {
        ...TokenFragment
      }
      tokenTo {
        ...TokenFragment
      }
      amountFrom
      amountFromWithFee
      amountTo
      creator
      active
      optionalTaker
      completed
    }
  }

  fragment TokenFragment on Token {
    decimals
    symbol
    id
  }
`;

export { OFFER_DETAILS_QUERY };
