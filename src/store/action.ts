import { createAction } from '@reduxjs/toolkit';
import { ProductType, ReviewType, AppRouteType, ExtendPromosType } from '../types';
import { Action } from '../const/store';

const getProducts = createAction<ProductType[]>(`${Action.Data}/getProducts`);
const getProduct = createAction<ProductType>(`${Action.Data}/getProduct`);
const getReviews = createAction<ReviewType[]>(`${Action.Data}/getReviews`);
const getPromos = createAction<ExtendPromosType[]>(`${Action.Data}/getPromos`);
const redirectToRoute = createAction<AppRouteType>(`${Action.App}/redirectToRoute`);

export {
  getPromos,
  getProducts,
  getProduct,
  getReviews,
  redirectToRoute
};
