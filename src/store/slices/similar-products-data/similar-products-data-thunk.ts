import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, NameSpace } from '../../../const';
import { ProductType, asyncThunkConfig } from '../../../types';

export const fetchSimilarProducts = createAsyncThunk<ProductType[], number, asyncThunkConfig>(
  `${NameSpace.Product}/fetchSimilarProducts`,
  async (id, { extra: api }) => {
    const { data } = await api.get<ProductType[]>(APIRoute.SimilarProducts(id));

    return data;
  }
);
