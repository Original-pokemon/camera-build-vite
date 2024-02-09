import { createAsyncThunk } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { ProductType, asyncThunkConfig } from '../../../types';
import APIRoute from '../../api-route';

export const fetchSimilarProducts = createAsyncThunk<ProductType[], number, asyncThunkConfig>(
  `${NameSpace.Product}/fetchSimilarProducts`,
  async (id, { extra: api }) => {
    const { data } = await api.get<ProductType[]>(APIRoute.SimilarProducts(id));

    return data;
  }
);
