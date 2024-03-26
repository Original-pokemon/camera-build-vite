import { NameSpace } from '../../../const';
import { InitialStateType } from '../../reducer';
import { basketAdapter, basketSlice } from './basket-data';

export const { addToBasket, removeProduct, decreaseProductQuantity, increaseProductQuantity, changeProductQuantity, setBasket } = basketSlice.actions;
