import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { AppThunkDispatch, StateType } from '../../../types';
import { NameSpace, Status } from '../../../const';
import { extractActionsTypes, generateProductsMock } from '../../../utils/mocks';
import { fetchSimilarProducts } from './similar-products-data-thunk';
import APIRoute from '../../api-route';

describe('Async actions for similar products data', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<StateType, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ [NameSpace.SimilarProducts]: { similarProducts: [], status: Status.Idle } });
  });

  describe('fetchSimilarProducts', () => {
    const productId = 1;

    it('should dispatch "fetchSimilarProducts.pending", "fetchSimilarProducts.fulfilled", when server response 200', async () => {
      const mockSimilarProducts = generateProductsMock();
      mockAxiosAdapter.onGet(APIRoute.SimilarProducts(productId)).reply(200, mockSimilarProducts);

      await store.dispatch(fetchSimilarProducts(productId));

      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const fetchSimilarProductsFulfilled = actions.at(1) as ReturnType<typeof fetchSimilarProducts.fulfilled>;

      expect(actionsTypes).toEqual([fetchSimilarProducts.pending.type, fetchSimilarProducts.fulfilled.type]);

      expect(fetchSimilarProductsFulfilled.payload).toEqual(mockSimilarProducts);
    });

    it('should dispatch "fetchSimilarProducts.pending", "fetchSimilarProducts.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.SimilarProducts(productId)).reply(400, []);

      await store.dispatch(fetchSimilarProducts(productId));

      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);

      expect(actionsTypes).toEqual([fetchSimilarProducts.pending.type, fetchSimilarProducts.rejected.type]);
    });
  });
});
