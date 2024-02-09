import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { AppThunkDispatch, StateType } from '../../../types';
import { NameSpace, Status } from '../../../const';
import { extractActionsTypes, generateNewReviewMock, generateReviewsMock } from '../../../utils/mocks';
import { fetchReviews, postReview } from './review-data-thunk';
import faker from 'faker';
import APIRoute from '../../api-route';

describe('Async actions for reviews data', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<StateType, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ [NameSpace.Review]: { reviews: [], status: Status.Idle } });
  });

  describe('fetchReviews', () => {
    const productId = 1;

    it('should dispatch "fetchReviews.pending", "fetchReviews.fulfilled", when server response 200', async () => {
      const mockReviews = generateReviewsMock();
      mockAxiosAdapter.onGet(APIRoute.ReviewsList(productId)).reply(200, mockReviews);

      await store.dispatch(fetchReviews(productId));

      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const fetchPromosFulfilled = actions.at(1) as ReturnType<typeof fetchReviews.fulfilled>;

      expect(actionsTypes).toEqual([fetchReviews.pending.type, fetchReviews.fulfilled.type]);

      expect(fetchPromosFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchReviews.pending", "fetchReviews.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.ReviewsList(productId)).reply(400, []);

      await store.dispatch(fetchReviews(productId));

      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);

      expect(actionsTypes).toEqual([fetchReviews.pending.type, fetchReviews.rejected.type]);
    });
  });

  describe('postReview', () => {
    const mockNewReview = generateNewReviewMock();

    it('should dispatch "postReview.pending", "postReview.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onPost(APIRoute.Reviews, mockNewReview).reply(200, mockNewReview);

      await store.dispatch(postReview(mockNewReview));

      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const postReviewFulfilled = actions.at(1) as ReturnType<typeof postReview.fulfilled>;

      expect(actionsTypes).toEqual([
        postReview.pending.type,
        postReview.fulfilled.type,
      ]);

      expect(postReviewFulfilled.payload)
        .toEqual(mockNewReview);
    });

    it('should dispatch "postReview.pending", "postReview.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Reviews, mockNewReview).reply(400, {
        messages: faker.random.arrayElements()
      });

      await store.dispatch(postReview(mockNewReview));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.rejected.type,
      ]);
    });
  });
});
