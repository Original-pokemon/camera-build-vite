import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductType, asyncThunkConfig } from '../../../types';
import { APIRoute, NameSpace } from '../../../const';

export const fetchProducts = createAsyncThunk<ProductType[], undefined, asyncThunkConfig>(
  `${NameSpace.Product}/fetchProducts`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<ProductType[]>(APIRoute.Products);

    return data;
  }
);
