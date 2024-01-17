import { createReducer } from '@reduxjs/toolkit';
import { getProducts } from './action';
import { ProductType } from '../types';

type InitialStateType = {
  products: ProductType[] | null;
};

const initialState: InitialStateType = {
  products: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getProducts, (state, action) => {
      state.products = action.payload;
    });
});

export { reducer };
