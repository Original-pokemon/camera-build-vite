import { NameSpace } from '../../../const';
import { InitialStateType } from '../../reducer';

type ReviewStateType = Pick<InitialStateType, typeof NameSpace.Review>;

export const getReviews = (state: ReviewStateType) => state[NameSpace.Review].reviews;
export const getReviewsStatus = (state: ReviewStateType) => state[NameSpace.Review].status;
export const getPostReviewStatus = (state: ReviewStateType) => state[NameSpace.Review].postStatus;
