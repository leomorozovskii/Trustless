export enum OFFER_STATUS {
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
  offerWithStatus: (status: OFFER_STATUS) => `${ROUTES.offers}/${status}`,
};
