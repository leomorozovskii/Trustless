export enum OfferStatus {
  ALL = '/',
  OPEN = '/open',
  PENDING = '/pending',
  ACCEPTED = '/accepted',
  CANCELLED = '/cancelled',
}

export const ROUTES = {
  home: '/',
  history: '/history',
  offers: '/offers',
  offerWithStatus: (status: OfferStatus) => `${ROUTES.offers}/${status}`,
};
