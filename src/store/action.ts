import { createAction } from '@reduxjs/toolkit';
import { ProductType, ReviewType, AppRouteType } from '../types';
import { Action } from '../const/store';

const getProducts = createAction<ProductType[]>(`${Action.Data}/getProducts`);
const getProduct = createAction<ProductType>(`${Action.Data}/getProduct`);
const getReviews = createAction<ReviewType[]>(`${Action.Data}/getReviews`);
const redirectToRoute = createAction<AppRouteType>(`${Action.App}/redirectToRoute`);

export {
  getProducts,
  getProduct,
  getReviews,
  redirectToRoute
};
