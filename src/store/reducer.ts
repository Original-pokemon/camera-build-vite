import { createReducer } from '@reduxjs/toolkit';
import { getProduct, getProducts, getPromos } from './action';
import { ExtendPromosType, ProductType } from '../types';

type InitialStateType = {
  products: ProductType[] | null;
  product: ProductType | null;
  promos: ExtendPromosType[] | null;
};

const initialState: InitialStateType = {
  products: null,
  promos: null,
  product: null
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
    });
});

export { reducer };
