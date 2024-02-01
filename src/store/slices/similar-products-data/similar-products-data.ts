import {
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { ProductType, StatusType } from '../../../types';
import { Action, Status } from '../../../const';
import { fetchSimilarProducts } from './similar-products-data-thunk';


type InitialSimilarProductsStateType = {
  status: StatusType;
}

export const similarProductsAdapter = createEntityAdapter<ProductType>();

const initialState = similarProductsAdapter.getInitialState<InitialSimilarProductsStateType>({
  status: Status.Idle,
});

const similarProductsSlice = createSlice({
  name: Action.SimilarProducts,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        similarProductsAdapter.setAll(state, action.payload);
        state.status = Status.Success;
      })
      .addCase(fetchSimilarProducts.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});


export default similarProductsSlice.reducer;
