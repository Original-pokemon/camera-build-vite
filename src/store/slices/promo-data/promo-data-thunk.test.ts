import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { AppThunkDispatch, StateType } from '../../../types';
import { APIRoute, NameSpace, Status } from '../../../const';
import { extractActionsTypes, generatePromosMock } from '../../../utils/mocks';
import { fetchPromos } from './promo-data-thunk';

describe('Async actions for promo data', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<StateType, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ [NameSpace.Promo]: { promos: [], status: Status.Idle } });
  });

  describe('fetchPromos', () => {
    it('should dispatch "fetchPromos.pending", "fetchPromos.fulfilled", when server response 200', async () => {
      const mockPromos = generatePromosMock();
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromos);

      await store.dispatch(fetchPromos());

      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const fetchPromosFulfilled = actions.at(1) as ReturnType<typeof fetchPromos.fulfilled>;

      expect(actionsTypes).toEqual([fetchPromos.pending.type, fetchPromos.fulfilled.type]);

      expect(fetchPromosFulfilled.payload).toEqual(mockPromos);
    });

    it('should dispatch "fetchPromos.pending", "fetchPromos.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromos());

      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);

      expect(actionsTypes).toEqual([fetchPromos.pending.type, fetchPromos.rejected.type]);
    });
  });
});
