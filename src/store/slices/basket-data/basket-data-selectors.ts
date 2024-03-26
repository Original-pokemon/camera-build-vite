import { NameSpace } from '../../../const';
import { InitialStateType } from '../../reducer';
import { basketAdapter, basketSlice } from './basket-data';

export const { selectAll: getBasketItems, selectTotal: getBasketTotal, selectById: getBasketItem, selectIds: getBasketIds } = basketAdapter.getSelectors<Pick<InitialStateType, typeof NameSpace.Basket>>((state) => state[NameSpace.Basket]);
export const { addToBasket, removeProduct, decreaseProductQuantity, increaseProductQuantity, changeProductQuantity, setBasket } = basketSlice.actions;

export const getCoupon = (state: InitialStateType) => state[NameSpace.Basket].coupon;
export const getCouponStatus = (state: InitialStateType) => state[NameSpace.Basket].couponPostStatus;
