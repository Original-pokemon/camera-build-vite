import { Action } from '../../../const';
import { InitialStateType } from '../../reducer';
import { reviewAdapter } from './review-data';

export const { selectById: getReview, selectAll: getReviews } = reviewAdapter.getSelectors<InitialStateType>((state) => state[Action.Review]);
export const getReviewsStatus = (state: InitialStateType) => state[Action.Review].status;
export const getPostReviewStatus = (state: InitialStateType) => state[Action.Review].postStatus;
