import { createAction } from '@reduxjs/toolkit';
import { AppRouteType } from '../types';
import { NameSpace } from '../const/store';

const redirectToRoute = createAction<AppRouteType>(`${NameSpace.App}/redirectToRoute`);

export {
  redirectToRoute
};

export * from './slices/basket-data/basket-data-selectors';
export * from './slices/product-data/product-data-selectors';
export * from './slices/modal-data/modal-data-selectors';
export * from './slices/promo-data/promo-data-selectors';
export * from './slices/review-data/review-data-selectors';
export * from './slices/similar-products-data/similar-products-data-selectors';
