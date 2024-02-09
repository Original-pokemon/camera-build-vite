import { createAsyncThunk } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { PromoType, asyncThunkConfig } from '../../../types';
import APIRoute from '../../api-route';

export const fetchPromos = createAsyncThunk<PromoType[], undefined, asyncThunkConfig>(
  `${NameSpace.Promo}/fetchPromos`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<PromoType[]>(APIRoute.Promo);

    return data;
  }
);
