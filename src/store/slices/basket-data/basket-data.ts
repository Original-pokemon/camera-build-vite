import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ProductType, StatusType } from '../../../types';
import { Action, Status } from '../../../const';
import { BasketItemType } from '../../../types/backet';
type InitialProductStateType = {
  status: StatusType;
}

export const basketAdapter = createEntityAdapter<BasketItemType>();

const initialState = basketAdapter.getInitialState<InitialProductStateType>({
  status: Status.Idle,
});

export const basketSlice = createSlice({
  name: Action.Basket,
  initialState,
  reducers: {
    addToBasket(state, action: { payload: ProductType }) {
      const { payload } = action;
      const { id } = payload;
      const item = state.entities[id];
      if (item) {
        item.quantity = + 1;
      } else {
        basketAdapter.addOne(state, { ...payload, quantity: 1 });
      }
    }
    ,
    removeProduct(state, action: { payload: number }) {
      const { payload } = action;
      const item = state.entities[payload];
      if (item) {
        if (item.quantity > 1) {
          item.quantity = - 1;
        } else {
          basketAdapter.removeOne(state, payload);
        }
      }
    }
  }
});


export default basketSlice.reducer;
