import { NameSpace } from '../../../const';
import { InitialStateType } from '../../reducer';
import { productAdapter } from './product-data';

type ProductStateType = Pick<InitialStateType, typeof NameSpace.Product>

export const { selectById: getProduct, selectAll: getProducts } = productAdapter.getSelectors<ProductStateType>(
  (state) => state[NameSpace.Product]
);
export const getProductsStatus = (state: ProductStateType) => state[NameSpace.Product].status;
