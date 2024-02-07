import {
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { ProductType, StatusType } from '../../../types';
import { NameSpace, Status } from '../../../const';
import { fetchProducts } from './product-data-thunk';
import { toast } from 'react-toastify';

const productAdapter = createEntityAdapter<ProductType>();

const initialState = productAdapter.getInitialState<{
  status: StatusType;
}>({
  status: Status.Idle,
});

const productSlice = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        productAdapter.setAll(state, action.payload);
        state.status = Status.Success;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = Status.Error;
        toast.error('Произошла ошибка при загрузке каталога. Попробуйте перезагрузить страницу.');
      });
  }
});

export type InitialProductState = typeof initialState

export {
  productAdapter,
  productSlice
};
