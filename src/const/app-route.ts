export const AppRoute = {
  Main: '/',
  Product: '/product/:id',
  Basket: '/basket',
  PageNotFound: '*'
} as const;

export const getProductPath =
  (id: number) => `/product/${id}`;

