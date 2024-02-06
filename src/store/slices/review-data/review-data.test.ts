import { NameSpace, Status } from '../../../const';
import { generateReviewMock } from '../../../utils/mocks';
import { getPostReviewStatus, getReviews, getReviewsStatus } from './review-data-selectors';

describe('Review data slice', () => {
  const initialState = {
    status: Status.Idle,
    postStatus: Status.Idle,
    reviews: null,
  };

  it('should return reviews from getReviews selector', () => {
    const review = generateReviewMock();
    const state = { [NameSpace.Review]: { ...initialState, reviews: [review] } };
    const result = getReviews(state);
    expect(result).toEqual([review]);
  });

  it('should return reviews status from getReviewsStatus selector', () => {
    const state = { [NameSpace.Review]: { ...initialState, status: Status.Loading } };
    const result = getReviewsStatus(state);
    expect(result).toEqual(Status.Loading);
  });

  it('should return post review status from getPostReviewStatus selector', () => {
    const state = { [NameSpace.Review]: { ...initialState, postStatus: Status.Success } };
    const result = getPostReviewStatus(state);
    expect(result).toEqual(Status.Success);
  });
});
