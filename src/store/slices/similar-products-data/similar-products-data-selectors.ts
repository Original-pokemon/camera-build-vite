import { NameSpace } from '../../../const';
import { InitialStateType } from '../../reducer';

type SimilarProductsStateType = Pick<InitialStateType, typeof NameSpace.SimilarProducts>;

export const getSimilarProductsStatus = (state: SimilarProductsStateType) => state[NameSpace.SimilarProducts].status;
export const getSimilarProducts = (state: SimilarProductsStateType) => state[NameSpace.SimilarProducts].similarProducts;
