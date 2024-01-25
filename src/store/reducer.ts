import { createReducer } from '@reduxjs/toolkit';
import { addToBasket, getProduct, getProducts, getPromos, removeFromBasket } from './action';
import { ExtendPromosType, ProductType } from '../types';
import { BasketType } from '../types/backet';

type InitialStateType = {
  products: ProductType[] | null;
  product: ProductType | null;
  promos: ExtendPromosType[] | null;
  basket: BasketType;
  selectedProduct: ProductType | null;
};

const initialState: InitialStateType = {
  products: null,
  promos: null,
  selectedProduct: null
  basket: {}
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getProducts, (state, action) => {
      state.products = action.payload;
    })
    .addCase(getPromos, (state, action) => {
      state.promos = action.payload;
    })
    .addCase(getProduct, (state, action) => {
      state.product = action.payload;
    })
    .addCase(addToBasket, (state, action) => {
      const { payload } = action;
      const { basket } = state;
      if (basket[payload.id]) {
        const item = basket[payload.id];
        basket[payload.id] = { ...payload, quantity: item.quantity = + 1 };
      } else {
        basket[payload.id] = { ...payload, quantity: 1 };
      }
    })
    .addCase(removeFromBasket, (state, action) => {
      const { payload } = action;
      const { basket } = state;
      if (basket[payload]) {
        const item = basket[payload];
        if (item.quantity > 1) {
          basket[payload] = { ...item, quantity: item.quantity = - 1 };
        } else {
          delete basket[payload];
        }
      }
    })
    .addCase(selectProduct, (state, action) => {
      state.selectedProduct = action.payload;
    });
});

export { reducer };
