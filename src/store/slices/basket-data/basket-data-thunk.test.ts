
import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { AppThunkDispatch, StateType } from '../../../types';
import { NameSpace, Status } from '../../../const';
import { extractActionsTypes } from '../../../utils/mocks';
import APIRoute from '../../api-route';
import { postCoupon, postOrder } from './basket-data-thunk';

describe('Async actions for basket data', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<StateType, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ [NameSpace.Product]: { entities: {}, ids: [], status: Status.Idle } });
  });

  describe('postCoupon', () => {
    it('should dispatch "postCoupon.pending", "postCoupon.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onPost(APIRoute.Coupon).reply(200, 15);

      await store.dispatch(postCoupon('camera-333'));

      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const postCouponFulfilled = actions.at(1) as ReturnType<typeof postCoupon.fulfilled>;

      expect(actionsTypes).toEqual([postCoupon.pending.type, postCoupon.fulfilled.type]);

      expect(postCouponFulfilled.payload).toEqual(15);
    });

    it('should dispatch "postCoupon.pending", "postCoupon.rejected", when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Coupon).reply(400, []);

      await store.dispatch(postCoupon('camera-333'));

      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);

      expect(actionsTypes).toEqual([postCoupon.pending.type, postCoupon.rejected.type]);
    });

    it('should dispatch "postOrder.pending", "postOrder.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onPost(APIRoute.Orders).reply(201);

      await store.dispatch(postOrder({ camerasIds: [1, 2, 3], coupon: 'camera-333' }));

      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);

      expect(actionsTypes).toEqual([postOrder.pending.type, postOrder.fulfilled.type]);

    });

    it('should dispatch "postOrder.pending", "postOrder.rejected", when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Orders).reply(400, []);

      await store.dispatch(postOrder({ camerasIds: [1, 2, 3], coupon: 'camera-333' }));

      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);

      expect(actionsTypes).toEqual([postOrder.pending.type, postOrder.rejected.type]);
    });
  });
});
