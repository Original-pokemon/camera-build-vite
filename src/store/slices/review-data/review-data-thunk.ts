import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewReviewType, ReviewType, asyncThunkConfig } from '../../../types';
import { APIRoute, Action } from '../../../const';

export const fetchReviews = createAsyncThunk<ReviewType[], number, asyncThunkConfig>(
  `${Action.Review}/fetchReviews`,
  async (id, { extra: api }) => {
    const { data } = await api.get<ReviewType[]>(APIRoute.ReviewsList(id));

    return data;
  }
);

export const postReview = createAsyncThunk<ReviewType, NewReviewType, asyncThunkConfig>(
  `${Action.Review}/postReview`,
  async (review, { extra: api }) => {
    const { data } = await api.post<ReviewType>(APIRoute.Reviews, review);

    return data;
  }
);
