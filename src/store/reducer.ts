import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productSlice } from './slices/product-data/product-data';
import { promoSlice } from './slices/promo-data/promo-data';
import reviewData from './slices/review-data/review-data';
import similarProductsData from './slices/similar-products-data/similar-products-data';
import { modalSlice } from './slices/modal-data/modal-data';
import { basketSlice } from './slices/basket-data/basket-data';


const reducer = combineReducers({
  [NameSpace.Product]: productSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer,
  [NameSpace.Review]: reviewData,
  [NameSpace.SimilarProducts]: similarProductsData,
  [NameSpace.Modal]: modalSlice.reducer,
  [NameSpace.Basket]: basketSlice.reducer
});

export type InitialStateType = ReturnType<typeof reducer>;

export { reducer };
