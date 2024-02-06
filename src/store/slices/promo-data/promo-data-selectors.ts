import { NameSpace } from '../../../const';
import { InitialStateType } from '../../reducer';

type PromoStateType = Pick<InitialStateType, typeof NameSpace.Promo>

export const getPromoStatus = (state: PromoStateType) => state[NameSpace.Promo].status;
export const getAllPromos = (state: PromoStateType) => state[NameSpace.Promo].promos;
