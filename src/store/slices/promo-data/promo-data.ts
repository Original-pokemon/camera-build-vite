import {
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { PromoType, StatusType } from '../../../types';
import { Action, Status } from '../../../const';
import { fetchPromo } from './promo-data-thunk';


type InitialPromoStateType = {
  status: StatusType;
}

export const promoAdapter = createEntityAdapter<PromoType>();

const initialState = promoAdapter.getInitialState<InitialPromoStateType>({
  status: Status.Idle,
});

const productSlice = createSlice({
  name: Action.Product,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromo.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        promoAdapter.setAll(state, action.payload);
        state.status = Status.Success;
      })
      .addCase(fetchPromo.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});

export default productSlice.reducer;
