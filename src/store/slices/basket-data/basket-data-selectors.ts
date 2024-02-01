import { Action } from '../../../const';
import { InitialStateType } from '../../reducer';
import { basketAdapter, basketSlice } from './basket-data';

export const { selectAll: getBasketItems, selectTotal: getBasketTotal, selectById: getBasketItem } = basketAdapter.getSelectors<InitialStateType>((state) => state[Action.Basket]);
export const { addToBasket, removeProduct } = basketSlice.actions;
