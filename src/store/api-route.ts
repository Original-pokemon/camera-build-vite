import { ProductType } from '../types';

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

export default APIRoute;
