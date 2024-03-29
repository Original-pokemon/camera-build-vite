import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewReviewType, ReviewType, asyncThunkConfig } from '../../../types';
import { NameSpace } from '../../../const';
import APIRoute from '../../api-route';

export const fetchReviews = createAsyncThunk<ReviewType[], number, asyncThunkConfig>(
  `${NameSpace.Review}/fetchReviews`,
  async (id, { extra: api }) => {
    const { data } = await api.get<ReviewType[]>(APIRoute.ReviewsList(id));

    return data;
  }
);

export const postReview = createAsyncThunk<ReviewType, NewReviewType, asyncThunkConfig>(
  `${NameSpace.Review}/postReview`,
  async (review, { extra: api }) => {
    const { data } = await api.post<ReviewType>(APIRoute.Reviews, review);

    return data;
  }
);
