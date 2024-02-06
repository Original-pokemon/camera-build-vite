import {
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { ReviewType, StatusType } from '../../../types';
import { Action, Status } from '../../../const';
import { fetchReviews, postReview } from './review-data-thunk';
import { toast } from 'react-toastify';


type InitialReviewStateType = {
  status: StatusType;
  postStatus: StatusType;
}

export const reviewAdapter = createEntityAdapter<ReviewType>();

const initialState = reviewAdapter.getInitialState<InitialReviewStateType>({
  status: Status.Idle,
  postStatus: Status.Idle
});

const reviewSlice = createSlice({
  name: Action.Review,
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.postStatus = Status.Idle;
        state.status = Status.Loading;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        reviewAdapter.setAll(state, action.payload);
        state.status = Status.Success;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.status = Status.Error;
      }).addCase(postReview.pending, (state) => {
        state.postStatus = Status.Loading;
      })
      .addCase(postReview.fulfilled, (state) => {
        state.postStatus = Status.Success;
      })
      .addCase(postReview.rejected, (state) => {
        state.postStatus = Status.Error;
        toast.error('Произошла ошибка при отправке отзыва. Попробуйте позже');
      });
  }
});

export default reviewSlice.reducer;