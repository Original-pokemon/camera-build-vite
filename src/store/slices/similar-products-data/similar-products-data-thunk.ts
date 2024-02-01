import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, Action } from '../../../const';
import { ProductType, asyncThunkConfig } from '../../../types';

export const fetchSimilarProducts = createAsyncThunk<ProductType[], number, asyncThunkConfig>(
  `${Action.Product}/fetchSimilarProducts`,
  async (id, { extra: api }) => {
    const { data } = await api.get<ProductType[]>(APIRoute.SimilarProducts(id));

    return data;
  }
);
