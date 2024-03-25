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
      const item = state.entities[payload.id];
      if (item) {
        item.quantity += 1;
        return;
      }
      basketAdapter.addOne(state, { ...payload, quantity: 1 });
    }
    ,
    removeProduct(state, action: { payload: number }) {
      const { payload: id } = action;
      const item = state.entities[id];
      if (item) {
        basketAdapter.removeOne(state, id);
      } else {
        throw new Error('Item not found in basket');
      }
    },
    increaseProductQuantity(state, action: { payload: number }) {
      const { payload: id } = action;
      const item = state.entities[id];
      if (item) {
        item.quantity += 1;
      } else {
        throw new Error('Item not found in basket');
      }

    },
    decreaseProductQuantity(state, action: { payload: number }) {
      const { payload: id } = action;
      const item = state.entities[id];
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          basketAdapter.removeOne(state, id);
        }
      } else {
        throw new Error('Item not found in basket');
      }
    }
  }
});

export type initialBasketStateType = typeof initialState

export { basketSlice, basketAdapter };
