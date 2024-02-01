import { Action } from '../../../const';
import { InitialStateType } from '../../reducer';
import { promoAdapter } from './promo-data';

export const { selectById: getPromoById, selectAll: getAllPromos } = promoAdapter.getSelectors<InitialStateType>((state) => state[Action.Promo]);
export const getPromoStatus = (state: InitialStateType) => state[Action.Promo].status;
