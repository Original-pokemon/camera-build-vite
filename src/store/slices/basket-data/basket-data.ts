import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ProductType, StatusType } from '../../../types';
import { NameSpace, Status } from '../../../const';
import { BasketItemType } from '../../../types/backet';

const basketAdapter = createEntityAdapter<BasketItemType>();

const initialState = basketAdapter.getInitialState<{
  status: StatusType;
}>({
  status: Status.Idle,
});

const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addToBasket(state, action: { payload: ProductType }) {
      const { payload } = action;
      const { id } = payload;
      const item = basketAdapter.getSelectors().selectById(state, id);
      if (item) {
        item.quantity += 1;
      } else {
        basketAdapter.addOne(state, { ...payload, quantity: 1 });
      }
    }
    ,
    removeProduct(state, action: { payload: number }) {
      const { payload: id } = action;
      const item = basketAdapter.getSelectors().selectById(state, id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          basketAdapter.removeOne(state, id);
        }
      }
    }
  }
});

export type initialBasketStateType = typeof initialState

export { basketSlice, basketAdapter };
