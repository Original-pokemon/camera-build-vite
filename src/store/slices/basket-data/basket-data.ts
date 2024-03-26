import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ProductType, StatusType } from '../../../types';
import { NameSpace, Status } from '../../../const';
import { BasketItemType } from '../../../types/backet';
import { postCoupon, postOrder } from './basket-data-thunk';

const basketAdapter = createEntityAdapter<BasketItemType>({ selectId: (item) => item.id });

const initialState = basketAdapter.getInitialState<{
  status: StatusType;
  couponPostStatus: StatusType;
  coupon: null | number;
}>({
  status: Status.Idle,
  couponPostStatus: Status.Idle,
  coupon: null
});

const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    setBasket(state, action: { payload: BasketItemType[] }) {
      const { payload } = action;
      basketAdapter.setAll(state, payload);
    },
    addToBasket(state, action: { payload: ProductType }) {
      const { payload } = action;
      const item = state.entities[payload.id];
      if (item) {
        item.quantity += 1;
        return;
      }
      basketAdapter.addOne(state, { ...payload, quantity: 1 });
    },
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
    },
    changeProductQuantity(state, action: { payload: { id: number; quantity: number } }) {
      const { id, quantity } = action.payload;
      const item = state.entities[id];
      if (item) {
        item.quantity = quantity;
      } else {
        throw new Error('Item not found in basket');
      }
    },
    resetBasket(state) {
      state.coupon = null;
      state.couponPostStatus = Status.Idle;
      state.status = Status.Idle;
      basketAdapter.removeAll(state);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postCoupon.pending, (state) => {
        state.couponPostStatus = Status.Loading;
      })
      .addCase(postCoupon.fulfilled, (state, action) => {
        state.coupon = action.payload;
        state.couponPostStatus = Status.Success;
      })
      .addCase(postCoupon.rejected, (state) => {
        state.coupon = null;
        state.couponPostStatus = Status.Error;
      })
      .addCase(postOrder.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.status = Status.Success;
      })
      .addCase(postOrder.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});

export type initialBasketStateType = typeof initialState

export { basketSlice, basketAdapter };
