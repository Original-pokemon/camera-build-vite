import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, Action } from '../../../const';
import { PromoType, asyncThunkConfig } from '../../../types';

export const fetchPromo = createAsyncThunk<PromoType[], undefined, asyncThunkConfig>(
  `${Action.Promo}/fetchPromos`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<PromoType[]>(APIRoute.Promo);

    return data;
  }
);
