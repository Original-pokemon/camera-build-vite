import {
  createSlice,
} from '@reduxjs/toolkit';
import { PromoType, StatusType } from '../../../types';
import { NameSpace, Status } from '../../../const';
import { fetchPromos } from './promo-data-thunk';


type InitialPromoStateType = {
  status: StatusType;
  promos: PromoType[] | null;
}

const initialState: InitialPromoStateType = {
  status: Status.Idle,
  promos: null
};

const promoSlice = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromos.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.promos = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchPromos.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});

export {
  promoSlice
};
