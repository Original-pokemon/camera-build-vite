import { NameSpace } from '../../../const';
import { InitialStateType } from '../../reducer';
import { basketAdapter, basketSlice } from './basket-data';

type BasketStateType = Pick<InitialStateType, typeof NameSpace.Basket>

export const { selectAll: getBasketItems, selectById: getBasketItem, selectIds: getBasketIds } = basketAdapter.getSelectors<Pick<InitialStateType, typeof NameSpace.Basket>>((state) => state[NameSpace.Basket]);
export const { addToBasket, removeProduct, decreaseProductQuantity, increaseProductQuantity, changeProductQuantity, setBasket, resetBasket } = basketSlice.actions;

export const getCoupon = (state: BasketStateType) => state[NameSpace.Basket].coupon;
export const getBasketTotal = (state: BasketStateType) => Object.values(state[NameSpace.Basket].entities).reduce((acc, item) => acc + (item?.quantity ?? 0), 0);
export const getCouponStatus = (state: BasketStateType) => state[NameSpace.Basket].couponPostStatus;
export const getOrderStatus = (state: BasketStateType) => state[NameSpace.Basket].status;
