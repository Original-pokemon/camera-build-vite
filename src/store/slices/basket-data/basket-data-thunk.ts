import { createAsyncThunk } from '@reduxjs/toolkit';
import { asyncThunkConfig } from '../../../types';
import { NameSpace } from '../../../const';
import APIRoute from '../../api-route';

export const postCoupon = createAsyncThunk<number, string, asyncThunkConfig>(
  `${NameSpace.Basket}/checkCoupon`,
  async (coupon, { extra: api }) => {
    const { data } = await api.post<number>(APIRoute.Coupon, { 'coupon': coupon });

    return data;
  }
);

