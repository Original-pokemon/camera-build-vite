import { Action } from '../../../const';
import { InitialStateType } from '../../reducer';
import { similarProductsAdapter } from './similar-products-data';

export const { selectById: getSimilarProduct, selectAll: getSimilarProducts } = similarProductsAdapter.getSelectors<InitialStateType>((state) => state[Action.SimilarProducts]);
export const getSimilarProductsStatus = (state: InitialStateType) => state[Action.SimilarProducts].status;
