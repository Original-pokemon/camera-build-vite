import {
  createSlice,
} from '@reduxjs/toolkit';
import { ProductType, StatusType } from '../../../types';
import { NameSpace, Status } from '../../../const';
import { fetchSimilarProducts } from './similar-products-data-thunk';


type InitialSimilarProductsStateType = {
  status: StatusType;
  similarProducts: ProductType[] | null;
}


const initialState: InitialSimilarProductsStateType = {
  status: Status.Idle,
  similarProducts: null
};

const similarProductsSlice = createSlice({
  name: NameSpace.SimilarProducts,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchSimilarProducts.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});


export default similarProductsSlice.reducer;
