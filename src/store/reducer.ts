import { combineReducers } from '@reduxjs/toolkit';
import { Action } from '../const';
import productData from './slices/product-data/product-data';
import promoData from './slices/promo-data/promo-data';
import reviewData from './slices/review-data/review-data';
import similarProductsData from './slices/similar-products-data/similar-products-data';
import modalData from './slices/modal-data/modal-data';
import basketData from './slices/basket-data/basket-data';


const reducer = combineReducers({
  [Action.Product]: productData,
  [Action.Promo]: promoData,
  [Action.Review]: reviewData,
  [Action.SimilarProducts]: similarProductsData,
  [Action.Modal]: modalData,
  [Action.Basket]: basketData
});

export type InitialStateType = ReturnType<typeof reducer>;

export { reducer };
