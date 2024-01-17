import { AxiosInstance } from 'axios';
import { AppDispatchType, ProductType, StateType } from '../types';
import { getProducts } from './action';
import { Action } from '../const/store';
import { APIRoute } from '../const';
import { createAsyncThunk } from '@reduxjs/toolkit';

type asyncThunkConfig = {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
};


export const fetchProducts = createAsyncThunk<void, undefined, asyncThunkConfig>(
  `${Action.Data}/fetchProducts`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<ProductType[]>(APIRoute.Products);

      dispatch(getProducts(data));
    } catch {
      dispatch(getProducts([]));
    }
  }
);
