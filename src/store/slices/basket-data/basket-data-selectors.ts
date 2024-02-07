import { NameSpace } from '../../../const';
import { InitialStateType } from '../../reducer';
import { basketAdapter, basketSlice } from './basket-data';

export const { selectAll: getBasketItems, selectTotal: getBasketTotal, selectById: getBasketItem } = basketAdapter.getSelectors<Pick<InitialStateType, typeof NameSpace.Basket>>((state) => state[NameSpace.Basket]);
export const { addToBasket, removeProduct } = basketSlice.actions;
