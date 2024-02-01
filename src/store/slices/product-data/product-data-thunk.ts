import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductType, asyncThunkConfig } from '../../../types';
import { APIRoute, Action } from '../../../const';

export const fetchProducts = createAsyncThunk<ProductType[], undefined, asyncThunkConfig>(
  `${Action.Product}/fetchProducts`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<ProductType[]>(APIRoute.Products);

    return data;
  }
);
