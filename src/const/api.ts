import { ProductType } from '../types';

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';
const REQUEST_TIMEOUT = 5000;

const APIRoute = {
  Products: '/cameras',
  Product: (id: ProductType['id']) => `/cameras/${id}`,
  SimilarProducts: (id: ProductType['id']) => `/cameras/${id}/similar`,
  Promo: '/promo',
  ReviewsList: (id: ProductType['id']) => `/cameras/${id}/reviews`,
  Reviews: '/reviews',
  Orders: '/orders',
  Coupon: '/coupons',
} as const;

export {
  BACKEND_URL,
  REQUEST_TIMEOUT,
  APIRoute,
};
