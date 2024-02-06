import { NameSpace, Status } from '../../../const';
import { generateProductMock } from '../../../utils/mocks';
import { getSimilarProducts, getSimilarProductsStatus } from './similar-products-data-selectors';

describe('Similar Products data slice', () => {
  const initialState = {
    [NameSpace.SimilarProducts]: {
      status: Status.Idle,
      similarProducts: [generateProductMock(), generateProductMock()],
    }
  };

  it('getSimilarProductsStatus selector should return correct status', () => {
    const result = getSimilarProductsStatus(initialState);
    expect(result).toEqual(Status.Idle);
  });

  it('getSimilarProducts selector should return correct similar products', () => {
    const result = getSimilarProducts(initialState);
    expect(result).toEqual(initialState[NameSpace.SimilarProducts].similarProducts);
  });
});
