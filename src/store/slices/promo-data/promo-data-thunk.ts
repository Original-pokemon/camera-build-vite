import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, NameSpace } from '../../../const';
import { PromoType, asyncThunkConfig } from '../../../types';

export const fetchPromos = createAsyncThunk<PromoType[], undefined, asyncThunkConfig>(
  `${NameSpace.Promo}/fetchPromos`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<PromoType[]>(APIRoute.Promo);

    return data;
  }
);
