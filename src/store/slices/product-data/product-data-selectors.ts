import { Action } from '../../../const';
import { InitialStateType } from '../../reducer';
import { productAdapter } from './product-data';

export const { selectById: getProduct, selectAll: getProducts } = productAdapter.getSelectors<InitialStateType>((state) => state[Action.Product]);
export const getProductsStatus = (state: InitialStateType) => state[Action.Product].status;
