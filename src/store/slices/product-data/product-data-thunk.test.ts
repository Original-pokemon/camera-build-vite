import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { AppThunkDispatch, StateType } from '../../../types';
import { NameSpace, Status } from '../../../const';
import { generateProductsMock, extractActionsTypes } from '../../../utils/mocks';
import { fetchProducts } from './product-data-thunk';
import APIRoute from '../../api-route';

describe('Async actions for product data', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<StateType, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ [NameSpace.Product]: { entities: {}, ids: [], status: Status.Idle } });
  });

  describe('fetchProducts', () => {
    it('should dispatch "fetchProducts.pending", "fetchProducts.fulfilled", when server response 200', async () => {
      const mockProducts = generateProductsMock();
      mockAxiosAdapter.onGet(APIRoute.Products).reply(200, mockProducts);

      await store.dispatch(fetchProducts());

      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const fetchPromosFulfilled = actions.at(1) as ReturnType<typeof fetchProducts.fulfilled>;

      expect(actionsTypes).toEqual([fetchProducts.pending.type, fetchProducts.fulfilled.type]);

      expect(fetchPromosFulfilled.payload).toEqual(mockProducts);
    });

    it('should dispatch "fetchProducts.pending", "fetchProducts.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Products).reply(400, []);

      await store.dispatch(fetchProducts());

      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);

      expect(actionsTypes).toEqual([fetchProducts.pending.type, fetchProducts.rejected.type]);
    });
  });
});
