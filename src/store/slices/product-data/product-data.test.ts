import { NameSpace, Status } from '../../../const';
import { getProduct, getProducts, getProductsStatus } from './product-data-selectors';
import { generateProductMock } from '../../../utils/mocks';

describe('Product data slice', () => {

  describe('Product data selectors', () => {
    const state = {
      [NameSpace.Product]: {
        status: Status.Success,
        ids: [1, 2],
        entities: {
          1: generateProductMock(),
          2: generateProductMock()
        }
      }
    };

    it('getProducts selector returns all products', () => {
      const products = getProducts(state);
      expect(products).toHaveLength(2);
    });

    it('getProduct selector returns product by id', () => {
      const productId = 1;
      const product = getProduct(state, productId);
      expect(product).toEqual(state[NameSpace.Product].entities[productId]);
    });

    it('getProductsStatus selector returns correct status', () => {
      const status = Status.Success;
      const productsStatus = getProductsStatus(state);
      expect(productsStatus).toEqual(status);
    });
  });
});
